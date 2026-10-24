# Compatibilidad: revisión completada en Windows

## Resultado

Compilación correcta y **115 pruebas E2E correctas, ninguna fallida y una omitida**. La ejecución final utiliza `npm run test:e2e -- --config playwright.compat.config.ts`; el acceso habitual a esta misma matriz es `npm run test:compat`. El comando `npm run test:e2e` conserva la suite predeterminada de Chromium.

| Navegador o motor | Versión comprobada | Correctas | Omitidas |
| --- | --- | --- | --- |
| Chromium | 156.0.8078.4 | 29 | 0 |
| Google Chrome instalado | 155.0.8059.85 | 29 | 0 |
| Microsoft Edge instalado | 155.0.4283.62 | 29 | 0 |
| WebKit para pruebas en Windows | 27.2 | 28 | 1 |

La omisión es la inyección de arrastres táctiles mediante CDP, disponible en Chromium, Chrome y Edge. No se reemplaza por eventos JavaScript artificiales en WebKit. Ese motor sí pasa las comprobaciones de navegación, teclado, scroll, selección y adaptación de categorías, así como los recorridos móviles con toques descritos abajo.

## Correcciones y diferencias resueltas

- La galería devuelve explícitamente el foco al botón que la abrió, con `preventScroll`, después del cierre nativo. Se comprueba Escape en móvil y escritorio, además del botón de cierre y el fondo exterior; las dos últimas vías también conservan la posición de scroll.
- El salto al contenido declara `tabIndex={0}`. Esto hace que el primer Tab lo alcance también en el WebKit disponible, donde un enlace sin ese atributo explícito se omite con la configuración nativa de teclado. Se verifica la activación con Enter y el foco en el contenido.
- La duración y el orden de la entrada del hero se comprueban con el reloj controlado de Playwright, sin cambiar la animación del sitio ni aumentar sus límites de tiempo. Así se elimina la interferencia de otros procesos sobre la medición de fotogramas. [API de reloj de Playwright](https://playwright.dev/docs/clock).
- En Windows, el MP4 de WebKit no aparece en los eventos ni en la interceptación de red de la página en este entorno. La prueba de fallo bloquea el recurso mediante una política `media-src 'none'` inyectada solo en el documento de prueba. Verifica que el video permanece sin datos y sin fuentes utilizables, que el póster carga y que la navegación funciona. Los otros motores conservan la prueba de aborto de red. No se añade esa política a la aplicación.
- El mismo WebKit informa inicialmente 1920 × 818 y después 1440 × 613 durante la reproducción en un elemento de 1440 px. La prueba admite el ancho del archivo o de la superficie nativa en Windows, manteniendo la verificación de fuente, proporción, reproducción, pausa y suspensión fuera de pantalla. FFprobe confirma que `film-medium.mp4` sigue siendo H.264 de 1920 × 818; su SHA-256 coincide con el manifiesto (`c2fe57a63a00a1ec8aae401e69f448245084d18bbec8d46733f7f4ed65da8a19`).

No se modifican la composición, tipografía, colores, recursos del hero ni su animación. Los cambios de la aplicación se limitan al foco de la galería y al atributo de teclado del salto al contenido. No se añaden dependencias.

## Revisión de la versión compilada

Se revisan **48 combinaciones** en `vite preview`, doce por cada navegador: 320 × 740, 390 × 844, 430 × 932, 768 × 1024, 800 × 1280, 801 × 1000, 844 × 390, 950 × 1000, 951 × 1000, 1024 × 768, 1440 × 1000 y 1920 × 1080.

No se detecta desbordamiento horizontal, texto recortado entre los elementos medidos ni errores de JavaScript. El último contacto del menú móvil queda accesible, también en horizontal. Movimiento reducido muestra el contenido sin video ni pins. Se utilizan perfiles móviles Pixel 7 e iPhone 13 en las ventanas estrechas; la emulación sigue ejecutándose en Windows. WebKit no informa puntos táctiles mediante `navigator.maxTouchPoints` en este entorno, por lo que ese valor no se toma como prueba de un dispositivo iOS real.

Se ejecutan además **cuatro recorridos a 390 × 844 con movimiento normal y toques**, uno por navegador, sobre la versión compilada: carga del video móvil, pausa y reproducción, menú, ampliación y cierre de galería con retorno del foco, navegación a pedidos sin ocultar su título bajo el encabezado, selección de Bodas y resumen de 12 tazas. Los cuatro pasan. No se envían mensajes externos.

Capturas de revisión a 390 y 1440 px en `.qa/browser-compatibility/responsive/`. Las capturas largas de secciones ocultan temporalmente el encabezado durante la captura para evitar que su posición sticky cubra el título; su geometría y navegación se comprueban antes. Informes de medición y recorridos en esa carpeta y `.qa/browser-compatibility/mobile-touch.json`. El informe de la suite está en `playwright-report/compatibility.json`; ambos directorios están excluidos del control de versiones.

## Límites reales

Firefox queda fuera por autorización expresa del usuario: los ejecutables no arrancan en este equipo (`spawn UNKNOWN`). Tampoco están disponibles Safari en macOS/iPhone, Android físico, versiones antiguas ni navegadores integrados de redes sociales. La prueba de arrastre táctil real de WebKit sigue requiriendo otro dispositivo o un entorno compatible.

Esta entrega completa las comprobaciones ejecutables disponibles; no certifica todas las combinaciones de navegador y sistema operativo. [Playwright distingue sus motores de prueba, navegadores instalados y perfiles de emulación](https://playwright.dev/docs/browsers).

Para repetir la matriz hacen falta los motores de Playwright (`npx playwright install chromium webkit`) y Chrome/Edge instalados en la máquina. No se instala ni modifica Firefox como parte de esta entrega.
