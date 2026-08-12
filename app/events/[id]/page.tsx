'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Calendar, MapPin, Clock, ArrowLeft, Phone, Users, Sparkles, CheckCircle2, ShieldCheck, Star, Award, BookOpen } from 'lucide-react'
import { EventRegistrationForm } from '@/components/event-registration-form'

interface EventDetail {
  id: string
  title: string
  category: string
  startDate: string
  endDate: string
  location: string
  coverImage: string
  maxAttendees: number
  registeredCount: number
  description: string
  agenda?: { time: string; activity: string }[]
  highlights?: string[]
  galleryImages?: string[]
}

const event1: EventDetail = {
  id: 'evt-101',
  title: 'Open Day 2026: Hành Trình Khám Phá Mầm Non Canada 100% Tiếng Anh',
  category: 'Open Day',
  startDate: '22/08/2026 (08:30 AM - 11:30 AM)',
  endDate: '2026-08-22 11:30',
  location: 'S4 Building, Sunshine City, Ciputra, Hà Nội',
  coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
  maxAttendees: 100,
  registeredCount: 42,
  description: 'Trải nghiệm không gian học tập chuẩn mầm non Canada 5 sao tại Sunshine City, tham dự giờ học trải nghiệm song ngữ 100% Tiếng Anh, tư vấn 1-1 với Ban Giám hiệu và nhận ưu đãi học phí Founding Families lên tới 30%.',
  highlights: [
    '100% Giáo viên bản ngữ Canada có bằng cử nhân sư phạm mầm non quốc tế',
    'Tham quan phòng học chuẩn Maple Bear, phòng STEAM & thư viện 5.000 đầu sách',
    'Thưởng thức thực đơn dinh dưỡng hữu cơ 5 sao từ đầu bếp khách sạn cao cấp',
    'Miễn 100% phí ghi danh và giảm 30% học phí trọn đời cho cư dân Sunshine City'
  ],
  agenda: [
    { time: '08:30 - 09:00', activity: 'Đón tiếp Phụ huynh, check-in và thưởng thức Tiệc trà Welcome Tea' },
    { time: '09:00 - 09:45', activity: 'Tham quan hệ thống phòng học, khu vui chơi ngoài trời & phòng chức năng' },
    { time: '09:45 - 10:30', activity: 'Hội thảo Ban Giám Hiệu: Phương pháp nhúng ngôn ngữ Tiếng Anh tự nhiên' },
    { time: '10:30 - 11:15', activity: 'Lớp học thử Tiếng Anh trải nghiệm cho bé với Giáo viên Canada' },
    { time: '11:15 - 11:30', activity: 'Tư vấn lộ trình học tập 1-1 & Nhận gói quà tặng tuyển sinh' }
  ]
}

const event2: EventDetail = {
  id: 'evt-102',
  title: 'Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực & Nuôi Dạy Con Song Ngữ',
  category: 'Workshop',
  startDate: '29/08/2026 (09:00 AM - 11:00 AM)',
  endDate: '2026-08-29 11:00',
  location: 'Hội trường Thư viện Maple Bear Sunshine City',
  coverImage: '/images/render/THU_VIEN_6_.jpg',
  maxAttendees: 50,
  registeredCount: 28,
  description: 'Chuyên gia giáo dục mầm non Canada chia sẻ bí quyết giúp trẻ phát triển ngôn ngữ tự nhiên, hình thành tư duy độc lập và giải quyết các hành vi tâm lý lứa tuổi 1-5 tuổi.',
  highlights: [
    'Gặp gỡ Chuyên gia Đào tạo Giáo dục Mầm non Canada',
    'Phương pháp Kỷ luật tích cực không đòn roi, không quát mắng',
    'Bí quyết tạo môi trường tắm ngôn ngữ Tiếng Anh tại nhà cho con',
    'Giải đáp trực tiếp thắc mắc tâm lý trẻ em từ 12 tháng đến 5 tuổi'
  ],
  agenda: [
    { time: '09:00 - 09:15', activity: 'Đón tiếp Phụ huynh & Giao lưu đầu giờ' },
    { time: '09:15 - 10:15', activity: 'Chuyên đề: Kỷ luật tích cực & Phát triển song ngữ sớm' },
    { time: '10:15 - 11:00', activity: 'Q&A Giải đáp thắc mắc 1-1 cùng Chuyên gia' }
  ]
}

const event3: EventDetail = {
  id: 'evt-103',
  title: 'Lễ Hội Mùa Thu Autumn Harvest Festival & Trải Nghiệm Ẩm Thực 5 Sao',
  category: 'Festival',
  startDate: '12/09/2026 (15:00 PM - 18:00 PM)',
  endDate: '2026-09-12 18:00',
  location: 'Khuôn viên Sân chơi Ngoài trời Sunshine City',
  coverImage: '/images/render/SAN_CHOI_1_.jpg',
  maxAttendees: 150,
  registeredCount: 89,
  description: 'Sự kiện trải nghiệm văn hóa mùa thu phương Tây dành cho bé và gia đình. Tham gia các hoạt động làm thủ công STEAM, vẽ tranh lá thu và thưởng thức buffet dinh dưỡng 5 sao.',
  highlights: [
    'Trải nghiệm văn hóa mùa thu Canada & Phương Tây',
    'Góc sáng tạo STEAM: Làm đèn lồng, trang trí quả bí ngô & vẽ tranh',
    'Buffet tiệc trà & bánh ngọt dinh dưỡng 5 sao chế biến tại chỗ',
    'Chụp ảnh gia đình miễn phí tại khu check-in Thu Vàng'
  ],
  agenda: [
    { time: '15:00 - 15:30', activity: 'Check-in nhận quà Lễ hội & Trang phục chụp ảnh' },
    { time: '15:30 - 16:30', activity: 'Hoạt động trải nghiệm STEAM & Trò chơi vận động ngoài trời' },
    { time: '16:30 - 17:30', activity: 'Thưởng thức Buffet tiệc trà Lễ hội Thu 5 sao' },
    { time: '17:30 - 18:00', activity: 'Bốc thăm may mắn & Trao quà kỷ niệm' }
  ]
}

const defaultEventsMap: Record<string, EventDetail> = {
  'evt-101': event1,
  'open-day-2026-canada-sunshine-city': event1,
  'evt-102': event2,
  'workshop-phu-huynh-ky-luat-tich-cuc': event2,
  'evt-103': event3,
  'le-hoi-mua-thu-autumn-harvest-2026': event3,
}

export default function EventDetailPage() {
  const params = useParams()
  const rawId = (params?.id as string) || 'evt-101'
  const [event, setEvent] = useState<EventDetail>(defaultEventsMap[rawId] || defaultEventsMap['evt-101'])

  useEffect(() => {
    // Check if there is CMS saved data in localStorage first
    try {
      const savedLocal = localStorage.getItem(`smb_event_${rawId}`)
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal)
        setEvent(parsed)
        return
      }
    } catch (e) {}

    if (defaultEventsMap[rawId]) {
      setEvent(defaultEventsMap[rawId])
    } else {
      setEvent({
        ...defaultEventsMap['evt-101'],
        id: rawId,
        title: `Sự kiện Trường Mầm Non Sunshine Maple Bear (${rawId})`
      })
    }
  }, [rawId])

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B] font-body">
      <Header />

      <main className="flex-1 pb-16 md:pb-24">
        
        {/* HERO SECTION - SEAMLESS CONNECTION TO HEADER NAVBAR WITH ZERO WHITE GAP */}
        <section className="relative bg-[#151513] text-white pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#151513] via-[#151513]/85 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 space-y-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-2xs backdrop-blur-md transition-all group border border-white/10"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-maple-gold" />
              <span>Quay lại Danh sách Sự kiện</span>
            </Link>

            <div className="space-y-4 max-w-4xl">
              
              {/* ELEGANT PROFESSIONAL BADGES */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-maple-red text-white text-xs font-bold uppercase tracking-widest rounded-2xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {event.category}
                </span>

                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Đang mở đăng ký</span>
                  <span className="text-white/60 font-light">•</span>
                  <span className="text-maple-gold font-bold">Còn {event.maxAttendees - event.registeredCount} suất</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-3 pt-3 text-xs">
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xs border border-white/15 backdrop-blur-md">
                  <Calendar size={15} className="text-maple-gold flex-shrink-0" />
                  <span className="font-medium text-neutral-100">{event.startDate}</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xs border border-white/15 backdrop-blur-md">
                  <MapPin size={15} className="text-maple-gold flex-shrink-0" />
                  <span className="font-medium text-neutral-100">{event.location}</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xs border border-white/15 backdrop-blur-md">
                  <Users size={15} className="text-maple-gold flex-shrink-0" />
                  <span className="font-medium text-neutral-100">Đã đăng ký: {event.registeredCount} / {event.maxAttendees} người</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTENT & REGISTRATION FORM (2-COLUMN GRID) */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8 md:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Event Overview & Content Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Description Card */}
              <div className="bg-white border border-neutral-200/80 p-6 md:p-8 rounded-2xs shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-3">
                  <span className="w-2 h-2 rounded-full bg-maple-red" />
                  <h2 className="text-lg md:text-xl font-display font-bold text-[#1D1D1B]">
                    Giới Thiệu Chi Tiết Sự Kiện
                  </h2>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed font-light">
                  {event.description}
                </p>

                {/* Cover Image Preview */}
                <div className="relative w-full h-64 sm:h-80 rounded-2xs overflow-hidden border border-neutral-200/80 shadow-2xs">
                  <Image
                    src={event.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Event Gallery */}
              {event.galleryImages && event.galleryImages.length > 0 && (
                <div className="bg-white border border-neutral-200/80 p-6 md:p-8 rounded-2xs shadow-2xs space-y-4">
                  <h3 className="text-base font-display font-bold text-[#1D1D1B] flex items-center gap-2">
                    <Sparkles size={18} className="text-emerald-600" />
                    Thư Viện Hình Ảnh Không Gian & Hoạt Động Sự Kiện
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {event.galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative h-32 sm:h-40 rounded-2xs overflow-hidden border border-neutral-200/80 shadow-2xs group">
                        <Image
                          src={imgUrl}
                          alt={`Gallery ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights Section */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="bg-white border border-neutral-200/80 p-6 md:p-8 rounded-2xs shadow-2xs space-y-4">
                  <h3 className="text-base font-display font-bold text-[#1D1D1B] flex items-center gap-2">
                    <Sparkles size={18} className="text-maple-gold" />
                    Nội Dung Nổi Bật Dành Cho Phụ Huynh & Bé
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    {event.highlights.map((hl, idx) => (
                      <div key={idx} className="p-3.5 bg-[#FDFBF7] border border-neutral-200/80 rounded-2xs flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-[#1D1D1B] leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agenda Timeline */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="bg-white border border-neutral-200/80 p-6 md:p-8 rounded-2xs shadow-2xs space-y-4">
                  <h3 className="text-base font-display font-bold text-[#1D1D1B] flex items-center gap-2">
                    <Clock size={18} className="text-maple-red" />
                    Lịch Trình Chi Tiết Sự Kiện (Agenda)
                  </h3>

                  <div className="space-y-3 pt-2">
                    {event.agenda.map((ag, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-[#FDFBF7] border border-neutral-200/80 rounded-2xs items-center">
                        <span className="px-2.5 py-1 bg-[#1D1D1B] text-white font-mono font-bold text-xs rounded-2xs flex-shrink-0">
                          {ag.time}
                        </span>
                        <span className="text-xs font-semibold text-[#1D1D1B]">{ag.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Floating Registration Form (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <EventRegistrationForm
                eventTitle={event.title}
                eventDate={event.startDate}
                eventLocation={event.location}
              />

              <div className="bg-white border border-neutral-200/80 p-4 rounded-2xs text-xs space-y-2 text-neutral-600 font-light shadow-2xs">
                <span className="font-bold text-[#1D1D1B] flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Quyền lợi Phụ huynh Đăng ký Trước:
                </span>
                <p>• Nhận bộ quà tặng độc quyền từ Sunshine Maple Bear Canada.</p>
                <p>• Được xếp lịch tư vấn 1-1 riêng với Ban Giám hiệu.</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
