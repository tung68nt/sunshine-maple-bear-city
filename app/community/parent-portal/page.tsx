import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Lock, UserCheck, Smartphone, BellRing } from 'lucide-react'

export default function ParentPortalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B]">
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <section className="bg-[#151513] text-white py-16 mb-16 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-display font-extrabold uppercase tracking-[0.2em] text-maple-gold block mb-2">
              COMMUNITY PORTAL
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white">
              Parent <span className="font-serif italic font-normal text-amber-200">Portal & App</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-light mt-4">
              Real-time daily updates, photo sharing, nutrition logs, and direct teacher messaging.
            </p>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 bg-white border border-neutral-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                <Smartphone size={28} className="text-maple-red" />
                <h2 className="text-2xl font-display font-bold text-[#1D1D1B]">Secure Mobile App for Parents</h2>
              </div>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Stay connected with your child&apos;s daily learning journey at Sunshine Maple Bear. Our dedicated mobile application provides real-time photo updates, activity reports, and direct communication.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#151513] text-white p-8 border border-neutral-800 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maple-gold block">KEY PORTAL FEATURES</span>
              <h3 className="text-xl font-display font-bold text-white">Instant Notifications</h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Receive real-time push notifications for school announcements, daily meal updates, photo galleries, and academic progress reports.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
