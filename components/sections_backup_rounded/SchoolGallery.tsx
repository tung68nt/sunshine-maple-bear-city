'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

const galleryImages = [
  { src: SCHOOL_IMAGES.render.thuVien1, title: 'Modern Library Center', category: 'LIBRARY' },
  { src: SCHOOL_IMAGES.render.lopHoc1, title: 'Interactive Classroom', category: 'CLASSROOM' },
  { src: SCHOOL_IMAGES.render.phongChucNang1, title: 'Multi-Purpose Hall', category: 'ACTIVITIES' },
  { src: SCHOOL_IMAGES.render.hanhLang1, title: 'Bright Hallway', category: 'CAMPUS' },
  { src: SCHOOL_IMAGES.render.lopHoc2, title: 'Early Discovery Room', category: 'CLASSROOM' },
  { src: SCHOOL_IMAGES.render.thuVien2, title: 'Storytelling Corner', category: 'LIBRARY' },
  { src: SCHOOL_IMAGES.render.phongChucNang2, title: 'Creative Arts Studio', category: 'ACTIVITIES' },
  { src: SCHOOL_IMAGES.render.lopHoc3, title: 'Child-Centered Zone', category: 'CLASSROOM' },
  { src: SCHOOL_IMAGES.render.phongYTe1, title: 'Medical Center', category: 'FACILITY' },
  { src: SCHOOL_IMAGES.render.vanPhong, title: 'Admissions Lounge', category: 'CAMPUS' },
  { src: SCHOOL_IMAGES.render.thuVien3, title: 'Digital Library', category: 'LIBRARY' },
  { src: SCHOOL_IMAGES.render.phongChucNang3, title: 'Physical Gym Room', category: 'ACTIVITIES' },
]

export function SchoolGallery() {
  const [startIndex, setStartIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const itemsPerPage = 3
  const maxPages = Math.ceil(galleryImages.length / itemsPerPage)
  const currentPage = Math.floor(startIndex / itemsPerPage)

  const prevSlide = () => {
    setStartIndex((prev) => (prev - itemsPerPage + galleryImages.length) % galleryImages.length)
  }

  const nextSlide = () => {
    setStartIndex((prev) => (prev + itemsPerPage) % galleryImages.length)
  }

  const visibleItems = Array.from({ length: itemsPerPage }, (_, i) => {
    return galleryImages[(startIndex + i) % galleryImages.length]
  })

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white relative border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-maple-red/10 text-maple-red text-xs font-display font-extrabold tracking-widest uppercase mb-3">
              School Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1D1D1B]">
              Explore Our <span className="font-serif italic font-normal text-maple-red">Campus Gallery</span>
            </h2>
          </div>

          {/* Controls Bar: Soft Pill */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-neutral-200 bg-[#FDFBF7]">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-maple-red hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
            >
              ←
            </button>
            <span className="text-xs font-display font-extrabold tracking-widest px-2 text-[#1D1D1B]">
              0{currentPage + 1} / 0{maxPages}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-maple-red hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
            >
              →
            </button>
          </div>
        </div>

        {/* 3 Exhibition Cards with Soft Rounded Corners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleItems.map((item, idx) => {
            const actualIndex = (startIndex + idx) % galleryImages.length
            return (
              <div
                key={actualIndex}
                onClick={() => setLightboxIndex(actualIndex)}
                className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md group cursor-pointer hover:shadow-xl transition-all duration-500 bg-neutral-900 border border-neutral-200"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                
                {/* Category Tag Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-display font-bold tracking-widest border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>

                {/* Title Caption */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1">
                  <h3 className="text-base font-display font-bold leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-maple-gold font-bold uppercase tracking-widest block">
                    Click to View Full Size
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 rounded-full p-3 transition-colors z-50"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-4 transition-colors z-50"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="relative max-w-5xl w-full h-[75vh]">
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].title}
              fill
              className="object-contain rounded-2xl"
              sizes="100vw"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full border border-white/20 text-xs font-display font-bold uppercase tracking-wider">
              {galleryImages[lightboxIndex].title} ({lightboxIndex + 1} / {galleryImages.length})
            </div>
          </div>

          <button
            onClick={() => setLightboxIndex((prev) => (prev! + 1) % galleryImages.length)}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-4 transition-colors z-50"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  )
}
