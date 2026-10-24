# Publicación en Netlify

Nombre solicitado: `zzaaysublimacion`.

La dirección prevista es `https://zzaaysublimacion.netlify.app/`, sujeta a disponibilidad y a completar el acceso a la cuenta de Netlify. Este documento no confirma que ya esté publicada.

## Preparación

- El proyecto conserva React, Vite, TypeScript, GSAP y todos los recursos de la versión local.
- `netlify.toml` establece Node.js 24, `npm run build` y la carpeta pública `dist/`.
- La regla de rutas conserva la entrada de la aplicación al abrir enlaces directamente.
- El repositorio guarda código, recursos optimizados, scripts, pruebas y documentación. Los originales de `design-assets/` y `referencias/` se conservan localmente; no se necesitan para compilar o publicar porque los recursos finales están en `public/`.
- Se excluyen credenciales, estado de Netlify, dependencias, compilaciones y resultados de pruebas.

## Compilación y publicación

```text
npm ci
npm run build
npm exec --yes --package=netlify-cli -- netlify login
npm exec --yes --package=netlify-cli -- netlify deploy --prod --no-build --dir=dist
```

El último comando requiere que el proyecto ya esté vinculado a su sitio en Netlify. No hay que subir la carpeta del proyecto completa como carpeta pública: se publica únicamente `dist/`.

La web publicada puede ser pública aunque el repositorio de código sea privado. No depende del servidor local ni de la dirección IP de la computadora. El despliegue inicial no implica que los cambios locales se publiquen automáticamente.

## Estado

- Compilación de producción: correcta.
- Pruebas automatizadas: 28 correctas en la ejecución general y 2 correctas al repetir los dos casos que agotaron el tiempo inicial de carga.
- Repositorio privado: `https://github.com/lynxdigitalAD/zzaaysublimacion`.
- Subida inicial del código: confirmada en la rama `main`; el código y los recursos están en GitHub.
- Versión compilada revisada a 390 y 1440 px: sin desbordamiento, errores de ejecución ni recursos fallidos; logotipo, las tres versiones del video y galería responden HTTP 200. Los enlaces de WhatsApp y redes conservan sus destinos.
- Acceso a Netlify: solicitud de inicio de sesión preparada mediante la pantalla oficial; pendiente de que el propietario vincule su cuenta.
- Publicación pública: pendiente del acceso a Netlify y de comprobar la disponibilidad del nombre.
- URL pública y recursos desde internet: todavía sin comprobar.
