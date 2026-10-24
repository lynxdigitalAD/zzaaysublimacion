import { useEffect, useRef, useState } from 'react'
import { workViews } from '../data/business'
import { workCopy, workScenes } from '../data/workScenes'
import { Icon } from './Icon'

export function Work() {
  const [activeView, setActiveView] = useState(0)
  const [selected, setSelected] = useState(-1)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => { if (selected >= 0 && !dialog.current?.open) dialog.current?.showModal(); if (selected < 0 && dialog.current?.open) dialog.current.close() }, [selected])
  const next = (step: number) => setSelected(current => (current + step + workViews.length) % workViews.length)
  const views = workViews.map(view => {
    const scene = workScenes[view.file]
    return {
      ...view,
      src: `${scene.imageBase}-960.webp`,
      srcSet: `${scene.imageBase}-480.webp 480w, ${scene.imageBase}-960.webp 960w`,
      thumbnail: `${scene.imageBase}-480.webp`,
      alt: scene.alt,
      width: 960,
      height: 768,
    }
  })
  const currentView = views[activeView]
  const enlargedView = views[selected]
  const thumbnails = views.map((view, index) => ({ view, index })).filter(({ index }) => isMobile || index !== activeView)
  const imageLabel = 'imagen'
  return <section id="trabajos" className="work section-space section-anchor page-width" tabIndex={-1} aria-labelledby="work-title">
    <div className="work-grid">
      <figure className="work-main" id="work-main-view" data-reveal="fade">
        <button ref={opener} type="button" onClick={() => setSelected(activeView)} aria-label={`Ampliar ${imageLabel}: ${currentView.title}`}>
          <img src={currentView.src} srcSet={currentView.srcSet} sizes="(max-width: 504px) calc(100vw - 24px), 480px" alt={currentView.alt} width={currentView.width} height={currentView.height} loading="lazy" decoding="async" />
          <span className="photo-expand"><Icon name="plus" /></span>
        </button>
        <div className="work-dots" aria-hidden="true">{views.map((view, index) => <span key={view.file} className={index === activeView ? 'is-active' : undefined} />)}</div>
        <figcaption aria-live="polite" aria-atomic="true"><span>{currentView.title}</span><span>{String(activeView + 1).padStart(2, '0')} / 03</span></figcaption>
      </figure>
      <div className="work-story" data-reveal><h2 id="work-title">De aquí.<br /><em>Con mucha historia.</em></h2><p>El Tulanbús. El Santo. El café de olla. Los detalles que nos hacen sentir en casa, reunidos en una misma taza.</p><div className="project-meta"><span>TULANCINGO, EN TUS MANOS.</span><span>{workCopy.mediaType}</span></div></div>
      <div className="work-thumbnails" role="group" aria-label={`Cambiar la ${imageLabel} principal`} data-reveal="fade">
        {/* Stable slots preserve keyboard focus when the selected view trades places with a thumbnail. */}
        {thumbnails.map(({ view, index }, slot) => <button key={slot} type="button" onClick={() => setActiveView(index)} aria-controls="work-main-view" aria-pressed={isMobile ? index === activeView : undefined} aria-label={`Ver ${imageLabel}: ${view.title}`}><img src={view.thumbnail} alt="" width="480" height="384" loading="lazy" decoding="async" /><span><span className="work-thumbnail-copy"><strong>{view.title}</strong><span>Vista {String(index + 1).padStart(2, '0')}</span></span><Icon name="arrow" /></span></button>)}
      </div>
    </div>
    <dialog className="work-dialog" ref={dialog} aria-labelledby="work-dialog-title" onClose={() => { setSelected(-1); opener.current?.focus({ preventScroll: true }) }} onClick={event => { if (event.target === event.currentTarget) setSelected(-1) }} onKeyDown={event => { if (event.key === 'ArrowRight') next(1); if (event.key === 'ArrowLeft') next(-1) }}>
      {selected >= 0 && <div className="work-dialog-inner"><button type="button" className="dialog-close circle-link" aria-label={`Cerrar ${imageLabel}`} onClick={() => setSelected(-1)}><Icon name="close" /></button><img src={enlargedView.src} alt={enlargedView.alt} width={enlargedView.width} height={enlargedView.height} /><div className="dialog-caption"><button type="button" className="circle-link" aria-label="Imagen anterior" onClick={() => next(-1)}><Icon name="chevron" style={{ transform: 'rotate(180deg)' }} /></button><div><h3 id="work-dialog-title">{enlargedView.title}</h3><p>Escena conceptual · Vista {selected + 1} de 3</p></div><button type="button" className="circle-link" aria-label="Imagen siguiente" onClick={() => next(1)}><Icon name="chevron" /></button></div></div>}
    </dialog>
  </section>
}
