# Pedidos móviles con acento azul

## Composición

La referencia del usuario se aplica a «Hagamos algo muy tuyo» hasta 768 px. El encabezado combina título e introducción a la izquierda con la escena conceptual existente «Haz que hoy cuente» a la derecha. Sus degradados separan la imagen del texto. No se generó una fotografía nueva ni se presenta esta decoración como un trabajo entregado; la procedencia del recurso está en `docs/personalization-generations.json` y la ruta editable en `src/data/premiumDesign.ts`.

El selector de ocasión es un panel con cinco ilustraciones circulares. Desde 375 px se muestran en una sola fila; por debajo, en dos filas centradas de tres y dos opciones. Las columnas reservan espacio para los nombres completos de Cumpleaños y Comuniones. Hay al menos 8 px entre controles y 44 px de ancho de interacción. «Tengo otra idea» conserva su radio nativo, con representación visual propia y estado azul.

El formulario continúa con cantidad, etiqueta de idea, campo de texto, resumen enmarcado, aviso de cerámica y precio, y botón de WhatsApp. El contenedor tiene un máximo de 480 px y márgenes de 16 px. Las separaciones principales son de 10–16 px. La cantidad y el botón tienen alturas mínimas de 44 y 52 px. Los campos usan 16 px; la introducción y las etiquetas, 14 px; el aviso, 13 px; y los nombres de ocasión y el texto final, 12 px. En 320 px el título baja a 27 px para conservar espacio junto a la imagen.

## Color

- Cursiva «muy tuyo», resumen, foco y estados de respuesta: `#a1cdff`.
- Círculo seleccionado: fondo `#354a64` y borde `#a1cdff`.
- Palomita: fondo `#326eb8`, símbolo claro y borde azul claro.
- Botón principal: fondo `#c4deff`, texto `#173b66` y variación azul al pasar el puntero.
- WhatsApp: recurso oficial verde existente, sin recolorear.

La misma paleta se utiliza ahora en pedidos tanto en escritorio como en móvil. La franja editorial también utiliza acentos azules; su actualización y la escala compartida de títulos se documentan en `docs/shared-headings-blue-review.md`.

## Función y accesibilidad

Se mantienen el formulario semántico, los radios agrupados, las etiquetas visibles, el resumen accesible y la validación nativa de cantidad entera positiva. El selector usa el teclado de los controles nativos. La idea sigue siendo opcional. Los valores se conservan al pasar entre móvil y escritorio, y el enlace alternativo de WhatsApp se limpia cuando cambia un dato.

La acción prepara el mismo mensaje con ocasión, cantidad e idea. No se han añadido cobros, servicios ni envío automático. La comprobación intercepta `window.open` para verificar la URL sin enviar mensajes.

## Validación y límites

Compilación correcta. Se ejecutó la suite E2E existente y, tras corregir el ancho de las etiquetas, pasaron las cinco pruebas dirigidas de formulario, ocasiones, revelado móvil y movimiento reducido. La revisión adicional a 390 × 844 px comprobó las cinco ocasiones, teclado, cantidad inválida, mensaje con doce tazas y texto personalizado, radio alternativo, limpieza del estado preparado y conservación de valores al cambiar de breakpoint, tanto con movimiento normal como reducido.

Se revisaron capturas y medidas de Chromium a 320, 360, 374, 375, 390, 430, 600, 768, 769, 950, 1024, 1440 y 1920 px. No hay desbordamiento de página ni etiquetas recortadas. Las capturas y medidas desde 769 px coinciden exactamente con las anteriores en cinco anchuras. En 390 px, la sección pasa de aproximadamente 1595 a 917 px de alto, una reducción del 43 %.

Capturas y mediciones locales: `.qa/mobile-orders/`. La prueba se limita a Chromium; Safari, Firefox y dispositivos físicos siguen pendientes.
