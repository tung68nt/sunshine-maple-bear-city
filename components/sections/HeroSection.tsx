'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_IMAGES } from '@/lib/constants'

const heroSlides = [
  SCHOOL_IMAGES.render.thuVien1,
  SCHOOL_IMAGES.render.lopHoc4,
  SCHOOL_IMAGES.render.hanhLang1,
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center overflow-hidden" aria-label="Welcome to Sunshine Maple Bear">
      {/* Slideshow Background */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: currentSlide === idx ? 1 : 0 }}
          aria-hidden={currentSlide !== idx}
        >
          <Image
            src={slide}
            alt={`Sunshine Maple Bear Campus — Image ${idx + 1}`}
            fill
            className="object-cover scale-105"
            style={{ animation: currentSlide === idx ? 'subtle-zoom 20s ease-in-out infinite alternate' : 'none' }}
            priority={idx === 0}
            sizes="100vw"
            quality={60}
          />
        </div>
      ))}
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-[1]" />
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* Floating Maple Leaves */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="absolute z-[2] pointer-events-none opacity-[0.07]"
          style={{
            left: `${10 + i * 18}%`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${10 + i * 3}s`,
            animation: `maple-fall ${10 + i * 3}s linear ${i * 2.5}s infinite`,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 14 14" fill="currentColor" className="text-white" aria-hidden="true">
            <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z"></path>
          </svg>
        </div>
      ))}

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md animate-fade-in-up">
            <div className="w-5 h-5 text-maple-gold flex items-center justify-center">
              <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z"></path>
              </svg>
            </div>
            <span className="text-sm font-display font-bold text-white/90 tracking-wide">
              Official Canadian Curriculum
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight drop-shadow-xl"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            Where Children Explore —
            <br />
            <span className="text-maple-gold drop-shadow-md">Where Children Shine</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl drop-shadow-lg font-light"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.4s both', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Premium Canadian international kindergarten with 100% English instruction for children aged 12 months to 5 years at Sunshine City, Hanoi.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 pt-2`}
            style={{ animation: 'fade-in-up 0.8s ease-out 0.6s both' }}
          >
            <Link
              href="/tour-booking"
              aria-label="Book a campus tour today"
              className="inline-flex items-center gap-2 px-8 py-4 bg-maple-red text-white font-display font-bold rounded-full hover:bg-red-700 transition-all duration-300 shadow-xl shadow-maple-red/30 transform hover:scale-105 active:scale-95 text-base"
            >
              Book a Tour
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/academics"
              aria-label="Explore our curriculum programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-display font-bold rounded-full hover:bg-white hover:text-maple-black transition-all duration-300 text-base"
            >
              Explore Programs
            </Link>
          </div>
        </div>

        {/* Floating Stats Badges */}
        <div
          className="hidden md:flex gap-4 mt-16 pt-8 border-t border-white/10"
          style={{ animation: 'fade-in-up 0.8s ease-out 0.8s both' }}
        >
          {[
            { icon: '⭐', text: '500+ Students' },
            { icon: '🏆', text: '15 Years of Excellence' },
            { icon: '🌍', text: 'Canadian Standard' },
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-lg" aria-hidden="true">{badge.icon}</span>
              <span className="text-sm font-bold text-white/90">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5" aria-hidden="true">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce-scroll" />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex gap-2" role="tablist" aria-label="Slide indicators">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={currentSlide === idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentSlide === idx ? 'w-8 bg-white' : 'w-4 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
