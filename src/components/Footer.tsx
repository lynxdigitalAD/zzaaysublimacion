import { publicAsset } from '../data/assets'
import { business, socialLinks, whatsappUrl } from '../data/business'
import { navigateToSection } from '../animation/navigation'
import { Icon } from './Icon'

export function Footer() {
  return <footer id="contacto" className="site-footer section-anchor" tabIndex={-1} aria-labelledby="contact-title"><div className="page-width">
    <div className="closing-composition">
      <a className="closing-logo" data-reveal="fade" href="#inicio" onClick={event => { event.preventDefault(); navigateToSection('inicio') }} aria-label={`${business.name}, volver al inicio`}><img src={publicAsset('/media/brand/logo-large.webp')} alt={business.name} width="640" height="640" loading="lazy" /></a>
      <div className="closing-invitation" data-reveal>
        <h2 id="contact-title">Las buenas ideas<br />merecen <em>una taza.</em></h2>
        <div className="closing-channels">
        <a className="closing-contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><span className="closing-contact-icon"><img src={publicAsset('/assets/icons/brands/whatsapp-green.svg')} alt="" width="48" height="48" /></span><span><span>Hablemos de tu próxima idea</span><strong>{business.phone}</strong></span><Icon /></a>
        <nav className="footer-socials" aria-label="Redes sociales">
          {socialLinks.map(social => <a key={social.platform} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} en ${social.platform}`}>
            <img src={social.image} alt="" width="36" height="36" loading="lazy" decoding="async" />
            <span className="footer-social-copy"><strong>{social.name}</strong>{social.handle && <span>{social.handle}</span>}</span>
            <Icon className="footer-social-arrow" /><Icon name="chevron" className="footer-social-chevron" />
          </a>)}
        </nav>
        </div>
      </div>
      <div className="closing-brand" data-reveal><p className="closing-business-name">{business.name}</p><p>{business.location}</p><p className="closing-note">Hecho con ideas.<br /><em>Hecho para ti.</em></p></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}.</span><a href="#inicio" onClick={event => { event.preventDefault(); navigateToSection('inicio') }}>Volver al inicio <Icon name="down" style={{ transform: 'rotate(180deg)' }} /></a></div>
  </div></footer>
}
