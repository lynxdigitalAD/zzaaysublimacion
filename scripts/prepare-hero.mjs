import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const tool = name => {
  const nearby = path.resolve(root, '../Zzaay-Web/.tools', name + '.exe')
  return process.env[name.toUpperCase() + '_PATH'] || (existsSync(nearby) ? nearby : name)
}
const source = process.env.HERO_SOURCE_PATH || path.join(root, 'design-assets/hero/Zzaay_Higgsfield_original_restaurado_3008x1280.mp4')
const output = path.join(root, 'public/media/hero/restored')
const staging = path.join(root, '.qa/hero-export')
mkdirSync(output, { recursive: true })
mkdirSync(staging, { recursive: true })
if (!existsSync(source)) throw new Error('Missing restored hero original: ' + source)

function run(name, args, capture = false) {
  const result = spawnSync(tool(name), args, { cwd: root, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(name + ' failed: ' + (result.stderr || result.status))
  return result.stdout
}
const probe = file => JSON.parse(run('ffprobe', ['-v', 'error', '-count_frames', '-show_entries', 'stream=codec_name,codec_type,width,height,pix_fmt,r_frame_rate,nb_read_frames,color_space,color_transfer,color_primaries:format=duration,size', '-of', 'json', file], true))
const sha256 = file => createHash('sha256').update(readFileSync(file)).digest('hex')
const metadata = probe(source)
const stream = metadata.streams.find(stream => stream.codec_type === 'video')
const [numerator, denominator] = stream.r_frame_rate.split('/').map(Number)
const fps = numerator / denominator
const sourceFrames = Number(stream.nb_read_frames)
const crossfade = !process.argv.includes('--no-crossfade')
const fadeFrames = Math.round(fps * .5)
if (!Number.isFinite(fps) || !Number.isInteger(sourceFrames) || fadeFrames < 2 || sourceFrames <= 2 * fadeFrames) throw new Error('The source does not support a half-second loop crossfade.')
const tailStart = sourceFrames - fadeFrames
const outputFrames = crossfade ? tailStart : sourceFrames
const loopFilter = width => [
  `[0:v]scale=${width}:-2:flags=lanczos,setsar=1,split=3[m][t][h]`,
  `[m]trim=start_frame=${fadeFrames}:end_frame=${tailStart},setpts=PTS-STARTPTS[mid]`,
  `[t]trim=start_frame=${tailStart}:end_frame=${sourceFrames},setpts=PTS-STARTPTS[tail]`,
  `[h]trim=end_frame=${fadeFrames},setpts=PTS-STARTPTS[head]`,
  // T starts at zero: the first fade frame is pure tail, the last is pure head.
  `[tail][head]blend=all_expr='A*(1-T*${fps}/${fadeFrames - 1})+B*T*${fps}/${fadeFrames - 1}':shortest=1[fade]`,
  `[mid][fade]concat=n=2:v=1:a=0,setpts=N/(${fps}*TB)[out]`,
].join(';')
const variants = {}
const prepared = []

for (const [suffix, width, crf] of [['', 3008, '18'], ['-medium', 1920, '19'], ['-mobile', 1280, '20']]) {
  const video = path.join(output, 'film' + suffix + '.mp4')
  const poster = path.join(output, 'poster' + suffix + '.webp')
  const temporaryVideo = path.join(staging, path.basename(video))
  const filter = crossfade ? ['-filter_complex', loopFilter(width), '-map', '[out]'] : ['-map', '0:v:0', '-vf', `scale=${width}:-2:flags=lanczos,setsar=1`]
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, ...filter, '-an', '-frames:v', String(outputFrames), '-r', stream.r_frame_rate, '-c:v', 'libx264', '-crf', crf, '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', temporaryVideo])
  if (!existsSync(poster)) run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-frames:v', '1', '-vf', 'scale=' + width + ':-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '93', poster])
  const encoded = probe(temporaryVideo)
  if (Number(encoded.streams[0].nb_read_frames) !== outputFrames) throw new Error('Unexpected frame count: ' + temporaryVideo)
  variants[path.basename(video)] = { path: path.relative(root, video).replaceAll('\\', '/'), ...encoded, sha256: sha256(temporaryVideo) }
  prepared.push([temporaryVideo, video])
  console.log(path.basename(video) + ': ' + (statSync(temporaryVideo).size / 1024 / 1024).toFixed(2) + ' MiB; ' + outputFrames + ' frames')
}
// Publish only completed, checked exports so the live server never serves a partial MP4.
for (const [temporaryVideo, video] of prepared) renameSync(temporaryVideo, video)

const manifestFile = path.join(root, 'public/media/manifest.json')
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))
const previous = manifest.hero
manifest.version = 2
manifest.hero = {
  source: path.relative(root, source).replaceAll('\\', '/'),
  sha256: sha256(source),
  provenance: 'Restored conceptual video supplied by the user; no new video generated.',
  metadata,
  variants,
  crop: false,
  displayFraming: 'Desktop: cover with horizontal offset for the left text. Up to 800 CSS px: centered cover window, 100vw tall capped at 560px, fading continuously into live text over a dark atmospheric background. Exports preserve the source aspect ratio; CSS framing may crop the scenery.',
  audio: false,
  frameInterpolation: false,
  newVideoGenerated: false,
  seamlessLoopVerified: false,
  loopCrossfade: {
    enabled: crossfade,
    method: 'Linear tail-to-head blend integrated in the MP4, with the head overlap removed from the cycle.',
    durationSeconds: crossfade ? fadeFrames / fps : 0,
    frames: crossfade ? fadeFrames : 0,
    sourceFrames,
    outputFrames,
    firstSourceFrame: crossfade ? fadeFrames : 0,
    tailStartFrame: crossfade ? tailStart : null,
    outputDurationSeconds: outputFrames / fps,
    originalSourcePreserved: true,
    note: 'A visual crossfade softens the reset; identical petal trajectories and fully natural motion continuity are not claimed.',
  },
  previousSource: previous.previousSource || { source: previous.source, sha256: previous.sha256, metadata: previous.metadata },
}
const known = new Map(manifest.files.map(file => [file.path, file]))
for (const suffix of ['', '-medium', '-mobile']) for (const name of ['film' + suffix + '.mp4', 'poster' + suffix + '.webp']) {
  const file = 'public/media/hero/restored/' + name
  known.set(file, { path: file, bytes: statSync(path.join(root, file)).size })
}
manifest.files = [...known.values()]
writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n')
writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest.hero, null, 2) + '\n')
console.log('Restored hero ready. Original source and posters preserved; ' + (crossfade ? 'half-second loop crossfade integrated; ' : '') + 'no color filters, speed changes or motion interpolation.')
