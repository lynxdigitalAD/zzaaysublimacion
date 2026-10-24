// Original outline icons for the three personalization choices.
export function IdeaIcon({ name }: { name: 'frase' | 'recuerdo' | 'marca' }) {
  return <svg className="idea-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === 'frase' && <path d="M20.5 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3.4-.7L4 21l1.1-4.5A8.5 8.5 0 1 1 20.5 11.5Z" />}
    {name === 'recuerdo' && <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="16.5" cy="7.5" r="1" /><path d="m3 16 5.5-5.5 4 4 3-3L21 17" /></>}
    {name === 'marca' && <><path d="M4 10v11h16V10M3 10l2-7h14l2 7M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 10l1-7m5 7-1-7M9 21v-7h6v7" /></>}
  </svg>
}
