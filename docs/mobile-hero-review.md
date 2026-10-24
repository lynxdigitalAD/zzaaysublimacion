# Hero móvil continuo

Se adapta únicamente el hero de hasta 800 px a la referencia vertical enviada por el usuario. El encabezado, la franja siguiente y las demás secciones conservan su composición. El hero sigue sin botones de llamada a la acción.

## Composición

- Video centrado con `object-fit: cover`, ventana de 100vw de alto y máximo de 560 px. Se conserva la proporción de la imagen; el recorte afecta a la escenografía lateral.
- Máscara en el último 12 % de la ventana y continuación fotográfica difuminada sobre tinta oscura. El fondo reutiliza el póster de la misma escena, con un recorte que prioriza los pétalos y el ambiente del primer plano, desenfoque de 14 px y un degradado oscuro para conservar la lectura. La transición sustituye la separación entre video y texto.
- Texto HTML sobre ese ambiente, con un solape de 4 px y sin recortar su contenido. Margen lateral adaptable de 24 a 48 px; título de 48 a 82 px y descripción de 18 a 20 px.
- Reproducción, pausa por toque o teclado, póster de respaldo y preferencia de movimiento reducido conservan su funcionamiento. La animación inicial del texto también se conserva.

La referencia y el video original tienen composiciones diferentes. Se reproduce su organización y continuidad visual usando el panorama disponible; no se presenta como una recreación exacta de los píxeles de la referencia.

## Archivos

El cambio visual se limita a las reglas móviles de `src/styles.css`. README, DESIGN y la descripción del encuadre en el manifiesto y su script se actualizan para reflejarlo. No se reprocesan los recursos multimedia.

## Validación

- `npm run build`: correcto.
- `npm run test:e2e`: 25 pruebas de Chromium correctas, incluyendo móvil, reproducción, fallo de video, navegación, scroll inverso, teclado y movimiento reducido.
- Mediciones a 320, 360, 375, 390, 430, 600, 768, 800, 801, 1024, 1440 y 1920 px: sin desbordamiento horizontal y con todo el texto dentro del hero.
- Comparación exacta de capturas del hero en movimiento reducido a 801, 1024, 1440 y 1920 px: sin diferencias respecto a la versión anterior.
- Se comparan hashes de 22 archivos de componentes, animaciones y recursos protegidos: sin cambios.
- Revisión visual de móvil a 320 y 390 px, de tableta a 768 px y de fotogramas reales de video a 0.05, 2.5 y 4.8 s en 390 px: taza y asa completas, con impresión intacta.
- En movimiento reducido no se solicitan MP4. Capturas y mediciones locales en `.qa/mobile-hero/`, fuera del control de versiones.

La validación utiliza Chromium. Safari/iPhone, Firefox y dispositivos físicos siguen pendientes.

## Corrección posterior del fondo

El usuario pidió que la escena siguiera siendo reconocible, difuminada detrás del texto, en lugar de usar únicamente manchas de color. La corrección sustituye los gradientes radiales del pseudo-elemento móvil por el póster existente `poster-mobile.webp`, ampliado de manera uniforme y recortado hacia los pétalos. El desenfoque se limita a esta capa decorativa; la imagen y el video nítidos conservan su encuadre y sus archivos. La capa utiliza el póster estático, sin duplicar ni sincronizar otro video.

El cambio afecta únicamente a `.hero::before` dentro del breakpoint existente de hasta 800 px. La máscara del video, el degradado oscuro, las letras, sus tamaños, el espaciado, la altura del hero y los controles se mantienen. No hay nuevos recursos multimedia ni dependencias. El póster usado como fondo es el mismo que ya carga la vista móvil.

Se compararon 320, 390, 430, 768, 800, 801, 1024 y 1440 px: todas las posiciones, tamaños y textos coinciden con los valores anteriores, sin desbordamiento. Las capturas desde 801 px coinciden exactamente. También coinciden los hashes de diez archivos protegidos: componente, estilos de entrada, datos, animación, tres videos y tres pósteres. La compilación y las 29 pruebas E2E pasaron; las capturas y datos están en `.qa/mobile-hero-background/`.
