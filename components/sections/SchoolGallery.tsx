'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'

const initialGalleryImages = [
  { src: SCHOOL_IMAGES.render.thuVien1, title: 'Classroom Activity', category: 'CLASSROOM' },
  { src: SCHOOL_IMAGES.render.phongChucNang1, title: 'Outdoor Playground', category: 'PLAYGROUND' },
  { src: SCHOOL_IMAGES.render.lopHoc2, title: 'Storytelling & Reading', category: 'LIBRARY' },
  { src: SCHOOL_IMAGES.render.phongChucNang3, title: 'Indoor Learning Facility', category: 'FACILITY' },
  { src: SCHOOL_IMAGES.render.phongChucNang2, title: 'Swimming & Sports', category: 'SPORTS' },
  { src: SCHOOL_IMAGES.render.lopHoc3, title: 'Creative Arts Studio', category: 'ARTS' },
]

export function SchoolGallery() {
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    async function loadCMSGallery() {
      try {
        const res = await fetch('/api/admin/gallery')
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((item: any) => ({
            src: item.image_url || item.url || item.src,
            title: item.title || item.name || 'Campus Image',
            category: item.category || 'GALLERY'
          }))
          setGalleryImages(mapped)
        }
      } catch (err) {
        // Fallback to static galleryImages
      }
    }
    loadCMSGallery()
  }, [])

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FDFBF7] relative border-b border-neutral-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bar matching Picture1.png: SCHOOL GALLERY on left, View All → on right */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xs font-display font-extrabold uppercase tracking-[0.25em] text-[#9E1B1E]">
            SCHOOL GALLERY
          </h2>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#332C2B] hover:text-[#9E1B1E] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Grid Images matching Picture1.png (Preserving dynamic CMS loading capability) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title}`}
              onClick={() => setLightboxIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxIndex(idx)
                }
              }}
              className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50 border border-white/20"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-50 border border-white/20"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="relative max-w-5xl w-full h-[75vh]">
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <button
            onClick={() => setLightboxIndex((prev) => (prev! + 1) % galleryImages.length)}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-50 border border-white/20"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  )
}
