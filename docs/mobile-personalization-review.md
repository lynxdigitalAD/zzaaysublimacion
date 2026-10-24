# Personalización móvil y franja compacta

Se aplica la referencia enviada por el usuario a la composición de hasta 768 px: franja de tres filas, encabezado e introducción centrados, selector con iconos, imagen completa y frase debajo. Se conserva la aclaración final del usuario: la descripción sí debe permanecer bajo la imagen.

## Implementación

- La franja reduce sus separaciones a 2 px, su relleno vertical a 12 px y la taza a 24 px. Sus textos, curvas rosas y recurso original se conservan.
- El título de personalización ocupa las dos líneas de la referencia. La ficha tiene un ancho máximo de 400 px y márgenes mínimos de 8 px.
- Los botones Una frase, Un recuerdo y Mi marca forman un selector unido. Cada uno mide al menos 52 px de alto, con un icono vectorial de 19 px y etiqueta de 14–16 px. La selección usa fondo vino y texto claro, además del estado accesible `aria-pressed`.
- `IdeaIcon.tsx` contiene los tres iconos SVG propios. Son decorativos junto a las etiquetas y no se anuncian por separado. No se descargan recursos remotos ni se añaden dependencias.
- La descripción se renderiza una sola vez. CSS Grid la coloca bajo la imagen en móvil y en la columna izquierda en escritorio. Un revelado suave muestra el bloque al entrar en pantalla.
- Las tres imágenes existentes se muestran completas con `object-fit: contain`, sin recortes, regeneraciones ni deformaciones. Los tamaños declarados en `sizes` corresponden al nuevo ancho móvil.
- Se conservan la decodificación antes del cambio, el crossfade, las selecciones rápidas, la gestión de errores, la altura estable y el movimiento reducido. El selector conserva su subrayado en escritorio.
- Los pasos mantienen su contenido y sus márgenes laterales anteriores.

## Validación

- `npm run build`: correcto.
- `npm run test:e2e`: 25 pruebas de Chromium correctas.
- Revisión de geometría a 320, 360, 375, 390, 430, 600, 768, 769, 801, 950, 1024, 1440 y 1920 px: sin desbordamientos, con etiquetas e iconos dentro de sus controles.
- En las siete anchuras móviles, la descripción empieza exactamente después de la foto y el ancho de la imagen no supera 400 px.
- Las tres selecciones se comprueban a 320 y 390 px: imagen y texto correspondientes, sin cambios de altura.
- Las capturas completas de la sección y de la franja a 769, 801, 950, 1024, 1440 y 1920 px coinciden exactamente con la versión anterior en movimiento reducido.
- Se comparan 17 archivos protegidos, incluidos los seis recursos de personalización y los componentes ajenos al cambio: sin diferencias.
- Capturas y mediciones locales en `.qa/mobile-personalization/`, fuera del control de versiones.

La revisión visual incluye las tres fichas en 390 px. Safari, Firefox y dispositivos físicos siguen pendientes. No se modifica el hero ni se publica el sitio.
