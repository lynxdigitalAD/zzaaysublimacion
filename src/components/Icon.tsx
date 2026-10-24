import type { CSSProperties } from 'react'
import { publicAsset } from '../data/assets'

type IconName = 'arrow' | 'down' | 'plus' | 'close' | 'play' | 'pause' | 'whatsapp' | 'menu' | 'chevron' | 'check' | 'coffee' | 'facebook' | 'tiktok'

// Final vendor exports, with unchanged geometry; sources and licenses are recorded in docs.
export function Icon({ name = 'arrow', className = '', style }: { name?: IconName; className?: string; style?: CSSProperties }) {
  return <svg className={`interface-icon ${className}`} style={style} width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
    <use href={`${publicAsset('/assets/icons/interface/sprite.svg')}#${name}`} width="256" height="256" />
  </svg>
}
