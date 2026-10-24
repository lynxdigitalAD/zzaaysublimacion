# Galería móvil compacta

Actualización posterior: las mismas tres escenas también se utilizan en escritorio. El tamaño de los títulos se centraliza en la escala de pedidos; los datos editables están en `src/data/workScenes.ts`. El detalle de esta revisión vigente está en `docs/shared-headings-blue-review.md`; las mediciones históricas que siguen corresponden a la primera composición móvil.

La referencia del usuario se aplica a «De aquí. Con mucha historia.» hasta 768 px. La sección conserva el título, la historia de Tulancingo y los tres nombres de vistas. Presenta una imagen principal horizontal con esquinas redondeadas, ampliación, tres indicadores informativos, título y contador, y tres miniaturas fijas en una fila. La seleccionada tiene borde vino y estado accesible. No hay avance automático ni controles de navegación junto a la imagen principal; las miniaturas cambian de vista.

El contenedor mide como máximo 480 px y tiene márgenes de al menos 12 px. El texto inicial se retranquea 26 px respecto de la imagen. El título utiliza 29–38 px, la introducción 16 px, la leyenda 14–15 px y la procedencia 14 px. Los títulos de las miniaturas usan 13 px y las referencias de vista 12 px. Todos los botones de miniaturas superan 44 × 44 px. Los datos de vista se alinean al final de las tres columnas, aunque los títulos ocupen distintas líneas.

## Recursos y procedencia

Se generaron tres escenas con `image_gen` integrado, usando cada fotografía original como base y la captura del usuario como referencia de ambiente. Las nuevas imágenes presentan un fondo dorado desenfocado, flores y la plataforma negra. Son composiciones generadas; algunos detalles impresos pueden diferir y no constituyen evidencia fotográfica de un pedido entregado.

Se identifican como «ESCENAS CONCEPTUALES» en los datos de la sección, en el texto alternativo, en la nota de procedencia y en el diálogo, tanto en escritorio como en móvil. No utilizan los rótulos «FOTOGRAFÍAS REALES» ni «tomadas de nuestra grabación original». Las fotos originales de `public/media/work/` permanecen intactas como recursos archivados y no se renderizan en la galería.

- Originales generados: `design-assets/work-mobile-scenes/`.
- Versiones WebP de 480 y 960 px: `public/media/work-mobile-scenes/`.
- Prompts completos, referencias, archivos y SHA-256: `docs/work-mobile-generations.json`.
- Conversión reproducible: `npm run media:work-mobile`, mediante FFmpeg y escalado uniforme.
- Datos editables: `src/data/workScenes.ts`.

La imagen principal utiliza una ventana 10:7; el recorte afecta al ambiente superior e inferior y conserva visible la taza y su asa. La ampliación muestra el recurso completo, con relación aproximada 5:4. Las miniaturas utilizan una ventana 4:3. No se modifican los archivos fotográficos originales ni los recursos de otras secciones.

## Validación

Se revisó Chromium a 320, 360, 375, 390, 430, 600, 768, 769, 950, 1024, 1440 y 1920 px. Las tres vistas cargan correctamente y no hay desbordamiento de página ni texto recortado. A 390 px, la sección pasa de 1287 a 816 px de alto, aproximadamente un 37 % menos. Las capturas y posiciones desde 769 px coinciden exactamente con la versión anterior en cinco anchuras.

La compilación y las 29 pruebas E2E pasaron. Las dos pruebas nuevas cubren selección táctil, estado y contador, ampliación de la misma escena, navegación del diálogo, Escape y retorno del foco; además, teclado, movimiento reducido y cambios de breakpoint en ambos sentidos. El conjunto anterior sigue verificando scroll, navegación, categorías y galería de escritorio. Tras alinear las referencias de miniatura y ajustar la leyenda a 320 px se repitieron la compilación y las dos pruebas de galería móvil.

Capturas y mediciones locales: `.qa/mobile-work/`. La comprobación utiliza Chromium; Safari, Firefox y dispositivos físicos siguen pendientes.
