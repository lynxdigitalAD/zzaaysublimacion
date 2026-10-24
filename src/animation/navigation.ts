import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function navigateToSection(id: string, smooth = true) {
  const target = document.getElementById(id)
  if (!target) return
  const pin = id === 'categorias' ? ScrollTrigger.getById('zzaay-categories') : undefined
  const top = pin ? pin.start + 1 : window.scrollY + target.getBoundingClientRect().top - 92
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.history.pushState(null, '', `#${id}`)
  window.scrollTo({ top: Math.max(0, top), behavior: smooth && !reduce ? 'smooth' : 'instant' })
  // Move the keyboard reading position without competing with the native scroll.
  target.focus({ preventScroll: true })
}

/** Keep keyboard focus and the pinned track on the same scroll position. */
export function revealCollection(link: HTMLAnchorElement) {
  const pin = ScrollTrigger.getById('zzaay-categories')
  if (!pin) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      const viewport = link.closest<HTMLElement>('.collections-viewport')
      const card = link.closest<HTMLElement>('.collection')
      if (!viewport || !card) return
      const inset = parseFloat(getComputedStyle(viewport).scrollPaddingLeft) || 0
      const left = viewport.scrollLeft + card.getBoundingClientRect().left - viewport.getBoundingClientRect().left - inset
      viewport.scrollTo({ left, behavior: 'instant' })
    }
    return
  }
  window.requestAnimationFrame(() => {
    const viewport = link.closest('.collections-viewport') as HTMLElement | null
    const card = link.closest('.collection') as HTMLElement | null
    const track = viewport?.querySelector<HTMLElement>('.collections-track')
    if (!viewport || !card || !track || ScrollTrigger.getById('zzaay-categories') !== pin) return
    viewport.scrollLeft = 0
    const bounds = viewport.getBoundingClientRect()
    const focused = link.getBoundingClientRect()
    if (focused.left >= bounds.left && focused.right <= bounds.right) return
    const distance = track.scrollWidth - viewport.clientWidth
    if (distance <= 0) return
    const cardOffset = card.getBoundingClientRect().left - track.getBoundingClientRect().left
    const offset = Math.max(0, Math.min(distance, cardOffset - (viewport.clientWidth - card.clientWidth) / 2))
    const progress = offset / distance
    window.scrollTo({ top: pin.start + progress * (pin.end - pin.start), behavior: 'instant' })
    pin.animation?.progress(progress)
    ScrollTrigger.update()
  })
}
