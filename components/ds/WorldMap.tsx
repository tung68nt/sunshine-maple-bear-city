'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { MAPLE_BEAR_COUNTRIES, type MapleBearCountry } from './maple-bear-countries'

const W = 960
const H = 470
const HOME_ID = '704' // Vietnam
const HQ_ID = '124' // Canada
const BY_ID = new Map(MAPLE_BEAR_COUNTRIES.map((c) => [c.id, c]))

type Shape = { id: string; d: string }
type Pin = MapleBearCountry & { x: number; y: number; delay: number }

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/**
 * Interactive world map of the Maple Bear network. Geometry is world-atlas
 * `countries-110m` (TopoJSON, served from /public) projected with d3-geo; the
 * highlighted countries come from Maple Bear Global's school directory.
 * On entering the viewport the network "spreads" outwards from Canada.
 */
export function WorldMap() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [pins, setPins] = useState<Pin[]>([])
  const [inView, setInView] = useState(false)
  const [settled, setSettled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/countries-110m.json')
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return
        // Antarctica (010) is dropped so the inhabited world fills the frame
        const countries = feature(topo, topo.objects.countries).features.filter((f) => String(f.id) !== '010')
        const projection = geoNaturalEarth1()
          .rotate([-11, 0])
          .fitExtent(
            [
              [4, 4],
              [W - 4, H - 4],
            ],
            { type: 'FeatureCollection', features: countries }
          )
        const path = geoPath(projection)
        const hq = projection(BY_ID.get(HQ_ID)!.at)!
        const placed = MAPLE_BEAR_COUNTRIES.map((c) => {
          const [x, y] = projection(c.at)!
          return { ...c, x, y, dist: Math.hypot(x - hq[0], y - hq[1]) }
        })
        const far = Math.max(...placed.map((p) => p.dist))
        setShapes(countries.map((f) => ({ id: String(f.id).padStart(3, '0'), d: path(f) || '' })))
        setPins(placed.map(({ dist, ...p }) => ({ ...p, delay: 0.2 + (dist / far) * 1.5 })))
      })
      .catch((err) => console.error('World map failed to load:', err))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setInView(true)
        io.disconnect()
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const shown = inView && pins.length > 0

  // once the opening spread has played, drop its staggered delays so hover reacts at once
  useEffect(() => {
    if (!shown) return
    const t = setTimeout(() => setSettled(true), 3200)
    return () => clearTimeout(t)
  }, [shown])

  const delayOf = useMemo(() => new Map(pins.map((p) => [p.id, p.delay])), [pins])
  const tip = pins.find((p) => p.id === active)

  return (
    <div ref={rootRef} className={shown ? (settled ? 'ds-map is-in is-settled' : 'ds-map is-in') : 'ds-map'} onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`World map highlighting the ${MAPLE_BEAR_COUNTRIES.length - 1} countries with Maple Bear schools`}>
        <g>
          {shapes.map((s) => {
            const c = BY_ID.get(s.id)
            if (!c) return <path key={s.id + s.d.length} d={s.d} className="ds-map__land" />
            return (
              <path
                key={s.id}
                d={s.d}
                className={['ds-map__land is-mb', s.id === HOME_ID && 'is-home', active === s.id && 'is-active'].filter(Boolean).join(' ')}
                style={{ transitionDelay: `${delayOf.get(s.id) ?? 0}s` }}
                onMouseEnter={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
              />
            )
          })}
        </g>

        <g>
          {pins.map((p) => {
            const cls = ['ds-map__pin', p.id === HOME_ID && 'is-home', p.id === HQ_ID && 'is-hq', active === p.id && 'is-active'].filter(Boolean).join(' ')
            const dot = (
              <g className={cls} style={{ transitionDelay: `${p.delay + 0.35}s` }}>
                {p.id === HOME_ID && <circle className="ds-map__pulse" r="5" />}
                <circle className="ds-map__dot" r={p.id === HOME_ID ? 5 : p.id === HQ_ID ? 4.2 : 2.8} />
                {/* generous invisible hit area */}
                <circle r="9" fill="transparent" />
              </g>
            )
            return (
              <g key={p.id} transform={`translate(${p.x} ${p.y})`} onMouseEnter={() => setActive(p.id)} onFocus={() => setActive(p.id)} onBlur={() => setActive(null)}>
                {p.site ? (
                  <a href={p.site} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} — ${host(p.site)}`}>
                    {dot}
                  </a>
                ) : (
                  dot
                )}
              </g>
            )
          })}
        </g>
      </svg>

      {tip && (
        <div className="ds-map__tip" style={{ left: `${(tip.x / W) * 100}%`, top: `${(tip.y / H) * 100}%` }} role="status">
          <strong>{tip.name}</strong>
          {tip.note && <em>{tip.note}</em>}
          {tip.site && <span>{host(tip.site)}</span>}
        </div>
      )}

      <div className="ds-map__legend">
        <span>
          <i className="ds-map__key ds-map__key--mb" /> Maple Bear countries
        </span>
        <span>
          <i className="ds-map__key ds-map__key--home" /> Sunshine Maple Bear, Hanoi
        </span>
      </div>
    </div>
  )
}
