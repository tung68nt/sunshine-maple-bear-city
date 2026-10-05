import type { ReactNode } from 'react'
import { cx } from './cx'
import { Button } from './Button'
import { Heading } from './Heading'
import { Reveal } from './Reveal'
import { Text } from './Text'

type Img = { src: string; alt: string }
type Action = { label: string; href: string }

function Photo({ src, alt, className }: Img & { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
}

type PanelSplitProps = {
  title: string
  children: ReactNode
  image: Img
  /** small logo shown in the gold tile that overlaps the photograph's left edge */
  badge?: Img
}

/** Deep-red band: gold heading and copy on the left, a tall photograph standing on a gold panel on the right. */
export function PanelSplit({ title, children, image, badge }: PanelSplitProps) {
  return (
    <section className="ds-panelsplit">
      <div className="ds-wrap ds-panelsplit__inner">
        <div className="ds-panelsplit__text">
          <Heading size="hero" tone="gold">
            {title}
          </Heading>
          <Text tone="white" className="ds-panelsplit__body">
            {children}
          </Text>
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

type TierCardsProps = {
  items: { label: string; title: string; text: string }[]
  /** closing heading under the cards, below a gold hairline */
  title?: string
  accent?: string
}

/** A row of shadowed cards (gold label, small display title, copy) closed by a ruled, centred heading. */
export function TierCards({ items, title, accent }: TierCardsProps) {
  return (
    <section className="ds-tiers">
      <div className="ds-wrap">
        <div className="ds-tiers__grid">
          {items.map((item, i) => (
            <Reveal key={item.title} variant="up" delay={i * 0.3} className="ds-tiers__card">
              <p className="ds-tiers__label">{item.label}</p>
              <Heading as="h3" size="sm" tone="black" className="ds-tiers__title">
                {item.title}
              </Heading>
              <p className="ds-tiers__text">{item.text}</p>
            </Reveal>
          ))}
        </div>
        {title && (
          <>
            <Reveal className="ds-tiers__rule" />
            <Heading align="center" tone="ink" accent={accent} accentTone="deep">
              {title}
            </Heading>
          </>
        )}
      </div>
    </section>
  )
}

/** Full-bleed strip of one photograph, cropped to a shallow band. */
export function PhotoBand({ image, anchor = 'center' }: { image: Img; anchor?: 'top' | 'center' }) {
  return (
    <Reveal as="figure" className={cx('ds-photoband', anchor === 'top' && 'ds-photoband--top')}>
      <Photo {...image} />
    </Reveal>
  )
}

type TimelineProps = {
  items: { label: string; text: string }[]
  title?: string
  image: Img
  /** outlined button laid over the foot of the photograph */
  action?: Action
}

/** Ruled list of labelled entries (times, dates) with a heading beneath, beside a tall photograph. */
export function Timeline({ items, title, image, action }: TimelineProps) {
  return (
    <div className="ds-timeline">
      <div className="ds-timeline__main">
        <ol className="ds-timeline__list">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.3} className="ds-timeline__item">
              <Heading as="h3" size="md" tone="deep">
                {item.label}
              </Heading>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ol>
        {title && (
          <Heading tone="gold" className="ds-timeline__title">
            {title}
          </Heading>
        )}
      </div>
      <div className="ds-timeline__media">
        <Reveal className="ds-timeline__photo">
          <Photo {...image} className="ds-cover" />
        </Reveal>
        {action && (
          <Reveal className="ds-timeline__cta">
            <Button variant="outline" tone="white" href={action.href}>
              {action.label}
            </Button>
          </Reveal>
        )}
      </div>
    </div>
  )
}

type ShowcaseListProps = {
  title: string
  accent?: string
  action?: Action
  big: Img
  small: Img
  items: { kicker: string; title: string; text: string }[]
}

/**
 * <Showcase> with a text-only gold panel: each entry is a red kicker, a title and a line of copy
 * instead of an icon. Shares every `ds-showcase` rule; fold into <Showcase> (optional `icon`,
 * new `kicker`) when that file is free to edit.
 */
export function ShowcaseList({ title, accent, action, big, small, items }: ShowcaseListProps) {
  return (
    <section className="ds-showcase">
      <div className="ds-wrap ds-showcase__inner">
        <div className="ds-showcase__left">
          <div className="ds-showcase__head">
            <Heading accent={accent} accentTone="gold" className="ds-showcase__title">
              {title}
            </Heading>
            {action && (
              <Reveal className="ds-showcase__cta">
                <Button variant="outline" tone="white" href={action.href}>
                  {action.label}
                </Button>
              </Reveal>
            )}
          </div>
          <div className="ds-showcase__media">
            <Reveal>
              <Photo {...big} className="ds-showcase__big" />
            </Reveal>
            <Reveal variant="up" className="ds-showcase__small">
              <Photo {...small} className="ds-cover" />
            </Reveal>
          </div>
        </div>
        <div className="ds-showcase__panel ds-showcase__panel--list">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.3} className="ds-showcase__item">
              <p className="ds-showcase__kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
