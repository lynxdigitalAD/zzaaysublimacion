// Original line artwork for the process heading and step illustrations.
export function ProcessSymbol({ name }: { name: 'flower' | 'bulb' | 'sparkles' }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === 'flower' && <><path d="M12 21v-7m0 3C8 13 8 7 12 3c4 4 4 10 0 14Z" /><path d="M12 18C6 18 3 14 3 9c5 0 8 3 9 7m0 2c6 0 9-4 9-9-5 0-8 3-9 7" /></>}
    {name === 'bulb' && <><path d="M8 14a7 7 0 1 1 8 0c-.7.5-1 1.1-1 2v2H9v-2c0-.9-.3-1.5-1-2Zm1 4h6m-5 3h4M12 1v1M2 6l2 1m16 0 2-1" /></>}
    {name === 'sparkles' && <><path d="M10 5c.7 5 2.2 7.2 7 8-4.8.8-6.3 3-7 8-.7-5-2.2-7.2-7-8 4.8-.8 6.3-3 7-8ZM19 2c.3 2.2 1 3.3 3 4-2 .7-2.7 1.8-3 4-.3-2.2-1-3.3-3-4 2-.7 2.7-1.8 3-4Z" /></>}
  </svg>
}
