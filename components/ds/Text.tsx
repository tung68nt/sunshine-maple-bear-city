import type { ReactNode } from 'react'
import { cx } from './cx'
import { Reveal } from './Reveal'
import type { Tone } from './Heading'

type TextProps = {
  variant?: 'body' | 'quote' | 'small' | 'lead'
  tone?: Tone
  align?: 'left' | 'center' | 'right'
  delay?: number
  className?: string
  children: ReactNode
}

/** Body copy. Wrap several <p> in one <Text> to keep paragraph spacing. */
export function Text({ variant = 'body', tone, align, delay, className, children }: TextProps) {
  return (
    <Reveal
      delay={delay}
      className={cx('ds-text', variant !== 'body' && `ds-text--${variant}`, tone && `ds-tone-${tone}`, align === 'center' && 'ds-center', align === 'right' && 'ds-right', className)}
    >
      {typeof children === 'string' ? <p>{children}</p> : children}
    </Reveal>
  )
}

/** Small uppercase line above a heading; `ruled` adds the gold bars either side. */
export function Kicker({ children, tone, ruled, className }: { children: ReactNode; tone?: Tone; ruled?: boolean; className?: string }) {
  return <Reveal className={cx('ds-kicker', ruled && 'ds-kicker--ruled', tone && `ds-tone-${tone}`, className)}>{children}</Reveal>
}

export function Rule({ tone = 'red', className }: { tone?: 'red' | 'gold'; className?: string }) {
  return <Reveal className={cx('ds-rule', tone === 'gold' && 'ds-rule--gold', className)} />
}
