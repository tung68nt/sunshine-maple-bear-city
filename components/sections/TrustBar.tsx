'use client'

export function TrustBar() {
  const partners = [
    'Maple Bear Global Schools',
    'Canadian Education Standards',
    'STEM.org Certified',
    'Cambridge English',
    'IB World School Partner',
    'Vietnam Education Awards',
  ]

  return (
    <section className="relative z-20 bg-[var(--color-primary)] py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <span className="text-white/70 text-sm font-display font-bold whitespace-nowrap mr-8 hidden sm:block">
          Trusted By
        </span>
        <div className="flex-1 overflow-hidden relative">
          <div className="marquee-track">
            {[...partners, ...partners].map((name, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-8 whitespace-nowrap"
              >
                <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
