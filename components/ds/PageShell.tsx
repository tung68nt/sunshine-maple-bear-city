'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cx } from './cx'
import { HeroVideoContext } from './Hero'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'

type PageShellProps = {
  /** a <Hero> (home) or <PageHero> (inner pages); omit for a page that starts with content */
  hero?: ReactNode
  /** `home` wires the hero video's play / pause into the navigation */
  variant?: 'home' | 'page'
  children: ReactNode
}

/**
 * Frame for every public page: `.ds` scope, navigation, hero, `main`, and the footer
 * revealed underneath as the page ends.
 */
export function PageShell({ hero, variant = 'page', children }: PageShellProps) {
  const mainRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // the fixed footer shows through a bottom margin on `main` equal to its height
  useEffect(() => {
    const main = mainRef.current
    const footer = footerRef.current
    if (!main || !footer) return
    const apply = () => {
      main.style.marginBottom = `${footer.offsetHeight}px`
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(footer)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="ds">
      <HeroVideoContext.Provider value={videoRef}>
        <SiteNav overHero={!!hero} videoRef={variant === 'home' ? videoRef : undefined} />
        {hero}
      </HeroVideoContext.Provider>
      <main ref={mainRef} className={cx('ds-main', !!hero && 'ds-main--after-hero')}>
        {children}
      </main>
      <SiteFooter ref={footerRef} reveal />
    </div>
  )
}
