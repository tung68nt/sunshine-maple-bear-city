'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import Link from 'next/link'
import { cx } from './cx'
import { Button } from './Button'
import { Heading } from './Heading'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

/** Lets the navigation reach the hero's video for its play / pause button. */
export const HeroVideoContext = createContext<RefObject<HTMLVideoElement | null> | null>(null)

/**
 * Rugby parallax: above 768px the fixed hero drifts up at half the scroll speed while the
 * page slides over it; once scrolled past its own height it drops behind the footer.
 */
function useHeroParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = ref.current
    if (!hero) return
    let ticking = false
    let resizeTimer: ReturnType<typeof setTimeout>
    const update = () => {
      const y = window.scrollY
      hero.style.transform = window.innerWidth > 768 ? `translateY(-${y * 0.5}px)` : ''
      hero.style.zIndex = y > hero.offsetHeight ? '-1' : '1'
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(update, 200)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])
}

type HeroProps = {
  title: string
  subtitle?: string
  video?: string
  poster?: string
  image?: string
  cta?: { label: string; href: string }
  /** pinned to the bottom edge, e.g. a row of <Stat> */
  footer?: ReactNode
}

/**
 * Full-height opening hero. From 768px it is fixed and drifts up at half scroll speed
 * while the page slides over it (Rugby parallax); once scrolled past it drops behind
 * the footer.
 */
export function Hero({ title, subtitle, video, poster, image, cta, footer }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const sharedVideo = useContext(HeroVideoContext)
  const ownVideo = useRef<HTMLVideoElement>(null)
  const videoRef = sharedVideo ?? ownVideo
  const [playing, setPlaying] = useState(true)

  useHeroParallax(ref)

  useEffect(() => {
    const v = videoRef.current
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

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <header ref={ref} className="ds-hero ds-hero--fixed">
      <div className="ds-hero__bg">
        {video ? (
          <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster={poster} aria-label={`${title} video`}>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          image && <img src={image} alt="" />
        )}
        <div className="ds-hero__shade" />
      </div>

      <div className="ds-hero__content">
        <div className="ds-hero__center">
          <Heading as="h1" size="hero" className="ds-hero__title notranslate">
            {title}
          </Heading>
          {subtitle && (
            <Heading as="p" size="xl" className="ds-hero__sub">
              {subtitle}
            </Heading>
          )}
          {cta && (
            <Reveal className="ds-hero__cta">
              <Button variant="outline" tone="gold" size="lg" href={cta.href}>
                {cta.label}
              </Button>
            </Reveal>
          )}
        </div>

        {footer && (
          <Reveal className="ds-hero__stats">
            <div className="ds-hero__rule" />
            <div className="ds-hero__grid">{footer}</div>
          </Reveal>
        )}

        {video && (
          <div className="ds-hero__play">
            <Button variant="ghost" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
              <Icon name={playing ? 'pause' : 'play'} size={16} />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

type PageHeroProps = {
  title: string
  image?: string
  /** trail before the current page, e.g. [{ label: 'Home', href: '/' }] */
  crumbs?: { label: string; href: string }[]
}

/**
 * Hero for inner pages: a full-height photograph with the oversized title set bottom-left
 * (design.pdf pages 3–6), fixed with the same parallax as the home hero (Rugby inner pages).
 */
export function PageHero({ title, image, crumbs }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  useHeroParallax(ref)
  return (
    <header ref={ref} className="ds-hero ds-hero--fixed ds-hero--page">
      <div className="ds-hero__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image && <img src={image} alt="" />}
        <div className="ds-hero__veil" />
      </div>
      <div className="ds-hero__content">
        <div className="ds-wrap ds-hero__foot">
          <Heading as="h1" size="mega" className="ds-hero__pagetitle">
            {title}
          </Heading>
          {crumbs && (
            <Reveal className={cx('ds-crumbs')}>
              {crumbs.map((c) => (
                <span key={c.href}>
                  <Link href={c.href}>{c.label}</Link> /
                </span>
              ))}
              <span>{title}</span>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  )
}
