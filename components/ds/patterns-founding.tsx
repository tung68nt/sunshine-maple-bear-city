'use client'

import type { ReactNode } from 'react'
import { cx } from './cx'
import { Button } from './Button'
import { fitsBrandFace, Heading } from './Heading'
import { Reveal } from './Reveal'

type Img = { src: string; alt: string }
type Action = { label: string; href: string }

type BigFigureProps = {
  /** short lines in capitals above the figure, one entry per line */
  lead?: string[]
  /** the oversized number, e.g. "40" */
  value: string
  /** smaller sign set after the number, e.g. "%" */
  unit?: string
  /** display heading under the figure */
  title: string
  align?: 'left' | 'right'
  /** for red / dark bands: cream lead and gold title */
  inverse?: boolean
  action?: Action
}

/** Headline built around one oversized figure: capital lead-in lines, the number, a display title and an optional button. */
export function BigFigure({ lead, value, unit, title, align = 'left', inverse, action }: BigFigureProps) {
  return (
    <div className={cx('ds-bigfigure', align === 'right' && 'ds-bigfigure--right', inverse && 'ds-bigfigure--inverse')}>
      {lead && (
        <Reveal as="p" className="ds-bigfigure__lead">
          {lead.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </Reveal>
      )}
      <Reveal variant="up" className={cx('ds-bigfigure__value ds-heading', !fitsBrandFace(value + (unit ?? ''), false) && 'is-safe')}>
        {value}
        {unit && <small>{unit}</small>}
      </Reveal>
      <Heading className="ds-bigfigure__title">{title}</Heading>
      {action && (
        <Reveal className="ds-bigfigure__cta">
          <Button variant="outline" tone={inverse ? 'white' : 'ink'} href={action.href}>
            {action.label}
          </Button>
        </Reveal>
      )}
    </div>
  )
}

/** Red band with a soft glow: a cut-out (transparent) picture standing on the bottom-left edge, content on the right. */
export function CutoutBand({ image, children }: { image: Img; children: ReactNode }) {
  return (
    <section className="ds-cutout">
      <div className="ds-wrap ds-cutout__inner">
        <Reveal className="ds-cutout__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        </Reveal>
        <div className="ds-cutout__text">{children}</div>
      </div>
    </section>
  )
}
