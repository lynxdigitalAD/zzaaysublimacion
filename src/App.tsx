import { useRef } from 'react'
import { useMotion } from './animation/useMotion'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Personalization } from './components/Personalization'
import { Categories } from './components/Categories'
import { Work } from './components/Work'
import { Orders, Questions } from './components/Orders'
import { Footer } from './components/Footer'
import { EditorialStrip } from './components/EditorialStrip'
import './components/PremiumSections.css'

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useMotion(root)
  return <div className="site-root" ref={root}>
    <a className="skip-link" href="#main-content" tabIndex={0}>Saltar al contenido</a>
    <Navigation />
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <EditorialStrip />
      <Personalization />
      <Categories />
      <Work />
      <Questions />
      <Orders />
    </main>
    <Footer />
  </div>
}
