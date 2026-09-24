import os
WORK=os.environ.get("CANVA_WORK","build-canva")
"""Generate a drop-in Next.js (App Router) module from out/site.json"""
import json, os, shutil, re
OUT = WORK+"/out"
NX = WORK+"/next"
S = json.load(open(f"{OUT}/site.json"))
P = S["pages"]
FONTS = sorted(set(S["fonts"].values()))

shutil.rmtree(NX, ignore_errors=True)
C = f"{NX}/components/canva-exact"
os.makedirs(f"{C}/data", exist_ok=True)
os.makedirs(f"{NX}/public/canva-exact", exist_ok=True)
shutil.copytree(f"{OUT}/assets/bg", f"{NX}/public/canva-exact/bg")
shutil.copytree(f"{OUT}/assets/fonts", f"{NX}/public/canva-exact/fonts")

for k, p in P.items():
    d = {kk: vv for kk, vv in p.items() if kk not in ("file",)}
    for b in d["bg"]: b["src"] = "/canva-exact/" + b["src"]
    json.dump(d, open(f"{C}/data/{k}.json", "w"), ensure_ascii=False, separators=(",", ":"))

css = open(f"{OUT}/assets/css/canva.css").read()
css = css.replace("url(../fonts/", "url(/canva-exact/fonts/")
css = css.replace("html,body{margin:0;background:#fff8ee}\n", "")
open(f"{C}/canva-exact.css", "w").write(css)

FCLS = {f: f"f{i}" for i, f in enumerate(FONTS)}

W = {}
W["types.ts"] = '''export type CvText = {
  t: string; x: number; y: number; f: string; s: number; c: string
  ls?: number; o?: number; hidden?: boolean; tag?: 'h1' | 'h2' | 'h3' | 'p'
}
export type CvLink = { x: number; y: number; w: number; h: number; href: string; label: string }
export type CvField = {
  name: string; label: string; type: 'text' | 'tel' | 'email' | 'date' | 'textarea'
  x: number; y: number; w: number; h: number; required: boolean
}
export type CvForm = { x: number; y: number; anchorY: number; fields: CvField[] }
export type CvPageData = {
  slug: string; title?: string; route?: string; width: number; height: number
  bg: { src: string; y: number; h: number }[]
  text: CvText[]; links: CvLink[]; form: CvForm | null; overlay?: string
}
'''

W["fonts.ts"] = "// generated: font file -> css class\nexport const FONT_CLASS: Record<string, string> = " + json.dumps(FCLS, indent=2) + "\n"

W["primitives.tsx"] = '''import Link from 'next/link'
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
'''

W["CanvaPage.tsx"] = '''import type { ReactNode } from 'react'
import type { CvPageData } from './types'
import { CvBackground, CvLinkEl, CvTextEl, type V } from './primitives'
import { CanvaContactForm } from './CanvaContactForm'
import { CanvaMenu } from './CanvaMenu'
import menuData from './data/menu.json'
import './canva-exact.css'

/**
 * Pixel-exact rendering of one Canva page.
 * Layers: background slices (text removed) -> live text -> links / form.
 * `children` render inside the page box; position them in design units with calc(N * var(--u)).
 */
export function CanvaPage({ page, basePath = '', children }: { page: CvPageData; basePath?: string; children?: ReactNode }) {
  return (
    <>
      <main className="cv">
        <div className="cv-page" style={{ '--h': page.height } as V}>
          <CvBackground page={page} />
          {page.text.map((t, i) => <CvTextEl key={i} t={t} />)}
          {page.links.map((l, i) => <CvLinkEl key={i} l={l} basePath={basePath} />)}
          {page.form && <CanvaContactForm form={page.form} />}
          {children}
        </div>
      </main>
      <CanvaMenu menu={menuData as CvPageData} basePath={basePath} />
    </>
  )
}
'''

W["CanvaMenu.tsx"] = ''''use client'
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
'''

W["CanvaContactForm.tsx"] = ''''use client'
import { useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import type { CvForm } from './types'

type V = CSSProperties & Record<`--${string}`, string | number>

/**
 * Live inputs laid exactly over the Canva form artwork (labels/placeholders stay in the background image;
 * a field turns opaque once focused or filled).
 * Set NEXT_PUBLIC_CANVA_CONTACT_ENDPOINT to POST the values as JSON, e.g. to an API route of your own.
 */
export function CanvaContactForm({ form }: { form: CvForm }) {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    let ok = true
    f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea').forEach((el) => {
      const bad = !el.checkValidity() || (el.required && !el.value.trim())
      el.setAttribute('aria-invalid', String(bad))
      if (bad) ok = false
    })
    if (!ok) return
    const data = Object.fromEntries(new FormData(f).entries())
    const url = process.env.NEXT_PUBLIC_CANVA_CONTACT_ENDPOINT
    setBusy(true)
    try {
      if (url) {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        if (!r.ok) throw new Error(await r.text())
      }
      f.reset()
      setSent(true)
    } catch (err) {
      console.error(err)
      alert('Sorry, the form could not be sent. Please call 094 254 6655.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <span id="contact" className="cv-anchor" style={{ '--y': form.anchorY } as V} />
      <form id="cv-contact" className="cv-form" style={{ '--x': form.x, '--y': form.y } as V} noValidate onSubmit={onSubmit} aria-busy={busy}>
        {form.fields.map((x) => {
          const style: V = { '--x': x.x, '--y': x.y, '--w': x.w, '--h': x.h }
          if (x.type === 'textarea')
            return <textarea key={x.name} name={x.name} aria-label={x.label} placeholder=" " required={x.required} style={style} />
          if (x.type === 'date')
            return <input key={x.name} name={x.name} aria-label={x.label} placeholder=" " type="text" style={style}
              onFocus={(e) => { e.currentTarget.type = 'date' }}
              onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text' }} />
          return <input key={x.name} name={x.name} aria-label={x.label} placeholder=" " type={x.type} required={x.required} style={style} />
        })}
        {sent && <p className="cv-form-ok" role="status">Thank you! We will contact you shortly.</p>}
      </form>
    </>
  )
}
'''

W["index.ts"] = '''export { CanvaPage } from './CanvaPage'
export type { CvPageData } from './types'
import home from './data/home.json'
import about from './data/about.json'
import academics from './data/academics.json'
import admissions from './data/admissions.json'
import foundingFamilies from './data/founding-families.json'
import type { CvPageData } from './types'
export const canvaPages = {
  home: home as CvPageData,
  about: about as CvPageData,
  academics: academics as CvPageData,
  admissions: admissions as CvPageData,
  foundingFamilies: foundingFamilies as CvPageData,
}
'''
for name, src in W.items():
    open(f"{C}/{name}", "w").write(src)

# ---- preview routes under /canva-exact (do not touch the existing pages) ----
routes = {"": ("home", "Home"), "about": ("about", "About Us"), "academics": ("academics", "Academics"),
          "admissions": ("admissions", "Admissions"), "admissions/founding-families": ("foundingFamilies", "Founding Families")}
for r, (key, title) in routes.items():
    d = f"{NX}/app/canva-exact/{r}".rstrip("/")
    os.makedirs(d, exist_ok=True)
    open(f"{d}/page.tsx", "w").write(f'''import type {{ Metadata }} from 'next'
import {{ CanvaPage, canvaPages }} from '@/components/canva-exact'

export const metadata: Metadata = {{ title: '{title}', robots: {{ index: false }} }}

export default function Page() {{
  return <CanvaPage page={{canvaPages.{key}}} basePath="/canva-exact" />
}}
''')

open(f"{NX}/README-canva-exact.md", "w").write('''# Canva-exact pages for Next.js

Pixel-exact rendering of `design.pdf` (Canva). Every element sits at its exact PDF coordinate and
the whole page scales with the viewport width (CSS container units, no JS, works with SSR).

## Install (copy into the project root)

    components/canva-exact/      renderer + page data (JSON)
    public/canva-exact/          background slices (WebP 2x) + fonts (WOFF2)
    app/canva-exact/             preview routes: /canva-exact, /canva-exact/about, ...

Nothing existing is modified. Open `/canva-exact` to compare with the current site.

## Replace a real page

    // app/about/page.tsx
    import { CanvaPage, canvaPages } from '@/components/canva-exact'
    export default function Page() { return <CanvaPage page={canvaPages.about} /> }

Without `basePath`, internal links go to `/`, `/about`, `/academics`, `/admissions`,
`/admissions/founding-families`.

## Editing content

- Text: `components/canva-exact/data/<page>.json` -> `text[]` (`t` = string, `x`/`y` = PDF points,
  `s` = font size, `c` = colour, `ls` = letter-spacing, `o` = opacity).
  Keep new text roughly the same length, since each line is positioned absolutely like in Canva.
- Links / buttons: `links[]` (`href` = route, `#contact`, `tel:`, `mailto:`, `menu`, `submit`).
- Contact form: set `NEXT_PUBLIC_CANVA_CONTACT_ENDPOINT` to POST form JSON
  (fields: name, phone, email, childName, childDob, currentSchool, message).
- Images: background slices in `public/canva-exact/bg` are the design with text removed. To swap a photo,
  regenerate from a new Canva export (see the build scripts) rather than editing slices by hand.

## Fonts

`TheSeasons` and `Gordita` are commercial fonts embedded by Canva as subsets (only the glyphs used in
the design). Buy web licences before production and replace the WOFF2 files; new characters
(e.g. Vietnamese diacritics) need the full font files.
''')
print("next module generated")
