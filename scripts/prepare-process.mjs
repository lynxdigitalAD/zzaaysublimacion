import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const localTool = path.resolve(root, '../Zzaay-Web/.tools/ffmpeg.exe')
const ffmpeg = process.env.FFMPEG_PATH || (existsSync(localTool) ? localTool : 'ffmpeg')
const manifest = JSON.parse(readFileSync(path.join(root, 'docs/process-generations.json'), 'utf8'))

for (const asset of manifest.assets) {
  for (const output of asset.outputs) {
    const width = Number(output.match(/-(\d+)\.webp$/)?.[1])
    if (![360, 720].includes(width)) throw new Error(`Invalid export width: ${output}`)
    mkdirSync(path.dirname(path.join(root, output)), { recursive: true })
    const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', asset.original, '-vf', `scale=${width}:-2:flags=lanczos`, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '87', '-compression_level', '6', output], { cwd: root, stdio: 'inherit' })
    if (result.error) throw result.error
    if (result.status !== 0) throw new Error(`Could not encode ${asset.id} at ${width}px`)
  }
}
console.log('Three conceptual process scenes encoded at 360px and 720px.')
