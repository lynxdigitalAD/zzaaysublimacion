# Legibilidad y cierre de la galería

23 de octubre de 2026.

La solicitud señala la ubicación y el tamaño de «Tres vistas de una sola pieza…», las frases bajo las categorías, los tres nombres de las fotografías y los textos pequeños del formulario. La revisión utiliza la guía local `ui-ux-pro-max`, cuya consulta `readable font size` devolvió recomendaciones verificadas de legibilidad, escala tipográfica coherente y contraste.

## Resultado

| Elemento | Tamaño anterior | Tamaño vigente |
| --- | --- | --- |
| Frases bajo las categorías | 16 px | 20 px |
| Párrafo de la historia de Tulancingo | 18 px | 20 px |
| Leyenda de la fotografía principal | 15 px | 20 px |
| Nombres bajo las miniaturas | Solo referencia de vista | 18 px, nombre completo |
| Nota de las tres vistas | 14 px; 16 px en móvil | 18 px |
| Introducción de pedidos | 17 px | 20 px |
| Textos de producto, cotización y envío a WhatsApp | 14–16 px | 18 px |

La nota de las tres vistas conserva su pertenencia a `#trabajos`: aparece después de las fotografías, con 32 px de separación. La línea se coloca debajo del texto y deja 24 px de espacio; ya no hay un borde encima de la nota. En escritorio, su anchura máxima coincide con los 1200 px de la composición de galería.

Las miniaturas incluyen el nombre tomado de `workViews`, la referencia de vista y su flecha. Las fotografías parten de la misma altura aunque las leyendas tengan distintas líneas. La principal mantiene la leyenda y el contador al intercambiarse con una miniatura.

Las categorías reservan espacio para las frases ampliadas: en el recorrido horizontal, la altura de fotografía usa `max(300px, calc(100svh - 420px))`. El pin conserva su umbral de 1000 × 800 px. Pedidos muestra tres columnas de ocasiones entre 951 y 1299 px; las etiquetas ampliadas caben completas. El texto del botón puede ocupar varias líneas en ventanas estrechas.

## Archivos y validación

Cambios en `src/styles.css`, `src/components/PremiumSections.css`, `src/components/Work.tsx` y `src/components/Orders.tsx`.

`npm run build` y las 16 pruebas de `npm run test:e2e` pasaron. Tras el ajuste final de alineación de miniaturas se repitieron el build y la prueba de galería, también correctos.

La auditoría de Chromium comprobó 320 × 740, 390 × 844, 768 × 1024, 1000 × 800, 1280 × 800, 1440 × 900 y 1920 × 1080 px. Se verificaron tamaños calculados, nota encima de la línea e interior de su sección, etiquetas completas, ausencia de desbordamiento horizontal y controles de categorías visibles durante el pin. La alineación final de las dos miniaturas se comprobó a 320, 390 y 1440 px con diferencia de 0 px entre sus bordes superiores.

Se inspeccionaron las capturas de categorías a 1000 px, galería a 1440 y 390 px y pedidos a 1440 px. Scripts, capturas y medidas quedan en `.qa/readability-v2/`, excluido del control de versiones. Safari, Firefox y dispositivos físicos siguen pendientes.
