import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const localTool = path.resolve(root, '../Zzaay-Web/.tools/ffmpeg.exe')
const ffmpeg = process.env.FFMPEG_PATH || (existsSync(localTool) ? localTool : 'ffmpeg')
for (const name of ['brand', 'hero', 'concepts', 'work']) mkdirSync(path.join(root, 'public/media', name), { recursive: true })

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`FFmpeg failed: ${result.status}`)
}

run(['-i', 'LOGO SIN FONDO.png', '-vf', 'scale=256:256:flags=lanczos', '-frames:v', '1', '-c:v', 'libwebp', '-lossless', '1', 'public/media/brand/logo.webp'])
run(['-i', 'LOGO SIN FONDO.png', '-vf', 'scale=640:640:flags=lanczos', '-frames:v', '1', '-c:v', 'libwebp', '-lossless', '1', 'public/media/brand/logo-large.webp'])
run(['-i', 'LOGO SIN FONDO.png', '-vf', 'scale=96:96:flags=lanczos', '-frames:v', '1', 'public/media/brand/favicon.png'])

// Authorized photographs of ONE existing Zzaay project, not generated variants.
const originalPhotos = path.resolve(root, '../Zzaay-Web/public/media/main-photography')
for (const name of ['tulancingo-frente', 'tulancingo-catedral', 'tulancingo-tradiciones']) {
  for (const width of [640, 1280]) {
    const filename = `${name}-${width}.webp`
    if (existsSync(path.join(originalPhotos, filename))) copyFileSync(path.join(originalPhotos, filename), path.join(root, 'public/media/work', filename))
  }
}

// Generated originals are kept separately; no product or artwork is recolored.
for (const name of ['cumpleanos', 'bodas', 'comuniones', 'regalos', 'empresas']) {
  const original = path.join('design-assets/concepts', `${name}.png`)
  if (!existsSync(path.join(root, original))) continue
  for (const width of [640, 1280]) {
    run(['-i', original, '-vf', `scale=${width}:-2:flags=lanczos`, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '88', path.join('public/media/concepts', `${name}-${width}.webp`)])
  }
}
await import('./prepare-hero.mjs')
console.log('Media prepared. Source files preserved; export aspect ratios unchanged.')
