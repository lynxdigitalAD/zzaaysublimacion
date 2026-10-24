export const business = {
  name: 'Sublimación y Diseño Zzaay',
  location: 'Tulancingo, Hidalgo, México',
  phone: '55 6890 3047',
  whatsapp: '525568903047',
}

export const whatsappUrl = (message = '¡Hola, Zzaay! Me gustaría personalizar una taza de 11 oz. ¿Me ayudan con una cotización?') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`

export const socialLinks = [
  { platform: 'Facebook', name: 'Sublimación y Diseño Zzaay', handle: '', image: '/assets/icons/brands/facebook-primary.png', href: 'https://www.facebook.com/profile.php?id=61594413954323' },
  { platform: 'TikTok', name: 'Sublim Zzaay', handle: '@sublimzzaay', image: '/assets/icons/brands/tiktok-original.png', href: 'https://www.tiktok.com/@sublimzzaay?is_from_webapp=1&sender_device=pc' },
] as const

export const navigation = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'personalizacion', label: 'Personalización' },
  { id: 'categorias', label: 'Categorías' },
  { id: 'trabajos', label: 'Trabajos' },
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'contacto', label: 'Contacto' },
]

export const categories = [
  { id: 'cumpleanos', name: 'Cumpleaños', phrase: 'Otra vuelta al sol. Un regalo muy suyo.', tone: '#f2c5b5', detail: 'Nombres, frases y todo eso que merece celebrarse.' },
  { id: 'bodas', name: 'Bodas', phrase: 'Un «sí» que también se recuerda.', tone: '#e9dfcf', detail: 'Un detalle con su historia para compartir con sus invitados.' },
  { id: 'comuniones', name: 'Comuniones', phrase: 'Pequeños detalles. Grandes recuerdos.', tone: '#dce8ee', detail: 'Una idea delicada para una celebración en familia.' },
  { id: 'regalos', name: 'Regalos', phrase: 'Porque pensaste en alguien.', tone: '#e6bfca', detail: 'Una frase, una fecha o un recuerdo. Sin esperar una ocasión.' },
  { id: 'empresas', name: 'Empresas', phrase: 'Tu marca, en su día a día.', tone: '#b9c9e7', detail: 'Tu identidad para equipos, eventos y detalles de negocio.' },
] as const

export const ideas = [
  { id: 'frase', imageBase: '/media/personalization-scenes/frase', label: 'Una frase', title: 'Eso que solo ustedes entienden.', copy: 'Una broma compartida, unas palabras bonitas o tu frase de todos los días. Tú pones la idea; juntos le damos forma.', alt: 'Escena conceptual generada de una taza con «Haz que hoy cuente.» sobre un pedestal vino, con listón y fondo cálido.' },
  { id: 'recuerdo', imageBase: '/media/personalization-scenes/recuerdo', label: 'Un recuerdo', title: 'Un momento que se queda cerca.', copy: 'Una fecha, un lugar o una historia que te gustaría tener a mano. Cuéntanos qué significa para ti.', alt: 'Escena conceptual generada de una taza con una fotografía de viaje sobre piedra clara, acompañada de lino y recuerdos fotográficos.' },
  { id: 'marca', imageBase: '/media/personalization-scenes/marca', label: 'Mi marca', title: 'Tu identidad, hasta en el café.', copy: 'Compártenos tu logo y la intención del detalle. Revisamos contigo cómo llevar tu identidad a una taza.', alt: 'Escena conceptual generada de una taza con la marca ficticia bruma sobre una plataforma azul, con papelería vino y crema.' },
]

export const personalizationSteps = [
  { title: 'Nos cuentas tu idea.', copy: 'La ocasión, tu inspiración y eso que quieres decir.' },
  { title: 'Le damos forma juntos.', copy: 'Revisamos el diseño y los detalles por WhatsApp.' },
  { title: 'Tu historia se vuelve taza.', copy: 'Plasmamos tu diseño para que cada detalle hable de ti.' },
]

export const workViews = [
  { file: 'tulancingo-frente', title: 'El Tulanbús y el café de olla', alt: 'Fotografía real de una taza Zzaay con ilustraciones del Tulanbús, la catedral y el café de olla de Tulancingo.' },
  { file: 'tulancingo-catedral', title: 'El Santo y el ferrocarril', alt: 'Segunda vista de la misma taza real de Zzaay: El Santo, el quiosco y el ferrocarril de Tulancingo.' },
  { file: 'tulancingo-tradiciones', title: 'El sabor de nuestras tradiciones', alt: 'Tercera vista de la misma taza real de Zzaay con referencias a la gastronomía de Tulancingo.' },
]

export const faqs = [
  { question: '¿Cómo empiezo mi pedido?', answer: 'Cuéntanos por WhatsApp qué tienes en mente, para qué ocasión y cuántas tazas necesitas. Contigo definimos el diseño y los detalles del pedido.' },
  { question: '¿Cuánto cuesta una taza personalizada?', answer: 'La cotización se confirma según el diseño y la cantidad. Comparte tu idea para que podamos revisar tu solicitud y darte la información correspondiente.' },
  { question: '¿Cuándo y cómo recibo mi pedido?', answer: 'Consulta la disponibilidad, la fecha de entrega y la forma de recepción directamente por WhatsApp antes de confirmar tu pedido.' },
]
