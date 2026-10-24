import { useRef, type CSSProperties } from 'react'
import { publicAsset } from '../data/assets'
import { categories, whatsappUrl } from '../data/business'
import { Icon } from './Icon'
import { revealCollection } from '../animation/navigation'
import { useMobileCollections } from '../animation/useMobileCollections'

export function Categories() {
  const viewport = useRef<HTMLDivElement>(null)
  const mobile = useMobileCollections(viewport)
  return <section id="categorias" className="collections section-anchor" tabIndex={-1} aria-labelledby="categories-title">
    <div className="collections-shell">
      <div className="collections-heading page-width" data-reveal><h2 id="categories-title">El momento<br /><em>lo eliges tú.</em></h2><p className="collections-note">Para celebrar. Para agradecer.<br />Para decir: pensé en ti.</p></div>
      <div className="collections-viewport page-width" ref={viewport} tabIndex={mobile ? 0 : undefined} role={mobile ? 'region' : undefined} aria-label={mobile ? 'Explorar categorías' : undefined} aria-roledescription={mobile ? 'carrusel' : undefined}><div className="collections-track">
        {categories.map((category, index) => <article className="collection" key={category.id} data-reveal="fade" style={{ '--collection-tone': category.tone } as CSSProperties}>
          <figure><img src={publicAsset(`/media/concepts/${category.id}-1280.webp`)} srcSet={`${publicAsset(`/media/concepts/${category.id}-640.webp`)} 640w, ${publicAsset(`/media/concepts/${category.id}-1280.webp`)} 1280w`} sizes="(max-width: 374px) calc(100vw - 64px), (max-width: 472px) calc(100vw - 72px), (max-width: 768px) 400px, (max-width: 999px) 45vw, 440px" alt={`Concepto generado con IA para ${category.name.toLowerCase()}: una taza blanca personalizada en una escenografía de estudio.`} loading="lazy" width="1024" height="1280" /><span className="collection-number">0{index + 1} / 05</span></figure>
          <div className="collection-caption"><div><h3>{category.name}</h3><p>{category.phrase}</p></div><a className="circle-link" onFocus={event => revealCollection(event.currentTarget)} href={whatsappUrl(`¡Hola, Zzaay! Me gustaría cotizar tazas de 11 oz para ${category.name.toLowerCase()}. ¿Podemos platicar del diseño y la cantidad?`)} target="_blank" rel="noopener noreferrer" aria-label={`Personalizar tazas para ${category.name.toLowerCase()}`}><Icon /></a></div>
        </article>)}
      </div></div>
      <div className="collections-bottom page-width"><div className="collections-progress" aria-hidden="true"><span className="collections-progress-fill" /></div><span className="collections-counter" aria-hidden="true"><span className="collections-current">01</span> / 05</span></div>
    </div>
  </section>
}
