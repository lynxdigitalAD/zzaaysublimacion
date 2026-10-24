import { publicAsset } from './assets'
export const editorialCopy = {
  thought: 'Tu idea.',
  thoughtAccent: 'Tu estilo.',
  result: 'Una taza.',
  resultAccent: 'Mil momentos.',
}

// Reuse the existing conceptual scene; provenance: docs/personalization-generations.json.
export const orderHeadingScene = publicAsset('/media/personalization-scenes/frase')

// Conceptual interface illustrations; never photographs of delivered products.
export const occasions = [
  { id: 'regalos', label: 'Regalos', value: 'Un regalo especial', image: publicAsset('/assets/icons/occasions/regalos.webp') },
  { id: 'cumpleanos', label: 'Cumpleaños', value: 'Cumpleaños', image: publicAsset('/assets/icons/occasions/cumpleanos.webp') },
  { id: 'bodas', label: 'Bodas', value: 'Bodas', image: publicAsset('/assets/icons/occasions/bodas.webp') },
  { id: 'comuniones', label: 'Comuniones', value: 'Comuniones', image: publicAsset('/assets/icons/occasions/comuniones.webp') },
  { id: 'empresas', label: 'Empresas', value: 'Empresas', image: publicAsset('/assets/icons/occasions/empresas.webp') },
]
