'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setImages(data || [])
      } catch (error) {
        console.error('Error fetching gallery, using mock data:', error)
        setImages([
          { id: '1', album: 'facilities', image_url: SCHOOL_IMAGES.render.thuVien1, title: 'Open Library' },
          { id: '2', album: 'classroom', image_url: SCHOOL_IMAGES.render.lopHoc1, title: 'Kindergarten Classroom' },
          { id: '3', album: 'activities', image_url: SCHOOL_IMAGES.render.phongChucNang1, title: 'Multi-purpose Room' },
          { id: '4', album: 'events', image_url: SCHOOL_IMAGES.render.thuVien6, title: 'Extracurricular Event' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  // Derived albums from unique gallery_items.album
  const albums = Array.from(new Set(images.map(img => img.album))).map(albumName => {
    const albumImages = images.filter(img => img.album === albumName)
    return {
      title: albumName === 'facilities' ? 'Facilities' : 
             albumName === 'activities' ? 'Learning Activities' :
             albumName === 'classroom' ? 'Classrooms' :
             albumName === 'events' ? 'Events' : albumName,
      slug: albumName,
      imageCount: albumImages.length,
      coverImage: albumImages[0]?.image_url
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-dark)]">
          <div className="absolute top-10 right-10 opacity-10">
            <svg width="200" height="200" viewBox="0 0 14 14" fill="white">
              <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z" />
            </svg>
          </div>
          <div className="absolute bottom-10 left-10 opacity-5">
            <svg width="300" height="300" viewBox="0 0 14 14" fill="white">
              <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z" />
            </svg>
          </div>
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.thuVien6}
              alt="Gallery Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 to-[var(--color-dark)]/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
                <Camera size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest">Experience Space</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Photo Gallery</h1>
              <p className="text-xl text-white/80 font-light">Admiring international standard facilities at Sunshine City</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-500 font-light">Loading images...</p>
            </div>
          ) : images.length > 0 ? (
            <>
              {/* Album Categories */}
              <section className="mb-24">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold text-maple-black">Collections</h2>
                  <div className="h-px bg-neutral-200 flex-1 mx-8 hidden md:block" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {albums.map((album, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        const firstIndex = images.findIndex(img => img.image_url === album.coverImage);
                        if (firstIndex !== -1) setSelectedImage(firstIndex);
                      }}
                      className="group relative h-[350px] rounded-[32px] overflow-hidden shadow-lg cursor-pointer"
                    >
                      <Image
                        src={album.coverImage || SCHOOL_IMAGES.render.lopHoc1}
                        alt={album.title || 'Gallery Album'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maple-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 w-full">
                        <p className="text-maple-gold font-bold text-xs uppercase tracking-widest mb-2">{album.imageCount} Images</p>
                        <h3 className="text-2xl font-bold text-white">{album.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Masonry-like Grid for All Photos */}
              <section>
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold text-maple-black">All Photos</h2>
                  <div className="h-px bg-neutral-200 flex-1 mx-8 hidden md:block" />
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer break-inside-avoid"
                    >
                      <Image
                        src={img.image_url}
                        alt={img.title || 'Gallery Image'}
                        width={600}
                        height={400}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[var(--color-dark)]/0 group-hover:bg-[var(--color-dark)]/40 transition-all duration-300 flex items-center justify-center">
                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" size={32} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-20 text-neutral-400 font-light">
              No images in the gallery yet.
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>
            
            <button 
              onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <ChevronLeft size={60} />
            </button>
 
            <button 
              onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <ChevronRight size={60} />
            </button>
 
            <div className="relative w-full max-w-5xl aspect-video md:aspect-[21/9]">
              <Image
                src={images[selectedImage].image_url}
                alt={images[selectedImage].title || 'Gallery Image'}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-lg font-medium">{images[selectedImage].title}</p>
                <p className="text-white/40 text-sm">{selectedImage + 1} / {images.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-neutral-light-gray py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-maple-black mb-6">Want to experience it first-hand?</h2>
            <p className="text-lg text-neutral-500 mb-10 max-w-2xl mx-auto font-light">
              Schedule a school tour to discover the wonderful learning environment of Sunshine Maple Bear at Sunshine City.
            </p>
            <a
              href="/tour-booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-maple-red text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-xl"
            >
              Book a Tour Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
