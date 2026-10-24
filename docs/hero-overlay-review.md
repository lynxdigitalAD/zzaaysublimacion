# Hero con video restaurado

## Alcance

Se sustituyó el bloque superior, desde «Ideas que se vuelven realidad» hasta «Y otros que, además, se sienten», por una composición basada en la referencia entregada: video a sangre, titular blanco/rosa a la izquierda, descripción y dos enlaces.

La franja Tu idea / Tu historia / Tu taza / Muy tú conserva su componente, estilos y recursos. Las demás secciones comerciales permanecen en su lugar. No se incorporaron las funciones de carrito/buscador ni las afirmaciones de envíos de la referencia.

## Video y procedencia

- Original entregado: `C:/Users/jjair/Downloads/Zzaay_Higgsfield_original_restaurado_3008x1280.mp4`.
- Copia conservada: `design-assets/hero/Zzaay_Higgsfield_original_restaurado_3008x1280.mp4`.
- SHA-256: `4773899f7d757b93ab306adc68bf5abf90dfd7cd479453abfcd91157ae9e74a8`.
- Metadatos comprobados con FFprobe: H.264, 3008 × 1280, 24 fps, 5.041667 segundos, sin audio.
- Se inspeccionaron cinco fotogramas, uno por segundo, para el encuadre. Se usó el video proporcionado sin regenerar taza, fondo ni estampado.
- Exportaciones H.264 de 3008 × 1280 (9.17 MiB), 1920 × 818 (3.83 MiB) y 1280 × 544 (1.76 MiB), más sus pósteres WebP. Las variaciones mínimas de proporción en las versiones menores corresponden al redondeo a dimensiones pares.
- Sin interpolación, cambios de velocidad ni filtros creativos. No se certifica continuidad perfecta entre el último fotograma y el primero.
- Fuente, variantes, dimensiones y hashes en `public/media/hero/restored/manifest.json`, también referenciados por el manifiesto general.
- Reproducción del procesamiento: `npm run media:hero`. El flujo general `npm run media:prepare` llama al mismo script.

## Composición e interacción

En escritorio, la toma se encuadra con desplazamiento horizontal y un degradado oscuro. La taza queda a la derecha del texto. El recorte afecta la escenografía; el archivo exportado mantiene el panorama de origen.

Hasta 800 px, el video utiliza una ventana centrada 4:3 y el texto se dispone debajo dentro del hero. En las ventanas más estrechas, los botones se acomodan en dos filas. Los controles conservan tamaño táctil y etiquetas legibles.

Crear mi taza lleva a Personalización; Ver trabajos lleva a la galería. Ambos utilizan la navegación existente y mueven el foco a la sección correspondiente. El área libre del video mantiene pausa/reanudación mediante clic, toque y Espacio. El video se suspende fuera de pantalla o al ocultar la pestaña. La preferencia de movimiento reducido muestra solamente el póster, sin pedir MP4. Un fallo de video conserva el póster y deja utilizables texto y enlaces.

## Verificación

- `npm run build`: TypeScript y Vite correctos.
- `npm run test:e2e`: 13 pruebas de Chromium correctas, incluidas las acciones nuevas, fallo del MP4, pausa/reproducción, navegación entre secciones, scroll inverso de categorías, teclado, móvil y movimiento reducido.
- Revisión responsive: 1920 × 1080, 1672 × 1000, 1440 × 1000, 1024 × 768, 844 × 390, 768 × 1024, 390 × 844 y 320 × 740. Se comprobaron los límites de titular y botones, además del ancho del documento.
- Revisión de reproducción real y fotogramas a 0, 2.5 y 4.5 s en escritorio grande, escritorio intermedio y móvil.
- Capturas y mediciones en `.qa/hero-overlay/`, fuera del control de versiones.
- La copia del original se contrastó por SHA-256 con el archivo de Descargas.

No se ha probado en Safari, Firefox o dispositivos físicos. No se añadieron dependencias ni se publicó el sitio.
