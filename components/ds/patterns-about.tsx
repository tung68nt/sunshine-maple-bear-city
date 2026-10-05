'use client'

import type { ReactNode } from 'react'
import { cx } from './cx'
import { Button } from './Button'
import { fitsBrandFace, Heading } from './Heading'
import { Icon, type IconName } from './Icon'
import { FormBand } from './patterns'
import { Reveal } from './Reveal'
import { Stat } from './Stat'
import { Text } from './Text'

type Img = { src: string; alt: string }
type Action = { label: string; href: string }

function Photo({ src, alt, className }: Img & { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
}

type PanelBandProps = {
  /** `deep`: red band with white copy · `cream`: page-coloured band with dark copy */
  tone?: 'deep' | 'cream'
  /** small gold line above the title, underlined by a rule that runs in from the left edge */
  kicker?: string
  title?: string
  /** second, smaller heading line under the title */
  subtitle?: string
  image: Img
  /** small logo shown in the gold tile that overlaps the photograph's left edge */
  badge?: Img
  /** left-hand column under the headings: <Text>, <BigFigure>, … */
  children: ReactNode
}

/**
 * <PanelSplit> with a free left column: optional ruled kicker, two-line heading and any content,
 * on a deep-red or cream band. Shares every `ds-panelsplit` rule; fold into <PanelSplit>
 * (`tone`, `kicker`, `subtitle`, node children) when that file is free to edit.
 */
export function PanelBand({ tone = 'deep', kicker, title, subtitle, image, badge, children }: PanelBandProps) {
  return (
    <section className={cx('ds-panelsplit', tone === 'cream' && 'ds-panelsplit--cream')}>
      <div className="ds-wrap ds-panelsplit__inner">
        <div className="ds-panelsplit__text">
          {kicker && <Reveal className="ds-panelsplit__kicker">{kicker}</Reveal>}
          {title && (
            <Heading tone="gold" className="ds-panelsplit__title">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Heading as="p" size="lg" tone="gold" className="ds-panelsplit__sub">
              {subtitle}
            </Heading>
          )}
          <div className="ds-panelsplit__body">{children}</div>
        </div>
        <div className="ds-panelsplit__media">
          <Reveal className="ds-panelsplit__photo">
            <Photo {...image} className="ds-cover" />
          </Reveal>
          {badge && (
            <Reveal variant="up" className="ds-panelsplit__badge">
              <Photo {...badge} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

type QuoteCollageProps = {
  /** three photographs side by side, left to right */
  images: [Img, Img, Img]
  /** the quotation, set justified in the gold card */
  children: ReactNode
  action?: Action
}

/** Row of three photographs standing on a red side block, with a gold quotation card laid over the right-hand two. */
export function QuoteCollage({ images, children, action }: QuoteCollageProps) {
  return (
    <section className="ds-quotecollage">
      <div className="ds-wrap ds-quotecollage__inner">
        <div className="ds-quotecollage__photos">
          {images.map((image, i) => (
            <Reveal key={image.src} delay={i * 0.3} className="ds-quotecollage__photo">
              <Photo {...image} className="ds-cover" />
            </Reveal>
          ))}
        </div>
        <Reveal variant="up" className="ds-quotecollage__card">
          <Text tone="white" className="ds-quotecollage__quote">
            {children}
          </Text>
          {action && (
            <div className="ds-quotecollage__cta">
              <Button variant="outline" tone="white" href={action.href}>
                {action.label}
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

type StatCollageProps = {
  title: string
  /** one column each; `framed` puts the photograph in a gold frame */
  items: { value: string; label: string; image: Img; framed?: boolean }[]
}

/** Ruled, centred heading over staggered columns that pair a photograph with a counting figure (photo above / figure above, alternating). */
export function StatCollage({ title, items }: StatCollageProps) {
  return (
    <section className="ds-statcollage">
      <div className="ds-statcollage__heading">
        <Heading tone="ink" align="center" className="ds-statcollage__title">
          {title}
        </Heading>
      </div>
      <div className="ds-wrap ds-statcollage__grid">
        {items.map((item, i) => (
          <div key={item.label} className={cx('ds-statcollage__item', item.framed && 'is-framed')}>
            <Reveal delay={i * 0.3} className="ds-statcollage__photo">
              <Photo {...item.image} className="ds-cover" />
            </Reveal>
            <Reveal delay={i * 0.3}>
              <Stat value={item.value} label={item.label} mode="count" />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}

type HighlightsProps = {
  /** background photograph (already soft / out of focus works best) */
  image: string
  title: string
  accent?: string
  items: { icon: IconName; title: string; text: string; action?: Action }[]
}

/** <FormBand> opened to the full column: a translucent card over a photograph, holding a heading and columns of icon, title, copy and button. */
export function Highlights({ image, title, accent, items }: HighlightsProps) {
  return (
    <div className="ds-highlights">
      <FormBand image={image} title={title} accent={accent}>
        <div className="ds-highlights__grid">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.3} className="ds-highlights__item">
              <Icon name={item.icon} strokeWidth={0.6} />
              <h3 className={cx('ds-heading', !fitsBrandFace(item.title, false) && 'is-safe')}>{item.title}</h3>
              <p>{item.text}</p>
              {item.action && (
                <Button variant="outline" tone="ink" href={item.action.href}>
                  {item.action.label}
                </Button>
              )}
            </Reveal>
          ))}
        </div>
      </FormBand>
    </div>
  )
}
