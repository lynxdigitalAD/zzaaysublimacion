# Revisión del rediseño de Zzaay

> Registro de la corrección anterior. Personalización se actualizó después con tres diseños intercambiables y un marco sin rótulos ni CTA. Estado vigente: [selector de personalización](personalization-preview.md).

Proyecto: `SUBLIMACION Y DISEÑO ZZAAY`. Vista local: [página](http://127.0.0.1:5174/), [pedidos](http://127.0.0.1:5174/#pedidos), [contacto](http://127.0.0.1:5174/#contacto).

## Resultado y alcance

Se corrigieron las cuatro composiciones solicitadas sobre la aplicación existente. Se conservan React, Vite, TypeScript, GSAP, el logo oficial, los productos reales, el número de WhatsApp y la secuencia comercial. No se agregaron dependencias.

- **Pedidos:** cabecera horizontal, selector ilustrado de cinco ocasiones más “Tengo otra idea”, cantidad y descripción agrupadas, resumen del punto de partida y una sola acción principal. El enlace alternativo aparece después de preparar el mensaje y desaparece al modificar cualquier dato. Se conserva la validación nativa de enteros positivos y el texto opcional de hasta 1500 caracteres.
- **Personalización:** dos columnas en escritorio, título equilibrado, selector tipográfico con numeración y subrayado activo, descripción y enlace dinámicos. La foto real conserva todos sus elementos, impresión y base. El marco neutro da una intención editorial al fondo gris.
- **Pie:** fotografía moderada de otra vista del mismo proyecto, titular menor, contacto con teléfono, logo completo, ubicación, directorio y retorno al inicio. Los enlaces tienen estados de foco y hover discretos.
- **Franja:** las cuatro frases permanecen visibles incluso a 320 px. Se usa una única pincelada original como transición entre idea e impresión. Sin marquesina continua.

Las categorías, la galería y el motor de scroll mantienen su implementación. En el hero únicamente se retiraron decoraciones innecesarias; sus archivos de video y lógica de reproducción no cambiaron.

## Medidas comparadas

Medidas del navegador con fuentes cargadas y movimiento reducido para comparar geometría estable. No se fuerza una altura fija de las secciones.

| Elemento | Antes, 1440 px | Después, 1440 px | Cambio |
| --- | ---: | ---: | ---: |
| Altura de pedidos, estado inicial | 682 px | 526 px | −22.9 % |
| Ancho del marco de personalización | 675 px | 480 px | −28.9 % |
| Altura del área visual de la foto | — | 499 px | Dentro del límite de 500 px |
| Altura de personalización | 1034 px | 815 px | −21.2 % |
| Tamaño del titular del pie | 97.92 px | 70.56 px | −27.9 % |
| Altura total del pie | 543 px | 468 px | −13.7 % |

En móvil de 390 px, pedidos pasó de 1336 a 1091 px (−18.3 %), el pie de 694 a 568 px (−18.1 %) y su titular de 40.95 a 29.64 px (−27.6 %). Se prioriza legibilidad sobre alcanzar un porcentaje idéntico en todas las pantallas. Todos los textos revisados permanecen en 14 px o más.

## Auditoría global de símbolos

| Ubicación anterior | Decisión aplicada |
| --- | --- |
| Asterisco Unicode junto al rótulo del hero | Retirado; no aportaba información |
| Estrella de líneas junto al manifiesto del hero | Retirada y espacio reajustado |
| Punto de adorno en el rótulo del video | Retirado |
| Tres asteriscos de la franja | Retirados; una sola pincelada generada con propósito narrativo |
| Asterisco junto al pie de foto de personalización | Retirado; firma tipográfica legible |
| Asterisco rosado de pedidos | Retirado sin dejar un hueco |
| Asterisco del cierre del footer | Retirado; frase de marca integrada en la composición |
| Flechas, menú, cierre, reproducción, pausa, ampliar y acordeones | Archivos finales de la familia Phosphor |
| WhatsApp dibujado a mano | Símbolo de marca de Simple Icons, con geometría conservada |

`Icon.tsx` ya no contiene trazos dibujados a mano ni exporta `Spark`. Utiliza un sprite local compuesto con los SVG originales y sus viewBox. Los controles circulares, líneas divisorias, bordes e indicadores de selección siguen cumpliendo funciones de interfaz; no sustituyen ilustraciones.

Los iconos funcionales proceden de [Phosphor](https://github.com/phosphor-icons/core) (MIT) y [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0); son recursos de biblioteca, no imágenes generadas por IA. Las acciones de navegación, selección, ampliar y cerrar utilizan la variante Bold, sin fondos cuadrados añadidos dentro de sus controles. Reproducción y pausa utilizan Fill. En la revisión visual se descartaron las variantes Fill de menú, ampliar, cierre y selección porque añadían contenedores redundantes. Fuentes, hashes y licencias locales: `docs/interface-icons.json`, `docs/licenses/phosphor-MIT.txt` y `docs/licenses/simple-icons-CC0.txt`.

## Recursos generados realmente

Se hicieron seis llamadas independientes a la herramienta integrada `image_gen`. Se revisó cada salida y se guardaron los originales. No se reemplazó el logo ni se regeneraron productos reales. Las ilustraciones representan ocasiones y son conceptos de interfaz.

| Recurso final servido | Uso | Exportación |
| --- | --- | --- |
| `public/assets/icons/occasions/regalos.webp` | Selector de regalos | 256 × 256 px |
| `public/assets/icons/occasions/cumpleanos.webp` | Selector de cumpleaños | 256 × 256 px |
| `public/assets/icons/occasions/bodas.webp` | Selector de bodas | 256 × 256 px |
| `public/assets/icons/occasions/comuniones.webp` | Selector de comuniones | 256 × 256 px |
| `public/assets/icons/occasions/empresas.webp` | Selector de empresas | 256 × 256 px |
| `public/assets/decorations/trazo-creativo.webp` | Franja editorial | 720 × 240 px |

Los cinco originales PNG se conservan en `design-assets/premium/icons/`; el trazo original en `design-assets/premium/decorations/trazo-creativo.png`. Los PNG de ocasión son 1280 × 1280 px y el trazo es 2172 × 724 px. Los seis WebP suman 136950 bytes, aproximadamente 134 KiB. La transparencia se verificó en originales y exportaciones mediante FFmpeg: alfa mínimo 0 y máximo 255.

Los prompts completos, herramienta, rutas y tamaños de archivo están en `docs/premium-generations.json`. Reproducir las conversiones guardadas con `npm run media:premium`; el script acepta `FFMPEG_PATH`. Este comando no vuelve a generar arte ni procesa las fotografías reales.

Iconos funcionales finales: `public/assets/icons/interface/{arrow,down,plus,close,play,pause,menu,chevron,check,whatsapp}.svg`, más `sprite.svg`. Se conservan los archivos de origen, sin cambiar sus coordenadas.

## Archivos de implementación

| Archivo | Cambio |
| --- | --- |
| `src/components/Orders.tsx` | Compositor de pedido, radios nativos, resumen y estado de WhatsApp |
| `src/components/Personalization.tsx` | Marco fotográfico, selector y composición |
| `src/components/Footer.tsx` | Cierre editorial, contacto y directorio |
| `src/components/EditorialStrip.tsx` | Nuevo componente de la franja |
| `src/components/PremiumSections.css` | Estilos acotados a .site-root de las cuatro composiciones |
| `src/data/premiumDesign.ts` | Datos de las ocasiones y rutas de ilustraciones |
| `src/components/Icon.tsx` | Consumo de exportaciones finales de interfaz |
| `src/components/Hero.tsx` | Retirada de tres adornos; misma lógica y video |
| `src/App.tsx` | Integración de franja y estilos |
| `src/styles.css` | Retirada de reglas sustituidas y decoraciones obsoletas |
| `scripts/prepare-premium.mjs` | Conversión reproducible de los seis originales |
| `package.json` | Comando media:premium; sin dependencias nuevas |
| `tests/site.spec.ts` | Adaptación al selector y dos verificaciones nuevas |
| `README.md`, `DESIGN.md` | Estado actual, diseño, recursos y validación |

Documentación nueva: este reporte, los dos manifiestos JSON y las dos licencias de iconos. Los recursos servidos y los originales se enumeran arriba. No se modificaron las tres skills MD ni el proyecto vecino `Zzaay-Web`.

## Validación funcional

`npm run build`: correcto, TypeScript y compilación Vite.

`npm run test:e2e`: **12/12 pruebas correctas en Chromium**.

Se verificaron:

1. Pin de categorías único, avance, retroceso, navegación y foco fuera de pantalla.
2. Proporción real del video, reproducción, pausa, reanudación y suspensión fuera de pantalla.
3. Las tres intenciones actualizan texto y WhatsApp sin cambiar la foto real.
4. Ampliación de fotografías, siguiente/anterior, Escape y retorno del foco.
5. Cantidad cero y fraccionaria no abren WhatsApp; cantidad válida conserva ocasión y descripción en la URL.
6. Menú móvil, video móvil, categorías verticales y ausencia de desbordamiento.
7. Movimiento reducido sin pin, video ni solicitudes de MP4.
8. Cambio de viewport y preferencias sin duplicar pins.
9. Salto al contenido y preguntas frecuentes por teclado.
10. Recursos sin errores HTTP y ausencia de errores de ejecución.
11. Ocasiones mediante flechas de teclado, conservación del borrador y eliminación del enlace alternativo obsoleto.
12. Límite del marco fotográfico y etiquetas de ocasión contenidas en controles de más de 44 px.

Se compararon hashes SHA-256: no cambiaron `Categories.tsx`, `Work.tsx`, ambos módulos de animación/navegación, las tres fotografías de 1280 px, el logotipo servido y los dos MP4.

## Revisión visual y responsive

Matriz final: **320 × 740, 390 × 844, 600 × 900, 768 × 1024, 844 × 390, 1024 × 700, 1280 × 800, 1440 × 1000 y 1920 × 1080**. En las nueve ventanas: sin desbordamiento horizontal, errores de ejecución ni textos inferiores a 14 px en la revisión automática.

Se inspeccionaron capturas de las cuatro secciones en escritorio y móvil, además del selector en tableta, los símbolos de acción y el estado de mensaje preparado. Se corrigieron el amontonamiento del selector a 768 px y el salto de “Tu historia” a 320 px. También se inspeccionaron el hero, los botones de categorías y el diálogo con la iconografía final. Las capturas de navegación con movimiento normal se tomaron después de terminar el desplazamiento nativo y el revelado, confirmando el destino a 92 px del borde superior.

Evidencias locales excluidas de Git:

- `.qa/premium-before.json` y `premium-before-*.png`: estado previo.
- `.qa/premium-final-responsive.json`: nueve ventanas y geometría final.
- `.qa/premium-final-{320,390,768,1440,1920}-{editorial-strip,personalizacion,pedidos,contacto}.png`: capturas de secciones.
- `.qa/premium-viewport-{390,1440}-pedidos.png`: vista real con encabezado.
- `.qa/premium-prepared-{390,1440}.png`: estado posterior a preparar la consulta.
- `.qa/premium-asset-audit.json`: transparencia, tamaños y hashes preservados.

En capturas aisladas de secciones se oculta el encabezado solo durante la captura para evitar que una barra fija tape contenido al capturar un elemento más alto que la ventana. Las capturas de viewport conservan el encabezado real. Ningún estilo de esta operación se guarda en la aplicación.

### Revisión de accesibilidad de los cambios

Revisada con la [guía de interfaces de Vercel](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), consultada para esta revisión:

- `src/components/Orders.tsx:23` — grupo de radios nativo con leyenda y etiquetas; correcto.
- `src/components/Orders.tsx:30` — cantidad con nombre, etiqueta y validación; correcto.
- `src/components/Orders.tsx:31` — texto opcional etiquetado, máximo y ejemplo; correcto.
- `src/components/Orders.tsx:36` — estado anunciado y enlace alternativo condicionado; correcto.
- `src/components/Personalization.tsx:14` — intención con estado aria-pressed; correcto.
- `src/components/Personalization.tsx:19` — foto con alt, dimensiones y carga diferida; correcto.
- `src/components/Icon.tsx:7` — iconos decorativos ocultos al lector; las acciones conservan nombres; correcto.
- `src/components/PremiumSections.css:50` — toda la tarjeta es superficie del radio nativo; correcto.
- `src/components/PremiumSections.css:248` — animación nueva desactivada en movimiento reducido; correcto.

## Límites reales

No se probó en dispositivos físicos, Safari/iOS ni Firefox. No se envió ningún mensaje: las pruebas interceptan la URL de WhatsApp y verifican su contenido; el usuario revisa y envía desde ese servicio. No se publicaron cambios ni se añadieron cobros, tienda o servicios externos.

Las fotografías mantienen la calidad y el fondo de las tomas disponibles. El video sigue siendo el archivo recibido de 5.04 segundos; no se generó una nueva versión. Los seis recursos nuevos sí se generaron e integraron; no quedan marcadores provisionales en estas cuatro secciones.
