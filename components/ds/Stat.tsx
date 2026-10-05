'use client'

import { useEffect, useRef } from 'react'
import { cx } from './cx'
import { fitsBrandFace } from './Heading'

type StatProps = {
  /** e.g. "15+", "100%", "70,000+" */
  value: string
  label: string
  tone?: 'gold' | 'deep'
  /**
   * `odometer` (default): Rugby's counter — runs up from just below the value.
   * `count`: counts from 0, and only once the number is fully on screen.
   */
  mode?: 'odometer' | 'count'
  className?: string
}

/** Animated figure with its caption. The digit cells are fixed-width, so counting never shifts layout. */
export function Stat({ value, label, tone = 'gold', mode = 'odometer', className }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fromZero = mode === 'count'
    let raf = 0
    let timer: ReturnType<typeof setTimeout>

    const animate = () => {
      const suffix = value.match(/[^0-9.,-]+$/)?.[0] ?? ''
      const digits = value.replace(/[^0-9.-]/g, '')
      const end = parseFloat(digits)
      if (isNaN(end)) return
      const big = end > 100
      const from = fromZero ? 0 : Math.max(0, end - (big ? 55 : 20))
      const k = big ? 6 : 8
      const dur = fromZero ? 2200 : big ? 3200 : 2500
      const decimals = digits.includes('.') ? digits.split('.')[1].length : 0
      const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: value.includes(',') })
      const final = (fmt.format(end) + suffix).split('')
      el.innerHTML = ''
      const cells = final.map(() => {
        const s = document.createElement('span')
        s.style.cssText = 'display:inline-block'
        s.setAttribute('aria-hidden', 'true')
        el.appendChild(s)
        return s
      })
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = fromZero ? 1 - Math.pow(1 - p, 3) : p < 0.5 ? k * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2
        const chars = (fmt.format(from + (end - from) * eased) + suffix).split('')
        for (let i = final.length - chars.length; i > 0; i--) chars.unshift(fromZero ? '' : '0')
        chars.forEach((c, i) => {
          if (cells[i]) cells[i].textContent = c
        })
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setTimeout(animate, 150)
      },
      fromZero ? { root: null, rootMargin: '0px 0px -12% 0px', threshold: 1 } : { root: null, rootMargin: '200px 0px 200px 0px', threshold: 0 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [value, mode])

  return (
    <div className={cx('ds-stat', tone === 'deep' && 'ds-stat--deep', className)}>
      <div ref={ref} className="ds-stat__n" aria-label={value} />
      <div className={cx('ds-stat__l ds-heading', !fitsBrandFace(label, true) && 'is-safe')}>{label}</div>
    </div>
  )
}
