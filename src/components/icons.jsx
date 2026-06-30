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

export function IconPhoto({ className = 'h-6 w-6' }) {
  return (
    <svg {...base({ className })}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <path d="M21 16.5 15.4 11a2 2 0 0 0-2.8 0L4 19.5" />
    </svg>
  )
}

export function IconCamera({ className = 'h-6 w-6' }) {
  return (
    <svg {...base({ className })}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}

export function IconSparkle({ className = 'h-4 w-4' }) {
  return (
    <svg {...base({ className, fill: 'currentColor', stroke: 'none' })}>
      <path d="M12 2.5c.4 3 1.4 5 3 6.5s3.5 2.6 6.5 3c-3 .4-5 1.4-6.5 3s-2.6 3.5-3 6.5c-.4-3-1.4-5-3-6.5S5.5 12.4 2.5 12c3-.4 5-1.4 6.5-3s2.6-3.5 3-6.5Z" />
    </svg>
  )
}

export function IconTrophy({ className = 'h-7 w-7' }) {
  return (
    <svg {...base({ className })}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5.5a2.5 2.5 0 0 0 2.5 4.5M16 5h2.5A2.5 2.5 0 0 1 16 9.5" />
      <path d="M12 13v3M9 20h6M9.5 20c0-2 .8-3 2.5-3s2.5 1 2.5 3" />
    </svg>
  )
}

export function IconBall({ className = 'h-4 w-4' }) {
  return (
    <svg {...base({ className })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.3 15.8 10l-1.5 4.6h-4.6L8.2 10 12 7.3ZM12 3v4.3M4.3 9.3l3.9.7M4.7 17l3.7-2M19.7 9.3l-3.9.7M19.3 17l-3.7-2M9 21l1-4.4M15 21l-1-4.4" />
    </svg>
  )
}

export function IconStar({ className = 'h-4 w-4' }) {
  return (
    <svg {...base({ className, fill: 'currentColor', stroke: 'none' })}>
      <path d="M12 2.7l2.9 6 6.6.7-4.9 4.4 1.4 6.5L12 17l-5.9 3.3 1.4-6.5-4.9-4.4 6.6-.7L12 2.7Z" />
    </svg>
  )
}
