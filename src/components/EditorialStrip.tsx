import { editorialCopy } from '../data/premiumDesign'
import { Icon } from './Icon'

export function EditorialStrip() {
  return <div className="editorial-strip">
    <div className="editorial-strip-inner page-width">
      <p className="editorial-thought"><span>{editorialCopy.thought}</span><em>{editorialCopy.thoughtAccent}</em></p>
      <div className="editorial-center" aria-hidden="true"><Icon name="coffee" /></div>
      <p className="editorial-result"><span>{editorialCopy.result}</span><em>{editorialCopy.resultAccent}</em></p>
    </div>
  </div>
}
