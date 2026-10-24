# Carrusel táctil de categorías

El usuario confirma que en móvil desea una categoría a la vez, recorrido mediante el dedo hacia ambos lados y sin botones de siguiente/anterior. Se sustituye el listado vertical hasta 768 px por un carrusel horizontal nativo. El recorrido de escritorio conserva el pin y los gestos de scroll existentes.

## Implementación

- `Categories.tsx` mantiene los cinco conceptos, sus leyendas, numeración y enlaces. El área desplazable recibe nombre accesible y foco de teclado solo en móvil.
- Las reglas móviles de `src/styles.css` utilizan una fila flex, `overflow-x: auto` y scroll snap. El ancho de ficha es el del viewport menos los márgenes laterales y 24 px, con límite de 400 px; queda una parte de la siguiente categoría visible. No se agregan controles de navegación ni temporizadores de avance.
- El espacio al final permite alinear también la última ficha al mismo margen. Las fotos mantienen `object-fit: contain` y su proporción original. Las descripciones conservan 20 px; por debajo de 375 px los nombres se muestran a 32 px para que quepan completos junto al enlace.
- No hay listeners de touch ni wheel. El navegador gestiona el gesto, la inercia y el desplazamiento vertical normal sobre el carrusel.
- `useMobileCollections.ts` limpia el offset horizontal nativo al cruzar el breakpoint. Sus listeners y el callback pendiente se limpian al desmontar; el foco de una categoría visible se conserva al cambiar de modo.
- `revealCollection` alinea el foco en el carrusel móvil y conserva el comportamiento del pin de escritorio. El nuevo modo no crea ScrollTriggers.
- Movimiento reducido mantiene las categorías disponibles mediante desplazamiento manual; se respetan los ajustes existentes que eliminan revelados, video y pins.

## Validación

- `npm run build`: correcto.
- `npm run test:e2e`: 27 pruebas correctas en una ejecución completa de Chromium.
- Dos pruebas nuevas usan un viewport táctil móvil. La primera envía gestos táctiles de Chromium: avanza a la segunda categoría, vuelve a la primera y desplaza verticalmente la página desde la foto. La segunda verifica foco, movimiento reducido, limpieza del offset y cambios entre 390 y 1440 px sin pins duplicados.
- Las pruebas existentes se actualizan para el nuevo orden horizontal y para recorrer las categorías antes de comprobar sus revelados.
- Medidas en 320, 360, 375, 390, 430, 600, 768, 769, 1024, 1440 y 1920 px: sin desbordamiento del documento, sin textos recortados y con fotos completas.
- Las cinco fichas se alinean correctamente al recibir foco en todas las anchuras móviles, incluida la última.
- La sección a 390 px pasa de 3256.8125 a 868.4375 px de alto, aproximadamente un 73 % menos. A 320 px pasa de 2933.03125 a 783.453125 px.
- En 769, 1024, 1440 y 1920 px con movimiento reducido, las dimensiones y posiciones coinciden con las anteriores. El recorrido normal de escritorio se comprueba en las pruebas de pin, avance, retroceso y navegación.
- Capturas del primer y último elemento y mediciones en `.qa/mobile-carousel/`, fuera del control de versiones.

Las comprobaciones táctiles se realizaron con emulación de Chromium, no con un teléfono físico. Safari/iPhone, Firefox y dispositivos físicos siguen pendientes. No se modifican imágenes ni se añaden dependencias o servicios externos.
