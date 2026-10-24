# Corrección de legibilidad y espacio

Revisión de las cinco capturas proporcionadas por el usuario: transición entre hero y personalización, categorías y trabajos, trabajos y pedidos, pedidos y preguntas, preguntas y contacto. Se contrastaron con la página ejecutándose en Chromium.

Se consultaron las [Web Interface Guidelines de Vercel](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) para revisar contenedores flex/grid, manejo del texto, foco y controles. La corrección se centró en los problemas de espacio y legibilidad señalados por el usuario.

## Cambios aplicados

- `src/styles.css:27` — contenedor de 1640 px; mejor aprovechamiento del ancho en pantallas grandes.
- `src/styles.css:28` — separación vertical de 56 px; se retiró el aumento a 140 px.
- `src/styles.css:29` — etiquetas y notas con mínimo de 14 px.
- `src/styles.css:32` — descripciones de 18 px y longitud de línea más aprovechable.
- `src/styles.css:57` — navegación de 16 px; menú móvil desde anchuras menores de 951 px.
- `src/styles.css:94` — hijos de rejilla con `min-width: 0`; el texto no fuerza columnas fuera de la ventana.
- `src/styles.css:216` — contacto de WhatsApp en una fila propia.
- `src/styles.css:218` — enlace del mensaje preparado separado del contacto alternativo.
- `src/styles.css:341` — botones de intención en filas cuando no caben, conservando texto de 16 px.

Los pies de foto, números, notas conceptuales, etiquetas del formulario, mensajes de estado, preguntas y pie de página también aumentaron de tamaño. El texto de marca bajo la fotografía dejó de presentarse en un sello pequeño.

## Verificación

- Auditoría de nodos de texto: ningún texto renderizado por debajo de 14 px en ventanas de 320, 390, 900, 1024, 1280, 1440 y 1920 px de ancho. La comprobación aplica al texto HTML; el contenido impreso dentro de las fotografías y el emblema original se preservan.
- Sin desbordamiento en los contenedores de personalización, selector, formulario y contacto a 320, 390, 900, 1024, 1280 y 1920 px.
- Capturas revisadas de escritorio, móvil y categorías a 1280 × 800, 1440 × 1000 y 1920 × 1080.
- Diez pruebas E2E de Chromium aprobadas: navegación, avance/retroceso del pin, teclado, video, formulario, galería, móvil y movimiento reducido.

La separación de las secciones grandes se redujo un 60 % (140 → 56 px). La distancia de scroll de la galería depende del ancho de sus fotografías y no equivale a espacio vacío entre secciones.
