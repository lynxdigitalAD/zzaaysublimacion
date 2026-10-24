# Franja editorial inspirada en la referencia

Se sustituyó la composición con pincelada por una franja marfil con curvas rosas en los extremos, una taza en color vino y líneas horizontales finas. Los textos son «Tu idea. Tu estilo.» y «Una taza. Mil momentos.», con cursivas en rosa vino.

- Textos editables: `src/data/premiumDesign.ts`.
- Componente: `src/components/EditorialStrip.tsx`.
- Estilos: prefijo `.site-root .editorial-` en `src/components/PremiumSections.css`.
- Ondas: `public/assets/decorations/editorial-waves.svg`, decoración vectorial propia.
- Taza: exportación Coffee de Phosphor Regular, con geometría original y color heredado. Fuente y SHA-256 en `docs/interface-icons.json`; licencia MIT existente en `docs/licenses/phosphor-MIT.txt`.
- Referencia aportada conservada en `design-assets/editorial-strip/reference.png`.

La franja mide 98 px de alto en las ventanas de escritorio comprobadas. El texto varía de 26 a 36 px en escritorio y de 22 a 28 px en ventanas estrechas. En teléfonos se omiten las líneas laterales del icono para dejar espacio a las frases. A 320 px, «Mil momentos» ocupa dos líneas; la franja crece a 114 px aproximadamente.

`npm run build` y las 16 pruebas E2E de Chromium pasaron. Se revisaron capturas y límites del contenido en 1920, 1777, 1440, 1024, 768, 390 y 320 px, sin texto recortado ni desbordamiento horizontal. Las pruebas existentes incluyen navegación, scroll inverso, móvil y movimiento reducido.

Capturas y mediciones: `.qa/editorial-strip/`, fuera del control de versiones. No se han probado Safari, Firefox ni dispositivos físicos.
