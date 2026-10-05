'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { cx } from './cx'
import { Button } from './Button'
import { Heading, displayClass } from './Heading'
import { Reveal } from './Reveal'
import { Stat } from './Stat'
import { Text } from './Text'

/**
 * Section blocks modelled on Rugby School Hanoi's inner pages (image + text rows, sticky
 * stat column, stacking steps, fee rows, quote over a photograph), in Sunshine Maple
 * Bear colours. These are the default building blocks for every sub-page.
 */
type Img = { src: string; alt: string }
type Action = { label: string; href: string; variant?: 'solid' | 'soft' | 'gold' }

function Photo({ src, alt, className }: Img & { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
}

function Actions({ actions }: { actions?: Action[] }) {
  if (!actions?.length) return null
  return (
    <Reveal className="ds-actions">
      {actions.map((a) => (
        <Button key={a.label} variant={a.variant ?? 'solid'} href={a.href}>
          {a.label}
        </Button>
      ))}
    </Reveal>
  )
}

type CopyProps = {
  kicker?: string
  title: string
  accent?: string
  /** string, or several <p> */
  children?: ReactNode
  actions?: Action[]
}

function Copy({ kicker, title, accent, children, actions }: CopyProps) {
  return (
    <div className="ds-copy">
      {kicker && <Reveal className={cx('ds-copy__kicker', displayClass(kicker, true))}>{kicker}</Reveal>}
      <Heading tone="deep" accent={accent} accentTone="gold" className="ds-copy__title">
        {title}
      </Heading>
      {children && <Text className="ds-copy__body">{children}</Text>}
      <Actions actions={actions} />
    </div>
  )
}

/** Opening block of a page: large heading, copy and buttons on the left; a photograph that stays in view on the right, behind a hairline. */
export function Lead({ image, ...copy }: CopyProps & { image?: Img }) {
  return (
    <section className="ds-block ds-lead">
      <Copy {...copy} />
      {image && (
        <Reveal className="ds-lead__media">
          <Photo {...image} />
        </Reveal>
      )}
    </section>
  )
}

/** Text beside a square photograph. Alternate `reverse` and `tone="sand"` down the page. */
export function ImageText({ image, reverse, tone = 'cream', id, ...copy }: CopyProps & { image: Img; reverse?: boolean; tone?: 'cream' | 'sand' | 'white'; id?: string }) {
  return (
    <section id={id} className={cx('ds-block ds-imagetext', reverse && 'ds-imagetext--reverse', `ds-block--${tone}`)}>
      <Copy {...copy} />
      <Reveal className="ds-imagetext__media">
        <Photo {...image} />
      </Reveal>
    </section>
  )
}

/** Text-only block on the page column, for long-form copy (policies, articles) or an intro above a list. */
export function TextBlock({ tone = 'cream', narrow, id, children, ...copy }: CopyProps & { tone?: 'cream' | 'sand' | 'white'; narrow?: boolean; id?: string }) {
  return (
    <section id={id} className={cx('ds-block ds-textblock', narrow && 'ds-textblock--narrow', `ds-block--${tone}`)}>
      <Copy {...copy}>{children}</Copy>
    </section>
  )
}

/** A plain block wrapper with Rugby spacing, for grids, tables, accordions and forms. */
export function Block({ tone = 'cream', id, children }: { tone?: 'cream' | 'sand' | 'white'; id?: string; children: ReactNode }) {
  return (
    <section id={id} className={cx('ds-block', `ds-block--${tone}`)}>
      {children}
    </section>
  )
}

/** Hairline between two blocks of the same colour. */
export function Divider() {
  return (
    <div className="ds-divider">
      <div />
    </div>
  )
}

/** Heading that stays put, a tall photograph that stays put, and a column of figures scrolling past them. */
export function StickyStats({ image, stats, ...copy }: CopyProps & { image: Img; stats: { value: string; label: string; text?: string }[] }) {
  return (
    <section className="ds-block ds-stickystats">
      <div className="ds-stickystats__main">
        <div className="ds-stickystats__copy">
          <Copy {...copy} />
        </div>
        <Reveal className="ds-stickystats__media">
          <Photo {...image} />
        </Reveal>
      </div>
      <div className="ds-stickystats__list">
        {stats.map((s) => (
          <Reveal key={s.label} className="ds-stickystats__item">
            <Stat value={s.value} label={s.label} tone="deep" />
            {s.text && <p className="ds-text ds-text--small">{s.text}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Numbered steps that pin under one another as the page scrolls, each sliding over the last. */
export function StickySteps({ title, accent, intro, steps }: { title?: string; accent?: string; intro?: string; steps: { title: string; text: ReactNode; action?: Action }[] }) {
  return (
    <section className="ds-block ds-stickysteps">
      {title && <Copy title={title} accent={accent}>{intro}</Copy>}
      <ol className="ds-stickysteps__list">
        {steps.map((step, i) => (
          <li key={step.title} className="ds-stickysteps__step" style={{ ['--i' as string]: i }}>
            <div className="ds-stickysteps__head">
              <span className="ds-stickysteps__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={cx('ds-stickysteps__title', displayClass(step.title))}>{step.title}</h3>
            </div>
            <div className="ds-stickysteps__body">
              <div className="ds-text">{typeof step.text === 'string' ? <p>{step.text}</p> : step.text}</div>
              {step.action && (
                <div className="ds-actions">
                  <Button variant={step.action.variant ?? 'soft'} href={step.action.href}>
                    {step.action.label}
                  </Button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Ruled rows of label / value / note — fees, term dates, schedules. */
export function Rows({ rows }: { rows: { label: string; value?: ReactNode; note?: ReactNode }[] }) {
  return (
    <div className="ds-rows">
      {rows.map((row, i) => (
        <Reveal key={row.label} delay={Math.min(i, 5) * 0.1} className="ds-rows__row">
          <div className={cx('ds-rows__label', displayClass(row.label))}>{row.label}</div>
          {row.value != null && <div className="ds-rows__value">{row.value}</div>}
          {row.note && <div className="ds-rows__note ds-text ds-text--small">{row.note}</div>}
        </Reveal>
      ))}
    </div>
  )
}

/** A few words set very large over a full-bleed photograph. */
export function QuoteBand({ image, quote, attribution }: { image: Img; quote: string; attribution?: string }) {
  return (
    <section className="ds-quoteband">
      <Photo {...image} className="ds-quoteband__img" />
      <div className="ds-quoteband__veil" />
      <div className="ds-quoteband__inner">
        <Heading as="p" size="hero" tone="white" caps={false} className="ds-quoteband__quote">
          {quote}
        </Heading>
        {attribution && <Reveal className="ds-quoteband__by">{attribution}</Reveal>}
      </div>
    </section>
  )
}

/** Closing band: one line, a sentence and buttons, centred on deep red. */
export function CallToAction({ title, text, actions }: { title: string; text?: string; actions?: Action[] }) {
  return (
    <section className="ds-cta">
      <Heading tone="white" align="center" className="ds-cta__title">
        {title}
      </Heading>
      {text && (
        <Text align="center" className="ds-cta__text">
          {text}
        </Text>
      )}
      {actions && (
        <Reveal className="ds-actions ds-actions--center">
          {actions.map((a, i) => (
            <Button key={a.label} variant={i === 0 ? 'gold' : 'ghost'} href={a.href}>
              {a.label}
            </Button>
          ))}
        </Reveal>
      )}
    </section>
  )
}

/** Card for a news post, event or gallery album: photo, small line, title, excerpt — the whole card is the link. */
export function PostCard({ href, image, meta, title, text, delay }: { href: string; image?: Img; meta?: string; title: string; text?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className="ds-post">
      <Link href={href} className="ds-post__link">
        <div className="ds-post__media">{image && <Photo {...image} />}</div>
        {meta && <div className="ds-post__meta">{meta}</div>}
        <h3 className={cx('ds-post__title', displayClass(title))}>{title}</h3>
        {text && <p className="ds-post__text">{text}</p>}
      </Link>
    </Reveal>
  )
}

/** Portrait card for a teacher or leader. */
export function PersonCard({ image, name, role, text, delay }: { image?: Img; name: string; role?: string; text?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className="ds-person">
      <div className="ds-person__media">{image && <Photo {...image} />}</div>
      <h3 className={cx('ds-person__name', displayClass(name))}>{name}</h3>
      {role && <div className="ds-person__role">{role}</div>}
      {text && <p className="ds-person__text">{text}</p>}
    </Reveal>
  )
}

/** Small titled item for feature / value grids. */
export function Fact({ title, text, kicker, delay }: { title: string; text?: ReactNode; kicker?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className="ds-fact">
      {kicker && <div className="ds-fact__kicker">{kicker}</div>}
      <h3 className={cx('ds-fact__title', displayClass(title))}>{title}</h3>
      {text && <div className="ds-text ds-text--small">{typeof text === 'string' ? <p>{text}</p> : text}</div>}
    </Reveal>
  )
}
