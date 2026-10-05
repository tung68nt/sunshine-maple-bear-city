'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { cx } from './cx'
import { Button } from './Button'
import { displayClass } from './Heading'
import { PageHero } from './Hero'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

/**
 * News and events: the article layout with a pinned side column (Rugby's news pages),
 * and the controls a listing needs around a `Grid` of `PostCard`s.
 */

/** `PageHero` for a post or event: the same fixed photograph, with the title set at reading size because it is a sentence, not a word. */
export function ArticleHero({ title, image, crumbs }: { title: string; image?: string; crumbs?: { label: string; href: string }[] }) {
  return (
    <div className="ds-articlehero">
      <PageHero title={title} image={image} crumbs={crumbs} />
    </div>
  )
}

/** Long-form layout: the reading column, and an aside that stays pinned beside it from 768px (below it on phones). */
export function Article({ aside, children }: { aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="ds-block ds-article">
      <div className="ds-article__main">{children}</div>
      {aside && (
        <aside className="ds-article__aside">
          <div className="ds-article__pin">{aside}</div>
        </aside>
      )}
    </section>
  )
}

/**
 * Rich text of an article: headings, paragraphs, lists, links, images and quotes are styled
 * here. Pass JSX children, or `html` that the caller has already sanitised.
 */
export function RichText({ html, children }: { html?: string; children?: ReactNode }) {
  if (html != null) return <div className="ds-article__body" dangerouslySetInnerHTML={{ __html: html }} />
  return <div className="ds-article__body">{children}</div>
}

/** A titled group inside the article aside; `tone="sand"` sets it on a panel. */
export function AsidePanel({ title, tone = 'plain', children }: { title?: string; tone?: 'plain' | 'sand'; children: ReactNode }) {
  return (
    <div className={cx('ds-asidepanel', tone === 'sand' && 'ds-asidepanel--sand')}>
      {title && <h2 className={cx('ds-asidepanel__title', displayClass(title))}>{title}</h2>}
      {children}
    </div>
  )
}

/** Small label / value lines: date, category, place, seats. */
export function MetaList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="ds-metalist">
      {items.map((item) => (
        <div key={item.label} className="ds-metalist__row">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** A short list of links: stacked (contents, further reading) or `inline` (share). */
export function LinkList({ links, inline }: { links: { label: string; href: string }[]; inline?: boolean }) {
  return (
    <ul className={cx('ds-linklist', inline && 'ds-linklist--inline')}>
      {links.map((l) => {
        const external = l.href.startsWith('http')
        return (
          <li key={l.label}>
            {external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ) : l.href.startsWith('#') ? (
              <a href={l.href}>{l.label}</a>
            ) : (
              <Link href={l.href}>{l.label}</Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

type FilterBarProps = {
  /** omit `onSearch` for a listing without search */
  search?: string
  onSearch?: (value: string) => void
  searchLabel?: string
  placeholder?: string
  categoriesLabel?: string
  categories?: { value: string; label: string; count?: number }[]
  active?: string
  onSelect?: (value: string) => void
}

/** Controls above a listing: a search field and a row of category chips. */
export function FilterBar({ search = '', onSearch, searchLabel = 'Search', placeholder, categoriesLabel, categories, active, onSelect }: FilterBarProps) {
  return (
    <Reveal className="ds-filterbar">
      {onSearch && (
        <form className="ds-filterbar__search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="ds-filterbar-q" className="ds-filterbar__label">
            {searchLabel}
          </label>
          <div className="ds-filterbar__field">
            <input id="ds-filterbar-q" type="search" value={search} placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
            <Icon name="search" size={16} />
          </div>
        </form>
      )}
      {!!categories?.length && (
        <div className="ds-filterbar__cats">
          {categoriesLabel && <div className="ds-filterbar__label">{categoriesLabel}</div>}
          <div className="ds-filterbar__chips">
            {categories.map((c) => (
              <button key={c.value} type="button" className={cx('ds-filterbar__chip', active === c.value && 'is-active')} aria-pressed={active === c.value} onClick={() => onSelect?.(c.value)}>
                {c.label}
                {c.count != null && <span>{c.count}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </Reveal>
  )
}

/** Page numbers under a listing; renders nothing for a single page. */
export function Pagination({ page, pages, onChange, label = 'Pagination', prevLabel = 'Previous page', nextLabel = 'Next page' }: { page: number; pages: number; onChange: (page: number) => void; label?: string; prevLabel?: string; nextLabel?: string }) {
  if (pages <= 1) return null
  return (
    <nav className="ds-pagination" aria-label={label}>
      <Button variant="soft" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label={prevLabel}>
        <Icon name="prev" size={16} />
      </Button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" className={cx('ds-pagination__n', n === page && 'is-active')} aria-current={n === page ? 'page' : undefined} onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
      <Button variant="soft" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label={nextLabel}>
        <Icon name="next" size={16} />
      </Button>
    </nav>
  )
}

/** Shown in place of a listing that has nothing to show (no items, no matches, failed to load). */
export function EmptyState({ title, text, action }: { title?: string; text: string; action?: { label: string; href?: string; onClick?: () => void } }) {
  return (
    <div className="ds-state" role="status">
      {title && <h3 className={cx('ds-state__title', displayClass(title))}>{title}</h3>}
      <p className="ds-text">{text}</p>
      {action && (
        <div className="ds-actions ds-actions--center">
          <Button variant="soft" href={action.href} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

/** Shown while a listing loads. */
export function LoadingState({ text }: { text: string }) {
  return (
    <div className="ds-state ds-state--loading" role="status" aria-live="polite">
      <span className="ds-state__spinner" aria-hidden="true" />
      <p className="ds-text">{text}</p>
    </div>
  )
}
