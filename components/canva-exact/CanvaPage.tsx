import type { ReactNode } from 'react'
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
