'use client'

import { useState, useEffect } from 'react'
import { Block, CallToAction, Divider, Gallery, Lead, PageHero, PageShell } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

interface GalleryItem {
  id: string
  title: string
  category: string
  image_url: string
  description?: string
}

/** Gallery: content and data fetching only — every element comes from the design system. */
export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/admin/gallery')
        // the endpoint redirects signed-out visitors to the login page (HTML), so check the type too
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
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
    <PageShell hero={<PageHero title="Thư viện hình ảnh" image={SCHOOL_IMAGES.render.thuVien3} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}>
      <Lead
        kicker="THƯ VIỆN HÌNH ẢNH & KHÔNG GIAN HỌC TẬP 5 SAO"
        title="Thư Viện Hình Ảnh"
        accent="Hình Ảnh"
        image={{ src: SCHOOL_IMAGES.render.lopHoc3, alt: 'Lớp học tại Sunshine Maple Bear' }}
      >
        Ngắm nhìn không gian cơ sở vật chất chuẩn quốc tế và những khoảnh khắc rạng rỡ của các bé tại Sunshine Maple Bear.
      </Lead>

      <Divider />

      <Block>
        <Gallery
          items={images.map((img) => ({ src: img.image_url, alt: img.title || 'Gallery Image', title: img.title, category: img.category }))}
          filters
          allLabel="Tất cả"
          loading={loading}
          loadingLabel="Đang tải hình ảnh..."
          emptyLabel="Chưa có hình ảnh."
        />
      </Block>

      <CallToAction
        title="Trải Nghiệm Thực Tế"
        text="Kính mời Phụ huynh cùng bé đến tham quan khuôn viên không gian học tập 5 sao tại Sunshine City và trao đổi trực tiếp cùng Ban Giám Hiệu."
        actions={[
          { label: 'Đặt lịch tham quan', href: '/tour-booking' },
          { label: 'Liên hệ', href: '/contact' },
        ]}
      />
    </PageShell>
  )
}
