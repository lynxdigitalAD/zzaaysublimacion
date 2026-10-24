# Títulos unificados, azules y galería compartida

## Escala de títulos

Personalización, categorías, trabajos, preguntas, pedidos y cierre utilizan una misma escala y altura de línea. El punto de partida es el título existente de pedidos. Las variables de `.site-root` en `src/styles.css` eliminan las diferencias de tamaño entre secciones y variantes responsive, incluido el título de categorías durante el pin:

| Ventana | Tamaño | Altura de línea |
| --- | --- | --- |
| Más de 950 px | `clamp(42px, 4.1vw, 62px)` | 1.1 |
| 769–950 px | 44 px | 1.1 |
| 375–768 px | `clamp(29px, 8.3vw, 38px)` | 1.07 |
| Hasta 374 px | `clamp(27px, 8.3vw, 31px)` | 1.07 |

El hero conserva su H1, recursos, estilos y reproducción. «Así de fácil», sus tarjetas, imágenes, iconos y listado de escritorio conservan sus reglas propias. La excepción de los pasos es expresa: su título móvil sigue usando la escala anterior en `ProcessSteps.css`.

## Color

Pedidos comparte la paleta que ya usaba móvil: acento `#a1cdff`, selección `#354a64`, palomita `#326eb8`, botón `#c4deff` con texto `#173b66`. Se aplica a escritorio y móvil, incluidos foco, hover y respuesta del formulario. No cambia el contenido ni el destino de la consulta; el logotipo de WhatsApp conserva su verde oficial.

La franja editorial utiliza `#285f91` para las cursivas y el icono de taza, líneas azules y ondas azules. El SVG mantiene sus trazados, proporciones y opacidades. El cambio de color se limita a la franja y a pedidos; no se cambia el acento vino global ni el proceso.

## Galería

Escritorio y móvil utilizan las mismas tres escenas ya generadas de Tulancingo, sus miniaturas y su ampliación. No se hicieron nuevas generaciones. Los archivos mantienen la carpeta histórica `public/media/work-mobile-scenes/`, pero el módulo de datos ahora es `src/data/workScenes.ts`.

Todas las vistas se identifican como conceptuales en los datos, texto alternativo, procedencia y diálogo. Las fotografías de origen se conservan en `public/media/work/` y no se solicitan desde la galería activa. El escritorio conserva dos miniaturas alternativas y el móvil tres posiciones fijas. La selección, título, contador, foco de teclado y navegación del diálogo siguen funcionando al cruzar el breakpoint. El escritorio muestra la imagen completa 5:4; móvil mantiene las ventanas 10:7 y 4:3 aprobadas.

## Verificación y límites

Compilación de TypeScript/Vite y 29 pruebas E2E correctas. Las pruebas existentes se actualizaron para esperar las mismas escenas y procedencia en ambas versiones, manteniendo las comprobaciones de selección, diálogo, flechas, Escape y retorno del foco. También se verifica que no se soliciten las fotografías anteriores y que la vista seleccionada sobreviva al cambio de tamaño.

Se midieron 320, 390, 768, 769, 950, 1024, 1440 y 1920 px con movimiento reducido. Los seis títulos coinciden exactamente en tamaño y altura de línea en cada anchura, sin títulos recortados ni desbordamiento horizontal. A 390 px utilizan 32.37 px; a 1440 px, 59.04 px. Se revisaron capturas de la franja, pedidos, trabajos, hero y proceso.

Con movimiento normal, categorías conserva un solo pin a 1000 × 800, 1280 × 800, 1440 × 1000 y 1920 × 1080 px. En las cuatro ventanas el título coincide con pedidos, la sección cabe debajo del encabezado y el desplazamiento avanza y retrocede correctamente. No fue necesario modificar el motor ni las dimensiones del recorrido.

Capturas y mediciones locales en `.qa/shared-heading-blue/`. La revisión utiliza Chromium. Safari, Firefox y dispositivos físicos siguen pendientes.
