import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { getStaticPageData } from '@/lib/static-pages-data'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

export function generateMetadata() {
  const page = getStaticPageData('/test-page')
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      images: [page.ogImage],
    },
  }
}

export default function TestPage() {
  const page = getStaticPageData('/test-page')

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B]">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        {/* Banner */}
        <section className="bg-[#151513] text-white py-16 mb-16 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-maple-gold/20 text-maple-gold border border-maple-gold/40 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} /> {page.bannerTag}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white">
              {page.bannerTitle} <span className="font-serif italic font-normal text-amber-200">{page.bannerSubheading}</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-light mt-4">
              {page.bannerIntro}
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-base text-neutral-700 leading-relaxed font-light">
              <h2 className="text-3xl font-display font-bold text-[#1D1D1B]">
                {page.bodyTitle}
              </h2>
              <p className="leading-relaxed">
                {page.bodyParagraph}
              </p>

              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">Key Highlights</span>
                {page.featurePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-maple-red flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-[#1D1D1B]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Link
                  href={page.ctaPrimaryUrl}
                  className="px-6 py-3 bg-[#1D1D1B] text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-maple-red transition-colors border border-[#1D1D1B] inline-flex items-center gap-2"
                >
                  <span>{page.ctaPrimaryText}</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href={page.ctaSecondaryUrl}
                  className="px-6 py-3 bg-white text-[#1D1D1B] font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors border border-neutral-300"
                >
                  {page.ctaSecondaryText}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 border border-neutral-300 bg-white p-3 shadow-lg">
              <div className="relative h-[420px] overflow-hidden bg-neutral-900">
                <Image
                  src={page.bannerImage}
                  alt={page.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
