import { personalizationSteps } from '../data/business'
import { processIntro, processScenes } from '../data/processScenes'
import { Icon } from './Icon'
import { ProcessSymbol } from './ProcessSymbol'
import './ProcessSteps.css'

// Desktop selects a transparent pixel instead of downloading mobile-only scenes.
const desktopPixel = '/assets/decorations/transparent.svg'

export function PersonalizationProcess() {
  return <div className="personalization-process" data-reveal>
    <header className="process-heading">
      <div className="process-divider" aria-hidden="true"><ProcessSymbol name="flower" /></div>
      <h2>{processIntro.title}<br /><em>{processIntro.emphasis}</em></h2>
    </header>
    <div className="process-list">
      {personalizationSteps.map((step, index) => {
        const scene = processScenes[index]
        return <article className="process-step" key={step.title}>
          <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
          <div className="process-copy">
            <span className="process-step-icon" aria-hidden="true">{index === 1 ? <Icon name="whatsapp" /> : <ProcessSymbol name={index === 0 ? 'bulb' : 'sparkles'} />}</span>
            <h3><span>{step.title.slice(0, scene.titleBreak)}</span><span className="process-title-rest">{step.title.slice(scene.titleBreak)}</span></h3>
            <p>{step.copy}</p>
          </div>
          <picture className="process-image">
            <source media="(max-width: 768px)" srcSet={`${scene.imageBase}-360.webp 360w, ${scene.imageBase}-720.webp 720w`} sizes="(max-width: 416px) 54vw, 216px" />
            <img src={desktopPixel} alt={scene.alt} width="720" height="720" loading="lazy" decoding="async" />
          </picture>
        </article>
      })}
    </div>
  </div>
}
