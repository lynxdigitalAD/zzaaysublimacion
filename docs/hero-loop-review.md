# Fundido integrado en el bucle del hero

## Edición

Las tres resoluciones del MP4 incluyen un fundido de medio segundo. La página conserva un solo reproductor y su composición actual. No cambian estilos, textos, pósteres, fondo difuminado ni enlaces. El original conserva su SHA-256 `4773899f7d757b93ab306adc68bf5abf90dfd7cd479453abfcd91157ae9e74a8`.

El original contiene 121 fotogramas a 24 fps. Se conserva el tramo 12–108 y se mezcla la cola 109–120 con el comienzo 0–11 durante 12 fotogramas, desde cola pura hasta comienzo puro. Al repetir, el final continúa con el fotograma 12. El resultado tiene 109 fotogramas, 4.541667 s; mantiene la velocidad. Se usan `trim`, `setpts`, `blend` y `concat`. [Filtros de FFmpeg](https://ffmpeg.org/ffmpeg-filters.html#blend-1).

| Variante | Resolución | Duración | Bytes |
| --- | --- | --- | --- |
| `film.mp4` | 3008 × 1280 | 4.541667 s | 8,599,421 |
| `film-medium.mp4` | 1920 × 818 | 4.541667 s | 3,688,504 |
| `film-mobile.mp4` | 1280 × 544 | 4.541667 s | 1,719,148 |

Se conserva H.264, yuv420p, 24 fps, ausencia de audio y faststart. Durante el fundido se mezclan dos imágenes, incluida la taza: puede percibirse una leve superposición. No hay generación por IA, interpolación de movimiento ni filtro de color. El manifiesto registra `loopCrossfade` y mantiene `seamlessLoopVerified: false`, pues no se certifican trayectorias de pétalos perfectamente continuas.

## Implementación

`scripts/prepare-hero.mjs` procesa desde el original, prepara las variantes fuera de `public/`, comprueba su número de fotogramas y después sustituye los MP4 completos. Conserva los pósteres existentes y actualiza los dos manifiestos. `heroVideoRevision`, en `src/data/hero.ts`, se incluye en las URLs y en la clave del elemento para cargar la edición nueva.

WebKit en Windows se pausaba al reiniciar tanto el archivo anterior como el editado, incluso en una etiqueta de video mínima. Se añadió una recuperación en `seeked`, solo cerca del inicio, con hero visible, pestaña activa y sin pausa manual. Se limpia al desmontar. No hay temporizador permanente ni segundo video. La prueba de regresión verifica que una pausa automática se recupera y que las pausas manuales o fuera de pantalla se conservan.

Reproducir el procesamiento: `npm run media:hero`. Para comparar sin fundido: `npm run media:hero -- --no-crossfade`; después volver a ejecutar el comando habitual y recargar la página. Las copias anteriores de las exportaciones quedan en `.qa/hero-loop/before/` para revisión local. El original del usuario no se sustituye.

## Verificación y límites

- Compilación de TypeScript/Vite correcta y 30 pruebas E2E de Chromium correctas.
- 15 pruebas del hero correctas en Chrome, Edge y WebKit: entrada, movimiento reducido, fuentes, duración, controles, fallo de carga y recuperación del bucle.
- Tres reinicios naturales por variante a 390, 1440 y 1920 px, comprobados en Chromium, Chrome y Edge. En WebKit se comprueban por separado: tres reinicios por variante y reproducción activa después del último seek. No se dispone de Safari/iPhone ni Android físicos.
- Se comparan los fotogramas de origen, extremos y puntos intermedios del fundido. En una medición auxiliar de la variante móvil, reducida a 376 × 160 y luminancia de 8 bits, la diferencia media absoluta entre final e inicio baja de 20.995 a 3.144, aproximadamente un 85 %. Es un indicador entre imágenes, no un porcentaje de mejora visual percibida.
- Hashes de 111 archivos revisados: cambian solamente `Hero.tsx`, `src/data/hero.ts`, tres MP4 y dos manifiestos dentro del conjunto medido. Se conservan el original, los tres pósteres y todos los estilos. También se actualizan el script de exportación, las pruebas y esta documentación.

Capturas y registros en `.qa/hero-loop/`, excluida del control de versiones. Los registros de compatibilidad anteriores corresponden al video de 5.041667 s y a sus hashes de entonces; los valores vigentes están en `public/media/hero/restored/manifest.json`.
