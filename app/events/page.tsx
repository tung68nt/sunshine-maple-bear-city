'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, MapPin, ArrowRight, Clock, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_IMAGES } from '@/lib/constants'

interface EventItem {
  id: string
  slug: string
  title: string
  date: string
  start_date: string
  time: string
  location: string
  description: string
  cover_image: string
  category: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/admin/events')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data)
          } else {
            setFallbackEvents()
          }
        } else {
          setFallbackEvents()
        }
      } catch (err) {
        console.error(err)
        setFallbackEvents()
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const setFallbackEvents = () => {
    setEvents([
      {
        id: 'evt-101',
        slug: 'open-day-2026-canada-sunshine-city',
        title: 'Open Day 2026: Hành Trình Khám Phá Mầm Non Canada Tại Sunshine City',
        date: '2026-08-22',
        start_date: '2026-08-22T08:30:00Z',
        time: '08:30 AM - 11:30 AM',
        location: 'Khuôn viên Trường Mầm Non Sunshine Maple Bear, Tòa S4 Sunshine City',
        description: 'Sự kiện trải nghiệm không gian học tập thẩm thấu tiếng Anh 100% cùng đội ngũ chuyên gia giáo dục Canada. Phụ huynh trực tiếp trao đổi cùng Ban Giám Hiệu và nhận ưu đãi học phí lên tới 30%.',
        cover_image: SCHOOL_IMAGES.render.lopHoc1,
        category: 'Open Day'
      },
      {
        id: 'evt-102',
        slug: 'workshop-phu-huynh-ky-luat-tich-cuc',
        title: 'Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực Chuẩn Canada',
        date: '2026-08-29',
        start_date: '2026-08-29T09:00:00Z',
        time: '09:00 AM - 11:00 AM',
        location: 'Hội trường Thư viện 5 Sao, Sunshine City Campus',
        description: 'Buổi tư vấn chuyên sâu giúp Phụ huynh nắm bắt tâm lý trẻ mầm non giai đoạn 1-5 tuổi, ứng dụng phương pháp giáo dục hành vi tích cực không đòn roi.',
        cover_image: SCHOOL_IMAGES.render.thuVien6,
        category: 'Workshop'
      }
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
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">SỰ KIỆN & LỄ HỘI THƯỜNG NIÊN</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Sự Kiện <span className="text-maple-gold">Nổi Bật</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Khám phá chuỗi sự kiện trải nghiệm học tập, workshop chuyên đề và các lễ hội rực rỡ sắc màu tại Sunshine Maple Bear.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events Grid */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-maple-black uppercase tracking-wide">
                Lịch Sự Kiện Sắp Diễn Ra
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-2">
                Đăng ký tham gia ngay để nhận tấm vé trải nghiệm môi trường mầm non 5 sao dành cho bé.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin mx-auto mb-4" />
                <p className="text-neutral-500 font-light text-sm">Đang tải lịch sự kiện...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20 text-neutral-400 font-light">
                Hiện chưa có sự kiện nào sắp diễn ra.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event) => (
                  <div key={event.id} className="group bg-white rounded-2xs overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={event.cover_image || SCHOOL_IMAGES.render.thuVien1}
                        alt={`Event: ${event.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-maple-red text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-2xs shadow-xs">
                          {event.category || 'Sự kiện'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="text-lg sm:text-xl font-display font-extrabold text-maple-black group-hover:text-maple-red transition-colors leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-3 text-neutral-700 text-xs font-bold">
                          <div className="w-8 h-8 rounded-2xs bg-[#FDFBF7] flex items-center justify-center text-maple-red border border-neutral-200">
                            <Calendar size={15} />
                          </div>
                          <span>{new Date(event.start_date || event.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700 text-xs font-bold">
                          <div className="w-8 h-8 rounded-2xs bg-[#FDFBF7] flex items-center justify-center text-maple-red border border-neutral-200">
                            <Clock size={15} />
                          </div>
                          <span>
                            {event.time || new Date(event.start_date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700 text-xs font-bold">
                          <div className="w-8 h-8 rounded-2xs bg-[#FDFBF7] flex items-center justify-center text-maple-red border border-neutral-200">
                            <MapPin size={15} />
                          </div>
                          <span className="truncate">{event.location || 'Sunshine City Campus'}</span>
                        </div>
                      </div>

                      <Link
                        href={`/events/${event.slug || event.id}`}
                        className="flex items-center justify-center w-full py-3.5 bg-maple-red text-white rounded-2xs group/btn hover:bg-red-700 transition-all font-extrabold text-xs uppercase tracking-wider gap-2 shadow-sm"
                      >
                        Đăng Ký Tham Gia <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Highlight Section */}
        <section className="py-20 bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#FDFBF7] rounded-2xs border border-neutral-200 flex items-start gap-5">
                <div className="w-12 h-12 bg-maple-red/10 rounded-2xs flex items-center justify-center text-maple-red flex-shrink-0">
                  <Users size={26} />
                </div>
                <div>
                  <h4 className="text-2xl font-display font-extrabold text-maple-black">2,500+ Phụ Huynh</h4>
                  <p className="text-xs text-neutral-600 font-medium mt-1">
                    Đã tin tưởng tham dự các chuỗi sự kiện Open Day & Workshop chuyên đề nuôi dạy con song ngữ tại nhà trường.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-[#FDFBF7] rounded-2xs border border-neutral-200 flex items-start gap-5">
                <div className="w-12 h-12 bg-maple-gold/10 rounded-2xs flex items-center justify-center text-maple-gold flex-shrink-0">
                  <Star size={26} />
                </div>
                <div>
                  <h4 className="text-2xl font-display font-extrabold text-maple-black">50+ Lễ Hội Thường Niên</h4>
                  <p className="text-xs text-neutral-600 font-medium mt-1">
                    Hàng năm tổ chức chuỗi sự kiện giáo dục, lễ hội hóa trang Halloween, Giáng Sinh, Tết Cổ Truyền cho học sinh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
