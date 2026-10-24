# Sublimación y Diseño Zzaay

Nueva página editorial en español de México, desarrollada en esta carpeta con React, Vite, TypeScript, GSAP/ScrollTrigger y CSS. Conserva los tres archivos de skills y los recursos originales del usuario.

## Publicación

Página pública: **[https://lynxdigitalad.github.io/zzaaysublimacion/](https://lynxdigitalad.github.io/zzaaysublimacion/)**. Repositorio público [lynxdigitalAD/zzaaysublimacion](https://github.com/lynxdigitalAD/zzaaysublimacion), rama `main`. La publicación utiliza GitHub Pages y GitHub Actions. `npm run build:pages` compila para `/zzaaysublimacion/`; el desarrollo local conserva `/`. Cada push de código a `main` vuelve a compilar y publicar; los cambios exclusivamente en README o documentación no disparan otro despliegue. [Configuración, validación y estado del despliegue](docs/publicacion-github-pages.md).

## Desarrollo local

```powershell
npm install
npm run dev
```

Abrir **http://127.0.0.1:5174/**. El puerto 5173 corresponde al proyecto utilizado como referencia. El servidor nuevo utiliza puerto estricto para evitar abrir accidentalmente otra página.

`npm run dev` escucha ahora en `0.0.0.0:5174` para permitir acceso desde la red local. La IPv4 activa detectada es `192.168.101.4`, por lo que el enlace para otro equipo es **http://192.168.101.4:5174/**. Se comprobaron HTTP, recursos y actualización automática por ambas direcciones desde el equipo de desarrollo; falta confirmar la conexión desde la segunda computadora. La dirección procede de DHCP y puede cambiar. [Configuración, comprobaciones y límites de acceso entre módem y repetidor](docs/acceso-red-local.md).

Al recargar, la landing vuelve inmediatamente arriba: antes de renderizar se desactiva la restauración de scroll y se elimina el fragmento de sección de esa entrada del historial, conservando la ruta y los parámetros. Los enlaces entre secciones y la entrada inicial mediante un enlace directo mantienen su comportamiento.

```powershell
npm run build
npm run preview
npm run test:e2e
```

La vista de producción se sirve en **http://127.0.0.1:4174/**. No se ha publicado el sitio.

## Contenido y funciones

- Hero a sangre con el MP4 restaurado entregado, título y descripción superpuestos, reproducción automática silenciosa, bucle, pausa/reanudación al tocar el video y póster de respaldo.
- Navegación por secciones y menú móvil.
- Selector de personalización con tres escenas completas generadas desde cero: frase, recuerdo y marca de ejemplo. Cada opción cambia imagen y descripción.
- Cinco imágenes conceptuales nuevas generadas con `image_gen`, optimizadas a WebP.
- Categorías con un único pin horizontal desde 1000 × 800 px. Hasta 768 px se recorren deslizando el dedo en un carrusel horizontal nativo; las ventanas intermedias y el escritorio con movimiento reducido usan una rejilla vertical.
- Galería con las mismas tres escenas conceptuales en escritorio y móvil, generadas a partir del diseño existente, con selección y ampliación accesible. Las fotografías originales se conservan como archivos de origen.
- Preguntas frecuentes con controles nativos.
- Formulario que valida la cantidad y prepara el mensaje; la persona lo envía desde WhatsApp.
- Redes sociales en el pie, debajo del contacto de WhatsApp: «Sublimación y Diseño Zzaay» y «Sublim Zzaay», con el usuario `@sublimzzaay`. Los nombres, imágenes y destinos se editan en `src/data/business.ts`.

Se retiraron el rótulo visible de conceptos de categorías y la frase «Pronto sumaremos nuevas historias». La barra y el contador de categorías permanecen en el recorrido horizontal; fuera de él se elimina la fila vacía. Las redes sociales se presentan debajo de WhatsApp, con filas de enlaces separadas por líneas finas y apertura en una pestaña nueva. Utilizan los logotipos originales a color descargados de los paquetes oficiales de Meta y TikTok, conservados sin modificaciones en `public/assets/icons/brands/`. Fuentes, archivos y SHA-256: `docs/social-brand-assets.json`. Los símbolos se muestran a 36 px; los nombres a 18 px y el usuario a 16 px, con controles de al menos 76 px de alto.

Los nombres de las cuentas se verificaron en el título y metadatos públicos de Facebook y en la respuesta oEmbed del perfil de TikTok; sus fuentes se registran en `docs/social-profile-names.json`. La revisión de redes cubrió siete anchuras entre 320 y 1920 px, sin desbordamientos ni errores de carga. Los destinos se comprobaron mediante clics en un navegador de prueba, interceptando la carga externa. Capturas y mediciones en `.qa/social-profiles/`. Compilación y 16 pruebas E2E correctas. La verificación de perfiles se limita a sus nombres públicos.

Las preguntas frecuentes aparecen antes de «Hagamos algo muy tuyo». El enlace «Hagamos algo tuyo» del encabezado conserva su línea inferior y utiliza el símbolo verde oficial de WhatsApp; el botón «Platiquemos por WhatsApp» del formulario usa el mismo recurso. Revisión en Chromium a 1440, 390 y 320 px, sin desbordamientos; compilación y 16 pruebas E2E correctas. Capturas y mediciones locales en `.qa/faq-whatsapp/`. Safari, Firefox y dispositivos físicos siguen pendientes.

El enlace «Platiquemos de tu idea» del menú desplegable también muestra el símbolo oficial verde de WhatsApp, de 24 px, en lugar de la flecha. Hasta 768 px, «Las primeras preguntas» comparte exactamente tamaño y altura de línea con «De aquí. Con mucha historia.»: título de 29–38 px, rótulo «Antes de crear» de 12 px, preguntas y respuestas de 16 px y separación de 20 px entre introducción y acordeón. La introducción se alinea con la de la galería. Se revisaron capturas a 320, 390, 768, 769 y 1440 px, con respuestas abiertas, sin desbordamiento; la captura de escritorio a 1440 px coincide con la anterior. Compilación y las 29 pruebas E2E correctas. Evidencia local en `.qa/mobile-faq-menu/`; la revisión se limita a Chromium.

Datos editables: `src/data/business.ts`, `src/data/premiumDesign.ts` y `src/data/workScenes.ts`. Estilos generales: `src/styles.css`; cuatro composiciones editoriales: `src/components/PremiumSections.css`. Animación y navegación: `src/animation/`. Especificación visual: `DESIGN.md`. Revisión de la referencia: `docs/reference-review.md`.

En el pie, WhatsApp está centrado sobre el conjunto de perfiles: queda arriba de Facebook y TikTok, formando la composición solicitada cuando los dos perfiles se muestran en columnas. Los tres enlaces comparten un contenedor para conservar el mismo eje aunque cambie la anchura. Se comprobó el centrado en 320, 390, 1024, 1280, 1440 y 1920 px, con una diferencia medida de 0 px y sin desbordamiento. Compilación correcta; capturas y medidas en `.qa/footer-whatsapp-centered/`.

## Entrada del hero y microinteracciones de personalización

El contenido HTML del hero tiene una entrada inicial de 1.7 s: rótulo, primera línea, cursiva y descripción. La navegación a una sección completa la entrada pendiente; volver al inicio o cambiar el ancho no la reinicia. El hero conserva su versión sin botones. El video y sus pósteres mantienen sus archivos, encuadre y reproducción existentes.

Personalización usa un crossfade de 350 ms entre las tres imágenes originales, un cambio de texto de 350 ms con desplazamiento máximo de 6 px y, en escritorio, un subrayado deslizante de 300 ms. En móvil, el selector utiliza botones con iconos y fondo vino para la opción activa. La copia aparece una sola vez al entrar, con 12 px de desplazamiento en 600 ms; la fotografía se revela solo mediante opacidad en 650 ms. Las imágenes se decodifican cerca de la vista y se muestran junto a su texto cuando están listas; las selecciones anteriores pendientes se descartan. La rejilla de textos conserva espacio para la descripción más larga sin cortar contenido. En movimiento reducido se muestra el contenido directamente.

En la entrega del hero y personalización se completaron la compilación y 22 pruebas E2E. Se revisó Chromium a 320, 390, 768, 1024, 1440 y 1920 px, sin desbordamientos ni cambios de altura al alternar opciones; también se compararon 29 archivos para comprobar el alcance de esa entrega. Capturas y grabación de la interfaz en `.qa/cinematic-microinteractions/`. [Archivos, secuencias y límites de validación](docs/cinematic-microinteractions-review.md).

## Apariciones suaves al recorrer la página

Los títulos, textos, fotografías y grupos de controles se revelan una vez al entrar en pantalla. La cobertura incluye los pasos de personalización, categorías, galería, preguntas, pedidos y contacto. Los bloques de texto suben 12 px en 600 ms; fotografías y logotipo aparecen mediante opacidad en 650 ms. Al volver hacia arriba permanecen visibles. El hero conserva su entrada existente y sigue sin botones.

`useScrollReveals` combina IntersectionObserver con GSAP para conservar el scroll nativo y detectar también las categorías dentro del recorrido horizontal. El foco de teclado muestra inmediatamente el grupo de controles correspondiente. En movimiento reducido todo aparece directamente; cambiar de preferencia o tamaño no vuelve a ocultar contenido ya mostrado. El CSS base mantiene el contenido visible y los observadores, listeners y animaciones se limpian al desmontar.

Compilación y 25 pruebas E2E correctas, incluyendo apariciones durante el scroll móvil, permanencia al regresar, foco de teclado y cambios de preferencia de movimiento. Revisión visual adicional en Chromium a 390 × 844 y 1440 × 1000 px, sin desbordamiento y sin transformaciones de las fotografías. Capturas y mediciones en `.qa/scroll-reveals/`. Safari, Firefox y dispositivos físicos siguen pendientes.

## Legibilidad de categorías, trabajos y pedidos

Las frases bajo Cumpleaños, Bodas, Comuniones, Regalos y Empresas se muestran a 20 px en todas las ventanas. El recorrido horizontal reserva más altura para estas leyendas y sus saltos de línea. En la galería, el párrafo de la historia usa 20 px, el título de la fotografía principal 20 px y los nombres completos bajo las miniaturas 18 px. La nota «Tres vistas de una sola pieza…» usa 18 px y aparece arriba de la línea inferior, dentro de la sección de trabajos.

En «Hagamos algo muy tuyo», la introducción usa 20 px y los textos del formulario, la cotización y el aviso de WhatsApp 18 px; los matices de etiqueta opcional usan 16 px. Entre 951 y 1299 px las ocasiones se distribuyen en tres columnas para conservar sus etiquetas completas. El botón permite que su texto ocupe varias líneas en ventanas estrechas.

Compilación y 16 pruebas E2E correctas. Después de alinear las miniaturas se repitieron el build y la prueba de galería. Se comprobaron siete ventanas entre 320 × 740 y 1920 × 1080 px; la nota queda encima de la línea y las frases de categorías y controles permanecen dentro del espacio visible, incluido el pin a 1000 × 800 px. Capturas y medidas en `.qa/readability-v2/`. [Detalle de la revisión](docs/readability-v2-review.md).

## Layout móvil

La revisión con `ui-ux-pro-max` organiza las composiciones en una columna hasta 768 px. A 390 px hay márgenes laterales de 24 px, 56 px de espacio vertical de sección y separaciones de 24–32 px entre grupos; los pasos usan 32 px y el pie 40 px. Por debajo de 375 px, el margen lateral se reduce a 20 px. La franja separa sus dos frases con la taza al centro, en tres filas compactas.

La nueva referencia móvil reorganiza la personalización hasta 768 px: título y párrafo centrados, botones unidos con iconos propios de conversación, foto y negocio, fotografía completa y descripción en un panel rosa debajo. La ficha mide como máximo 400 px y se acerca al borde con márgenes mínimos de 8 px. El título escala de 29 a 44 px, el párrafo y las descripciones usan 16 px y el título de la ficha 18 px. Los botones tienen al menos 52 px de alto, etiquetas de 14–16 px y estado activo vino. Se conservan los tres recursos originales y sus textos, transiciones y avisos accesibles. [Detalle de la composición móvil](docs/mobile-personalization-review.md).

La compilación y las 25 pruebas E2E completaron correctamente esta revisión. Se midieron trece anchuras entre 320 y 1920 px, sin desbordamientos ni botones recortados. Se alternaron las tres opciones a 320 y 390 px sin cambiar la altura de la sección. Las capturas de personalización y franja desde 769 px coinciden exactamente con las anteriores al ajuste. Capturas y mediciones en `.qa/mobile-personalization/`.

Los pasos continúan dentro de la misma personalización. En móvil, una flor entre líneas finas sustituye el separador y precede al título «Así de fácil. Tu idea en una taza.». Las tres tarjetas presentan numeración circular, iconos, texto sobre un panel crema de borde curvo y una escena de taza a la derecha. Las imágenes fueron generadas con `imagegen` y se identifican como escenas conceptuales; no representan trabajos entregados. Los originales están en `design-assets/process-scenes/`, las versiones WebP de 360 y 720 px en `public/media/process-scenes/`, y los prompts y hashes en `docs/process-generations.json`. Se reproducen las conversiones con `npm run media:process`. En escritorio permanece el listado anterior y no se descargan estas tres imágenes.

El ajuste de pasos se revisó en trece anchuras entre 320 y 1920 px, con todos los textos dentro de sus tarjetas. Las posiciones y tamaños de escritorio coinciden con la referencia previa en seis anchuras desde 769 px. Compilación correcta y 25 pruebas verificadas: 24 pasaron en el conjunto inicial y la prueba de recursos se repitió correctamente después de ajustar el archivo transparente de respaldo. Vista y mediciones en `.qa/mobile-process/`; [detalle de los pasos móviles](docs/mobile-process-review.md).

Pedidos utiliza la composición móvil compacta de la nueva referencia: cinco ocasiones circulares en una fila desde 375 px y dos filas centradas en ventanas menores. La cantidad ocupa su propia fila antes de la etiqueta y el campo de idea. El encabezado, la selección, el resumen y el botón utilizan acentos azules. El menú tiene espacio entre enlaces y desplazamiento nativo si la pantalla es baja. Los perfiles sociales conservan su ubicación debajo de WhatsApp.

Compilación y 16 pruebas E2E correctas; las cinco pruebas relacionadas con móvil, ocasiones, teclado y cambios de viewport se repitieron después del último ajuste. Se revisaron 13 anchuras entre 320 y 1440 px, incluyendo 390 px y ambos lados de los cambios en 480 y 768 px, sin desbordamientos ni etiquetas recortadas. También se comprobó el menú a 844 × 390 px. Capturas y mediciones locales: `.qa/mobile-layout/`; [detalle de la revisión](docs/mobile-layout-review.md). La revisión utiliza Chromium; Safari, Firefox y dispositivos físicos siguen pendientes.

## Categorías táctiles en móvil

Hasta 768 px, «El momento lo eliges tú» presenta sus cinco categorías en una fila horizontal. Se recorren con el dedo en ambos sentidos, sin botones de siguiente/anterior, flechas de navegación ni avance automático. Un borde de la siguiente imagen queda visible para indicar que hay más contenido. Cada ficha se alinea al soltar el gesto; las fotos se muestran completas y conservan sus textos y enlaces de personalización.

El desplazamiento es nativo y permite seguir bajando por la página desde las imágenes. No se capturan eventos de touch o wheel. El carrusel admite foco de teclado y muestra completa la categoría cuyo enlace recibe el foco. Al cambiar al diseño de escritorio se limpia el desplazamiento horizontal nativo para conservar el pin de ScrollTrigger. En móvil con movimiento reducido sigue siendo un recorrido manual, con todo el contenido visible y sin animaciones añadidas.

A 390 px la sección pasa de aproximadamente 3257 a 868 px de alto, una reducción del 73 %. Se comprobaron once anchuras entre 320 y 1920 px, sin desbordamientos y con todos los textos dentro de las fichas; las dimensiones del escritorio coinciden con las anteriores en cuatro anchuras. Compilación y 27 pruebas E2E correctas, incluidas pruebas de gestos táctiles emulados en ambos sentidos, scroll vertical, foco, movimiento reducido y cambios entre móvil y escritorio. Capturas y mediciones en `.qa/mobile-carousel/`; [detalle de la revisión](docs/mobile-carousel-review.md). Safari, Firefox y dispositivos físicos siguen pendientes.

## Scroll horizontal de categorías en laptops

La sección «El momento lo eliges tú» ahora activa su recorrido horizontal en escritorio desde **1000 × 480 px** de ventana útil, para que funcione en laptops a zoom normal. Entre 480 y 799 px de alto se ajustan las imágenes y espacios para mantener visibles título, frases, controles y progreso. Las ventanas más bajas y el movimiento reducido conservan contenido estático; el carrusel táctil móvil permanece operativo. Compilación y 38 pruebas E2E correctas. [Causa, corrección y validación del scroll en laptops](docs/category-laptop-scroll-review.md).

## Hero con el video restaurado

El bloque que iba de «Ideas que se vuelven realidad» a «Y otros que, además, se sienten» se sustituyó por la composición de la nueva referencia: video de fondo, título blanco/rosa a la izquierda y descripción. Por petición posterior se eliminaron los enlaces Crear mi taza / Ver trabajos y sus estilos. La franja inferior vigente dice «Tu idea. Tu estilo.» / «Una taza. Mil momentos.», con ondas rosas en los extremos y una taza pequeña entre líneas finas.

La franja utiliza un fondo vectorial propio y el símbolo Coffee de Phosphor Regular, conservado en `public/assets/icons/interface/coffee.svg` e integrado en el sprite. El antiguo recurso de pincelada se conserva como original de una versión anterior. Los textos se editan en `src/data/premiumDesign.ts`. [Revisión de la franja](docs/editorial-strip-review.md).

El original nuevo se conserva en `design-assets/hero/Zzaay_Higgsfield_original_restaurado_3008x1280.mp4`: 3008 × 1280, 24 fps, 5.041667 s, sin audio. Los archivos web están en `public/media/hero/restored/`: versiones de 3008, 1920 y 1280 px de ancho, con sus pósteres. Por petición posterior incorporan un fundido circular de 12 fotogramas (medio segundo) dentro de cada MP4: el ciclo pasa a 109 fotogramas y 4.541667 s, conservando velocidad y resoluciones. El original y los tres pósteres no cambian. El fundido mezcla los extremos y puede mostrar una breve superposición; no equivale a generar trayectorias continuas de pétalos.

En escritorio, un encuadre CSS y un degradado dejan espacio al texto. Hasta 800 px, el hero usa una ventana de video de 100vw de alto, limitada a 560 px, y una transición continua hacia el texto mediante una máscara vertical y una continuación difuminada de la misma escena. El fondo reutiliza el póster existente, con los pétalos visibles bajo el texto, desenfoque de 14 px y degradado oscuro para conservar la lectura. No hay una línea ni un bloque separado entre ambos. Se recorta parte de la escenografía según la ventana, conservando visible la taza en las vistas comprobadas. En movimiento reducido se muestra el póster y no se solicita MP4.

El ajuste móvil sigue la referencia vertical entregada: taza protagonista, título blanco/rosa y texto sobre una continuación oscura del ambiente. El panorama del video original se conserva; no se regeneraron ni deformaron sus fotogramas. Se revisaron doce anchuras entre 320 y 1920 px; las capturas del hero desde 801 px coinciden exactamente con las anteriores al ajuste. A 390 px se inspeccionaron los fotogramas de 0.05, 2.5 y 4.8 s, con taza y asa completas. Compilación y 25 pruebas E2E correctas. [Detalle del hero móvil](docs/mobile-hero-review.md).

La corrección posterior del difuminado sustituye el ambiente radial por un recorte del mismo póster detrás del texto, con pétalos y formas de la escena desenfocados. Se conserva exactamente la geometría de video y textos en ocho anchuras entre 320 y 1440 px, y las capturas de escritorio desde 801 px coinciden. Los diez archivos protegidos de componente, animación y recursos mantienen sus hashes. Compilación y 29 pruebas E2E correctas; capturas y mediciones en `.qa/mobile-hero-background/`. La comprobación utiliza Chromium; Safari, Firefox y dispositivos físicos siguen pendientes.

Reproducir solamente estos recursos: `npm run media:hero`. Para comparar sin fundido: `npm run media:hero -- --no-crossfade`. Requiere FFmpeg y FFprobe; admite `FFMPEG_PATH`, `FFPROBE_PATH` y `HERO_SOURCE_PATH`. Procedencia, hashes y parámetros del fundido: `public/media/hero/restored/manifest.json`. Se preparan y comprueban las tres variantes antes de sustituir los archivos servidos. [Revisión del fundido y repetición](docs/hero-loop-review.md); composición inicial en `docs/hero-overlay-review.md`.

El hero utiliza una revisión en la URL del video para cargar los archivos nuevos y mantiene un solo reproductor. En el WebKit disponible se verificó una pausa nativa al reiniciar, también presente con el video anterior: se reanuda después del seek de bucle únicamente si el hero está visible, la pestaña activa y la persona no lo pausó. El listener se elimina al desmontar y se conserva movimiento reducido sin video. Compilación, 30 pruebas E2E de Chromium y 15 pruebas del hero en Chrome/Edge/WebKit correctas; se comprobaron tres repeticiones de las tres resoluciones en los cuatro navegadores disponibles.

## Legibilidad y densidad

La revisión de escritorio amplía la descripción de personalización a 22 px, los títulos del selector a 22 px, su cuerpo a 21 px y las opciones a 20 px. En móvil, la composición de referencia utiliza los tamaños descritos en Layout móvil. El paso 03 dice: «Plasmamos tu diseño para que cada detalle hable de ti». El pie incorpora el emblema oficial grande a la izquierda, con una exportación transparente de 640 px y visualización de hasta 320 px. [Revisión del pie y tipografía de escritorio](docs/footer-typography-review.md).

Se corrigieron las cinco capturas indicadas por el usuario. En escritorio grande, la separación vertical de las secciones pasó de 140 a 56 px; en tabletas es de 48 px y hasta 768 px de 56 px tras la revisión móvil. El contenedor creció de 1440 a 1640 px. Los textos auxiliares tienen un mínimo de 14 px; la navegación y los controles principales, 16 px; las descripciones, 17–18 px. Se eliminaron las variantes responsive de texto a 6–11 px.

El selector de ideas utiliza una composición tipográfica con subrayado activo y cambia entre tres imágenes conceptuales. El marco no incluye rótulos, pie de foto ni enlace de contacto; en la ventana más estrecha se retira la numeración de las opciones para conservar sus etiquetas. El enlace alternativo de la consulta aparece solo después de preparar el mensaje y se elimina al editar los datos. La galería horizontal aprovecha la altura disponible, conservando fotografías completas. Los resultados de revisión están documentados en `docs/readability-review.md`; las capturas y mediciones permanecen en `.qa/`, fuera del control de versiones.

## Rediseño editorial y recursos nuevos

Se corrigieron pedidos, personalización, franja editorial y pie. A 1440 px, pedidos pasó de 682 a 526 px de alto; el marco de personalización se mantiene en un máximo de 480 px de ancho; el titular del pie se redujo un 28 %. Se retiraron los asteriscos decorativos y los iconos dibujados a mano.

Se generaron seis recursos con image_gen: cinco ilustraciones transparentes para ocasiones y una pincelada editorial. Los originales están en `design-assets/premium/`; los archivos servidos, en `public/assets/icons/occasions/` y `public/assets/decorations/`. Prompts y procedencia: `docs/premium-generations.json`. Los iconos funcionales son exportaciones finales de Phosphor y Simple Icons guardadas en `public/assets/icons/interface/`, con licencias y fuentes documentadas. No se añadieron dependencias.

Para reproducir las conversiones de los recursos nuevos: `npm run media:premium`. Utiliza FFmpeg y admite `FFMPEG_PATH`. No altera los productos reales.

El [reporte completo](docs/premium-review.md) incluye archivos modificados, todos los recursos, auditoría de símbolos, medidas, pruebas y límites. La última revisión cubre nueve ventanas entre 320 y 1920 px, sin desbordamientos ni texto menor de 14 px. Las capturas se conservan en `.qa/`, excluidas de Git.

## Vistas de personalización

Las opciones Una frase, Un recuerdo y Mi marca cambian entre tres escenas completas creadas desde cero con image_gen. Cada imagen tiene taza, estampado, fondo, materiales, iluminación y composición propios. Se generaron únicamente a partir de texto, sin aportar fotografías de referencia. El marco contiene solo la imagen y las muestras están identificadas como diseños conceptuales.

Originales: `design-assets/personalization-scenes-v2/`. Exportaciones WebP: `public/media/personalization-scenes/`. Prompts y procedencia: `docs/personalization-generations.json` (versión 2). Conversión: `npm run media:personalization`. El [reporte del selector](docs/personalization-preview.md) registra archivos, recursos y validación en cinco anchuras. Las fotografías auténticas y el logo oficial se conservan.

## Limpieza de rótulos y enlaces

Se retiraron los elementos de las once capturas: rótulos numerados de secciones, enlaces secundarios señalados, fila Sigue explorando y textos/controles flotantes del hero. Se cerraron las filas y márgenes que ocupaban para subir el contenido. El video se pausa o reanuda al hacer clic, tocarlo o usar Espacio sobre su superficie enfocada. Las escenas conceptuales se identifican en la descripción de personalización.

Compilación y 12 pruebas E2E correctas. Se revisaron seis ventanas entre 320 y 1920 px, sin desbordamientos. [Detalles y archivos](docs/ui-cleanup.md).

## Recursos y procedencia

La galería limita la foto principal a 480 px. Sus dos miniaturas intercambian la fotografía seleccionada en el mismo espacio, actualizando título y contador; la ampliación permanece disponible desde la foto principal. En móvil, el texto precede a la foto y las miniaturas quedan debajo.

La fotografía con su marco se retiró del pie. El emblema oficial se presenta grande a la izquierda y el nombre completo sigue centrado en su bloque. El contacto del pie utiliza el SVG verde del paquete oficial de [WhatsApp / Meta](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/), conservado sin cambios de color ni geometría. Procedencia y SHA-256: `docs/whatsapp-brand-asset.json`. Revisión vigente: `docs/footer-typography-review.md`; revisión anterior de galería: `docs/gallery-footer-review.md`.

El logo procede de `LOGO SIN FONDO.png`, sin recortar ni alterar sus colores. El video inicial se conserva en la raíz y el restaurado vigente, en `design-assets/hero/`. Las tres fotografías reales se copiaron del proyecto de referencia y mantienen los píxeles y el diseño impreso originales. El manifiesto completo está en `public/media/manifest.json`.

Los cinco originales generados están en `design-assets/concepts/`. Los prompts completos y la herramienta utilizada se guardan en `docs/image-generation-prompts.json`. Las imágenes son conceptos de inspiración, identificados como tales en la página; no se presentan como trabajos entregados.

Para reproducir conversiones:

```powershell
npm run media:prepare
```

Se necesita FFmpeg con `libwebp` y `libx264`. El script acepta `FFMPEG_PATH`; en esta computadora encuentra también la herramienta local de `../Zzaay-Web/.tools/ffmpeg.exe`. Las fotografías auténticas se recuperan desde `../Zzaay-Web/public/media/main-photography` si esa carpeta existe. Una vez copiadas, la página y la compilación no dependen del proyecto vecino. Se conservan fuentes y licencias tipográficas dentro de las dependencias y se reproducen los avisos en `docs/licenses/`.

## Validación realizada

La matriz actual incluye Chromium, Google Chrome, Microsoft Edge y WebKit: **115 pruebas correctas, ninguna fallida y una omisión** correspondiente al arrastre táctil CDP de WebKit. Se corrigieron el retorno del foco de la galería y el acceso inicial por teclado; las pruebas de animación y video consideran las diferencias verificadas de los motores. `npm run build` y `npm run test:e2e -- --config playwright.compat.config.ts` terminan correctamente. Para repetir esta matriz se puede usar `npm run test:compat`; el comando E2E habitual conserva Chromium.

La versión compilada también pasa 48 revisiones de layout entre 320 y 1920 px en los cuatro navegadores, incluida orientación horizontal, y cuatro recorridos móviles con toques a 390 × 844 px. No se detectan desbordamientos ni texto recortado en las mediciones. Firefox, Safari/macOS/iPhone y Android físicos permanecen fuera de la verificación; el arrastre táctil real de WebKit requiere otro entorno. [Resultado actual, diferencias de las pruebas y límites reales](docs/browser-compatibility-review.md). Los registros de fases anteriores que siguen describen sus verificaciones originales.

Compilación de TypeScript y Vite, y 27 pruebas E2E de Chromium: regreso al inicio tras recargar desde una sección o desde scroll manual, en escritorio, móvil y movimiento reducido; recorrido de categorías en ambos sentidos; navegación por enlaces; foco de categorías fuera de pantalla; reproducción, pausa y suspensión del video restaurado; respaldo ante un fallo del MP4; selector de ideas con tres diseños diferentes y marco estable; intercambio de vistas, ampliación y teclado de galería; validación y contenido de la consulta; menú móvil; ausencia de desbordamiento horizontal; modo de movimiento reducido sin descarga de MP4; creación/limpieza del pin al cambiar el viewport; salto al contenido; preguntas frecuentes; carga de imágenes y errores de navegador; ocasiones por teclado; conservación del borrador y limpieza del enlace alternativo; límites de la foto, opciones de personalización y etiquetas de ocasiones en ventanas estrechas. También se verifican la entrada del hero, las transiciones y carga del selector, y los revelados generales durante el scroll, al regresar, al enfocar controles y al cambiar la preferencia de movimiento. El carrusel móvil incorpora pruebas de gestos táctiles hacia ambos lados, desplazamiento vertical desde las imágenes y transiciones de viewport con navegación por teclado.

Se revisaron capturas de escritorio y móvil. La matriz de pruebas y revisión responsive incluyó ventanas de 320 × 740, 390 × 844, 844 × 390, 1024 × 700/768, 1280 × 800, 1440 × 1000 y 1920 × 1080, sin desbordamiento horizontal en las comprobaciones realizadas. Esto no constituye una prueba en Safari/iPhone, Firefox o dispositivos físicos; esas comprobaciones permanecen pendientes.

## Centrado del pie y menú de escritorio

El título del cierre, WhatsApp y la fila de Facebook/TikTok comparten un mismo eje central desde 769 px. Las redes se apilan hasta 1299 px para conservar completos los nombres. Sus enlaces y recursos originales se mantienen. El menú de escritorio y «Hagamos algo tuyo» pasan de 16 a 18 px; el menú móvil conserva sus tamaños anteriores.

Se elimina «Escenas conceptuales basadas en las tres vistas de nuestro diseño.» junto con el párrafo, sus márgenes y su línea. La galería conserva la identificación conceptual en la ficha, los textos alternativos y la ampliación. No queda un bloque vacío en su lugar.

Compilación y 29 pruebas de Chromium correctas. La revisión de doce anchuras entre 320 y 1920 px no detecta desbordamiento ni texto recortado; los enlaces se conservan y los centros coinciden con menos de 0.01 px de diferencia. El encabezado móvil coincide con el anterior y las medidas internas del pie móvil permanecen iguales. El retiro de la nota reduce la galería unos 66 px a 390 px y 87 px en escritorio.

La revisión adicional de WebKit 27.2 en Windows obtiene 23 pruebas correctas de 28: quedan cinco comprobaciones por investigar, sobre tiempo de entrada, foco al cerrar la galería, navegación por Tab y simulación del fallo del video. El gesto táctil por CDP no se ejecuta en ese motor. Las comprobaciones de layout de esta entrega pasan en WebKit a 320, 390, 1280, 1440 y 1920 px. Firefox no pudo iniciarse en este entorno (`spawn UNKNOWN`); Safari y Chrome en teléfonos físicos no se han probado. No se declara compatibilidad universal ni equivalencia entre WebKit de pruebas y Safari real. [Detalle y límites](docs/footer-navigation-review.md).

## Galería móvil compacta

Hasta 768 px, «De aquí. Con mucha historia.» utiliza la nueva composición de la referencia: texto compacto, imagen horizontal redondeada, indicadores, título y contador, y tres miniaturas fijas con borde en la seleccionada. Las referencias de vista quedan alineadas al final de las tres columnas. La ampliación muestra la misma vista y permite cerrar con Escape, recuperar el foco y navegar con teclado.

Las tres escenas nuevas se generaron con `image_gen` integrado a partir de las fotografías existentes y el ambiente cálido de la referencia. Se identifican como conceptuales en la sección, los textos alternativos y el diálogo; no se presentan como fotografías de un trabajo entregado. Los originales generados se conservan en `design-assets/work-mobile-scenes/`, las versiones WebP en `public/media/work-mobile-scenes/` y los prompts, referencias y hashes en `docs/work-mobile-generations.json`. Las exportaciones se reproducen con `npm run media:work-mobile`. Estas mismas imágenes se utilizan también en escritorio, incluida la ampliación; las fotografías anteriores permanecen archivadas.

La sección pasa de unos 1287 a 816 px de alto a 390 px. Se revisaron doce anchuras entre 320 y 1920 px, sin desbordamiento ni texto recortado; las capturas desde 769 px coinciden con las anteriores en cinco anchuras. La compilación y las 29 pruebas E2E pasaron; tras el ajuste final de alineaciones se repitieron la compilación y las dos pruebas de galería móvil. [Detalle de la revisión y límites](docs/mobile-work-review.md); capturas y mediciones en `.qa/mobile-work/`.

## Pedidos móviles con acento azul

Hasta 768 px, «Hagamos algo muy tuyo» adopta un encabezado con la escena conceptual existente «Haz que hoy cuente» a la derecha, ocasiones circulares dentro de un panel y formulario en una sola columna. El resumen y la nota de cerámica tienen marcos independientes. La cursiva del título, la selección y su palomita, el resumen y el botón de WhatsApp usan azul; el símbolo oficial de WhatsApp se muestra verde. Los datos, validación y mensaje preparado se conservan al cambiar de tamaño.

Las cinco ocasiones se muestran juntas desde 375 px, con espacio suficiente para sus nombres completos y controles de al menos 44 px. En ventanas menores se distribuyen en dos filas. Los campos usan 16 px; las etiquetas principales, 14 px; el aviso de precio, 13 px; y las referencias de ocasión y la explicación final, 12 px. El contenedor mide como máximo 480 px y tiene márgenes de 16 px. A 390 px, la sección pasa de unos 1595 a 917 px de alto, aproximadamente un 43 % menos.

Compilación correcta y cinco pruebas dirigidas aprobadas tras el ajuste de etiquetas. Se revisaron trece anchuras entre 320 y 1920 px, sin desbordamiento ni nombres recortados. También se comprobó el formulario a 390 × 844 px con movimiento normal y reducido, teclado, cantidades inválidas, datos del mensaje y cambios de breakpoint. Las capturas desde 769 px coinciden con las anteriores en cinco anchuras. [Detalle de la revisión](docs/mobile-orders-review.md); capturas y mediciones en `.qa/mobile-orders/`.

## Pie móvil según la referencia

Hasta 768 px, el cierre presenta el logotipo oficial centrado sobre «Las buenas ideas merecen una taza», seguido de WhatsApp, dos botones amplios de redes sociales, el nombre del negocio y su ubicación, copyright y retorno al inicio en una pastilla. Usa fondo crema cálido, separadores finos y superficies claras con esquinas redondeadas. El contenido tiene un máximo de 420 px y márgenes de 20 px; el logo mide 184–216 px, el título 30–38 px y el teléfono 24–28 px. Los nombres y el usuario de redes usan 14 px. Los botones sociales tienen al menos 60 px de alto y el retorno al inicio, 44 px.

Se conservan los cinco enlaces, sus nombres accesibles, destinos, apertura y atributos: logo al inicio, WhatsApp, Facebook, TikTok y retorno al inicio. Los iconos originales de marca mantienen su proporción y color; las flechas de redes se representan como cheurones en móvil. Las fotografías y otros recursos permanecen en sus secciones. En 390 px, el cierre pasa de aproximadamente 1005 a 763 px de alto.

Compilación y 29 pruebas E2E correctas. La revisión de Chromium cubrió once anchuras entre 320 y 1920 px, sin desbordamiento ni texto recortado; los enlaces coinciden con los anteriores en todas ellas y las capturas desde 769 px coinciden exactamente en cinco anchuras. Capturas y mediciones locales en `.qa/mobile-footer/`. Safari, Firefox y dispositivos físicos siguen pendientes.

## Títulos unificados y azules compartidos

Los títulos principales desde personalización hasta el cierre comparten el tamaño y la altura de línea de «Hagamos algo muy tuyo». La escala se centraliza en `--section-title-size` y `--section-title-leading`: 42–62 px en escritorio, 44 px entre 769 y 950 px y 27–38 px en móvil. A 1440 px todos miden 59.04 px; a 390 px, 32.37 px. El hero y el bloque de pasos «Así de fácil» mantienen sus reglas específicas y sus recursos.

Pedidos utiliza el mismo azul en todos los dispositivos: título, selección, palomita, resumen, foco, respuesta y botón de WhatsApp. La franja «Tu idea. Tu estilo. Una taza. Mil momentos.» cambia sus acentos, taza, líneas y ondas a azul. La galería comparte las tres imágenes generadas y su identificación conceptual entre escritorio y móvil; sus datos editables están en `src/data/workScenes.ts`.

Compilación y 29 pruebas E2E correctas, incluidas selección y ampliación de galería, conservación de la vista al cambiar de tamaño y ausencia de solicitudes de fotografías antiguas. Se revisaron ocho anchuras entre 320 y 1920 px, sin títulos recortados ni desbordamiento. El pin de categorías se comprobó hacia delante y atrás a 1000 × 800, 1280 × 800, 1440 × 1000 y 1920 × 1080 px; los títulos coinciden con pedidos y la sección cabe en las ventanas revisadas. [Detalle y límites](docs/shared-headings-blue-review.md); evidencia local en `.qa/shared-heading-blue/`.

## Límites y pendientes reales

- El prompt inicial pedía 8 segundos, 16:9 y hasta 4K. El original restaurado es **3008 × 1280, 24 fps, 5.041667 segundos, sin audio**; los MP4 servidos integran ahora un fundido y duran 4.541667 segundos. Las exportaciones mantienen la relación de origen; su encuadre visible se adapta por CSS. No se ha generado otro clip con IA ni se certifican trayectorias perfectamente continuas entre sus extremos.
- Los precios, fechas de entrega, disponibilidad y forma de recepción se confirman por WhatsApp. No se inventan importes ni compromisos.
- El formulario no envía información a un servidor y no confirma pedidos ni realiza cobros. La apertura real de WhatsApp requiere que la persona continúe en ese servicio; en las pruebas se interceptó la URL para comprobar el mensaje sin enviarlo.
- La galería incluye únicamente escenas generadas del diseño disponible, identificadas como conceptuales en escritorio y móvil. Las fotografías de origen siguen archivadas. Se podrán añadir más trabajos autorizados cuando existan.
- La generación de imágenes está registrada; sus originales son archivos estáticos, no un servicio activo del sitio.
- No se han añadido tienda, pasarela de pago, analítica, cuentas, servicios externos ni despliegue.

`node_modules`, `dist`, capturas, resultados y trazas de pruebas están excluidos mediante `.gitignore`.
