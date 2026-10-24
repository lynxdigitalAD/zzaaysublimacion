import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'

export function useScrollReveals(root: RefObject<HTMLDivElement | null>) {
  const revealed = useRef(new WeakSet<HTMLElement>())

  useLayoutEffect(() => {
    if (!root.current) return
    const elements = Array.from(root.current.querySelectorAll<HTMLElement>('[data-reveal]'))
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions?.reduced) {
        elements.forEach(element => revealed.current.add(element))
        return
      }

      const animations = new Map<HTMLElement, gsap.core.Tween>()
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          animations.get(element)?.play()
          observer.unobserve(element)
        }
      }, { rootMargin: '0px 0px -48px 0px' })
      const focusHandlers = new Map<HTMLElement, () => void>()

      for (const element of elements) {
        if (revealed.current.has(element)) continue
        const slide = element.dataset.reveal !== 'fade'
        const animation = gsap.fromTo(element, { opacity: 0, ...(slide ? { y: 12 } : {}) }, {
          opacity: 1, ...(slide ? { y: 0 } : {}), paused: true,
          duration: slide ? .6 : .65, ease: 'power2.out',
          onComplete: () => { revealed.current.add(element) },
        })
        animations.set(element, animation)
        observer.observe(element)

        // Focus must expose controls immediately, including cards in the pinned track.
        const onFocus = () => { observer.unobserve(element); animation.progress(1) }
        element.addEventListener('focusin', onFocus)
        focusHandlers.set(element, onFocus)
      }

      return () => {
        observer.disconnect()
        focusHandlers.forEach((handler, element) => element.removeEventListener('focusin', handler))
      }
    }, root.current)
    return () => { media.revert() }
  }, [root])
}
