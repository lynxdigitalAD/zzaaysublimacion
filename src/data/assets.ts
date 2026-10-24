// Keep local development at / and support the repository path on GitHub Pages.
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
