import type { ReactNode } from 'react'

const PATHS = {
  play: <path d="M4.667 2.667 13.333 8l-8.666 5.333V2.667Z" />,
  pause: <path d="M4 14V2M11 14V2" />,
  search: <path d="m14 14-2.9-2.9M12.667 7.333A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z" />,
  close: <path d="M12 4 4 12M4 4l8 8" />,
  menu: <path d="M2 8h12M2 4h12M2 12h12" />,
  chevron: <path d="M3.333 10 8 5.333 12.667 10" />,
  chevronDown: <path d="M3.333 6 8 10.667 12.667 6" />,
  arrowDown: <path d="M8 3.333v9.334M8 12.667 12.667 8M8 12.667 3.333 8" />,
  back: <path d="M12.667 8H3.333M3.333 8 8 3.333M3.333 8 8 12.667" />,
  prev: <path d="M7.3 3.3 2.7 8l4.6 4.7M13.3 3.3 8.7 8l4.6 4.7" />,
  next: <path d="M8.7 3.3 13.3 8l-4.6 4.7M2.7 3.3 7.3 8l-4.6 4.7" />,
  pin: (
    <>
      <path d="M8 14s-4.3-3.7-4.3-7a4.3 4.3 0 0 1 8.6 0c0 3.3-4.3 7-4.3 7Z" />
      <circle cx="8" cy="7" r="1.5" />
    </>
  ),
  phone: <path d="M3.3 2.7h2.4l1.1 2.9-1.5 1a7.7 7.7 0 0 0 4.1 4.1l1-1.5 2.9 1.1v2.4a1 1 0 0 1-1 1C7 13.7 2.3 9 2.3 3.7a1 1 0 0 1 1-1Z" />,
  mail: (
    <>
      <rect x="2" y="3.7" width="12" height="8.6" />
      <path d="m2 3.7 6 4.6 6-4.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M2 8h12M8 2c2 2.1 2 9.9 0 12M8 2c-2 2.1-2 9.9 0 12M3.3 4.7h9.4M3.3 11.3h9.4" />
    </>
  ),
  bulb: <path d="M6 12h4M6.7 14h2.6M8 2a4 4 0 0 0-2.3 7.3c.400.3.6.8.6 1.4h3.4c0-.600.2-1.1.6-1.4A4 4 0 0 0 8 2ZM2 6H1.3M14.7 6H14M3.3 2l-.500-.500M12.7 2l.500-.500" />,
  mind: (
    <>
      <path d="M5.3 14v-2.1A5 5 0 1 1 13 7.3l1 2h-1.3V11a1 1 0 0 1-1 1h-1v2" />
      <circle cx="8" cy="6.7" r="1.5" />
      <path d="M8 4v1.2M8 8.2v1.2M5.3 6.7h1.2M9.5 6.7h1.2" />
    </>
  ),
  star: <path d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8Z" />,
  cap: (
    <>
      <path d="M1.3 6 8 2.7 14.7 6 8 9.3 1.3 6Z" />
      <path d="M4 7.4v3c1 1.1 2.4 1.6 4 1.6s3-.500 4-1.6v-3M14.7 6v3.7" />
    </>
  ),
  atom: (
    <>
      <circle cx="8" cy="8" r="1" />
      <ellipse cx="8" cy="8" rx="6.3" ry="2.5" />
      <ellipse cx="8" cy="8" rx="6.3" ry="2.5" transform="rotate(60 8 8)" />
      <ellipse cx="8" cy="8" rx="6.3" ry="2.5" transform="rotate(120 8 8)" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof PATHS

/** Line icon on a 16px grid; sized by the `size` prop or by the surrounding component's CSS. */
export function Icon({ name, size, strokeWidth = 1 }: { name: IconName; size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}

const SOCIAL_PATHS = {
  facebook:
    'M12 2a10 10 0 0 0-1.56 19.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.440 2.89h-2.33v6.99A10 10 0 0 0 12 2Z',
  instagram:
    'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.1-3.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z',
  linkedin:
    'M4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2Zm1.2 7.3V18h2.7V9.3H5.7Zm1.35-4.1a1.56 1.56 0 1 0 0 3.12 1.56 1.56 0 0 0 0-3.12ZM10.1 9.3V18h2.7v-4.56c0-1.2.23-2.37 1.72-2.37 1.47 0 1.49 1.37 1.49 2.45V18h2.7v-5.04c0-2.47-.530-4.37-3.42-4.37-1.39 0-2.32.76-2.7 1.48h-.040V9.3H10.1Z',
  youtube:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5.3 7.3c.200.8.2 2.7.2 2.7s0 1.9-.200 2.7a1.56 1.56 0 0 1-1.1 1.1c-1 .250-4.2.25-4.2.25s-3.2 0-4.2-.250a1.56 1.56 0 0 1-1.1-1.1c-.200-.800-.200-2.7-.200-2.7s0-1.9.2-2.7a1.56 1.56 0 0 1 1.1-1.1c1-.250 4.2-.250 4.2-.250s3.2 0 4.2.25c.540.14.96.56 1.1 1.1ZM10.7 14.1l2.9-2.1-2.9-2.1v4.2Z',
}

export type SocialName = keyof typeof SOCIAL_PATHS

export function SocialIcon({ name }: { name: SocialName }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  )
}
