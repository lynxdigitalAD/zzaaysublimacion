# Scroll horizontal de categorías en laptops

## Problema observado

La grabación `IMG_8923.MOV` muestra las categorías en una rejilla de dos columnas con un recorrido vertical largo. Se revisaron fotogramas de los 14 segundos del video; el original no se modifica ni se incorpora a la web. La filmación no permite conocer con precisión la resolución CSS del navegador de esa PC.

El código exigía simultáneamente 1000 px de ancho y 800 px de alto para activar tanto el pin de GSAP como la fila horizontal en CSS. Muchas ventanas de laptop tienen menos de 800 px de alto útil a zoom normal. Reducir el zoom aumenta las dimensiones CSS disponibles y por eso activaba el efecto.

La condición anterior se reprodujo a 1366 × 633, 1536 × 695, 1280 × 600 y 1024 × 650: cero pins y rejilla vertical. A 1366 × 633 la sección medía aproximadamente 2924 px de alto.

## Corrección

- La fila y el pin se activan desde 1000 × 480 px, con movimiento normal.
- Entre 480 y 799 px de alto se ajustan el tamaño de las imágenes y los espacios para que título, frases, enlaces y progreso quepan debajo del encabezado. Se conservan los títulos de sección y las fotografías completas, con `object-fit: contain`.
- El ancho mínimo de las fichas evita que la fila deje de tener recorrido en ventanas anchas con poca altura.
- La sección mide aproximadamente 481 px a 1366 × 633 y se recorre horizontalmente con scroll nativo, también en sentido inverso.
- Se conservan `gsap.matchMedia`, el desmontaje de los triggers y la actualización de medidas al redimensionar.
- El móvil conserva el carrusel táctil. Ventanas menores de 480 px de alto y movimiento reducido muestran contenido estático y accesible.

## Validación

- `npm run build`: correcto.
- `npm run test:e2e`: 38 pruebas correctas.
- Ocho pruebas de regresión específicas: 1366 × 633, 1280 × 600, 1536 × 695, 1024 × 650, 1920 × 800, 1920 × 600 y 1000 × 480, además de cambios alrededor de 480/800 px y movimiento reducido.
- Se comprueban el contenido completo en altura, el recorrido hacia delante y atrás, el foco de la última categoría, los enlaces a otras secciones y la ausencia de desbordamiento del documento.
- Capturas, medidas antes/después y fotogramas de revisión en `.qa/category-height/`, fuera de Git.
- Revisión de Chrome, Edge y WebKit: 24 pruebas específicas correctas (ocho por navegador o motor). Son pruebas automatizadas de ventanas con zoom predeterminado; falta que el usuario confirme el resultado en la PC filmada.
- Publicación [40054469299](https://github.com/lynxdigitalAD/zzaaysublimacion/actions/runs/40054469299): correcta, revisión `86415cb8926a1dc70b235c2fcf6464c4b9e162e5`.
- Verificación de la página pública sin sesión a 1366 × 633 y 1536 × 695: HTTP 200, sección completa, avance horizontal y regreso a la posición inicial. A 390 × 844 se confirma HTTP 200, sin pin ni desbordamiento. Resultados en `.qa/category-height/public.json`.

La preparación de `zzaaysublimacion.github.io` sigue separada en la rama `codex/dominio-zzaay`, pendiente de que exista la organización de Zzaay.
