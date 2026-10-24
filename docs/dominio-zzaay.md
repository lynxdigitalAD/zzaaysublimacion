# Dirección exclusiva de Zzaay

Dirección solicitada: `https://zzaaysublimacion.github.io/`.

## Requisito de GitHub

La cuenta u organización propietaria debe llamarse `zzaaysublimacion` y su repositorio debe ser `zzaaysublimacion.github.io`. Nombrar así un repositorio dentro de otra cuenta no concede esa dirección.

La conexión disponible permite gestionar repositorios y Pages, pero no crear organizaciones. El propietario debe completar el registro de la organización desde [GitHub Free](https://github.com/organizations/new?plan=free). No hace falta renombrar su cuenta personal ni comprar un dominio.

## Preparación realizada

- Rama de preparación: `codex/dominio-zzaay`.
- Vite toma `GITHUB_REPOSITORY` de GitHub Actions y usa `/` para el sitio principal de una cuenta u organización; conserva la base del repositorio para sitios de proyecto.
- El flujo existente compila con `npm run build:pages` y publica mediante GitHub Actions.
- Los recursos utilizan `publicAsset`, de modo que imágenes, video e iconos pueden funcionar desde la raíz sin cambiar el diseño.
- La página ya publicada sigue activa durante la preparación.

Comprobaciones de preparación: compilación correcta para la raíz de `zzaaysublimacion/zzaaysublimacion.github.io`, para el sitio de proyecto actual y con `npm run build`. HTML y CSS resuelven correctamente sus rutas. La vista compilada desde `/` se revisó a 390 y 1440 px sin desbordamiento, errores de ejecución ni imágenes fallidas; logo, galería y las tres variantes del video responden HTTP 200.

## Al completar el registro

1. Comprobar el acceso de administración a `zzaaysublimacion`.
2. Crear el repositorio público `zzaaysublimacion/zzaaysublimacion.github.io` y subir la versión preparada a `main`.
3. Activar GitHub Pages con origen GitHub Actions.
4. Comprobar el despliegue y abrir `https://zzaaysublimacion.github.io/` sin sesión, en móvil y escritorio.
5. Actualizar la documentación con el enlace verificado.

La dirección solicitada todavía no está publicada; falta que se cree la organización.
