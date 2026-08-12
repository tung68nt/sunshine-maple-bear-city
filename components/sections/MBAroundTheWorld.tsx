'use client'

import { useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const geoUrl = '/countries-110m.json'

// Official Maple Bear Global Locations with Exact Coordinates on react-simple-maps geoMercator
const globalLocations = [
  { id: 'vn', name: 'Vietnam (Sunshine Maple Bear)', detail: 'S4 Building, Sunshine City, Hanoi', coordinates: [105.8542, 21.0285] as [number, number], count: '15+ Campuses', highlight: true },
  { id: 'ca', name: 'Canada (Global HQ)', detail: 'Academic HQ & Curriculum Center', coordinates: [-96.8229, 62.4541] as [number, number], count: '50+ Schools' },
  { id: 'br', name: 'Brazil', detail: 'Largest Maple Bear Network', coordinates: [-54.3587, -14.2613] as [number, number], count: '170+ Schools' },
  { id: 'mx', name: 'Mexico & Central America', detail: 'Mexico, Peru, Guatemala', coordinates: [-101.9710, 23.6301] as [number, number], count: '30+ Schools' },
  { id: 'eu', name: 'Central & Eastern Europe', detail: 'Poland, Romania, Serbia, Bulgaria', coordinates: [19.0513, 51.9389] as [number, number], count: '35+ Schools' },
  { id: 'me', name: 'Middle East & Gulf', detail: 'UAE (Dubai), Oman, Turkey', coordinates: [53.9879, 24.2761] as [number, number], count: '25+ Schools' },
  { id: 'in', name: 'India & South Asia', detail: 'New Delhi, Mumbai, Bengaluru', coordinates: [78.9629, 20.5937] as [number, number], count: '85+ Schools' },
  { id: 'sg', name: 'Singapore & Southeast Asia', detail: 'Singapore, Malaysia, Thailand', coordinates: [103.8198, 1.3521] as [number, number], count: '20+ Schools' },
  { id: 'kr', name: 'South Korea & East Asia', detail: 'Seoul & Regional Hubs', coordinates: [127.7940, 36.5008] as [number, number], count: '25+ Schools' },
  { id: 'af', name: 'North & West Africa', detail: 'Morocco, Ghana, Kenya', coordinates: [-9.0720, 28.5903] as [number, number], count: '10+ Schools' },
]

// Maple Bear ISO 3166-1 numeric country IDs in countries-110m.json
const mapleBearCountryIds = new Set([
  '704', '124', '076', '76', '484', '604', '320', '616', '642', '688', '100', '203',
  '792', '784', '512', '504', '288', '404', '356', '702', '410', '608', '458', '764', '156'
])

export function MBAroundTheWorld() {
  const [hoveredLoc, setHoveredLoc] = useState<typeof globalLocations[0] | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)

  return (
    <section id="global-network" className="py-16 lg:py-24 bg-[#FDFBF7] relative border-b border-neutral-200/60 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Grid: Left (3 cols), Center Map (7 cols), Right Stats (2 cols) = 12 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column (3 cols): Title, Description & Pill CTA */}
          <div className="lg:col-span-3 space-y-6">
            <span className="text-xs font-display font-extrabold uppercase tracking-[0.2em] text-[#9E1B1E] block">
              MAPLE BEAR AROUND THE WORLD
            </span>

            <p className="text-sm sm:text-base text-[#554D4B] font-light leading-relaxed">
              Maple Bear is part of a global network of schools in over 37 countries, sharing a commitment to educational excellence.
            </p>

            <div>
              <a
                href="https://www.maplebear.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white border border-[#9E1B1E]/40 hover:border-[#9E1B1E] text-[#332C2B] hover:text-[#9E1B1E] text-xs font-sans font-semibold rounded-full shadow-xs transition-all group"
              >
                <span>Our Global Network</span>
                <ArrowRight size={14} className="text-[#9E1B1E] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Center Column (7 cols): Prominent World Map Container */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full aspect-[2/1] rounded-3xl bg-white p-2 sm:p-4 border border-neutral-200/80 shadow-md flex items-center justify-center overflow-hidden">
              
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 135, center: [10, 16] }}
                style={{ width: '100%', height: '100%' }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isVn = geo.id === '704'
                      const isMapleBear = mapleBearCountryIds.has(String(geo.id))

                      let fillColor = '#EAE7E1'
                      if (isVn) fillColor = '#9E1B1E'
                      else if (isMapleBear) fillColor = '#E0B5B7' // Soft rose/pink matching official map graphic

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#801316', outline: 'none', cursor: 'pointer' },
                            pressed: { outline: 'none' }
                          }}
                        />
                      )
                    })
                  }
                </Geographies>

                {/* Location Pin Markers */}
                {globalLocations.map((loc) => (
                  <Marker
                    key={loc.id}
                    coordinates={loc.coordinates}
                    onMouseEnter={(e) => {
                      setHoveredLoc(loc)
                      const target = e.target as SVGElement
                      const rect = target.getBoundingClientRect()
                      const container = target.closest('.aspect-\\[2\\/1\\]')
                      if (container) {
                        const cRect = container.getBoundingClientRect()
                        setTooltipPos({
                          x: ((rect.left + rect.width / 2 - cRect.left) / cRect.width) * 100,
                          y: ((rect.top - cRect.top) / cRect.height) * 100
                        })
                      }
                    }}
                    onMouseLeave={() => setHoveredLoc(null)}
                  >
                    {loc.highlight ? (
                      <g className="cursor-pointer">
                        <circle r="14" fill="#9E1B1E" opacity="0.25">
                          <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle r="6" fill="#9E1B1E" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle r="2" fill="#FFFFFF" />
                      </g>
                    ) : (
                      <g className="cursor-pointer hover:scale-125 transition-transform">
                        <circle r="5" fill="#FFFFFF" stroke="#9E1B1E" strokeWidth="1.5" />
                        <circle r="1.8" fill="#9E1B1E" />
                      </g>
                    )}
                  </Marker>
                ))}
              </ComposableMap>

              {/* Hover Tooltip Card */}
              {hoveredLoc && tooltipPos && (
                <div
                  style={{
                    left: `${tooltipPos.x}%`,
                    top: `${tooltipPos.y}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-full mb-3 w-48 p-3 rounded-2xl bg-white shadow-xl border border-neutral-200 text-[#332C2B] z-40 pointer-events-none animate-fade-in"
                >
                  <span className="text-[9px] font-sans font-extrabold text-[#9E1B1E] uppercase tracking-wider block">
                    {hoveredLoc.count}
                  </span>
                  <h4 className="text-xs font-serif font-bold text-neutral-900 leading-snug">
                    {hoveredLoc.name}
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-light mt-0.5">
                    {hoveredLoc.detail}
                  </p>
                </div>
              )}

              {/* Active Location Badge */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 text-[10px] font-sans font-semibold text-[#9E1B1E] flex items-center gap-1.5 shadow-xs z-30">
                <MapPin size={12} className="text-[#9E1B1E] animate-pulse" />
                <span>Vietnam: Sunshine Maple Bear Hanoi</span>
              </div>
            </div>
          </div>

          {/* Right Column (2 cols): Official 4 Vertically Stacked Statistics */}
          <div className="lg:col-span-2 space-y-6 lg:pl-4 border-t lg:border-t-0 lg:border-l border-neutral-200/80 pt-6 lg:pt-0">
            
            {/* Metric 1 */}
            <div className="space-y-0.5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#9E1B1E] leading-none">
                37
              </div>
              <div className="text-xs font-sans font-medium text-[#332C2B]">
                Countries
              </div>
              <div className="text-[10px] text-[#554D4B] font-light">
                4 coming soon
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-0.5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#9E1B1E] leading-none">
                500+
              </div>
              <div className="text-xs font-sans font-medium text-[#332C2B]">
                Schools in Operation
              </div>
              <div className="text-[10px] text-[#554D4B] font-light">
                140+ coming soon
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-0.5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#9E1B1E] leading-none">
                70,000+
              </div>
              <div className="text-xs font-sans font-medium text-[#332C2B]">
                Students Enrolled
              </div>
            </div>

            {/* Metric 4 */}
            <div className="space-y-0.5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#9E1B1E] leading-none">
                15+
              </div>
              <div className="text-xs font-sans font-medium text-[#332C2B]">
                Years of Excellence
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
