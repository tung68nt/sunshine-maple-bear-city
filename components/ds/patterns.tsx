'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { cx } from './cx'
import { Button } from './Button'
import { Heading } from './Heading'
import { Icon, type IconName } from './Icon'
import { Reveal } from './Reveal'
import { Stat } from './Stat'
import { Kicker, Text } from './Text'
import { WorldMap } from './WorldMap'

type Img = { src: string; alt: string }
type Action = { label: string; href: string }

function Photo({ src, alt, className, eager }: Img & { className?: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" />
}

/** Full-bleed photograph with a cream card laid over its left edge. */
export function OverlayCard({ image, title, children }: { image: Img; title: string; children: ReactNode }) {
  return (
    <section className="ds-overlay">
      <Reveal>
        <Photo {...image} className="ds-overlay__img" eager />
      </Reveal>
      <div className="ds-wrap ds-overlay__wrap">
        <div className="ds-overlay__card">
          <Heading tone="gold" className="ds-overlay__title">
            {title}
          </Heading>
          <Text className="ds-overlay__body">{children}</Text>
        </div>
      </div>
    </section>
  )
}

/** Centred statement: ruled kicker, one-line heading with an accent word, italic quote. */
export function Statement({ kicker, title, accent, quote }: { kicker?: string; title: string; accent?: string; quote?: string }) {
  return (
    <section className="ds-centered">
      {kicker && <Kicker ruled>{kicker}</Kicker>}
      <Heading align="center" accent={accent} className="ds-centered__title">
        {title}
      </Heading>
      {quote && (
        <Text variant="quote" align="center" className="ds-centered__quote">
          {quote}
        </Text>
      )}
    </section>
  )
}

type SplitProps = {
  kicker?: string
  title: string
  children: ReactNode
  /** right-hand column, usually <Media> or <Portrait> */
  media: ReactNode
}

/** Red band: text on the left, a picture on the right. */
export function Split({ kicker, title, children, media }: SplitProps) {
  return (
    <section className="ds-split">
      <div className="ds-wrap ds-split__inner">
        <div className="ds-split__text">
          {kicker && <Reveal className="ds-split__kicker">{kicker}</Reveal>}
          <Heading size="lg" className="ds-split__title">
            {title}
          </Heading>
          <Text variant="quote" className="ds-split__quote">
            {children}
          </Text>
        </div>
        {media}
      </div>
    </section>
  )
}

/** Portrait for <Split>, with an optional button that opens a video. */
export function Portrait({ image, video }: { image: Img; video?: { src: string; poster?: string; label: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Reveal className="ds-split__media">
        <Photo {...image} className="ds-cover" />
        {video && (
          <button type="button" className="ds-split__play" onClick={() => setOpen(true)}>
            <Icon name="play" size={12} />
            {video.label}
          </button>
        )}
      </Reveal>
      {video && open && <VideoModal src={video.src} poster={video.poster} label={video.label} onClose={() => setOpen(false)} />}
    </>
  )
}

/** Lightbox video player; closes on Esc, on the backdrop and on its close button. */
export function VideoModal({ src, poster, label, onClose }: { src: string; poster?: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="ds-modal" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <button type="button" className="ds-modal__close" aria-label="Close video" onClick={onClose}>
        <Icon name="close" size={18} strokeWidth={1.5} />
      </button>
      <video src={src} poster={poster} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} />
    </div>
  )
}

/** Full-screen photo viewer with previous / next; closes on Esc, the backdrop and its close button. */
export function Lightbox({ images, index, onChange, onClose }: { images: Img[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const count = images.length
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, count, onChange, onClose])
  const current = images[index]
  const go = (dir: 1 | -1) => (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    onChange((index + dir + count) % count)
  }
  return (
    <div className="ds-modal ds-gallery__light" role="dialog" aria-modal="true" aria-label={current.alt || 'Photo'} onClick={onClose}>
      <button type="button" className="ds-modal__close" aria-label="Close" onClick={onClose} autoFocus>
        <Icon name="close" size={18} strokeWidth={1.5} />
      </button>
      {count > 1 && (
        <button type="button" className="ds-gallery__nav ds-gallery__nav--prev" aria-label="Previous photo" onClick={go(-1)}>
          <Icon name="prev" size={18} strokeWidth={1.5} />
        </button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={current.src} alt={current.alt} onClick={(e) => e.stopPropagation()} />
      {count > 1 && (
        <button type="button" className="ds-gallery__nav ds-gallery__nav--next" aria-label="Next photo" onClick={go(1)}>
          <Icon name="next" size={18} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}

type FeatureProps = {
  title: string
  accent?: string
  children: ReactNode
  photo: Img
  /** two small photographs stacked in the red frame; clicking one swaps it into the large photo's place */
  framed: [Img, Img]
  tone?: 'black' | 'gold'
}

/** Photo collage on a gold base (left) with a heading, rule and right-aligned copy. */
export function Feature({ title, accent, children, photo, framed, tone = 'black' }: FeatureProps) {
  // [large, small, small] — clicking a small photo trades places with the large one
  const [order, setOrder] = useState<Img[]>([photo, ...framed])
  const promote = (i: number) =>
    setOrder((o) => {
      const next = [...o]
      ;[next[0], next[i]] = [next[i], next[0]]
      return next
    })
  return (
    <div className="ds-feature__top">
      <div className="ds-feature__collage">
        <Reveal>
          <Photo key={order[0].src} {...order[0]} className="ds-feature__photo" />
        </Reveal>
        <Reveal variant="up" className="ds-feature__frame">
          {[1, 2].map((i) => (
            <button key={i} type="button" className="ds-feature__zoom" onClick={() => promote(i)} aria-label={`Show larger: ${order[i].alt}`}>
              <Photo key={order[i].src} {...order[i]} />
            </button>
          ))}
        </Reveal>
      </div>
      <div className="ds-feature__text">
        <Heading tone={tone} accent={accent} className="ds-feature__title">
          {title}
        </Heading>
        <Reveal className="ds-feature__rule" />
        <Text align="right" className="ds-feature__body">
          {children}
        </Text>
      </div>
    </div>
  )
}

/** Numbered list (01, 02 …) whose active item swaps the picture beside it. */
export function Steps({ items, initial = 0 }: { items: { title: string; image: Img }[]; initial?: number }) {
  const [active, setActive] = useState(initial)
  return (
    <div className="ds-steps">
      <ol className="ds-steps__list">
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.3}>
            <button
              type="button"
              className={cx('ds-step', i === active && 'is-active')}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="ds-step__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="ds-step__t">{item.title}</span>
            </button>
          </Reveal>
        ))}
      </ol>
      <Reveal className="ds-steps__media">
        {items.map((item, i) => (
          <Photo key={item.image.src} src={item.image.src} alt={i === active ? item.image.alt : ''} className={i === active ? 'is-active' : undefined} />
        ))}
      </Reveal>
    </div>
  )
}

type ShowcaseProps = {
  title: string
  accent?: string
  action?: Action
  big: Img
  small: Img
  items: { icon: IconName; title: string; text: string }[]
}

/** Deep-red band: heading and overlapping photographs on the left, a gold icon list on the right. */
export function Showcase({ title, accent, action, big, small, items }: ShowcaseProps) {
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
        <div className="ds-showcase__panel">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.3} className="ds-showcase__item">
              <Icon name={item.icon} strokeWidth={0.7} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Oversized section title with a script word tucked under its end, over a full-bleed strip (usually a <Carousel>). */
export function MegaBand({ title, script, children }: { title: string; script?: string; children?: ReactNode }) {
  return (
    <section className="ds-mega">
      <div className="ds-wrap ds-mega__head">
        <Heading size="mega" tone="deep" className="ds-mega__title">
          {title}
        </Heading>
        {script && <Reveal className="ds-mega__script">{script}</Reveal>}
      </div>
      {children}
    </section>
  )
}

/** Horizontal, snap-scrolling strip of captioned photographs with previous / next arrows. */
export function Carousel({ items }: { items: (Img & { title: string; href: string })[] }) {
  const track = useRef<HTMLDivElement>(null)

  // open on the second card so a neighbour peeks in from each side, as in the design
  useEffect(() => {
    const el = track.current
    const card = el?.children[1] as HTMLElement | undefined
    if (el && card) el.scrollLeft = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
  }, [])

  const slide = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)), behavior: 'smooth' })
  }

  return (
    <Reveal className="ds-carousel">
      <button type="button" className="ds-carousel__nav ds-carousel__nav--prev" onClick={() => slide(-1)} aria-label="Previous">
        <Icon name="prev" strokeWidth={1.4} />
      </button>
      <div className="ds-carousel__track" ref={track}>
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="ds-card-photo">
            <Photo src={item.src} alt={item.alt} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <button type="button" className="ds-carousel__nav ds-carousel__nav--next" onClick={() => slide(1)} aria-label="Next">
        <Icon name="next" strokeWidth={1.4} />
      </button>
    </Reveal>
  )
}

type NetworkProps = {
  stats: { value: string; label: string }[]
  title: string
  accent?: string
  text: string
  action?: Action
}

/** The Maple Bear world map beside its figures, closed by a ruled title. */
export function Network({ stats, title, accent, text, action }: NetworkProps) {
  return (
    <section className="ds-world">
      <div className="ds-wrap">
        <div className="ds-world__top">
          <div className="ds-world__map">
            <WorldMap />
          </div>
          <div className="ds-world__stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.3}>
                <Stat value={s.value} label={s.label} tone="deep" mode="count" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="ds-world__heading">
        <Heading tone="black" align="center" accent={accent} accentTone="deep" className="ds-world__title">
          {title}
        </Heading>
      </div>
      <Text align="center" className="ds-world__body">
        {text}
      </Text>
      {action && (
        <Reveal className="ds-world__cta">
          <Button variant="outline" tone="ink" href={action.href}>
            {action.label}
          </Button>
        </Reveal>
      )}
    </section>
  )
}

/** Photograph band carrying a translucent card: heading, intro and a form. */
export function FormBand({ id, image, title, accent, intro, children }: { id?: string; image: string; title: string; accent?: string; intro?: string; children: ReactNode }) {
  return (
    <section className="ds-formband" id={id} style={{ backgroundImage: `url(${image})` }}>
      <div className="ds-wrap">
        <Reveal className="ds-formband__card">
          <Heading accent={accent} className="ds-formband__title">
            {title}
          </Heading>
          {intro && <p className="ds-formband__intro">{intro}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
