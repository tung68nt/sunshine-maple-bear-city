import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { CvPageData, CvText, CvLink } from './types'
import { FONT_CLASS } from './fonts'

export type V = CSSProperties & Record<`--${string}`, string | number>

/** Prefix internal routes (e.g. basePath="/canva-exact" while previewing next to the current site). */
export function resolveHref(href: string, basePath = '') {
  if (!href.startsWith('/')) return href
  const [path, hash] = href.split('#')
  const p = basePath ? basePath + (path === '/' ? '' : path) : path
  return (p || '/') + (hash ? '#' + hash : '')
}

export function CvTextEl({ t }: { t: CvText }) {
  const Tag = t.tag ?? 'p'
  const style: V = { '--x': t.x, '--y': t.y, '--s': t.s, '--c': t.c }
  if (t.ls) style['--ls'] = t.ls
  if (t.o !== undefined) style.opacity = t.o
  return (
    <Tag className={`cv-t ${FONT_CLASS[t.f]}${t.hidden ? ' cv-ghost' : ''}`} style={style}>
      {t.t}
    </Tag>
  )
}

export function CvLinkEl({ l, basePath }: { l: CvLink; basePath?: string }) {
  const style: V = { '--x': l.x, '--y': l.y, '--w': l.w, '--h': l.h }
  if (l.href === 'menu')
    return <button type="button" className="cv-a" data-menu-open aria-label={l.label} style={style} />
  if (l.href === 'submit')
    return <button type="submit" form="cv-contact" className="cv-a" aria-label={l.label} style={style} />
  const href = resolveHref(l.href, basePath)
  if (href.startsWith('/'))
    return <Link className="cv-a" href={href} aria-label={l.label} style={style} />
  return <a className="cv-a" href={href} aria-label={l.label} style={style} />
}

export function CvBackground({ page, eager = 1 }: { page: CvPageData; eager?: number }) {
  return (
    <>
      {page.bg.map((b, i) => (
        // Plain <img>: slices are pre-rendered 2x WebP; next/image would resample them.
        // eslint-disable-next-line @next/next/no-img-element
        <img key={b.src} className="cv-bg" src={b.src} alt="" decoding="async"
          loading={i < eager ? 'eager' : 'lazy'} fetchPriority={i < eager ? 'high' : undefined}
          style={{ '--y': b.y, '--h': b.h } as V} />
      ))}
    </>
  )
}
