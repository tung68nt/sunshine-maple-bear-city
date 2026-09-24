'use client'

import React, { useState, useEffect, useRef } from 'react'

interface FacilityRoom {
  id: string
  title: string
  subtitle: string
  tag: string
  coverImage: string
  gallery: {
    src: string
    caption: string
  }[]
  description: string
  highlights: string[]
}

const FACILITIES_DATA: FacilityRoom[] = [
  {
    id: 'classroom',
    title: 'Classroom',
    subtitle: 'Phòng học tiêu chuẩn Canada',
    tag: 'CANADIAN STANDARD',
    coverImage: '/images/canva/classroom_tables.png',
    gallery: [
      {
        src: '/images/canva/classroom_tables.png',
        caption: 'Bàn ghế và học cụ bằng gỗ tự nhiên tiêu chuẩn Bắc Mỹ, trần trang trí hình đám mây sinh động khơi nguồn cảm hứng học tập.',
      },
      {
        src: '/images/canva/classroom_wide.png',
        caption: 'Không gian mở ngập tràn ánh sáng tự nhiên với các góc học tập theo chủ đề (Language, Math, Science).',
      },
      {
        src: '/images/canva/teacher_child_1.png',
        caption: 'Giáo viên bản ngữ và Việt Nam tận tâm đồng hành trong từng hoạt động khám phá cá nhân hóa.',
      },
    ],
    description: 'Phòng học thiết kế mở tràn ngập ánh sáng tự nhiên, 100% bàn ghế và học cụ bằng gỗ an toàn theo tiêu chuẩn Maple Bear toàn cầu.',
    highlights: ['Diện tích tiêu chuẩn 85m²', 'Điều hòa lọc khí tươi 24/7', 'Học cụ chuẩn Bộ Giáo dục Canada'],
  },
  {
    id: 'library',
    title: 'Library',
    subtitle: 'Thư viện Lâu Đài Đọc Sách',
    tag: 'IMMERSION READING',
    coverImage: '/images/canva/library_wide.png',
    gallery: [
      {
        src: '/images/canva/library_wide.png',
        caption: 'Tháp đọc sách hình lâu đài kỳ diệu cùng nhà bóng mini và hàng ngàn cuốn truyện tranh tiếng Anh nguyên bản.',
      },
      {
        src: '/images/canva/teacher_child_2.png',
        caption: 'Giờ đọc sách tương tác khơi gợi trí tưởng tượng và tình yêu ngôn ngữ tự nhiên từ sớm.',
      },
      {
        src: '/images/canva/classroom_tables.png',
        caption: 'Góc đọc sách thư giãn ấm áp với thảm lông êm ái và bàn tròn thảo luận nhóm.',
      },
    ],
    description: 'Không gian đọc sách hình lâu đài kỳ diệu với hơn 2.000 đầu sách thiếu nhi bản ngữ chọn lọc từ Canada và các nhà xuất bản hàng đầu thế giới.',
    highlights: ['2.000+ đầu sách tiếng Anh', 'Khu đọc sách lâu đài độc bản', 'Chương trình Read Aloud mỗi ngày'],
  },
  {
    id: 'dance-studio',
    title: 'Dance & Movement',
    subtitle: 'Phòng Múa & Cảm thụ Âm nhạc',
    tag: 'CREATIVE MOVEMENT',
    coverImage: '/images/canva/dance_studio.png',
    gallery: [
      {
        src: '/images/canva/dance_studio.png',
        caption: 'Phòng múa chuyên dụng với hệ thống gióng múa chuẩn mầm non, gương toàn phần và sàn gỗ đàn hồi chống chấn thương.',
      },
      {
        src: '/images/canva/play_hall.png',
        caption: 'Khu vực khởi động và rèn luyện thể chất dẻo dai cùng giáo viên chuyên biệt.',
      },
    ],
    description: 'Sàn gỗ đàn hồi chống chấn thương, gương ốp tường toàn phần và hệ thống âm thanh vòm khơi dậy năng khiếu vận động và cảm thụ âm nhạc.',
    highlights: ['Sàn gỗ giảm chấn chuyên dụng', 'Hệ thống âm thanh vòm', 'Bộ môn Yoga & Ballet mầm non'],
  },
  {
    id: 'indoor-play',
    title: 'Indoor Play & Hub',
    subtitle: 'Khu Khám Phá & Vận Động',
    tag: 'ACTIVE PLAY & STEM',
    coverImage: '/images/canva/classroom_reception.png',
    gallery: [
      {
        src: '/images/canva/classroom_reception.png',
        caption: 'Khu vui chơi liên hoàn trong nhà với khinh khí cầu mô hình, hầm chui và khu tiếp đón thân thiện.',
      },
      {
        src: '/images/canva/play_hall.png',
        caption: 'Khu vực hoạt động đa năng cho các sự kiện tập thể, lễ hội văn hóa và giờ chơi tự do an toàn.',
      },
    ],
    description: 'Khu liên hoàn phát triển thể chất đa giác quan, cầu trượt xoắn ốc an toàn và các góc trải nghiệm khoa học ứng dụng.',
    highlights: ['Vận động tinh & vận động thô', 'Giám sát camera an ninh HD', 'Vật liệu chống trượt cao cấp'],
  },
]

export function CanvaExactFacilitiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeModalRoom, setActiveModalRoom] = useState<FacilityRoom | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalRoom) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalRoom(null)
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : activeModalRoom.gallery.length - 1))
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev < activeModalRoom.gallery.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeModalRoom])

  const openRoomGallery = (room: FacilityRoom, photoIdx = 0) => {
    setActiveModalRoom(room)
    setActivePhotoIndex(photoIdx)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : FACILITIES_DATA.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < FACILITIES_DATA.length - 1 ? prev + 1 : 0))
  }

  return (
    <>
      {/* Interactive Carousel Section Container (Mapped to Canva Canvas y: 3670, h: 320) */}
      <div
        className="cv-facilities-carousel-root"
        style={
          {
            position: 'absolute',
            left: 0,
            top: 'calc(3665 * var(--u))',
            width: '100%',
            height: 'calc(310 * var(--u))',
            zIndex: 6,
            pointerEvents: 'auto',
          } as React.CSSProperties
        }
      >
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous room"
          className="cv-carousel-nav-btn cv-carousel-prev"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next room"
          className="cv-carousel-nav-btn cv-carousel-next"
        >
          ›
        </button>

        {/* Carousel Slider Cards Track */}
        <div
          ref={trackRef}
          className="cv-carousel-viewport"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(16 * var(--u))',
            padding: '0 calc(36 * var(--u))',
            height: '100%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
          }}
        >
          {FACILITIES_DATA.map((room, idx) => (
            <div
              key={room.id}
              onClick={() => openRoomGallery(room, 0)}
              className="cv-facility-card"
              style={{
                flex: '0 0 calc(280 * var(--u))',
                height: 'calc(290 * var(--u))',
                position: 'relative',
                borderRadius: 'calc(6 * var(--u))',
                overflow: 'hidden',
                cursor: 'pointer',
                scrollSnapAlign: 'start',
                backgroundColor: '#1b0e10',
                boxShadow: '0 calc(6 * var(--u)) calc(20 * var(--u)) rgba(0, 0, 0, 0.22)',
                border: 'calc(1 * var(--u)) solid rgba(202, 156, 87, 0.45)',
                transition: 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.3s ease',
              }}
            >
              {/* Photo */}
              <img
                src={room.coverImage}
                alt={room.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                }}
                className="cv-facility-img"
              />

              {/* Bottom Gradient Scrim & Titles */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(126, 14, 18, 0.95) 0%, rgba(126, 14, 18, 0.65) 28%, rgba(0, 0, 0, 0.05) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'calc(14 * var(--u)) calc(16 * var(--u))',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    color: '#ca9c57',
                    fontSize: 'calc(9.5 * var(--u))',
                    letterSpacing: 'calc(0.8 * var(--u))',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    marginBottom: 'calc(3 * var(--u))',
                  }}
                >
                  {room.tag}
                </span>
                <h3
                  style={{
                    margin: 0,
                    color: '#ffffff',
                    fontFamily: 'TheSeasons, serif',
                    fontSize: 'calc(20 * var(--u))',
                    fontWeight: 600,
                    lineHeight: 1.1,
                  }}
                >
                  {room.title}
                </h3>
                <p
                  style={{
                    margin: 'calc(4 * var(--u)) 0 0',
                    color: '#f8eedf',
                    fontSize: 'calc(10.5 * var(--u))',
                    opacity: 0.9,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {room.subtitle}
                </p>

                {/* View gallery action badge */}
                <div
                  style={{
                    marginTop: 'calc(8 * var(--u))',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'calc(4 * var(--u))',
                    color: '#ca9c57',
                    fontSize: 'calc(10 * var(--u))',
                    fontWeight: 600,
                    letterSpacing: 'calc(0.5 * var(--u))',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>Xem gallery ảnh</span>
                  <span style={{ fontSize: 'calc(12 * var(--u))' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Fullscreen Lightbox Modal */}
      {activeModalRoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery ${activeModalRoom.title}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(10, 5, 8, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            animation: 'cvModalFadeIn 0.25s ease-out',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalRoom(null)
          }}
        >
          {/* Top Bar: Title & Close Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1280px',
              margin: '0 auto',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(202, 156, 87, 0.25)',
            }}
          >
            <div>
              <span
                style={{
                  color: '#ca9c57',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                {activeModalRoom.tag} • MAPLE BEAR CIPUTRA
              </span>
              <h2
                style={{
                  margin: '4px 0 0',
                  color: '#ffffff',
                  fontSize: '24px',
                  fontFamily: 'TheSeasons, serif',
                }}
              >
                {activeModalRoom.title} — {activeModalRoom.subtitle}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#ca9c57', fontSize: '14px', fontWeight: 600 }}>
                {activePhotoIndex + 1} / {activeModalRoom.gallery.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveModalRoom(null)}
                aria-label="Close gallery"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '20px',
                  transition: 'background 0.2s',
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center Stage: Large Photo & Arrows */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              maxWidth: '1280px',
              width: '100%',
              margin: '16px auto',
              overflow: 'hidden',
            }}
          >
            {/* Prev Arrow */}
            {activeModalRoom.gallery.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev > 0 ? prev - 1 : activeModalRoom.gallery.length - 1
                  )
                }
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(20, 10, 12, 0.75)',
                  border: '1px solid rgba(202, 156, 87, 0.5)',
                  color: '#ca9c57',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s',
                }}
              >
                ‹
              </button>
            )}

            {/* Main Active Image */}
            <div
              style={{
                maxWidth: '100%',
                maxHeight: '62vh',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(202, 156, 87, 0.3)',
              }}
            >
              <img
                src={activeModalRoom.gallery[activePhotoIndex].src}
                alt={activeModalRoom.gallery[activePhotoIndex].caption}
                style={{
                  maxWidth: '100%',
                  maxHeight: '62vh',
                  objectFit: 'contain',
                  display: 'block',
                  animation: 'cvPhotoFade 0.3s ease-out',
                }}
              />
            </div>

            {/* Next Arrow */}
            {activeModalRoom.gallery.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev < activeModalRoom.gallery.length - 1 ? prev + 1 : 0
                  )
                }
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(20, 10, 12, 0.75)',
                  border: '1px solid rgba(202, 156, 87, 0.5)',
                  color: '#ca9c57',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s',
                }}
              >
                ›
              </button>
            )}
          </div>

          {/* Bottom Panel: Caption, Highlights & Thumbnails */}
          <div
            style={{
              maxWidth: '1280px',
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Caption & Highlights */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(202, 156, 87, 0.2)',
                borderRadius: '8px',
                padding: '12px 18px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: '#ffffff',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  flex: 1,
                  minWidth: '280px',
                }}
              >
                {activeModalRoom.gallery[activePhotoIndex].caption}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeModalRoom.highlights.map((hl, hIdx) => (
                  <span
                    key={hIdx}
                    style={{
                      background: 'rgba(202, 156, 87, 0.15)',
                      border: '1px solid rgba(202, 156, 87, 0.4)',
                      color: '#ca9c57',
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontWeight: 500,
                    }}
                  >
                    ✓ {hl}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                overflowX: 'auto',
                padding: '4px 0',
              }}
            >
              {activeModalRoom.gallery.map((img, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => setActivePhotoIndex(tIdx)}
                  style={{
                    border: tIdx === activePhotoIndex ? '2px solid #ca9c57' : '2px solid transparent',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    width: '64px',
                    height: '48px',
                    padding: 0,
                    cursor: 'pointer',
                    background: '#000',
                    opacity: tIdx === activePhotoIndex ? 1 : 0.5,
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    src={img.src}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
