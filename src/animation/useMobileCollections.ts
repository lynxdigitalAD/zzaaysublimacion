import { useLayoutEffect, useState, type RefObject } from 'react'
import { revealCollection } from './navigation'

export function useMobileCollections(viewport: RefObject<HTMLDivElement | null>) {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)

  useLayoutEffect(() => {
    const query = window.matchMedia('(max-width: 768px)')
    let frame = 0
    const update = () => {
      setMobile(query.matches)
      const rail = viewport.current
      if (!rail) return
      // A native offset must not survive into the desktop ScrollTrigger track.
      rail.scrollLeft = 0
      window.cancelAnimationFrame(frame)
      const focused = rail.querySelector<HTMLAnchorElement>('a:focus')
      const bounds = rail.getBoundingClientRect()
      if (focused && bounds.bottom > 0 && bounds.top < innerHeight) {
        frame = window.requestAnimationFrame(() => {
          if (document.activeElement === focused) revealCollection(focused)
        })
      }
    }
    query.addEventListener('change', update)
    return () => { query.removeEventListener('change', update); window.cancelAnimationFrame(frame) }
  }, [viewport])

  return mobile
}
