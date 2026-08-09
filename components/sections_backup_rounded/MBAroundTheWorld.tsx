'use client'

const stats = [
  {
    number: '500+',
    label: 'Schools Worldwide',
    sub: 'Early childhood, elementary, middle & high schools'
  },
  {
    number: '37',
    label: 'Countries Globally',
    sub: 'Operating across Americas, Europe, Asia & Middle East'
  },
  {
    number: '100%',
    label: 'Local Compliance',
    sub: 'Conforming strictly with local education regulations'
  },
  {
    number: '1 Quality',
    label: 'Canadian Standard',
    sub: 'Global curriculum quality checked by Canadian experts'
  }
]

export function MBAroundTheWorld() {
  return (
    <section id="global-network" className="py-24 lg:py-32 bg-white relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-maple-red/10 text-maple-red text-xs font-display font-extrabold tracking-widest uppercase">
            Global Presence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1D1D1B] tracking-tight">
            Maple Bear <span className="font-serif italic font-normal text-maple-red">Around the World</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            There are currently more than 500 Maple Bear early childhood, elementary, middle, and high schools in 37 countries around the world. We operate in conformity with local education regulations and strive to meet the expectations of all our parents no matter the culture or the country.
          </p>
        </div>

        {/* Stats Grid: Soft Rounded Cards (rounded-2xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FDFBF7] border border-neutral-200/80 hover:border-maple-red/40 hover:shadow-lg transition-all duration-300 space-y-4"
            >
              <span className="text-[10px] font-display font-extrabold text-maple-red uppercase tracking-widest block">
                METRIC 0{idx + 1}
              </span>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-[#1D1D1B]">
                {item.number}
              </div>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                {item.label}
              </h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                {item.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
