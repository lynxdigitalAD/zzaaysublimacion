import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Controls = {
  show: (index: number) => void
  indicate: (index: number, instant?: boolean) => void
}

export function usePersonalizationMotion(root: RefObject<HTMLElement | null>) {
  const [selected, setSelected] = useState(0)
  const [displayed, setDisplayed] = useState(0)
  const [loadError, setLoadError] = useState('')
  const requested = useRef(0)
  const visible = useRef(0)
  const animated = useRef(0)
  const version = useRef(0)
  const alive = useRef(false)
  const controls = useRef<Controls | null>(null)
  const copyRevealed = useRef(false)
  const photoRevealed = useRef(false)

  useLayoutEffect(() => {
    const section = root.current
    if (!section) return
    alive.current = true
    const images = Array.from(section.querySelectorAll<HTMLImageElement>('.photo-mat img'))
    const descriptions = Array.from(section.querySelectorAll<HTMLElement>('.idea-detail-content'))
    const choices = section.querySelector<HTMLElement>('.idea-choices')!
    const buttons = Array.from(choices.querySelectorAll<HTMLButtonElement>('button'))
    const indicator = choices.querySelector<HTMLElement>('.idea-active-indicator')!
    const copy = section.querySelector<HTMLElement>('.personalization-copy')!
    const photo = section.querySelector<HTMLElement>('.personalization-photo')!
    const media = gsap.matchMedia()

    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      const motion = !!context.conditions?.motion
      let transition: gsap.core.Timeline | undefined
      let indicatorTween: gsap.core.Tween | undefined
      let active = true
      animated.current = visible.current

      gsap.set(images, { opacity: index => index === visible.current ? 1 : 0, zIndex: index => index === visible.current ? 2 : 1 })
      gsap.set(descriptions, { opacity: index => index === visible.current ? 1 : 0, visibility: index => index === visible.current ? 'visible' : 'hidden', y: 0 })

      const indicate = (index: number, instant = false) => {
        const button = buttons[index].getBoundingClientRect()
        const group = choices.getBoundingClientRect()
        indicatorTween?.kill()
        const target = { x: button.left - group.left, scaleX: button.width, opacity: 1 }
        if (!motion || instant) gsap.set(indicator, target)
        else indicatorTween = gsap.to(indicator, { ...target, duration: .3, ease: 'power2.out' })
        choices.dataset.indicatorReady = 'true'
      }

      controls.current = {
        indicate,
        show: index => {
          transition?.kill()
          gsap.set(images, { zIndex: imageIndex => imageIndex === index ? 2 : 1 })
          if (!motion) {
            gsap.set(images, { opacity: imageIndex => imageIndex === index ? 1 : 0 })
            gsap.set(descriptions, { opacity: item => item === index ? 1 : 0, visibility: item => item === index ? 'visible' : 'hidden', y: 0 })
            return
          }
          transition = gsap.timeline()
            .to(images, { opacity: imageIndex => imageIndex === index ? 1 : 0, duration: .35, ease: 'power1.inOut' }, 0)
            .to(descriptions, { opacity: 0, y: -4, duration: .1, ease: 'power1.out' }, 0)
            .set(descriptions, { visibility: 'hidden' }, .1)
            .set(descriptions[index], { visibility: 'visible', y: 6 }, .1)
            .to(descriptions[index], { opacity: 1, y: 0, duration: .25, ease: 'power2.out' }, .1)
        },
      }

      indicate(requested.current, true)
      const resize = new ResizeObserver(() => indicate(requested.current, true))
      resize.observe(choices)
      buttons.forEach(button => resize.observe(button))
      void document.fonts.ready.then(() => { if (active) indicate(requested.current, true) })

      if (!motion) {
        copyRevealed.current = true
        photoRevealed.current = true
      } else {
        if (!copyRevealed.current) gsap.fromTo(copy, { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: .6, ease: 'power2.out',
          scrollTrigger: { trigger: copy, start: 'top 92%', once: true },
          onComplete: () => { copyRevealed.current = true },
        })
        if (!photoRevealed.current) gsap.fromTo(photo, { opacity: 0 }, {
          opacity: 1, duration: .65, ease: 'power2.out',
          scrollTrigger: { trigger: photo, start: 'top 92%', once: true },
          onComplete: () => { photoRevealed.current = true },
        })
      }

      return () => {
        active = false
        transition?.kill()
        indicatorTween?.kill()
        resize.disconnect()
        controls.current = null
        delete choices.dataset.indicatorReady
      }
    }, section)

    // Decode the existing three assets near the preview, rather than during hero load.
    const prefetch = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      images.forEach(image => { image.loading = 'eager'; void image.decode().catch(() => {}) })
      prefetch.disconnect()
    }, { rootMargin: '300px' })
    prefetch.observe(photo)

    return () => {
      alive.current = false
      version.current++
      prefetch.disconnect()
      media.revert()
    }
  }, [root])

  useLayoutEffect(() => { controls.current?.indicate(selected) }, [selected])
  useLayoutEffect(() => {
    if (animated.current === displayed) return
    animated.current = displayed
    controls.current?.show(displayed)
  }, [displayed])

  const choose = (index: number) => {
    if (index === requested.current && !loadError) return
    const image = root.current?.querySelectorAll<HTMLImageElement>('.photo-mat img')[index]
    if (!image) return
    const request = ++version.current
    requested.current = index
    setSelected(index)
    setLoadError('')
    image.loading = 'eager'
    void image.decode().then(() => {
      if (!alive.current || request !== version.current) return
      visible.current = index
      setDisplayed(index)
    }).catch(() => {
      if (!alive.current || request !== version.current) return
      requested.current = visible.current
      setSelected(visible.current)
      setLoadError('No pudimos cargar esta vista. Puedes elegir otra opción.')
    })
  }

  return { selected, displayed, choose, loadError, pending: selected !== displayed }
}
