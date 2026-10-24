import { useEffect, useRef, useState } from 'react'
import { heroContent, heroMedia, heroVideoRevision } from '../data/hero'
import { useHeroEntrance } from '../animation/useHeroEntrance'
import './HeroMotion.css'

export function Hero() {
  const hero = useRef<HTMLElement>(null)
  useHeroEntrance(hero)
  const video = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLElement>(null)
  const userPaused = useRef(false)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => { setReduced(media.matches); setReady(false) }
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])
  useEffect(() => {
    if (reduced || !video.current || !frame.current) return
    const element = video.current
    let inViewport = false
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      if (entry.isIntersecting && !userPaused.current && !document.hidden) void element.play().catch(() => setPaused(true))
      else element.pause()
    }, { threshold: 0.15 })
    observer.observe(frame.current)
    const visibility = () => {
      const bounds = frame.current!.getBoundingClientRect()
      inViewport = bounds.bottom > 0 && bounds.top < window.innerHeight
      if (document.hidden || !inViewport) element.pause()
      else if (!userPaused.current) void element.play().catch(() => setPaused(true))
    }
    // Some native media backends pause while seeking back to the loop start.
    // Resume that automatic seek only while the visitor still wants playback.
    const resumeLoop = () => {
      if (element.loop && element.paused && element.currentTime < .25 && inViewport && !userPaused.current && !document.hidden) void element.play().catch(() => setPaused(true))
    }
    element.addEventListener('seeked', resumeLoop)
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); element.removeEventListener('seeked', resumeLoop); document.removeEventListener('visibilitychange', visibility); element.pause() }
  }, [reduced, heroVideoRevision])
  const toggle = () => {
    const element = video.current
    if (!element) return
    userPaused.current = !element.paused
    if (element.paused) void element.play().catch(() => setPaused(true))
    else element.pause()
  }
  return <section id="inicio" className="hero section-anchor" ref={hero} tabIndex={-1} aria-labelledby="hero-title">
    <figure className={`hero-film${ready && !reduced ? ' is-ready' : ''}`} ref={frame} aria-label="Escena conceptual de una taza Zzaay en Tulancingo">
      <picture><source media="(max-width: 800px)" srcSet={`${heroMedia}/poster-mobile.webp`} /><source media="(max-width: 1440px)" srcSet={`${heroMedia}/poster-medium.webp`} /><img src={`${heroMedia}/poster.webp`} alt="Escena conceptual: taza de Tulancingo de Zzaay entre pétalos de colores y arquitectura histórica." width="3008" height="1280" fetchPriority="high" /></picture>
      {!reduced && <video key={heroVideoRevision} ref={video} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onPlaying={() => { setPaused(false); setReady(true) }} onPause={() => setPaused(true)} onLoadedData={() => setReady(true)} onError={() => { setReady(false); setPaused(true) }}>
        <source media="(max-width: 800px)" src={`${heroMedia}/film-mobile.mp4?v=${heroVideoRevision}`} type="video/mp4" /><source media="(max-width: 1440px)" src={`${heroMedia}/film-medium.mp4?v=${heroVideoRevision}`} type="video/mp4" /><source src={`${heroMedia}/film.mp4?v=${heroVideoRevision}`} type="video/mp4" />
      </video>}
      {!reduced && <button type="button" className="film-playback" aria-label={paused ? 'Reproducir video' : 'Pausar video'} onClick={toggle} />}
    </figure>
    <div className="hero-content page-width">
      <div className="hero-copy">
        <p className="eyebrow" data-hero-intro="eyebrow">{heroContent.eyebrow}</p>
        <h1 id="hero-title"><span className="hero-title-line" data-hero-intro="title">{heroContent.title}</span><br /><em className="hero-title-line" data-hero-intro="emphasis">{heroContent.emphasis}</em></h1>
        <p className="hero-description" data-hero-intro="description">{heroContent.description}</p>
      </div>
    </div>
  </section>
}
