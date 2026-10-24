import { useEffect, useState } from 'react'
import { business, navigation, whatsappUrl } from '../data/business'
import { navigateToSection } from '../animation/navigation'
import { Icon } from './Icon'

export function Brand({ footer = false }: { footer?: boolean }) {
  return <a className={`brand${footer ? ' brand-footer' : ''}`} href="#inicio" onClick={event => { event.preventDefault(); navigateToSection('inicio') }} aria-label={`${business.name}, ir al inicio`}>
    <img src="/media/brand/logo.webp" width="256" height="256" alt="" />
    <span className="brand-wordmark">Zzaay<span><span>SUBLIMACIÓN</span>{' '}<span>Y DISEÑO</span></span></span>
  </a>
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-15% 0px -65% 0px' })
    navigation.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', escape)
    return () => { observer.disconnect(); window.removeEventListener('keydown', escape) }
  }, [])
  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegación principal">
        {navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={event => { event.preventDefault(); setOpen(false); setActive(item.id); navigateToSection(item.id) }}>{item.label}</a>)}
        <a className="mobile-nav-contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Platiquemos de tu idea <img src="/assets/icons/brands/whatsapp-green.svg" width="24" height="24" alt="" /></a>
      </nav>
      <a className="header-contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Hagamos algo tuyo <img src="/assets/icons/brands/whatsapp-green.svg" width="22" height="22" alt="" /></a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(value => !value)}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
  </header>
}
