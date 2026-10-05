'use client'

import { createElement, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cx } from './cx'
import { observeReveal } from './observe-reveal'

export type Tone = 'ink' | 'black' | 'white' | 'red' | 'deep' | 'gold'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
  /** mega 88 · hero 52 · xl 37 · lg 26 · md 22 · sm 11 (design points at 1024) */
  size?: 'mega' | 'hero' | 'xl' | 'lg' | 'md' | 'sm'
  tone?: Tone
  /** words (exact, in order) picked out in the accent colour */
  accent?: string
  accentTone?: 'red' | 'deep' | 'gold'
  align?: 'left' | 'center' | 'right'
  caps?: boolean
  className?: string
  children: string
}

// Characters present in the bundled The Seasons subset (see ds.css, tokens).
const BRAND_GLYPHS = new Set(' %&-.012345678:ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghilmnoprstuvwy ')
export const fitsBrandFace = (text: string, caps: boolean) => [...(caps ? text.toUpperCase() : text)].every((ch) => BRAND_GLYPHS.has(ch))

/**
 * Class for a short display-face title outside <Heading> (card titles, row labels…):
 * the brand face when the string is fully covered, the complete fallback face otherwise.
 * Capitals by default, because the bundled subset has almost every capital but lacks
 * several lower-case letters — so sibling titles end up in the same face.
 */
export const displayClass = (text: string, caps = true) =>
  ['ds-display', caps && 'ds-display--caps', !fitsBrandFace(text, caps) && 'is-safe'].filter(Boolean).join(' ')

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Display heading. Splits itself into the lines the browser actually wrapped and
 * raises them one after another on first view (Rugby `.line-wrap`); re-measures when
 * its width changes.
 */
export function Heading({ as = 'h2', size = 'xl', tone, accent, accentTone = 'red', align, caps = true, className, children }: HeadingProps) {
  const ref = useRef<HTMLElement>(null)
  const widthRef = useRef(0)
  const [lines, setLines] = useState<number[] | null>(null)
  const text = children.trim()
  const words = text.split(/\s+/)
  const accentWords = accent ? accent.trim().split(/\s+/) : []
  const accentAt = accentWords.length ? words.findIndex((_, i) => accentWords.every((a, j) => words[i + j] === a)) : -1
  const isAccent = (i: number) => accentAt >= 0 && i >= accentAt && i < accentAt + accentWords.length

  // measure: words sit inline-block and hidden until we know where the lines break
  useIsoLayoutEffect(() => {
    if (lines !== null) return
    const el = ref.current
    if (!el) return
    const counts: number[] = []
    let top: number | null = null
    el.querySelectorAll<HTMLElement>('[data-w]').forEach((s) => {
      if (top === null || s.offsetTop !== top) {
        counts.push(0)
        top = s.offsetTop
      }
      counts[counts.length - 1]++
    })
    widthRef.current = el.clientWidth
    setLines(counts)
  }, [lines, text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const stop = observeReveal(el)
    const ro = new ResizeObserver(() => {
      if (widthRef.current !== 0 && el.clientWidth !== widthRef.current) setLines(null)
    })
    ro.observe(el)
    return () => {
      stop()
      ro.disconnect()
    }
  }, [])

  return createElement(
    as,
    {
      ref,
      'aria-label': text,
      className: cx(
        'ds-heading ds-lines',
        `ds-heading--${size}`,
        caps && 'ds-heading--caps',
        !fitsBrandFace(text, caps) && 'is-safe',
        tone && `ds-tone-${tone}`,
        align === 'center' && 'ds-center',
        align === 'right' && 'ds-right',
        className
      ),
      style: lines === null ? { visibility: 'hidden' } : undefined,
    },
    lines === null
      ? words.map((w, i) => (
          <span key={i}>
            <span data-w style={{ display: 'inline-block' }}>
              {w}
            </span>{' '}
          </span>
        ))
      : lines.map((count, i) => {
          const start = lines.slice(0, i).reduce((a, b) => a + b, 0)
          return (
            <span key={`${i}-${start}`} className="ds-lines__line" aria-hidden="true" style={{ transitionDelay: `${i * 0.1}s` }}>
              {words.slice(start, start + count).map((w, j) => (
                <span key={j} className={isAccent(start + j) ? (accentTone === 'red' ? 'ds-accent' : `ds-accent--${accentTone}`) : undefined}>
                  {w}
                  {j < count - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          )
        })
  )
}
