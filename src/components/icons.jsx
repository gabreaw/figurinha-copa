function base(props) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...props,
  }
}

export function IconUser({ className = 'h-5 w-5' }) {
  return (
    <svg {...base({ className })}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  )
}

export function IconCalendar({ className = 'h-5 w-5' }) {
  return (
    <svg {...base({ className })}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

export function IconShield({ className = 'h-5 w-5' }) {
  return (
    <svg {...base({ className })}>
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
    </svg>
  )
}

export function IconClipboard({ className = 'h-5 w-5' }) {
  return (
    <svg {...base({ className })}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconCheck({ className = 'h-4 w-4' }) {
  return (
    <svg {...base({ className })}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}
