import { useState, type FormEvent } from 'react'
import { faqs, whatsappUrl } from '../data/business'
import { occasions, orderHeadingScene } from '../data/premiumDesign'
import { Icon } from './Icon'

export function Orders() {
  const [occasion, setOccasion] = useState('Un regalo especial')
  const [quantity, setQuantity] = useState('1')
  const [idea, setIdea] = useState('')
  const [prepared, setPrepared] = useState(false)
  const selected = occasions.find(item => item.value === occasion)
  const message = `¡Hola, Zzaay! Me gustaría cotizar ${quantity || 'una o varias'} taza(s) personalizadas de 11 oz.\nOcasión: ${occasion}.${idea.trim() ? `\nMi idea: ${idea.trim()}` : ''}\n¿Podemos revisar el diseño, precio, disponibilidad y entrega?`
  const submit = (event: FormEvent) => { event.preventDefault(); setPrepared(true); window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer') }
  const choose = (value: string) => { setOccasion(value); setPrepared(false) }
  return <section id="pedidos" className="orders section-anchor" tabIndex={-1} aria-labelledby="orders-title"><div className="request-studio page-width">
    <header className="request-heading" data-reveal>
      <picture className="request-heading-art" aria-hidden="true"><source media="(max-width: 768px)" srcSet={`${orderHeadingScene}-480.webp 480w, ${orderHeadingScene}-960.webp 960w`} sizes="(max-width: 504px) 54vw, 260px" /><img src="/assets/decorations/transparent.svg" width="960" height="960" alt="" loading="lazy" decoding="async" /></picture>
      <h2 id="orders-title">Hagamos algo <em>muy tuyo.</em></h2>
      <p>Un regalo. Una celebración. Una idea para tu negocio. Todo empieza con una buena plática.</p>
    </header>
    <form className="quote-form" onSubmit={submit}>
      <div className="request-fields">
        <fieldset className="occasion-fieldset" data-reveal>
          <legend>¿Para qué ocasión?</legend>
          <div className="occasion-choices">
            {occasions.map(item => <label key={item.id} className="occasion-choice"><input type="radio" name="occasion" value={item.value} checked={occasion === item.value} onChange={() => choose(item.value)} /><span className="occasion-tile"><img src={item.image} width="128" height="128" alt="" loading="lazy" /><span>{item.label}</span><span className="occasion-check"><Icon name="check" /></span></span></label>)}
          </div>
          <label className="occasion-other"><input type="radio" name="occasion" value="Otra idea" checked={occasion === 'Otra idea'} onChange={() => choose('Otra idea')} /><span>Tengo otra idea</span></label>
        </fieldset>
        <div className="request-brief" data-reveal>
          <div className="brief-heading"><label htmlFor="idea">Tu idea <span>(si ya tienes una)</span></label><div className="quantity-control"><label htmlFor="quantity">¿Cuántas tazas?</label><input id="quantity" name="quantity" type="number" min="1" step="1" required inputMode="numeric" autoComplete="off" value={quantity} onChange={event => { setQuantity(event.target.value); setPrepared(false) }} /></div></div>
          <textarea id="idea" name="idea" rows={3} maxLength={1500} autoComplete="off" value={idea} onChange={event => { setIdea(event.target.value); setPrepared(false) }} placeholder="Una frase, un nombre, una fecha, tu marca…" />
          <div className="request-summary" aria-live="polite"><span>Tu punto de partida</span><strong>{quantity || '—'} {quantity === '1' ? 'taza' : 'tazas'} · {selected?.label ?? 'Otra idea'}</strong></div>
        </div>
      </div>
      <div className="request-send" data-reveal><p><strong>Taza de cerámica · 11 oz</strong>El precio se confirma según el diseño y la cantidad. Revisamos disponibilidad y entrega contigo antes de confirmar.</p><div><button className="button button-cream" type="submit"><img src="/assets/icons/brands/whatsapp-green.svg" width="24" height="24" alt="" /><span>Platiquemos por WhatsApp</span><Icon /></button><p className="form-explanation">Revisa y envía tu mensaje en WhatsApp. No confirma ni cobra un pedido.</p></div></div>
      <div className="request-feedback"><p className="form-feedback" role="status">{prepared ? 'Tu mensaje está preparado. Si WhatsApp no se abrió, usa el enlace de abajo.' : ''}</p>{prepared && <a className="text-link" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">Abrir mi mensaje en WhatsApp <Icon /></a>}</div>
    </form>
  </div></section>
}

export function Questions() {
  return <div className="questions page-width section-space"><div className="questions-intro" data-reveal><p className="eyebrow">ANTES DE CREAR</p><h2>Las primeras<br /><em>preguntas.</em></h2></div><div className="questions-list">{faqs.map(faq => <details key={faq.question} data-reveal><summary>{faq.question}<Icon name="plus" /></summary><p>{faq.answer}</p></details>)}</div></div>
}
