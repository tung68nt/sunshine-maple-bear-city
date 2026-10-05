import Link from 'next/link'
import type { MouseEventHandler, ReactNode } from 'react'
import { cx } from './cx'

type ButtonProps = {
  /**
   * glass / ghost — frosted, for use over footage · gold / solid / soft — filled ·
   * outline — the thin square button from the design (pair with `tone`)
   */
  variant?: 'glass' | 'ghost' | 'gold' | 'solid' | 'soft' | 'outline'
  tone?: 'white' | 'gold' | 'ink'
  size?: 'md' | 'lg'
  block?: boolean
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  children: ReactNode
  'aria-label'?: string
  'aria-expanded'?: boolean
}

/** The only button in the system: renders a Next link, an anchor or a <button> from `href`. */
export function Button({ variant = 'solid', tone, size, block, href, type = 'button', disabled, onClick, className, children, ...aria }: ButtonProps) {
  const cls = cx(
    'ds-btn',
    `ds-btn--${variant}`,
    variant === 'outline' && `ds-tone-${tone ?? 'ink'}`,
    size === 'lg' && 'ds-btn--lg',
    block && 'ds-btn--block',
    className
  )
  if (href) {
    const external = /^(https?:|mailto:|tel:|#)/.test(href)
    if (external) {
      const newTab = href.startsWith('http')
      return (
        <a className={cls} href={href} onClick={onClick} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined} {...aria}>
          {children}
        </a>
      )
    }
    return (
      <Link className={cls} href={href} onClick={onClick} {...aria}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick} {...aria}>
      {children}
    </button>
  )
}
