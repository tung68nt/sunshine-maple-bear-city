'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Gift,
  Stethoscope,
  HelpCircle,
  Quote,
  LayoutGrid,
  Calendar,
  Globe,
  Users,
  BookOpen,
  HeartPulse,
  Clock,
  Utensils,
  Building2,
  Award,
  ChevronRight,
  PhoneCall,
  Mail,
  GraduationCap
} from 'lucide-react'
import { PageSectionBlock } from '@/lib/supabase'
import { SCHOOL_IMAGES } from '@/lib/constants'

interface SectionRendererProps {
  blocks: PageSectionBlock[]
}

export function SectionRenderer({ blocks }: SectionRendererProps) {
  const [activeLang, setActiveLang] = useState<'en' | 'vi'>('en')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_site_lang') as 'en' | 'vi') || 'en'
    setActiveLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'en' || e.detail === 'vi') {
        setActiveLang(e.detail)
      }
    }

    window.addEventListener('smbLanguageChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbLanguageChange', handleLangChange as EventListener)
  }, [])

  if (!blocks || blocks.length === 0) return null

  // Strict helper for language resolution - NO MIXING!
  const getBilingualText = (viVal?: string, enVal?: string, fallbackVi?: string, fallbackEn?: string) => {
    if (activeLang === 'vi') {
      return viVal || fallbackVi || enVal || fallbackEn || ''
    }
    return enVal || fallbackEn || viVal || fallbackVi || ''
  }

  return (
    <div className="space-y-16 lg:space-y-20 bg-[#FDFBF7]">
      {blocks.map((block: any, idx) => {
        const imageUrl = block.image_url || SCHOOL_IMAGES.render.thuVien1

        switch (block.type) {
          // -------------------------------------------------------------
          // WIDGET 01: HERO BANNER SECTION (Homepage Soft Cream / Dark Crimson Tone)
          // -------------------------------------------------------------
          case 'HERO': {
            const tagline = getBilingualText(block.tagline_vi, block.tagline_en, 'TRƯỜNG MẦM NON CHUẨN CANADA', 'CANADIAN INTERNATIONAL KINDERGARTEN')
            const title = getBilingualText(block.title_vi, block.title_en, block.title, block.title)
            const subheading = getBilingualText(block.subheading_vi, block.subheading_en, block.subheading, block.subheading)
            const intro = getBilingualText(block.intro_vi, block.intro_en, block.intro, block.intro)
            const ctaPrimary = getBilingualText(block.cta_primary_text_vi, block.cta_primary_text_en, 'Đăng ký Tham quan Trường', 'Book a School Tour')
            const ctaSecondary = getBilingualText(block.cta_secondary_text_vi, block.cta_secondary_text_en, 'Khám phá Chương trình Học', 'Explore Academics')

            return (
              <section key={block.id || idx} className="relative bg-[#332C2B] text-white py-16 lg:py-24 rounded-3xl border border-neutral-800 overflow-hidden shadow-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="relative max-w-4xl space-y-6">
                  {tagline && (
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-sans font-extrabold uppercase tracking-[0.2em] text-[#C5A059]">
                        {tagline}
                      </span>
                    </div>
                  )}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                    {title}{' '}
                    {subheading && (
                      <span className="block italic font-normal text-[#C5A059] text-2xl sm:text-3xl mt-2">
                        {subheading}
                      </span>
                    )}
                  </h1>
                  {intro && (
                    <p className="text-base sm:text-lg text-neutral-200 max-w-3xl font-light leading-relaxed">
                      {intro}
                    </p>
                  )}

                  {/* Stat Pills in Hero */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                      <div className="text-xl font-serif font-bold text-[#C5A059]">500+</div>
                      <div className="text-[11px] text-neutral-200 font-medium">{activeLang === 'vi' ? 'Trường Toàn cầu' : 'Global Schools'}</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                      <div className="text-xl font-serif font-bold text-[#C5A059]">37</div>
                      <div className="text-[11px] text-neutral-200 font-medium">{activeLang === 'vi' ? 'Quốc gia Vận hành' : 'Countries Worldwide'}</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                      <div className="text-xl font-serif font-bold text-[#C5A059]">100%</div>
                      <div className="text-[11px] text-neutral-200 font-medium">{activeLang === 'vi' ? 'Tiếng Anh Thẩm thấu' : 'English Immersion'}</div>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                      <div className="text-xl font-serif font-bold text-[#C5A059]">1:5</div>
                      <div className="text-[11px] text-neutral-200 font-medium">{activeLang === 'vi' ? 'Tỷ lệ GV/Học sinh' : 'Teacher-Student Ratio'}</div>
                    </div>
                  </div>

                  {(ctaPrimary || ctaSecondary) && (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {ctaPrimary && (
                        <Link
                          href={block.cta_primary_url || '/#contact-us'}
                          className="px-6 py-3 bg-[#9E1B1E] hover:bg-[#801316] text-white text-xs font-sans font-semibold rounded-full shadow-md transition-all inline-flex items-center gap-2"
                        >
                          <span>{ctaPrimary}</span>
                          <ArrowRight size={14} />
                        </Link>
                      )}
                      {ctaSecondary && (
                        <Link
                          href={block.cta_secondary_url || '/academics/age-groups'}
                          className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white text-xs font-sans font-semibold rounded-full transition-all inline-flex items-center gap-2 border border-white/20"
                        >
                          <span>{ctaSecondary}</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 02: STATISTICS & ACCREDITATION METRICS
          // -------------------------------------------------------------
          case 'STATISTICS': {
            const tagline = activeLang === 'vi' ? 'CHỨNG NHẬN & THÀNH TỰU ĐẲNG CẤP QUỐC TẾ' : 'GLOBAL ACCREDITATION METRICS'
            const title = getBilingualText(block.title_vi, block.title_en, 'Con số Ấn tượng Về Sunshine Maple Bear', 'Sunshine Maple Bear Excellence by the Numbers')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 sm:p-10 border border-neutral-200/80 shadow-md space-y-8 rounded-3xl">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em] block">
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#332C2B] mt-1">
                      {title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(block.stats_list || [
                      { value: '500+', label_vi: 'Cơ sở Toàn cầu', label_en: 'Global Campuses', sub_vi: 'Tại 37 quốc gia phát triển', sub_en: 'Operating in 37 countries' },
                      { value: '100%', label_vi: 'Giáo viên Bản ngữ OCT', label_en: 'Native OCT Educators', sub_vi: 'Cử nhân Sư phạm Canada', sub_en: 'Certified Canadian Bachelors' },
                      { value: '1:5', label_vi: 'Tỷ lệ Chăm sóc Trẻ', label_en: 'Child Care Ratio', sub_vi: 'Đảm bảo an toàn tuyệt đối', sub_en: 'Ensuring total child focus' },
                      { value: '100%', label_vi: 'Thực phẩm Organic 5 Sao', label_en: 'Organic 5-Star Meals', sub_vi: 'Bếp ăn 1 chiều kiểm định 24h', sub_en: '24h sample verified kitchen' }
                    ]).map((st: any, sIdx: number) => (
                      <div key={sIdx} className="p-6 bg-[#FDFBF7] border border-neutral-200/60 space-y-2 rounded-2xl hover:border-[#9E1B1E] transition-colors">
                        <div className="text-3xl sm:text-4xl font-serif font-bold text-[#9E1B1E]">{st.value}</div>
                        <h4 className="font-sans font-bold text-sm text-[#332C2B]">{activeLang === 'vi' ? st.label_vi : st.label_en}</h4>
                        <p className="text-xs text-[#554D4B] font-light leading-relaxed">{activeLang === 'vi' ? st.sub_vi : st.sub_en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 03: 3-CARD FEATURE HIGHLIGHTS GRID
          // -------------------------------------------------------------
          case 'FEATURES': {
            const tagline = activeLang === 'vi' ? 'ĐẶC ĐIỂM NỔI BẬT' : 'PEDAGOGICAL PILLARS'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, block.title || 'Điểm Nổi bật Chương trình')
            const featurePointsVi = block.feature_points_vi && block.feature_points_vi.length > 0 ? block.feature_points_vi : [
              'Môi trường 100% Tiếng Anh thẩm thấu do giáo viên Canada đứng lớp.',
              'Cơ sở vật chất mầm non 5 sao hiện đại trong khu đô thị Sunshine City.',
              'Chế độ dinh dưỡng hữu cơ 5 sao thiết kế bởi bác sĩ nhi khoa.'
            ]
            const featurePointsEn = block.feature_points_en && block.feature_points_en.length > 0 ? block.feature_points_en : [
              '100% English Immersion environment led by Canadian certified educators.',
              'Modern 5-star facilities inside Sunshine City urban complex.',
              'Organic 5-star meal program designed by pediatric nutritionists.'
            ]
            const points = activeLang === 'vi' ? featurePointsVi : featurePointsEn

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 sm:p-10 border border-neutral-200/80 shadow-md space-y-8 rounded-3xl">
                  <div className="border-b border-neutral-200 pb-4 flex justify-between items-end">
                    <div>
                      <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em] block">
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#332C2B] mt-1">{title}</h2>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium hidden sm:block">
                      {activeLang === 'vi' ? '03 ƯU THẾ NỔI BẬT' : '03 KEY ADVANTAGES'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {points.map((point: string, pIdx: number) => (
                      <div key={pIdx} className="bg-[#FDFBF7] border border-neutral-200/60 p-6 space-y-4 shadow-xs hover:border-[#9E1B1E] transition-colors rounded-2xl">
                        <div className="w-10 h-10 bg-white border border-[#9E1B1E]/30 flex items-center justify-center text-[#9E1B1E] font-serif font-bold text-sm rounded-full shadow-xs">
                          0{pIdx + 1}
                        </div>
                        <p className="text-sm font-sans font-semibold text-[#332C2B] leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 04: AGE GROUP PROGRESSION SHOWCASE (12M - 5Y)
          // -------------------------------------------------------------
          case 'AGE_GROUPS': {
            const tagline = activeLang === 'vi' ? 'LỘ TRÌNH PHÁT TRIỂN THEO ĐỘ TUỔI' : 'AGE-APPROPRIATE LEARNING PROGRESSION'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Chương trình Mầm non Canada (12M – 5Y)')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Lộ trình phát triển được thiết kế tỉ mỉ theo 4 giai đoạn chuẩn Canada.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 space-y-8 shadow-md rounded-3xl">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em] block">
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#332C2B] mt-1">{title}</h2>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-[#554D4B] leading-relaxed font-light">{paragraph}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { stage: activeLang === 'vi' ? 'Lớp Nhà Trẻ (Toddler)' : 'Toddler Class', age: '12M – 24M', desc: activeLang === 'vi' ? 'Phát triển giác quan, vận động thô & gắn kết cảm xúc an toàn.' : 'Sensory discovery, gross motor & emotional bonding.', ratio: '1:4' },
                      { stage: activeLang === 'vi' ? 'Lớp Mầm (Nursery)' : 'Nursery Class', age: '2Y – 3Y', desc: activeLang === 'vi' ? 'Đắm mình Tiếng Anh tự nhiên, phát triển vốn từ & giao tiếp phản xạ.' : 'Natural English immersion, vocabulary & peer dialogue.', ratio: '1:5' },
                      { stage: activeLang === 'vi' ? 'Lớp Chồi (Junior K)' : 'Junior Kindergarten', age: '3Y – 4Y', desc: activeLang === 'vi' ? 'Ngữ âm Jolly Phonics, tư duy toán học logic & khám phá khoa học.' : 'Jolly Phonics, mathematical logic & science discovery.', ratio: '1:8' },
                      { stage: activeLang === 'vi' ? 'Lớp Lá (Senior K)' : 'Senior Kindergarten', age: '4Y – 5Y', desc: activeLang === 'vi' ? 'Dự án STEAM nâng cao & chuẩn bị tâm thế vững vàng vào Lớp 1.' : 'Advanced STEAM projects & Primary School readiness.', ratio: '1:10' }
                    ].map((g, gIdx) => (
                      <div key={gIdx} className="p-6 bg-[#FDFBF7] border border-neutral-200/60 space-y-3 rounded-2xl flex flex-col justify-between hover:border-[#9E1B1E] transition-colors">
                        <div className="space-y-2">
                          <span className="text-[11px] font-sans font-extrabold px-3 py-1 bg-[#9E1B1E]/10 text-[#9E1B1E] rounded-full inline-block">{g.age}</span>
                          <h4 className="font-serif font-bold text-lg text-[#332C2B]">{g.stage}</h4>
                          <p className="text-xs text-[#554D4B] font-light leading-relaxed">{g.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500">
                          <span>{activeLang === 'vi' ? 'Tỷ lệ GV/HS:' : 'Staff Ratio:'}</span>
                          <span className="font-bold text-[#332C2B]">{g.ratio}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 05: DAILY ACTIVITY ROUTINE FLOW
          // -------------------------------------------------------------
          case 'DAILY_SCHEDULE': {
            const tagline = activeLang === 'vi' ? 'THỜI KHÓA BIỂU & NHỊP SỐNG HÀNG NGÀY' : 'DAILY RHYTHM & ROUTINE'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Thời khóa biểu Sinh hoạt & Học tập Hàng ngày')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white text-[#332C2B] p-8 sm:p-10 border border-neutral-200/80 shadow-md space-y-8 rounded-3xl">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em] block">
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#332C2B] mt-1">{title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { time: '07:30 - 08:30', task: activeLang === 'vi' ? 'Đón trẻ & Kiểm tra Sức khỏe Đầu giờ' : 'Morning Health Check & Welcome Circle' },
                      { time: '08:30 - 11:00', task: activeLang === 'vi' ? 'Jolly Phonics & Đắm mình Tiếng Anh' : 'Jolly Phonics & English Immersion Discovery' },
                      { time: '11:30 - 14:00', task: activeLang === 'vi' ? 'Ăn trưa Hữu cơ 5 Sao & Vệ sinh, Ngủ trưa' : '5-Star Organic Lunch & Rest Time' },
                      { time: '14:30 - 16:30', task: activeLang === 'vi' ? 'Khám phá STEAM & Thể thao ngoài trời' : 'STEAM Activity & Outdoor Sports' },
                      { time: '16:30 - 17:30', task: activeLang === 'vi' ? 'Trả trẻ & Báo cáo Nhật ký Ngày' : 'Farewell Circle & Parent Handover' }
                    ].map((s, sIdx) => (
                      <div key={sIdx} className="p-5 bg-[#FDFBF7] border border-neutral-200/60 space-y-2 rounded-2xl">
                        <span className="text-xs font-sans font-extrabold text-[#9E1B1E] block">{s.time}</span>
                        <p className="text-xs text-[#554D4B] font-light leading-snug">{s.task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 06: 5-STAR ORGANIC CULINARY & NUTRITION
          // -------------------------------------------------------------
          case 'NUTRITION': {
            const tagline = activeLang === 'vi' ? 'DINH DƯỠNG HỮU CƠ 5 SAO' : '5-STAR ORGANIC NUTRITION'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Chương trình Dinh dưỡng & Bữa ăn Organic 5 Sao')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Chế độ ăn đầy đủ dinh dưỡng hữu cơ được bác sĩ nhi khoa tư vấn.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 space-y-8 shadow-md rounded-3xl">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em] block">
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#332C2B] mt-1">{title}</h2>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-[#554D4B] leading-relaxed font-light">{paragraph}</p>
                  )}

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-[#FDFBF7] border border-neutral-200/60 space-y-2 rounded-2xl">
                      <span className="text-xs font-sans font-extrabold text-[#9E1B1E] block">{activeLang === 'vi' ? '100% HỮU CƠ' : '100% ORGANIC'}</span>
                      <h4 className="font-serif font-bold text-base text-[#332C2B]">{activeLang === 'vi' ? 'Nguồn Thực phẩm Hữu cơ' : 'Certified Organic Farm'}</h4>
                      <p className="text-xs text-[#554D4B] font-light">{activeLang === 'vi' ? 'Cung cấp từ nông trại hữu cơ kiểm định, tươi sống mỗi ngày.' : 'Daily fresh delivery from accredited organic farms.'}</p>
                    </div>
                    <div className="p-6 bg-[#FDFBF7] border border-neutral-200/60 space-y-2 rounded-2xl">
                      <span className="text-xs font-sans font-extrabold text-[#9E1B1E] block">{activeLang === 'vi' ? 'CÂN BẰNG CALO' : 'CALORIE BALANCED'}</span>
                      <h4 className="font-serif font-bold text-base text-[#332C2B]">{activeLang === 'vi' ? 'Thực đơn Bác sĩ Nhi khoa' : 'Pediatric Dietitian Menu'}</h4>
                      <p className="text-xs text-[#554D4B] font-light">{activeLang === 'vi' ? 'Tính toán lượng calo phù hợp từng độ tuổi phát triển.' : 'Calorie-balanced meals designed for child growth.'}</p>
                    </div>
                    <div className="p-6 bg-[#FDFBF7] border border-neutral-200/60 space-y-2 rounded-2xl">
                      <span className="text-xs font-sans font-extrabold text-[#9E1B1E] block">{activeLang === 'vi' ? 'AN TOÀN TUỆT ĐỐI' : 'HYGIENE GUARANTEE'}</span>
                      <h4 className="font-serif font-bold text-base text-[#332C2B]">{activeLang === 'vi' ? 'Bếp ăn 1 Chiều 5 Sao' : '5-Star Hygiene Standards'}</h4>
                      <p className="text-xs text-[#554D4B] font-light">{activeLang === 'vi' ? 'Lưu mẫu thức ăn 24h và kiểm định vi sinh định kỳ.' : '24-hour food sampling & microbiology audits.'}</p>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 07: 5-STAR FACILITIES SHOWCASE
          // -------------------------------------------------------------
          case 'FACILITIES': {
            const tagline = activeLang === 'vi' ? 'CƠ SỞ VẬT CHẤT 5 SAO' : '5-STAR CAMPUS FACILITIES'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Không gian Học tập 5 Sao Sunshine City')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200/80 p-8 sm:p-10 space-y-8 shadow-md rounded-3xl">
                  <div className="flex justify-between items-end border-b border-neutral-200 pb-4">
                    <div>
                      <span className="text-xs font-display font-extrabold text-[#9E1B1E] uppercase tracking-[0.2em] block">
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#332C2B] mt-1">
                        {title}
                      </h2>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium hidden sm:block">
                      {activeLang === 'vi' ? 'Khu đô thị Sunshine City Hanoi' : 'Sunshine City Campus'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: activeLang === 'vi' ? 'Thư viện Tiêu chuẩn Canada' : 'Canadian Standard Library', img: SCHOOL_IMAGES.render.thuVien1, desc: activeLang === 'vi' ? 'Hơn 2,000 đầu sách ngoại văn chuẩn Maple Bear Canada.' : 'Over 2,000 English children titles.' },
                      { name: activeLang === 'vi' ? 'Phòng Học Hiện đại 5 Sao' : 'Modern 5-Star Classrooms', img: SCHOOL_IMAGES.render.lopHoc1, desc: activeLang === 'vi' ? 'Ánh sáng tự nhiên, góc học tập STEAM & góc đắm mình Tiếng Anh.' : 'Natural light, STEAM corners & English centers.' },
                      { name: activeLang === 'vi' ? 'Phòng Y tế & Chăm sóc 5 Sao' : '5-Star Medical Clinic', img: SCHOOL_IMAGES.render.phongYTe1, desc: activeLang === 'vi' ? 'Y sĩ thường trực, thiết bị sơ cứu & máy lọc không khí HEPA.' : 'Registered nurses & HEPA air purification.' },
                      { name: activeLang === 'vi' ? 'Khu Vui chơi Thể thao Ngoài trời' : 'Outdoor Adventure Playground', img: SCHOOL_IMAGES.render.hanhLang1, desc: activeLang === 'vi' ? 'Sân cỏ nhân tạo an toàn & thiết bị phát triển thể chất.' : 'Safe turf playground & physical play frames.' },
                      { name: activeLang === 'vi' ? 'Bếp ăn 1 Chiều 5 Sao' : '5-Star On-site Kitchen', img: SCHOOL_IMAGES.render.phongChucNang1, desc: activeLang === 'vi' ? 'Trang thiết bị inox 304 tiêu chuẩn khách sạn 5 sao.' : 'Grade-304 stainless steel culinary gear.' },
                      { name: activeLang === 'vi' ? 'Phòng Chức năng & Âm nhạc' : 'STEAM & Performing Arts Studio', img: SCHOOL_IMAGES.render.thuVien3, desc: activeLang === 'vi' ? 'Đàn Piano, dụng cụ âm nhạc & góc thí nghiệm khoa học.' : 'Pianos, instruments & science lab kits.' }
                    ].map((fac, fIdx) => (
                      <div key={fIdx} className="group bg-[#FDFBF7] border border-neutral-200/60 overflow-hidden space-y-3 rounded-2xl shadow-xs">
                        <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
                          <Image src={fac.img} alt={fac.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-5 space-y-1">
                          <h4 className="font-serif font-bold text-base text-[#332C2B]">{fac.name}</h4>
                          <p className="text-xs text-[#554D4B] font-light leading-relaxed">{fac.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 08: FOUNDING FAMILIES SPECIAL INCENTIVE
          // -------------------------------------------------------------
          case 'FOUNDING_FAMILIES': {
            const tagline = activeLang === 'vi' ? 'ĐẶC QUYỀN PHỤ HUYNH SÁNG LẬP 2026' : 'FOUNDING FAMILIES PRIVILEGE 2026'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Chương trình Phụ huynh Sáng lập 2026')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Gói ưu đãi đặc quyền dành cho 50 gia đình đăng ký đầu tiên.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-[#9E1B1E] to-[#801316] text-white p-8 sm:p-10 space-y-8 shadow-xl rounded-3xl relative overflow-hidden">
                  <div className="border-b border-white/20 pb-4">
                    <span className="text-xs font-display font-extrabold text-[#C5A059] uppercase tracking-[0.2em] block">
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">{title}</h2>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-neutral-200 leading-relaxed font-light">{paragraph}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 space-y-2 rounded-2xl">
                      <span className="text-xl font-serif font-bold text-[#C5A059]">
                        {activeLang === 'vi' ? 'GIẢM 20% HỌC PHÍ' : '20% TUITION DISCOUNT'}
                      </span>
                      <p className="text-xs text-neutral-200 font-light">
                        {activeLang === 'vi' ? 'Áp dụng trọn đời suốt quá trình bé theo học tại trường.' : 'Lifetime discount for entire enrollment duration.'}
                      </p>
                    </div>
                    <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 space-y-2 rounded-2xl">
                      <span className="text-xl font-serif font-bold text-[#C5A059]">
                        {activeLang === 'vi' ? 'MIỄN 100% PHÍ ĐẦU VÀO' : '100% WAIVED ENTRANCE FEES'}
                      </span>
                      <p className="text-xs text-neutral-200 font-light">
                        {activeLang === 'vi' ? 'Miễn phí CSVC & Phí xét tuyển (Trị giá 15.000.000 VNĐ).' : 'Waived facility & assessment fee (15M VND value).'}
                      </p>
                    </div>
                    <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 space-y-2 rounded-2xl">
                      <span className="text-xl font-serif font-bold text-[#C5A059]">
                        {activeLang === 'vi' ? 'BỘ ĐỒNG PHỤC CANADA' : 'CANADIAN UNIFORM KIT'}
                      </span>
                      <p className="text-xs text-neutral-200 font-light">
                        {activeLang === 'vi' ? 'Tặng bộ đồng phục & balo đón trẻ cao cấp.' : 'Free Canadian uniform & backpack kit.'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 09: TOUR BOOKING CTA BANNER
          // -------------------------------------------------------------
          case 'CTA': {
            const tagline = activeLang === 'vi' ? 'Hotline Tuyển sinh: 094 254 6655' : 'Admissions Hotline: 094 254 6655'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Sẵn sàng Đồng hành cùng Sunshine Maple Bear?')
            const intro = getBilingualText(block.intro_vi, block.intro_en, block.intro, 'Trải nghiệm không gian học tập 5 sao chuẩn Canada cùng Giám đốc Tuyển sinh.')
            const ctaPrimary = getBilingualText(block.cta_primary_text_vi, block.cta_primary_text_en, 'Đăng ký Tham quan Trường', 'Book a Campus Tour')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-10 bg-gradient-to-r from-[#9E1B1E] to-[#801316] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl rounded-3xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#C5A059] text-xs font-sans font-extrabold tracking-wider">
                      <PhoneCall size={14} /> {tagline}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{title}</h2>
                    <p className="text-xs text-neutral-200 font-light">
                      {intro}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={block.cta_primary_url || '/#contact-us'}
                      className="px-6 py-3 bg-white text-[#9E1B1E] hover:bg-neutral-100 text-xs font-sans font-semibold transition-all inline-flex items-center gap-2 rounded-full shadow-md"
                    >
                      <span>{ctaPrimary}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </section>
            )
          }

          default:
            return null
        }
      })}
    </div>
  )
}
