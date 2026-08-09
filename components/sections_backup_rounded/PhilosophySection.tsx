'use client'

const philosophyValues = [
  {
    num: '01',
    tag: 'CARE',
    title: 'We Care',
    desc: 'We foster a safe, nurturing environment where every child feels valued and respected.'
  },
  {
    num: '02',
    tag: 'EXPLORE',
    title: 'We Explore',
    desc: 'Curiosity drives learning as children discover the world through meaningful experiences.'
  },
  {
    num: '03',
    tag: 'GROW',
    title: 'We Grow',
    desc: 'We build confidence, resilience and independence for lifelong success.'
  },
  {
    num: '04',
    tag: 'BELONG',
    title: 'We Belong',
    desc: 'We celebrate diversity and create a strong partnership between school and families.'
  },
  {
    num: '05',
    tag: 'THRIVE',
    title: 'We Thrive',
    desc: 'We prepare children to become compassionate, confident and globally minded citizens.'
  }
]

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-white relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-maple-gold/20 text-[var(--color-dark)] text-xs font-display font-extrabold tracking-widest uppercase">
            Our Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1D1D1B] leading-tight">
            Our School <span className="font-serif italic font-normal text-maple-red">Philosophy</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            At Sunshine Maple Bear, our values shape every learning experience, every interaction and every step of each child's journey.
          </p>
        </div>

        {/* 5 Cards with Soft Rounded Corners (rounded-2xl) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {philosophyValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 lg:p-7 rounded-2xl bg-[#FDFBF7] border border-neutral-200/80 flex flex-col justify-between hover:border-maple-red/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-display font-extrabold text-maple-red">{val.num}</span>
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-neutral-500 bg-white border border-neutral-200 rounded-full px-2.5 py-0.5">
                    {val.tag}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#1D1D1B] mb-3 group-hover:text-maple-red transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200/60 flex justify-end">
                <span className="text-xs text-neutral-400 group-hover:text-maple-red transition-colors">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
