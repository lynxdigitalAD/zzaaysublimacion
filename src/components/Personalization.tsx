import { useRef } from 'react'
import { ideas } from '../data/business'
import { usePersonalizationMotion } from '../animation/usePersonalizationMotion'
import { IdeaIcon } from './IdeaIcon'
import { PersonalizationProcess } from './PersonalizationProcess'
import './PersonalizationMotion.css'

export function Personalization() {
  const root = useRef<HTMLElement>(null)
  const { selected, displayed, choose, loadError, pending } = usePersonalizationMotion(root)
  return <section id="personalizacion" className="personalization section-anchor section-space page-width" ref={root} tabIndex={-1} aria-labelledby="personalization-title">
    <div className="personalization-grid">
      <div className="personalization-copy">
        <h2 id="personalization-title">No es solo una taza.<br /><em>Es muy tú.</em></h2>
        <p className="section-description" id="personalization-samples-note">Una frase. Un nombre. Ese recuerdo que te saca una sonrisa. Explora estas escenas conceptuales e imagina tu taza.</p>
        <div className="idea-choices" role="group" aria-label="Elige el diseño que quieres ver en la taza">{ideas.map((item, index) => <button type="button" key={item.id} aria-pressed={index === selected} aria-controls="idea-detail idea-preview" onClick={() => choose(index)}><span className="idea-index" aria-hidden="true">0{index + 1}</span><IdeaIcon name={item.id as 'frase' | 'recuerdo' | 'marca'} /><span className="idea-label" data-label={item.label}><span>{item.label}</span></span></button>)}<span className="idea-active-indicator" aria-hidden="true" /></div>
      </div>
      <figure className="personalization-photo" id="idea-preview" aria-describedby="personalization-samples-note" aria-busy={pending}>
        <div className="photo-mat">{ideas.map((item, index) => <img key={item.id} className={index === displayed ? 'is-active' : undefined} aria-hidden={index !== displayed} src={`${item.imageBase}-960.webp`} srcSet={`${item.imageBase}-480.webp 480w, ${item.imageBase}-960.webp 960w`} sizes="(max-width: 416px) calc(100vw - 16px), (max-width: 768px) 400px, (max-width: 950px) 45vw, 450px" alt={item.alt} width="960" height="960" loading="lazy" decoding="async" />)}</div>
      </figure>
      <div className="personalization-details" data-reveal>
        <div className="idea-detail" id="idea-detail" aria-live="polite" aria-busy={pending}>{ideas.map((item, index) => <div key={item.id} className={`idea-detail-content${index === displayed ? ' is-active' : ''}`} aria-hidden={index !== displayed}><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
        <p className="idea-load-error" role="status">{loadError}</p>
      </div>
    </div>
    <PersonalizationProcess />
  </section>
}
