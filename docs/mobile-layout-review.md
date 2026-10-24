# Revisión del layout móvil

Fecha: 23 de octubre de 2026. Página local en el puerto 5174, con énfasis en 390 × 844 px.

## Criterio y alcance

Se aplicó `ui-ux-pro-max` al proyecto existente en React y CSS. Las consultas locales `mobile spacing breakpoints` y `breakpoint consistency`, ambas del dominio UX, devolvieron recomendaciones verificadas sobre separación de controles táctiles, reflujo de texto y comprobación de varios tamaños. Se consultó también el apartado Layout & Responsive de su referencia rápida. No se generó un sistema visual nuevo.

La comparación a 390 px y la lectura del CSS mostraron grupos de formulario muy próximos y composiciones de dos o tres columnas que permanecían activas entre 600 y 768 px. La corrección se concentra en `src/styles.css` y `src/components/PremiumSections.css`.

## Cambios

- Un punto de cambio de 768 px para las composiciones móviles: personalización, pasos, galería, preguntas, pedidos y pie apilados. Los pasos se apilan desde 950 px para evitar columnas estrechas en tabletas.
- Márgenes laterales de 24 px a 390 px y 20 px por debajo de 375 px. Espacio de sección de 56 px y separaciones de 24, 32, 40 y 48 px según el grupo.
- Texto del hero separado de la imagen; franja en tres filas; títulos fluidos que permiten el salto natural de línea.
- Cantidad en una fila completa antes de la idea. Su foco sigue precediendo al textarea, igual que el orden visual. Dos columnas de ocasiones hasta 480 px y tres entre 481 y 768 px; Empresas completa la última fila a 480 px o menos.
- Más separación entre pasos, fotografías, leyendas, preguntas y enlaces del pie. Los perfiles permanecen debajo del contacto de WhatsApp.
- Menú con 8 px entre enlaces y altura limitada al espacio disponible; permite desplazarse de forma nativa en orientación horizontal.

## Comprobaciones

`npm run build` correcto. Las 16 pruebas de `npm run test:e2e` pasaron después de la revisión principal, incluyendo navegación, scroll inverso, movimiento reducido, recarga al inicio, imágenes, galería y formulario. Después del ajuste final de la última ocasión se ejecutaron nuevamente el build y las cinco pruebas relacionadas con móvil, ocasiones, teclado y cambios de viewport; todas pasaron.

La auditoría adicional comprobó 320, 375, 390, 414, 480, 481, 600, 601, 768, 769, 950, 1024 y 1440 px: sin desbordamiento horizontal, etiquetas dentro de sus controles, blancos táctiles de al menos 44 px y separaciones medidas. El menú a 844 × 390 px permanece dentro del viewport y permite llegar al último enlace por teclado y cerrar con Escape.

Se inspeccionaron capturas de 390 px de hero, franja, personalización, pedidos, menú y pie. Los scripts, capturas anteriores/posteriores y medidas están en `.qa/mobile-layout/`, excluido del control de versiones. En las capturas completas de una sección se oculta temporalmente el encabezado para evitar artefactos del elemento fijo durante la captura; las capturas de viewport conservan el encabezado real.

Validación realizada en Chromium con emulación de tamaño y controles táctiles. No se verificaron Safari, Firefox ni dispositivos físicos.
