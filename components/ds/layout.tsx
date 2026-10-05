'use client'

import { useState, type ReactNode } from 'react'
import { cx } from './cx'
import { displayClass } from './Heading'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { Text } from './Text'

type SectionProps = {
  tone?: 'cream' | 'white' | 'red' | 'deep' | 'maroon' | 'gold'
  /** no padding: for full-bleed patterns that bring their own */
  flush?: boolean
  /** centre the content in the 1024-point design column */
  contained?: boolean
  id?: string
  className?: string
  children: ReactNode
}

/** A horizontal band of the page. */
export function Section({ tone = 'cream', flush, contained = true, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cx('ds-section', `ds-section--${tone}`, flush && 'ds-section--flush', className)}>
      {contained ? <div className="ds-wrap">{children}</div> : children}
    </section>
  )
}

/** Vertical rhythm between siblings. */
export function Stack({ gap = 'md', center, children }: { gap?: 'md' | 'lg'; center?: boolean; children: ReactNode }) {
  return <div className={cx('ds-stack', gap === 'lg' && 'ds-stack--lg', center && 'ds-stack--center')}>{children}</div>
}

/** Responsive columns: one on phones, `cols` from 768px (`aside` = 2:1). */
export function Grid({ cols = 2, children }: { cols?: 2 | 3 | 4 | 'aside'; children: ReactNode }) {
  return <div className={cx('ds-grid', `ds-grid--${cols}`)}>{children}</div>
}

export function Card({ tone = 'cream', plain, delay, children }: { tone?: 'cream' | 'white' | 'gold'; plain?: boolean; delay?: number; children: ReactNode }) {
  return (
    <Reveal delay={delay} className={cx('ds-card', tone !== 'cream' && `ds-card--${tone}`, plain && 'ds-card--plain')}>
      {children}
    </Reveal>
  )
}

type MediaProps = {
  src: string
  alt: string
  ratio?: 'portrait' | 'landscape' | 'wide' | 'square'
  frame?: 'white' | 'red'
  variant?: 'fade' | 'up'
  eager?: boolean
}

/** A photograph in a fixed aspect ratio, optionally framed. */
export function Media({ src, alt, ratio = 'landscape', frame, variant = 'fade', eager }: MediaProps) {
  return (
    <Reveal as="figure" variant={variant} className={cx('ds-media', `ds-media--${ratio}`, frame && `ds-media--${frame}`)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </Reveal>
  )
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <Reveal>
      <ul className="ds-list ds-text">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Reveal>
  )
}

/** Disclosure list (FAQ): one answer open at a time. */
export function Accordion({ items, defaultOpen = 0 }: { items: { question: string; answer: ReactNode }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  return (
    <Reveal className="ds-accordion">
      {items.map((item, i) => (
        <div key={item.question} className={cx('ds-accordion__item', open === i && 'is-open')}>
          <button type="button" className={cx('ds-accordion__q', displayClass(item.question, false))} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {item.question}
            <Icon name="chevronDown" strokeWidth={1.5} />
          </button>
          <div className="ds-accordion__a">
            <div>
              <div className="ds-text">{item.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </Reveal>
  )
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Reveal>
      <table className="ds-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="ds-badge">{children}</span>
}

export { Text }
