# Continuación móvil de los tres pasos

El usuario solicita sustituir el listado 01–03 en móvil por la estructura de su captura, manteniéndolo dentro de personalización. Se conserva el contenido de los tres pasos y la versión de escritorio.

## Composición

`PersonalizationProcess.tsx` presenta un contenedor de continuación, sin una sección o fondo nuevo. Hasta 768 px muestra una flor entre líneas finas, el título «Así de fácil. Tu idea en una taza.» y tres tarjetas. Cada tarjeta incluye numeración circular, icono, título, descripción y una imagen a la derecha; el panel crema tiene un borde curvo. La composición mide como máximo 400 px, con 16 px entre tarjetas, títulos de 18 px y descripciones de 14 px.

Los textos proceden de `src/data/business.ts` y no cambian. La presentación y recursos nuevos están en `src/data/processScenes.ts`. Los estilos se acotan a `.site-root` y al contenedor de personalización. El revelado durante el scroll, el desplazamiento nativo y el movimiento reducido conservan sus comportamientos.

## Recursos

Se utiliza la herramienta integrada `imagegen`, una llamada independiente por cada escena, para generar tres conceptos: taza con foco, taza con corazón y taza con ilustración de Tulancingo. Los originales se copian a:

- `design-assets/process-scenes/idea.png`
- `design-assets/process-scenes/juntos.png`
- `design-assets/process-scenes/taza.png`

Los prompts completos, la procedencia, las rutas y los hashes SHA-256 se guardan en `docs/process-generations.json`. `npm run media:process` genera WebP de 360 y 720 px en `public/media/process-scenes/`. Solo se aplican reducción de tamaño y compresión; los originales se conservan. Las tres versiones pequeñas suman aproximadamente 69 KiB; las grandes, 171 KiB.

Son escenas conceptuales y sus textos alternativos lo indican. La introducción conceptual de personalización sigue presente. Estas imágenes no se añaden a la galería de trabajos reales ni se presentan como fotografías de pedidos entregados.

La flor, el foco y los destellos se dibujan como SVG originales en `ProcessSymbol.tsx`. El icono de WhatsApp reutiliza el símbolo existente del sitio. No se añaden dependencias, servicios externos ni nuevas generaciones de video.

Los recursos de las tarjetas se seleccionan mediante `picture` solo hasta 768 px. La variante de escritorio utiliza un archivo transparente de respaldo y oculta las imágenes, evitando descargar las escenas móviles.

## Validación

- Compilación de TypeScript y Vite correcta.
- 25 pruebas verificadas: 24 correctas en la ejecución del conjunto y la de carga de recursos repetida con éxito tras sustituir el respaldo de datos por un SVG servido localmente.
- Revisión a 320, 360, 375, 390, 430, 600, 768, 769, 801, 950, 1024, 1440 y 1920 px, sin desbordamiento y con todos los textos dentro de las tarjetas.
- Las siete anchuras móviles solicitan y decodifican las tres imágenes correctas. Ninguna de las seis anchuras de escritorio solicita las escenas nuevas.
- Las posiciones y tamaños de título, imagen principal, descripción y listado de escritorio coinciden con la versión anterior a 769, 801, 950, 1024, 1440 y 1920 px.
- Comparación de 17 archivos protegidos de componentes, datos y recursos originales, sin cambios.
- Revisión visual de tarjetas a 320, 390 y 768 px. La vista de entrega en 390 px utiliza movimiento normal y comprueba que el revelado termina antes de la captura.
- Capturas y mediciones en `.qa/mobile-process/`, fuera del control de versiones.

La verificación utiliza Chromium. Safari/iPhone, Firefox y dispositivos físicos siguen pendientes. No se publica el sitio.
