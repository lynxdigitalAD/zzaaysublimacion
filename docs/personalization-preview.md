# Escenas completas de personalización

La sección “No es solo una taza. Es muy tú.” muestra tres imágenes creadas íntegramente desde cero con la herramienta integrada **image_gen**, a partir de texto y sin imágenes de referencia. Cada escena incluye su propia taza, estampado, iluminación, encuadre, superficie, fondo y accesorios.

- **Una frase:** taza con “Haz que hoy cuente.”, pedestal vino, listón y escenografía cálida con papel.
- **Un recuerdo:** taza con fotografía de viaje e inscripción “Nuestro viaje.” sobre piedra clara, con lino y fotografías de recuerdo.
- **Mi marca:** taza con la identidad ficticia bruma, plataforma azul y papelería vino y crema.

Se mantiene el selector, la descripción dinámica, el marco sin rótulos ni pie de foto y la retirada del botón “Platiquemos de tu idea”. La descripción introductoria identifica las escenas como conceptuales. La galería de trabajos reales, el logo oficial y el video conservan sus recursos originales.

## Recursos y reproducción

| Escena | Original PNG | Archivos WebP |
| --- | --- | --- |
| Frase | `design-assets/personalization-scenes-v2/frase.png` | `public/media/personalization-scenes/frase-480.webp`, `frase-960.webp` |
| Recuerdo | `design-assets/personalization-scenes-v2/recuerdo.png` | `public/media/personalization-scenes/recuerdo-480.webp`, `recuerdo-960.webp` |
| Marca | `design-assets/personalization-scenes-v2/marca.png` | `public/media/personalization-scenes/marca-480.webp`, `marca-960.webp` |

Prompts completos, herramienta, método y rutas: `docs/personalization-generations.json`, versión 2. Los originales y prompts de la versión 1 se conservan por procedencia, con su manifiesto en `docs/personalization-generations-v1.json`; no se usan en el visor actual.

`npm run media:personalization` exporta las seis imágenes desde los originales PNG, con FFmpeg, respetando las proporciones. Admite `FFMPEG_PATH`. Las exportaciones de 480 px suman aproximadamente 121 KiB; las de 960 px, 362 KiB. Se utilizan rutas nuevas para que la vista solicite las escenas actuales.

## Archivos actualizados

- `src/data/business.ts`: rutas centralizadas de las escenas y textos alternativos.
- `src/components/Personalization.tsx`: imágenes y srcSet desde sus datos.
- `scripts/prepare-personalization.mjs`: destinos de exportación tomados del manifiesto.
- `tests/site.spec.ts`: rutas de las nuevas escenas.
- `README.md`, `DESIGN.md` y este reporte: comportamiento y recursos vigentes.

No se modificaron los estilos, la navegación ni las animaciones.

## Validación

- `npm run media:personalization`: correcto.
- `npm run build`: correcto.
- `npm run test:e2e`: **12/12 pruebas correctas en Chromium**.
- Tres selecciones por teclado en 320, 390, 768, 1440 y 1920 px: 15 estados correctos, imágenes cargadas y sin errores HTTP o de ejecución.
- Altura de sección estable, marco de hasta 480 px de ancho y 500 px de alto, sin desbordamiento horizontal ni texto dentro del marco.
- Capturas revisadas de las tres escenas en escritorio y de su presentación en móvil.
- Hashes de 16 archivos preservados: componentes ajenos al cambio, estilos, navegación, animaciones, fotografías reales, logo y videos.
- Evidencias en `.qa/personalization-scenes/`, excluidas de Git.

La comprobación de navegador se hizo en Chromium de escritorio y viewports móviles; Safari, Firefox y dispositivos físicos no se comprobaron. Las escenas se identifican como conceptos y no se atribuyen a pedidos entregados.
