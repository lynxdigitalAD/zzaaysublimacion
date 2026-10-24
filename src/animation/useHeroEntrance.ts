import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'

export function useHeroEntrance(root: RefObject<HTMLElement | null>) {
  const finished = useRef(false)

  useLayoutEffect(() => {
    const hero = root.current
    if (!hero) return
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions?.reduced || (location.hash && location.hash !== '#inicio')) finished.current = true
      if (finished.current) return

      const eyebrow = hero.querySelector('[data-hero-intro="eyebrow"]')
      const title = hero.querySelector('[data-hero-intro="title"]')
      const emphasis = hero.querySelector('[data-hero-intro="emphasis"]')
      const description = hero.querySelector('[data-hero-intro="description"]')
      const timeline = gsap.timeline({ onComplete: () => { finished.current = true } })
      timeline
        .fromTo(eyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, .2)
        .fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, .4)
        .fromTo(emphasis, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' }, .7)
        .fromTo(description, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, 1.2)

      // Local anchor navigation settles the entrance; returning never starts it again.
      const settleOnNavigation = (event: MouseEvent) => {
        if (event.target instanceof Element && event.target.closest('a[href^="#"]')) timeline.progress(1)
      }
      document.addEventListener('click', settleOnNavigation, true)
      return () => { document.removeEventListener('click', settleOnNavigation, true) }
    }, hero)
    return () => { media.revert() }
  }, [root])
}
