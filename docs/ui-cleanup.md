# Limpieza de rótulos, enlaces y controles visibles

Se retiraron los elementos señalados en las once capturas del usuario y se reajustó el espacio que ocupaban.

## Elementos retirados

1. Fila completa “Sigue explorando” del footer y sus cuatro enlaces.
2. “04 / DE LA IDEA A TUS MANOS”.
3. Enlace “Ahora cuéntanos tu historia”, incluyendo flecha y subrayado.
4. Fila “03 / HECHO EN ZZAAY” y “UN PROYECTO REAL. TRES PUNTOS DE VISTA.”.
5. “02 / UNA TAZA PARA CADA HISTORIA”.
6. “EXPLORA LAS POSIBILIDADES” y su flecha.
7. “01 / EL ARTE DE HACERLO TUYO”.
8. Botones “Crea tu taza” y “Encuentra tu inspiración”, con sus iconos, y la fila de pies del hero.
9. Etiqueta “EL UNIVERSO ZZAAY” sobre el video.
10. Botón flotante circular de pausa.
11. Fila “TU HISTORIA, EN UNA PIEZA DE 11 OZ.” y su texto complementario.

También se retiró “05 / SIGAMOS CREANDO” para mantener el mismo criterio entre secciones. Los nodos se eliminaron de los componentes y se limpiaron sus estilos obsoletos.

## Acomodo

Los títulos y las fotos suben al desaparecer las filas anteriores. Se retiraron sus márgenes y bordes de cabecera, se centró el breve texto que queda bajo el video y se añadió un separador directo entre la composición del footer y el copyright.

En escritorio de 1440 px, el inicio de los titulares pasó de 122 a 61 px en trabajos y de 62 a 32 px en pedidos, medidos desde el inicio de cada sección. El footer pasó de 468 a 397 px de altura. En móvil de 390 px, el footer pasó de 568 a 395 px.

El espacio liberado en la cabecera de categorías se aprovecha con 32 px más de altura de fotografía en el pin. Se comprobó que las acciones y el progreso siguen dentro de la ventana en 1280 × 800, 1440 × 1000 y 1920 × 1080.

Las imágenes conceptuales se identifican ahora en la descripción de personalización, sin una cabecera independiente. Las escenas, fotografías originales, logo, video y datos del negocio se mantienen.

## Video

El video no tiene etiqueta ni controles flotantes. Su superficie permite pausar/reanudar mediante clic, toque o Espacio al enfocarla con el teclado; el foco es visible. Se conservan el bucle, el póster, la pausa fuera de pantalla y el modo de movimiento reducido sin descarga del MP4.

## Archivos

Componentes: `Hero.tsx`, `Personalization.tsx`, `Categories.tsx`, `Work.tsx`, `Orders.tsx` y `Footer.tsx`, en `src/components/`.

Estilos: `src/styles.css` y `src/components/PremiumSections.css`.

Validación y documentación: `tests/site.spec.ts`, `README.md`, `DESIGN.md`, `docs/personalization-preview.md` y este archivo.

## Validación

- `npm run build`: correcto.
- `npm run test:e2e`: **12/12 correctas en Chromium**; incluye clic sobre video y reanudación por teclado, navegación, scroll inverso, foco de categorías, galería, formulario y movimiento reducido.
- Comprobación de ausencia de los textos y contenedores retirados.
- Seis tamaños: 320 × 740, 390 × 844, 768 × 1024, 1024 × 700, 1440 × 1000 y 1920 × 1080. Sin desbordamiento horizontal ni errores de ejecución.
- Capturas revisadas de hero, personalización, trabajos, pedidos y pie en escritorio y móvil, y categorías con pin.
- Hashes de once archivos de recursos/datos/animación preservados.
- Evidencias y medidas: `.qa/ui-cleanup/`, excluidas de Git.

La revisión se hizo en Chromium. No incluye dispositivos físicos ni Safari/Firefox.
