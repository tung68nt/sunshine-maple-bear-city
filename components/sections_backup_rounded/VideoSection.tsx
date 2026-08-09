'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative py-24 bg-[var(--color-dark)] overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="lg:col-span-5 space-y-6 text-white">
            <span className="inline-block text-sm font-display font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">
              Introduction
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black leading-tight">
              Discover Sunshine <br />
              <span className="text-[var(--color-gold)]">Maple Bear</span>
            </h2>
            <p className="text-white/70 leading-relaxed">
              Sunshine Maple Bear is a premium 100% English international education system, inheriting the best of Canadian early childhood methodology. With a child-centered teaching approach, we unlock and develop each child&apos;s potential to the fullest.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl font-display font-black text-[var(--color-gold)]">
                  {SCHOOL_INFO.GLOBAL_STATS.schools}+
                </div>
                <p className="text-xs text-white/50 mt-1 font-medium">Schools Worldwide</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl font-display font-black text-[var(--color-gold)]">
                  {SCHOOL_INFO.GLOBAL_STATS.countries}
                </div>
                <p className="text-xs text-white/50 mt-1 font-medium">Countries</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl font-display font-black text-[var(--color-gold)]">
                  {SCHOOL_INFO.GLOBAL_STATS.campuses}
                </div>
                <p className="text-xs text-white/50 mt-1 font-medium">Campuses in Hanoi</p>
              </div>
            </div>
          </div>

          {/* Right: Video */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              {!isPlaying ? (
                <>
                  {/* Thumbnail */}
                  <Image
                    src={`https://img.youtube.com/vi/2PWdT772-IY/hqdefault.jpg`}
                    alt="Sunshine Maple Bear Introduction Video"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play introduction video"
                      className="group flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/40 hover:scale-110 transition-transform duration-300"
                    >
                      <Play size={32} fill="white" className="ml-1" />
                    </button>
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[var(--color-gold)] rounded-tl-lg" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[var(--color-gold)] rounded-br-lg" />
                </>
              ) : (
                <iframe
                  src={`${SCHOOL_INFO.YOUTUBE_INTRO}?autoplay=1&rel=0&controls=0&showinfo=0&modestbranding=1`}
                  title="Sunshine Maple Bear Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
