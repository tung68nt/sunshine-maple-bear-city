import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { EventSection } from '@/components/sections/EventSection'

export default function OpenDayPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B]">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        {/* Banner */}
        <section className="bg-[#151513] text-white py-16 mb-16 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-display font-extrabold uppercase tracking-[0.2em] text-maple-gold block mb-2">
              SPECIAL EVENT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white">
              Open Day Event <span className="font-serif italic font-normal text-amber-200">Registration</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-light mt-4">
              Saturday, 22 August 2026 at Sunshine City Campus, Ciputra, Hanoi.
            </p>
          </div>
        </section>

        <EventSection />
      </main>

      <Footer />
    </div>
  )
}
