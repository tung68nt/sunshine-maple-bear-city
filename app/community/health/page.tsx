'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Heart, Apple, Wind, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HealthPage() {
  const features = [
    {
      icon: <Apple className="w-6 h-6" />,
      title: 'Organic Nutrition',
      desc: 'Our seasonal menus are designed by nutritionists and prepared fresh daily using 100% organic and traceable ingredients.'
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: 'Clean Air Standards',
      desc: 'All classrooms are equipped with medical-grade air purification systems, maintaining PM2.5 levels below international safety limits.'
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'On-site Medical Clinic',
      desc: 'Fully equipped clinic with qualified pediatric nurses present during all school hours for immediate care and routine check-ups.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Holistic Well-being',
      desc: 'Focusing on dental hygiene, regular physical activity, and emotional wellness as part of our daily curriculum.'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-maple-black">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.beAn}
              alt="Health & Nutrition"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maple-black via-maple-black/60 to-transparent" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md mb-4">
                <Heart size={18} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Nurturing Healthy Lives</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                Health & <span className="text-emerald-400">Vitality</span>
              </h1>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                We believe that a healthy body is the essential foundation for an active, engaged mind.
              </p>
            </div>
          </div>
        </section>

        {/* Nutrition Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black leading-tight">
                  Fueling Growth with <br /><span className="text-maple-red">Organic</span> Nutrition
                </h2>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  Our "Farm to School" initiative ensures that every meal served at Sunshine Maple Bear is packed with nutrients and free from harmful additives. We cater to all dietary requirements and allergies with personalized meal plans.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, idx) => (
                    <div key={idx} className="p-6 bg-neutral-50 rounded-[32px] border border-neutral-100">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm mb-4">
                        {feature.icon}
                      </div>
                      <h4 className="font-bold text-maple-black mb-2">{feature.title}</h4>
                      <p className="text-sm text-neutral-500">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-[56px] overflow-hidden aspect-[4/5] shadow-2xl">
                <Image src={SCHOOL_IMAGES.render.beAn} alt="Healthy meals" fill className="object-cover" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                  <h4 className="font-display font-bold text-maple-black text-xl mb-2">Weekly Menu Selection</h4>
                  <p className="text-neutral-500 text-sm mb-4">Every week, our head chef prepares a balanced menu featuring Western and Asian favorites.</p>
                  <Link href="/contact" className="text-emerald-600 font-bold text-sm flex items-center gap-2">
                    View Sample Menu <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Environmental Health */}
        <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Wind className="w-16 h-16 text-emerald-400 mx-auto opacity-50" />
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">The Purest Air for <br />the Brightest Minds</h2>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                We utilize advanced ventilation and purification technologies to ensure that our indoor environment is a sanctuary of fresh air, essential for cognitive focus and long-term health.
              </p>
              <div className="pt-10 flex flex-wrap justify-center gap-12">
                <div className="text-center">
                  <p className="text-4xl font-display font-black text-emerald-400">99.9%</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Filtration Efficiency</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-display font-black text-emerald-400">&lt; 10</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest font-bold">PM 2.5 Goal</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-display font-black text-emerald-400">24/7</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Monitoring</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[200px]" />
          </div>
        </section>

        {/* Medical Support */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-maple-black">Expert Medical Support</h2>
              <p className="text-xl text-neutral-500 font-light">
                Your child&apos;s safety is managed by professionals. We partner with leading international clinics for regular health screenings and specialist consultations.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="px-12 py-5 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20 transform hover:scale-105">Request Health Policy</Link>
                <Link href="/about" className="px-12 py-5 bg-white text-maple-black font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all">Campus Facilities</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
