'use client'

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cx } from './cx'
import { observeReveal } from './observe-reveal'

type RevealProps = {
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'figure'
  /** `fade` (0.8s opacity) or `up` (0.4s rise) */
  variant?: 'fade' | 'up'
  /** seconds; use multiples of 0.3 to stagger siblings */
  delay?: number
  className?: string
  children?: ReactNode
}

/** Reveals its content the first time it scrolls into view. */
export function Reveal({ as = 'div', variant = 'fade', delay, className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined
  return createElement(as, { ref, className: cx('ds-reveal', `ds-reveal--${variant}`, className), style }, children)
}
