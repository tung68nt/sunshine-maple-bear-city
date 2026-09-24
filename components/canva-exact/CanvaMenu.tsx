'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { CvPageData } from './types'
import { CvBackground, CvLinkEl, CvTextEl, type V } from './primitives'

/** Canva "Page 2": slide-in menu. Opened by any element with [data-menu-open]. */
export function CanvaMenu({ menu, basePath }: { menu: CvPageData; basePath?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-menu-open]')
      if (el) { e.preventDefault(); setOpen(true) }
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])
  if (!open) return null
  return (
    <div className="cv-menu">
      <div className="cv-menu-backdrop" style={{ background: menu.overlay }} onClick={() => setOpen(false)} />
      <nav className="cv-menu-panel" aria-label="Main menu">
        <div className="cv-page" style={{ '--h': menu.height, '--W': menu.width } as V}>
          <CvBackground page={menu} eager={1} />
          {menu.text.map((t, i) => <CvTextEl key={i} t={t} />)}
          {menu.links.map((l, i) => <CvLinkEl key={i} l={l} basePath={basePath} />)}
          <input className="cv-search" type="search" aria-label="Search" style={{ '--x': 46, '--y': 28, '--w': 218, '--h': 26 } as V} />
          <button type="button" className="cv-menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        </div>
      </nav>
    </div>
  )
}
