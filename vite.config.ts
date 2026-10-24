import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const [pagesOwner = '', pagesRepository = 'zzaaysublimacion'] =
  (process.env.GITHUB_REPOSITORY || '').split('/')
const pagesBase = pagesRepository.toLowerCase() === `${pagesOwner.toLowerCase()}.github.io`
  ? '/'
  : `/${pagesRepository}/`

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'github-pages' ? pagesBase : '/',
}))
