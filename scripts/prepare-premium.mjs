import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const localTool = path.resolve(root, '../Zzaay-Web/.tools/ffmpeg.exe')
const ffmpeg = process.env.FFMPEG_PATH || (existsSync(localTool) ? localTool : 'ffmpeg')
const manifest = JSON.parse(readFileSync(path.join(root, 'docs/premium-generations.json'), 'utf8'))

// Re-encode saved generated originals. Never edits the logo, video or real photographs.
for (const asset of manifest.assets) {
  mkdirSync(path.dirname(path.join(root, asset.output)), { recursive: true })
  const filter = asset.name === 'ribbon' ? 'scale=720:-2:flags=lanczos' : 'scale=256:256:flags=lanczos'
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', asset.original, '-vf', filter, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '92', '-compression_level', '6', asset.output], { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Could not encode ${asset.name}`)
}
console.log('Six generated assets encoded. Alpha preserved; product photographs untouched.')
