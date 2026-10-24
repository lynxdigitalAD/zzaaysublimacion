# Galería y pie: ajustes solicitados

- Personalización: retirada la frase «Una pieza de 11 oz con una intención muy tuya.» del tercer paso.
- Trabajos: foto principal limitada a 480 × 480 px, frente a los 911 × 911 px medidos anteriormente en una ventana de 1920 px. Las fotos se muestran completas, sin recortar ni alterar la impresión.
- Las dos miniaturas intercambian la fotografía principal; la anterior pasa a las alternativas. Se actualizan título, texto alternativo y contador. Los botones conservan el foco al intercambiarse los recursos y el cambio se comunica con una región de estado.
- La foto principal abre la ampliación de la vista seleccionada. Se mantienen navegación por flechas, Escape y retorno del foco.
- En móvil: texto, foto principal y miniaturas en una sola columna, con scroll nativo.
- Pie: eliminados foto, marco, leyenda y emblema. Nombre completo y ubicación centrados en su bloque. El emblema del encabezado permanece completo.
- WhatsApp: SVG original «Digital_Glyph_Green_RGB_2026.svg», descargado del paquete oficial de Meta; sin cambios de geometría o color. Se sirve localmente. Fuente, ruta del paquete y SHA-256 en [el manifiesto](whatsapp-brand-asset.json).

## Validación

- `npm run build`: TypeScript y Vite correctos.
- `npm run test:e2e`: 12 pruebas de Chromium correctas. La prueba de galería recorre las tres vistas mediante teclado y comprueba intercambio, contador, foco y ampliación. La suite incluye navegación, scroll inverso de categorías, móvil y movimiento reducido.
- Revisión responsive en Chromium: 1920, 1440, 1024, 768, 390 y 320 px. Ningún desbordamiento horizontal ni error de navegador o carga de recursos en las comprobaciones realizadas.
- Foto principal: 480 px en las cuatro ventanas mayores; 350 px a 390 y 280 px a 320. Se verificaron las tres selecciones en las seis anchuras.
- Nombre del pie: centro horizontal alineado con su bloque, con desviación menor de 1 px en las seis ventanas. El único recurso de imagen del pie es el símbolo de WhatsApp.
- Capturas y mediciones locales en `.qa/current-refinement/`, fuera del control de versiones.

Sin validación en Safari, Firefox ni dispositivos físicos. Las fotografías auténticas y los demás recursos existentes no se han editado. No se abrió ni se envió ningún mensaje a WhatsApp durante las pruebas.
