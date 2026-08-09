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
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-display font-black text-maple-red uppercase tracking-[0.2em]">02 / PHILOSOPHY</span>
          <div className="h-[1px] bg-neutral-300 flex-1" />
        </div>

        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1D1D1B] leading-tight">
            Our School <span className="font-serif italic font-normal text-maple-red">Philosophy</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            At Sunshine Maple Bear, our values shape every learning experience, every interaction and every step of each child's journey.
          </p>
        </div>

        {/* Editorial 5-Column Sharp Border Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border-t border-b border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {philosophyValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 lg:p-8 flex flex-col justify-between hover:bg-[#FDFBF7] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-display font-extrabold text-maple-red">{val.num}</span>
                  <span className="text-[10px] font-display font-bold uppercase tracking-widest text-neutral-400 border border-neutral-200 px-2 py-0.5">
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

              <div className="mt-8 pt-4 border-t border-neutral-200/50 flex justify-end">
                <span className="text-xs text-neutral-400 group-hover:text-maple-red transition-colors">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
