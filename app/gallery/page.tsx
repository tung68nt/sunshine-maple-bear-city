'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Camera, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  title: string
  category: string
  image_url: string
  description?: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/admin/gallery')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setImages(data)
          } else {
            setFallbackImages()
          }
        } else {
          setFallbackImages()
        }
      } catch (err) {
        console.error(err)
        setFallbackImages()
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const setFallbackImages = () => {
    setImages([
      { id: '1', title: 'Lớp Học Điển Hình 1', category: 'Cơ sở vật chất', image_url: SCHOOL_IMAGES.render.lopHoc1 },
      { id: '2', title: 'Thư Viện Sách 5 Sao', category: 'Cơ sở vật chất', image_url: SCHOOL_IMAGES.render.thuVien3 },
      { id: '3', title: 'Sân Chơi Vận Động', category: 'Sân chơi', image_url: SCHOOL_IMAGES.render.sanChoi2 },
      { id: '4', title: 'Bể Bơi Bốn Mùa', category: 'Bể bơi', image_url: SCHOOL_IMAGES.render.beBoi1 },
      { id: '5', title: 'Phòng Âm Nhạc Atelier', category: 'Phòng chức năng', image_url: SCHOOL_IMAGES.render.phongChucNang1 },
      { id: '6', title: 'Nhà Ăn Căn Tin 5 Sao', category: 'Nhà ăn', image_url: SCHOOL_IMAGES.render.canTeen },
    ])
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-[#151513] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151513] via-[#151513]/90 to-transparent z-10" />
          <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-5 animate-fade-in-up">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">
                  THƯ VIỆN HÌNH ẢNH & KHÔNG GIAN HỌC TẬP 5 SAO
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Thư Viện <span className="text-maple-gold">Hình Ảnh</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Ngắm nhìn không gian cơ sở vật chất chuẩn quốc tế và những khoảnh khắc rạng rỡ của các bé tại Sunshine Maple Bear.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-500 font-light text-sm">Đang tải hình ảnh...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="group relative h-64 rounded-2xs overflow-hidden border border-neutral-200 shadow-sm cursor-pointer"
                >
                  <Image
                    src={img.image_url}
                    alt={img.title || 'Gallery Image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-maple-gold text-[10px] font-bold uppercase tracking-wider block">{img.category}</span>
                    <h4 className="text-white font-bold text-sm truncate">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage !== null && images[selectedImage] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-2xs bg-neutral-800/80"
          >
            <X size={24} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image
              src={images[selectedImage].image_url}
              alt={images[selectedImage].title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
