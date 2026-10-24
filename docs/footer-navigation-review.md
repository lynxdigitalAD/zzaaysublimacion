# Centrado del pie, navegación y retiro de la nota de galería

La tabla de pendientes de esta revisión inicial es histórica. Las cinco comprobaciones ya se resolvieron; la matriz posterior termina con 115 pruebas correctas y una omisión de gesto CDP en WebKit. Consultar el [resultado actual y sus límites](browser-compatibility-review.md).

## Cambios

- Desde 769 px, el título del cierre se centra y el contenedor de contactos usa márgenes automáticos. WhatsApp queda centrado sobre el conjunto de redes. Hasta 1299 px, las redes usan una columna para evitar el recorte del nombre o usuario.
- La navegación de escritorio y su contacto pasan de 16 a 18 px. Los tamaños del menú desplegable móvil conservan 16 px para enlaces y 14 px para su contacto.
- Se elimina el párrafo de procedencia debajo de la galería, su dato y sus dos reglas CSS. La ficha conserva «TAZA DE 11 OZ · ESCENAS CONCEPTUALES», además de las identificaciones en alt y diálogo. Las pruebas existentes de galería verifican ahora esa ficha.

## Validación de los cambios

`npm run build` y `npm run test:e2e`: compilación correcta y 29 pruebas correctas en Chromium 156.0.8078.4.

Capturas y mediciones de Chromium a 320, 390, 768, 769, 950, 951, 1024, 1190, 1191, 1280, 1440 y 1920 px. No se detectan desbordamiento horizontal ni textos recortados. Los centros de título, contactos, WhatsApp y redes difieren menos de 0.01 px. Los destinos, nombres y cantidad de enlaces se mantienen. El encabezado móvil coincide con su captura anterior; las medidas internas del pie móvil también coinciden. Las capturas del pie presentan diferencias de rasterizado por su nueva posición vertical tras retirar la nota: no se usan como evidencia de igualdad binaria.

La galería reduce su altura 65.59 px a 390 px, 45.30 px a 768 px y 86.69 px desde 769 px, manteniendo su separación normal respecto de la siguiente sección.

WebKit 27.2: revisión específica de layout a 320, 390, 1280, 1440 y 1920 px sin desbordamiento ni errores JavaScript, con los centros coincidentes, navegación de escritorio de 18 px y nota eliminada.

## Compatibilidad: límites y pendientes

La suite existente se ejecutó adicionalmente en WebKit en Windows: **23 correctas y 5 fallidas**, sin modificar código del hero o su motor para esta comprobación. Se excluyó una prueba de gestos CDP porque esa interfaz es propia de Chromium.

| Comprobación pendiente | Resultado observado |
| --- | --- |
| Tiempo de entrada del hero | 2868 ms frente al máximo esperado de 2400 ms; requiere distinguir carga del entorno y comportamiento de animación. |
| Retorno del foco tras ampliar en móvil | El diálogo cierra, pero el botón que lo abrió no queda enfocado. |
| Retorno del foco tras ampliar en escritorio | Misma diferencia de foco al cerrar. |
| Simulación de MP4 fallido | La interceptación no deja la clase `is-ready` en el estado esperado; no se ha confirmado si falla el respaldo o la simulación de red de ese motor. |
| Primer Tab hacia el salto al contenido | El enlace no recibe foco en la secuencia esperada de la prueba. |

Firefox no llegó a ejecutar pruebas: tanto el ejecutable actualizado como el anterior fallaron al arrancar con `browserType.launch: spawn UNKNOWN`. No se atribuye ese error a la página.

No se han probado Safari/iOS ni Chrome/Android en dispositivos físicos, versiones antiguas, navegadores integrados de redes sociales ni todas las combinaciones de sistema operativo. WebKit en Windows no es una certificación de Safari. La adaptación responsive revisada y la compilación correcta no equivalen a compatibilidad al 100 %.

Capturas, mediciones y trazas locales: `.qa/footer-nav-refinement/`.
