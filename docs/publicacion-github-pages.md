# Publicación en GitHub Pages

Repositorio: `lynxdigitalAD/zzaaysublimacion`, rama `main`.

Página pública verificada: [https://lynxdigitalad.github.io/zzaaysublimacion/](https://lynxdigitalad.github.io/zzaaysublimacion/).

## Configuración

- `.github/workflows/pages.yml` instala con `npm ci`, compila con Node.js 24 y publica el artefacto `dist/` mediante las acciones oficiales de GitHub Pages.
- El flujo se ejecuta al subir cambios a `main` o al iniciarlo manualmente en Actions.
- `npm run build:pages` usa el modo `github-pages` de Vite y la base `/zzaaysublimacion/`.
- `publicAsset` centraliza las rutas de recursos en datos y componentes; Vite adapta las referencias de CSS y HTML.
- El servidor local y `npm run build` mantienen la base `/`.
- Se mantienen el diseño, textos, enlaces, imágenes y video. Los originales se conservan localmente; el repositorio contiene los recursos optimizados necesarios para compilar.
- No se guardan dependencias, credenciales, compilaciones ni capturas en Git. La publicación utiliza un artefacto de Actions.
- Se retira la configuración anterior de Netlify; la publicación se realiza en GitHub.

## Validación

- `npm run build`: correcto.
- `npm run build:pages`: correcto; HTML, CSS y fuentes usan la base del repositorio.
- `npm run test:e2e`: 30 pruebas correctas, incluyendo navegación, scroll inverso, movimiento reducido, galería y video.
- Vista compilada servida bajo `/zzaaysublimacion/`, comprobada a 390 y 1440 px: HTTP 200, sin desbordamiento, errores de ejecución ni imágenes fallidas. Logotipo, galería y las tres variantes del video responden correctamente.
- El plan de GitHub exige un repositorio público para esta publicación; el repositorio pasa a público con la activación de Pages.
- Despliegue [40050940228](https://github.com/lynxdigitalAD/zzaaysublimacion/actions/runs/40050940228): completado correctamente, revisión `d58bfe1d9aa9843b73beac1d51fb1bbba63b903e`.
- GitHub Pages confirma `public: true` y HTTPS obligatorio.
- Acceso público sin cookies ni sesión de GitHub: HTTP 200. Chromium abre la página a 390 y 1440 px con todos los recursos resueltos, sin desbordamiento ni errores de ejecución; se conservan los destinos de WhatsApp y redes.
- No se modificaron los archivos multimedia ni los estilos visuales para publicar. Las verificaciones públicas se realizaron con Chromium automatizado, no con dispositivos físicos.
