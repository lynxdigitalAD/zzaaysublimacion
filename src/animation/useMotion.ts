import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navigateToSection } from './navigation'
import { useScrollReveals } from './useScrollReveals'

gsap.registerPlugin(ScrollTrigger)

export function useMotion(root: RefObject<HTMLDivElement | null>) {
  useScrollReveals(root)
  useLayoutEffect(() => {
    if (!root.current) return
    const mm = gsap.matchMedia()
    const context = gsap.context(() => {
      mm.add('(min-width: 1000px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)', () => {
        const shell = root.current!.querySelector<HTMLElement>('.collections-shell')!
        const viewport = shell.querySelector<HTMLElement>('.collections-viewport')!
        const track = shell.querySelector<HTMLElement>('.collections-track')!
        const progress = shell.querySelector<HTMLElement>('.collections-progress-fill')!
        const counter = shell.querySelector<HTMLElement>('.collections-current')!
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: {
          id: 'zzaay-categories', trigger: shell, start: 'top top+=84', end: () => `+=${distance() * 1.2}`,
          pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: self => {
            progress.style.transform = `scaleX(${0.2 + self.progress * 0.8})`
            counter.textContent = String(1 + Math.round(self.progress * 4)).padStart(2, '0')
          },
        } })
        return () => { progress.style.transform = ''; counter.textContent = '01' }
      })
    }, root)
    let alive = true
    const refresh = () => { if (alive) ScrollTrigger.refresh() }
    document.fonts.ready.then(refresh)
    const timer = window.setTimeout(() => {
      refresh()
      const id = window.location.hash.slice(1)
      if (id && document.getElementById(id)) navigateToSection(id, false)
    }, 250)
    window.addEventListener('load', refresh)
    return () => { alive = false; window.clearTimeout(timer); window.removeEventListener('load', refresh); mm.revert(); context.revert() }
  }, [root])
}
