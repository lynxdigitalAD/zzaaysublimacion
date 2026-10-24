import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const localTool = path.resolve(root, '../Zzaay-Web/.tools/ffmpeg.exe')
const ffmpeg = process.env.FFMPEG_PATH || (existsSync(localTool) ? localTool : 'ffmpeg')
const manifestPath = path.join(root, 'docs/work-mobile-generations.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const hash = file => createHash('sha256').update(readFileSync(path.join(root, file))).digest('hex')

for (const asset of manifest.assets) {
  asset.originalSha256 = hash(asset.original)
  asset.outputSha256 = {}
  for (const output of asset.outputs) {
    const width = Number(output.match(/-(\d+)\.webp$/)?.[1])
    if (![480, 960].includes(width)) throw new Error(`Invalid export width: ${output}`)
    mkdirSync(path.dirname(path.join(root, output)), { recursive: true })
    const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', asset.original, '-vf', `scale=${width}:-2:flags=lanczos`, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '87', '-compression_level', '6', output], { cwd: root, stdio: 'inherit' })
    if (result.error) throw result.error
    if (result.status !== 0) throw new Error(`Could not encode ${asset.id} at ${width}px`)
    asset.outputSha256[output] = hash(output)
  }
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log('Three conceptual mobile gallery scenes encoded at 480px and 960px.')
