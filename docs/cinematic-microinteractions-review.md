# Hero y personalización: entrada y microinteracciones

23 de octubre de 2026. Implementación en la página local del puerto 5174.

## Resultado

El alcance se limita a la presentación HTML del hero y las interacciones de personalización. El hero conserva su versión sin botones, según la aclaración del usuario. GSAP y ScrollTrigger existentes ejecutan las animaciones; no se añadieron dependencias.

### Entrada del hero

| Elemento | Inicio | Duración | Desplazamiento inicial |
| --- | --- | --- | --- |
| Ideas que se vuelven realidad | 200 ms | 500 ms | 10 px hacia abajo |
| Tu idea. | 400 ms | 650 ms | 18 px hacia abajo |
| Hecha taza. | 700 ms | 650 ms | 18 px hacia abajo |
| Descripción | 1200 ms | 500 ms | 8 px hacia abajo |

La secuencia termina a los 1.7 s del montaje y utiliza opacidad y curvas de salida. Los bloques conservan sus posiciones en el flujo mientras se animan. El rótulo y las líneas completas se animan como unidades, sin subdividir letras. La altura del título coincide con la composición anterior en todas las ventanas medidas.

El video y el póster mantienen su comportamiento previo. Las animaciones no los incluyen entre sus objetivos. Autoplay, silencio, bucle, playsInline y controles de reproducción continúan funcionando. La navegación por enlaces internos completa una entrada pendiente y no la reinicia al regresar. Las entradas iniciales a otra sección muestran el hero directamente cuando se vuelve a él. Con movimiento reducido, sus textos son visibles de inmediato.

### Personalización

- Fotografías: crossfade de opacidad de 350 ms dentro del marco existente, sin transformaciones ni cambios de tamaño.
- Texto: salida de 100 ms con 4 px hacia arriba y entrada de 250 ms desde 6 px hacia abajo; una sola descripción visible a la vez.
- Selector: indicador deslizante de 300 ms, sin rebote. ResizeObserver y la carga de fuentes actualizan su posición. La reserva del peso de letra evita cambios de anchura al seleccionar; por debajo de 360 px se conserva el peso regular y la selección se distingue por color y subrayado, manteniendo las etiquetas completas a 18 px.
- Carga: las tres imágenes existentes se preparan cuando la fotografía se aproxima a 300 px del viewport. Una imagen nueva se decodifica antes de cambiar a su texto. Un contador de solicitudes descarta cargas que han sido sustituidas por otra selección.
- Interrupción: cada nueva selección cancela la transición anterior y parte del estado visual actual. Los controles permanecen operables durante carga y animación.
- Estabilidad: las descripciones ocupan una misma celda de rejilla y la más larga determina la altura natural. No hay alturas fijas que corten contenido. Las fotografías conservan las dimensiones actuales y `object-fit: contain`.
- Primera aparición: la copia entra una sola vez con 12 px de desplazamiento en 600 ms; la fotografía aparece mediante opacidad en 650 ms. Al retroceder por la página siguen visibles. El revelado existente de los tres pasos permanece a cargo del motor general.
- Accesibilidad: botones nativos, foco existente, estado `aria-pressed`, solo una imagen y descripción expuestas al lector, estado de carga mediante `aria-busy` y movimiento reducido sin desplazamientos ni fades animados.
- Fallo de una imagen: se conserva la pareja anterior de fotografía y texto, se informa el problema y las demás opciones siguen disponibles.

Los dos hooks limpian contextos y consultas de movimiento al desmontar; personalización también cancela timelines, observadores y cargas pendientes de actualizar estado. El montaje de desarrollo conserva React StrictMode.

## Archivos modificados o añadidos

| Archivo | Función |
| --- | --- |
| `src/components/Hero.tsx` | Marca las cuatro unidades HTML y conecta su hook |
| `src/animation/useHeroEntrance.ts` | Secuencia inicial y navegación sin repeticiones |
| `src/components/HeroMotion.css` | Permite transformar las líneas completas sin cambiar su composición |
| `src/components/Personalization.tsx` | Conecta selección, contenido preparado, indicador y estado accesible |
| `src/animation/usePersonalizationMotion.ts` | Carga, transiciones, revelado, indicador y cancelación |
| `src/components/PersonalizationMotion.css` | Estilos acotados a los nuevos estados de personalización |
| `tests/microinteractions.spec.ts` | Seis pruebas de las nuevas interacciones |
| `README.md` | Estado vigente y validación |
| `docs/cinematic-microinteractions-review.md` | Esta entrega |

## Validación

`npm run build`: correcto. `npm run test:e2e`: **22 pruebas correctas**: las 16 existentes y seis nuevas.

Las nuevas pruebas verifican el orden y tiempo de entrada del hero, ausencia de reinicio al navegar o redimensionar, un crossfade real entre imágenes, estabilidad de altura y controles, selecciones rápidas, una carga lenta sustituida, imagen fallida, teclado, indicador responsive, scroll inverso y cambio de preferencia de movimiento durante una transición. Las pruebas anteriores conservan cobertura de video, categorías fijadas, navegación, galería, formulario, menú móvil, recarga al inicio y ausencia de errores de ejecución.

La auditoría adicional mide 320, 390, 768, 1024, 1440 y 1920 px. No encontró desbordamiento horizontal, controles fuera de su grupo, transformaciones en video/fotografías ni diferencia de altura al cambiar entre las tres opciones. A 390 px, la fotografía mantiene 342 px de ancho y la sección conserva 1447.5625 px de altura en las tres opciones. El título del hero conserva su altura anterior: 122.34375 px a 390 px y 205.28125 px a 1440 px.

Se compararon SHA-256 de 29 archivos protegidos antes y después: componentes ajenos al alcance, ambos estilos generales, navegación y motor de scroll, entradas de la aplicación, datos comerciales, paquetes, fuentes multimedia del hero, pósteres y las seis imágenes responsive de personalización. Todos coinciden.

Capturas, mediciones y una grabación WebM de la interfaz están en `.qa/cinematic-microinteractions/`, excluido del control de versiones. La grabación es una previsualización de uso; no sustituye al video del hero. Se inspeccionaron capturas de escritorio/móvil y fotogramas de la entrada y de un cambio de opción. En la captura estática completa de móvil se muestran temporalmente los tres pasos para evitar que una animación existente fuera del viewport deje una zona vacía en la imagen.

La verificación se realizó en Chromium. Safari, Firefox, iPhone físico y mediciones de rendimiento en hardware móvil real siguen pendientes. No se afirma un benchmark de FPS o Core Web Vitals.
