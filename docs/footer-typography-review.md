# Ajustes de pie y legibilidad

- Logo oficial completo a la izquierda del pie: 320 px en escritorio grande, 240 px en escritorio intermedio y 200 px en tabletas. En teléfonos se dispone centrado, a 240 px, sobre el texto del pie.
- Recurso: `public/media/brand/logo-large.webp`, 640 × 640 con transparencia, exportado sin recorte desde el PNG oficial mediante reducción proporcional y WebP sin pérdida. El original se verificó contra su SHA-256 registrado. La exportación y su hash se documentan en `public/media/manifest.json`; `npm run media:prepare` permite reproducirla.
- Eliminados del hero los enlaces Crear mi taza / Ver trabajos, sus flechas y sus estilos, incluidas las variantes responsive. El video conserva su control accesible de reproducción y pausa.
- Paso 03: «Plasmamos tu diseño para que cada detalle hable de ti». Los tres pasos se editan en `src/data/business.ts`.
- Personalización: descripción a 22 px; opciones a 20 px; título del detalle a 22 px y párrafo a 21 px en escritorio. En móvil, párrafos de 20 px, títulos del detalle de 21 px y opciones de 18 px. Los pasos usan títulos de 20 px y cuerpo de 18 px.
- Se conserva el tamaño del marco de personalización y se comprobó que no cambia al alternar las tres escenas.

## Verificación

`npm run build` y las 16 pruebas E2E de Chromium pasaron. Las pruebas de recarga utilizan ahora la navegación principal; el selector comprueba que sus tres opciones caben en ventanas estrechas. Se mantienen las comprobaciones de navegación, scroll inverso, móvil y movimiento reducido.

Revisión visual y mediciones en nueve anchuras: 1920, 1440, 1280, 1024, 950, 768, 600, 390 y 320 px. Sin desbordamiento horizontal, opciones cortadas, contacto fuera de su columna ni errores de navegador/carga de recursos en las comprobaciones realizadas.

Capturas y mediciones: `.qa/footer-type-adjustments/`, excluidas del control de versiones. Safari, Firefox y dispositivos físicos siguen pendientes de verificación.
