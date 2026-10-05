'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { cx } from './cx'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

export type GalleryItem = { src: string; alt?: string; title?: string; category?: string }

type GalleryProps = {
  items: GalleryItem[]
  /** show a tab per category above the grid (only when there are at least two) */
  filters?: boolean
  /** label of the tab that shows everything */
  allLabel?: string
  cols?: 2 | 3 | 4
  /** open a full-screen viewer on click */
  lightbox?: boolean
  loading?: boolean
  loadingLabel?: string
  emptyLabel?: string
}

/** Filter tabs + responsive photo grid + lightbox (Esc / arrow keys, backdrop click, prev / next). */
export function Gallery({ items, filters, allLabel = 'All', cols = 3, lightbox = true, loading, loadingLabel = 'Loading…', emptyLabel = 'No photos yet.' }: GalleryProps) {
  const [category, setCategory] = useState<string | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category).filter((c): c is string => !!c))), [items])
  const shown = useMemo(() => (category ? items.filter((i) => i.category === category) : items), [items, category])
  const current = open !== null ? shown[open] : undefined

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null || !shown.length ? i : (i + d + shown.length) % shown.length)), [shown.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open === null, close, step]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <p className="ds-gallery__status" role="status">
        {loadingLabel}
      </p>
    )
  }

  const caption = (item: GalleryItem) =>
    (item.category || item.title) && (
      <span className="ds-gallery__caption">
        {item.category && <span className="ds-gallery__cat">{item.category}</span>}
        {item.title && <span className="ds-gallery__title">{item.title}</span>}
      </span>
    )

  return (
    <div className={cx('ds-gallery', `ds-gallery--${cols}`)}>
      {filters && categories.length > 1 && (
        <div className="ds-gallery__tabs" role="group" aria-label="Filter">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? '__all'}
              type="button"
              className={cx('ds-gallery__tab', category === c && 'is-active')}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c)
                setOpen(null)
              }}
            >
              {c ?? allLabel}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="ds-gallery__status">{emptyLabel}</p>
      ) : (
        <div className="ds-gallery__grid">
          {shown.map((item, i) => (
            <Reveal key={`${item.src}-${i}`} delay={(i % cols) * 0.15}>
              {lightbox ? (
                <button type="button" className="ds-gallery__item" onClick={() => setOpen(i)} aria-label={item.title || item.alt || 'Open photo'}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt ?? item.title ?? ''} loading="lazy" decoding="async" />
                  {caption(item)}
                </button>
              ) : (
                <figure className="ds-gallery__item ds-gallery__item--static">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt ?? item.title ?? ''} loading="lazy" decoding="async" />
                  {caption(item)}
                </figure>
              )}
            </Reveal>
          ))}
        </div>
      )}

      {current && (
        <div className="ds-modal ds-gallery__light" role="dialog" aria-modal="true" aria-label={current.title || current.alt || 'Photo'} onClick={close}>
          <button type="button" className="ds-modal__close" aria-label="Close" onClick={close} autoFocus>
            <Icon name="close" size={18} strokeWidth={1.5} />
          </button>
          {shown.length > 1 && (
            <button
              type="button"
              className="ds-gallery__nav ds-gallery__nav--prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
            >
              <Icon name="prev" size={18} strokeWidth={1.5} />
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.src} alt={current.alt ?? current.title ?? ''} onClick={(e) => e.stopPropagation()} />
          {shown.length > 1 && (
            <button
              type="button"
              className="ds-gallery__nav ds-gallery__nav--next"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
            >
              <Icon name="next" size={18} strokeWidth={1.5} />
            </button>
          )}
          {(current.title || current.category) && (
            <p className="ds-gallery__lightcap">
              {current.category && <span className="ds-gallery__cat">{current.category}</span>}
              {current.title}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/** Full-width embedded map (or any embed) in a fixed-height band. */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <section className="ds-map">
      <iframe src={src} title={title} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
    </section>
  )
}
