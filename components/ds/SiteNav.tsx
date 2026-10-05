'use client'

import { useEffect, useState, type RefObject } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cx } from './cx'
import { Button } from './Button'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NAV_LINKS, SITE } from './site'

type SiteNavProps = {
  /**
   * `true` when the page opens on a full-height hero: buttons are frosted glass until
   * the hero is scrolled past. Otherwise they are solid gold from the start.
   */
  overHero?: boolean
  /** the hero's background video, to offer play / pause */
  videoRef?: RefObject<HTMLVideoElement | null>
}

/**
 * Site navigation (Rugby School Hanoi behaviour): a utility bar that exists only at the
 * very top, and a floating bar that hides while scrolling down and returns on the way
 * up; menu and search open as a cream panel over a dark scrim.
 */
export function SiteNav({ overHero = false, videoRef }: SiteNavProps) {
  const router = useRouter()
  const [atTop, setAtTop] = useState(true)
  const [pastHero, setPastHero] = useState(!overHero)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [query, setQuery] = useState('')
  const [sticky, setSticky] = useState(false)
  const open = menuOpen || searchOpen
  const [links, setLinks] = useState(NAV_LINKS)

  // top-level menu managed in the admin (Navigation) replaces the built-in list when present
  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/navigation')
      // signed-out visitors are redirected to the login page (HTML): keep the built-in menu then
      .then((r) => (r.ok && r.headers.get('content-type')?.includes('application/json') ? r.json() : null))
      .then((json) => {
        if (cancelled || !json?.success || !Array.isArray(json.data) || !json.data.length) return
        const mapped = json.data
          .map((item: Record<string, string>) => ({
            label: item.labelVi || item.label_vi || item.label || item.title,
            href: item.href || item.path,
          }))
          .filter((l: { label?: string; href?: string }) => l.label && l.href)
        if (mapped.length) setLinks(mapped)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y === 0)
      setPastHero(!overHero || y > window.innerHeight)
      if (!open) {
        if (y > last) setHidden(true)
        else if (y < last) setHidden(false)
      }
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [open, overHero])

  // lock the page and keep the bar visible while a panel is open; Esc closes it
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    setHidden(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // mobile sticky call-to-action appears shortly after leaving the top
  useEffect(() => {
    if (atTop) {
      setSticky(false)
      return
    }
    const t = setTimeout(() => setSticky(true), 150)
    return () => clearTimeout(t)
  }, [atTop])

  useEffect(() => {
    const v = videoRef?.current
    if (!v) return
    const on = () => setPlaying(true)
    const off = () => setPlaying(false)
    v.addEventListener('play', on)
    v.addEventListener('pause', off)
    setPlaying(!v.paused)
    return () => {
      v.removeEventListener('play', on)
      v.removeEventListener('pause', off)
    }
  }, [videoRef])

  const togglePlayback = () => {
    const v = videoRef?.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  const submitSearch = () => {
    const q = query.trim()
    if (!q) return
    setSearchOpen(false)
    router.push(`/blog?search=${encodeURIComponent(q)}`)
  }

  const closeMenu = () => setMenuOpen(false)
  const glass = pastHero ? 'gold' : 'glass'
  const panel = pastHero || open ? 'gold' : 'glass'

  return (
    <>
      <nav aria-label="Top navigation bar" className={cx('ds-topbar', !atTop && 'is-hidden')}>
        <LanguageSwitcher />
        <a href={SITE.phoneHref} className="notranslate">
          {SITE.phone}
        </a>
        <Link href="/contact">Liên hệ</Link>
      </nav>

      <nav aria-label="Main navigation" className={cx('ds-nav', atTop && 'is-top', hidden && 'is-hidden', open && 'is-open', searchOpen && 'is-search')}>
        <div className="ds-nav__bar">
          <div className="ds-nav__row">
            {(atTop || open) && (
              <Link href="/" aria-label={SITE.name} className="ds-nav__logo">
                <span className={open ? undefined : 'ds-nav__plate'}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SITE.logo} alt={`${SITE.name} ${SITE.descriptor}`} width={51} height={64} />
                </span>
              </Link>
            )}

            {searchOpen && (
              <div className="ds-nav__panel ds-nav__search">
                <label htmlFor="ds-search">Tìm kiếm</label>
                <input
                  id="ds-search"
                  placeholder="Nhập từ khóa"
                  value={query}
                  autoFocus
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                />
              </div>
            )}

            {menuOpen && (
              <div className="ds-nav__panel">
                {links.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenu} className="ds-nav__link">
                    {item.label}
                  </Link>
                ))}
                <div className="ds-nav__cta">
                  <Button variant="soft" block href={SITE.visitHref} onClick={closeMenu}>
                    Tham quan
                  </Button>
                  <Button variant="soft" block href={SITE.applyHref} onClick={closeMenu}>
                    Tuyển sinh
                  </Button>
                </div>
              </div>
            )}

            <div className="ds-nav__actions">
              <div className={cx('ds-nav__sticky', sticky && !open && 'is-shown')}>
                <Button variant="gold" block href={SITE.visitHref}>
                  Tham quan
                </Button>
                <Button variant="gold" block href={SITE.applyHref}>
                  Tuyển sinh
                </Button>
              </div>

              {!open && videoRef && !pastHero && (
                <Button variant="ghost" className="ds-only-desktop" onClick={togglePlayback} aria-label={playing ? 'Tạm dừng video' : 'Phát video'}>
                  <Icon name={playing ? 'pause' : 'play'} size={16} />
                  {playing ? 'Tạm dừng' : 'Phát'}
                </Button>
              )}

              {!open && (
                <>
                  <Button variant={glass} className="ds-only-desktop" href={SITE.visitHref}>
                    Tham quan
                  </Button>
                  <Button variant={glass} className="ds-only-desktop" href={SITE.applyHref}>
                    Tuyển sinh
                  </Button>
                </>
              )}

              {!menuOpen && (
                <Button
                  variant={panel}
                  onClick={() => {
                    setSearchOpen((s) => !s)
                    setMenuOpen(false)
                  }}
                  aria-label={searchOpen ? 'Đóng tìm kiếm' : 'Mở tìm kiếm'}
                >
                  <Icon name={searchOpen ? 'close' : 'search'} size={16} />
                  <span className="ds-btn__label">{searchOpen ? 'Đóng' : 'Tìm kiếm'}</span>
                </Button>
              )}

              {!open && (
                <span className="ds-only-desktop">
                  <LanguageSwitcher button={glass} />
                </span>
              )}

              {!searchOpen && (
                <Button
                  variant={panel}
                  onClick={() => {
                    setMenuOpen((m) => !m)
                    setSearchOpen(false)
                  }}
                  aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
                >
                  <Icon name={menuOpen ? 'close' : 'menu'} size={16} />
                  <span className="ds-btn__label">{menuOpen ? 'Đóng' : 'Menu'}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
