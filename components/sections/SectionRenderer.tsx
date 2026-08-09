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
  const [activeLang, setActiveLang] = useState<'en' | 'vi'>('vi')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_site_lang') as 'en' | 'vi') || 'vi'
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
    <div className="space-y-16">
      {blocks.map((block: any, idx) => {
        const imageUrl = block.image_url || SCHOOL_IMAGES.render.thuVien1

        switch (block.type) {
          // -------------------------------------------------------------
          // WIDGET 01: HERO BANNER SECTION
          // -------------------------------------------------------------
          case 'HERO': {
            const tagline = getBilingualText(block.tagline_vi, block.tagline_en, 'TRƯỜNG MẦM NON CHUẨN CANADA', 'CANADIAN INTERNATIONAL KINDERGARTEN')
            const title = getBilingualText(block.title_vi, block.title_en, block.title, block.title)
            const subheading = getBilingualText(block.subheading_vi, block.subheading_en, block.subheading, block.subheading)
            const intro = getBilingualText(block.intro_vi, block.intro_en, block.intro, block.intro)
            const ctaPrimary = getBilingualText(block.cta_primary_text_vi, block.cta_primary_text_en, 'Đăng ký Tham quan Trường', 'Book a School Tour')
            const ctaSecondary = getBilingualText(block.cta_secondary_text_vi, block.cta_secondary_text_en, 'Khám phá Chương trình Học', 'Explore Academics')

            return (
              <section key={block.id || idx} className="relative bg-[#151513] text-white py-16 lg:py-24 border-b border-neutral-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  {tagline && (
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                      <span className="text-xs font-semibold text-maple-gold">
                        {tagline}
                      </span>
                    </div>
                  )}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
                    {title}{' '}
                    {subheading && (
                      <span className="block font-serif italic font-normal text-amber-200 text-2xl sm:text-3xl mt-2">
                        {subheading}
                      </span>
                    )}
                  </h1>
                  {intro && (
                    <p className="text-base sm:text-lg text-neutral-300 max-w-3xl font-light leading-relaxed">
                      {intro}
                    </p>
                  )}

                  {/* Stat Pills in Hero */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800 max-w-4xl">
                    <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-2xs">
                      <div className="text-xl font-display font-extrabold text-maple-gold">500+</div>
                      <div className="text-[11px] text-neutral-300 font-medium">{activeLang === 'vi' ? 'Trường Toàn cầu' : 'Global Schools'}</div>
                    </div>
                    <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-2xs">
                      <div className="text-xl font-display font-extrabold text-maple-gold">37</div>
                      <div className="text-[11px] text-neutral-300 font-medium">{activeLang === 'vi' ? 'Quốc gia Vận hành' : 'Countries Worldwide'}</div>
                    </div>
                    <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-2xs">
                      <div className="text-xl font-display font-extrabold text-maple-gold">100%</div>
                      <div className="text-[11px] text-neutral-300 font-medium">{activeLang === 'vi' ? 'Tiếng Anh Thẩm thấu' : 'English Immersion'}</div>
                    </div>
                    <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-2xs">
                      <div className="text-xl font-display font-extrabold text-maple-gold">1:5</div>
                      <div className="text-[11px] text-neutral-300 font-medium">{activeLang === 'vi' ? 'Tỷ lệ GV/Học sinh' : 'Teacher-Student Ratio'}</div>
                    </div>
                  </div>

                  {(ctaPrimary || ctaSecondary) && (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {ctaPrimary && (
                        <Link
                          href={block.cta_primary_url || '/#contact-us'}
                          className="px-5 py-2.5 bg-maple-red hover:bg-red-700 text-white text-xs font-semibold rounded-2xs shadow-2xs transition-colors inline-flex items-center gap-2 border border-maple-red"
                        >
                          <span>{ctaPrimary}</span>
                          <ArrowRight size={14} />
                        </Link>
                      )}
                      {ctaSecondary && (
                        <Link
                          href={block.cta_secondary_url || '/academics/age-groups'}
                          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-2xs transition-colors inline-flex items-center gap-2 border border-neutral-700"
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
            const tagline = activeLang === 'vi' ? 'Chứng nhận & Thành tựu Đẳng cấp Quốc tế' : 'Global Accreditation Metrics'
            const title = getBilingualText(block.title_vi, block.title_en, 'Con số Ấn tượng Về Sunshine Maple Bear', 'Sunshine Maple Bear Excellence by the Numbers')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#151513] text-white p-8 border border-neutral-800 shadow-md space-y-6 rounded-2xs">
                  <div className="border-b border-neutral-800 pb-4">
                    <span className="text-xs font-semibold text-maple-gold flex items-center gap-2 block">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-gold inline-block" />
                      {tagline}
                    </span>
                    <h2 className="text-2xl font-display font-bold text-white mt-1">
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
                      <div key={sIdx} className="p-5 bg-neutral-900 border border-neutral-800 space-y-2 rounded-2xs">
                        <div className="text-3xl font-display font-extrabold text-maple-gold">{st.value}</div>
                        <h4 className="font-bold text-sm text-white">{activeLang === 'vi' ? st.label_vi : st.label_en}</h4>
                        <p className="text-xs text-neutral-400 font-light">{activeLang === 'vi' ? st.sub_vi : st.sub_en}</p>
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
            const tagline = activeLang === 'vi' ? 'Đặc điểm Nổi bật' : 'Pedagogical Pillars'
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
                <div className="border-b border-neutral-200 pb-4 mb-8 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium hidden sm:block">
                    {activeLang === 'vi' ? '03 ƯU THẾ NỔI BẬT' : '03 KEY ADVANTAGES'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {points.map((point: string, pIdx: number) => (
                    <div key={pIdx} className="bg-white border border-neutral-200 p-6 space-y-4 shadow-2xs hover:border-maple-red transition-colors rounded-2xs">
                      <div className="w-10 h-10 bg-[#FDFBF7] border border-neutral-300 flex items-center justify-center text-maple-red font-display font-bold text-sm rounded-2xs">
                        0{pIdx + 1}
                      </div>
                      <p className="text-sm font-bold text-[#1D1D1B] leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 04: AGE GROUP PROGRESSION SHOWCASE (12M - 5Y)
          // -------------------------------------------------------------
          case 'AGE_GROUPS': {
            const tagline = activeLang === 'vi' ? 'Lộ trình Phát triển Theo Độ tuổi' : 'Age-Appropriate Learning Progression'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Chương trình Mầm non Canada (12M – 5Y)')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Lộ trình phát triển được thiết kế tỉ mỉ theo 4 giai đoạn chuẩn Canada.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-neutral-700 leading-relaxed font-light">{paragraph}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {[
                      { stage: activeLang === 'vi' ? 'Lớp Nhà Trẻ (Toddler)' : 'Toddler Class', age: '12M – 24M', desc: activeLang === 'vi' ? 'Phát triển giác quan, vận động thô & gắn kết cảm xúc an toàn.' : 'Sensory discovery, gross motor & emotional bonding.', ratio: '1:4' },
                      { stage: activeLang === 'vi' ? 'Lớp Mầm (Nursery)' : 'Nursery Class', age: '2Y – 3Y', desc: activeLang === 'vi' ? 'Đắm mình Tiếng Anh tự nhiên, phát triển vốn từ & giao tiếp phản xạ.' : 'Natural English immersion, vocabulary & peer dialogue.', ratio: '1:5' },
                      { stage: activeLang === 'vi' ? 'Lớp Chồi (Junior K)' : 'Junior Kindergarten', age: '3Y – 4Y', desc: activeLang === 'vi' ? 'Ngữ âm Jolly Phonics, tư duy toán học logic & khám phá khoa học.' : 'Jolly Phonics, mathematical logic & science discovery.', ratio: '1:8' },
                      { stage: activeLang === 'vi' ? 'Lớp Lá (Senior K)' : 'Senior Kindergarten', age: '4Y – 5Y', desc: activeLang === 'vi' ? 'Dự án STEAM nâng cao & chuẩn bị tâm thế vững vàng vào Lớp 1.' : 'Advanced STEAM projects & Primary School readiness.', ratio: '1:10' }
                    ].map((g, gIdx) => (
                      <div key={gIdx} className="p-5 bg-[#FDFBF7] border border-neutral-300 space-y-3 rounded-2xs flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold px-2 py-0.5 bg-maple-red/10 text-maple-red border border-maple-red/20 rounded-2xs inline-block">{g.age}</span>
                          <h4 className="font-bold text-base text-[#1D1D1B] pt-1">{g.stage}</h4>
                          <p className="text-xs text-neutral-600 font-light leading-relaxed">{g.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500">
                          <span>{activeLang === 'vi' ? 'Tỷ lệ GV/HS:' : 'Staff Ratio:'}</span>
                          <span className="font-bold text-[#1D1D1B]">{g.ratio}</span>
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
            const tagline = activeLang === 'vi' ? 'Thời khóa biểu & Nhịp sống Hàng ngày' : 'Daily Rhythm & Routine'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Thời khóa biểu Sinh hoạt & Học tập Hàng ngày')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#151513] text-white p-8 border border-neutral-800 space-y-6 shadow-md rounded-2xs">
                  <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
                    <Clock size={20} className="text-maple-gold" />
                    <div>
                      <span className="text-xs font-semibold text-maple-gold flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-gold inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl font-display font-bold text-white mt-1">{title}</h2>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                    {[
                      { time: '07:30 - 08:30', task: activeLang === 'vi' ? 'Đón trẻ & Kiểm tra Sức khỏe Đầu giờ' : 'Morning Health Check & Welcome Circle' },
                      { time: '08:30 - 11:00', task: activeLang === 'vi' ? 'Jolly Phonics & Đắm mình Tiếng Anh' : 'Jolly Phonics & English Immersion Discovery' },
                      { time: '11:30 - 14:00', task: activeLang === 'vi' ? 'Ăn trưa Hữu cơ 5 Sao & Vệ sinh, Ngủ trưa' : '5-Star Organic Lunch & Rest Time' },
                      { time: '14:30 - 16:30', task: activeLang === 'vi' ? 'Khám phá STEAM & Thể thao ngoài trời' : 'STEAM Activity & Outdoor Sports' },
                      { time: '16:30 - 17:30', task: activeLang === 'vi' ? 'Trả trẻ & Báo cáo Nhật ký Ngày' : 'Farewell Circle & Parent Handover' }
                    ].map((s, sIdx) => (
                      <div key={sIdx} className="p-4 bg-neutral-900 border border-neutral-800 space-y-2 rounded-2xs">
                        <span className="text-xs font-bold text-maple-gold block">{s.time}</span>
                        <p className="text-xs text-neutral-300 font-light leading-snug">{s.task}</p>
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
            const tagline = activeLang === 'vi' ? 'Dinh dưỡng Hữu cơ 5 Sao' : '5-Star Organic Nutrition'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Chương trình Dinh dưỡng & Bữa ăn Organic 5 Sao')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Chế độ ăn đầy đủ dinh dưỡng hữu cơ được bác sĩ nhi khoa tư vấn.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <Utensils size={26} className="text-maple-red" />
                    <div>
                      <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                    </div>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-neutral-700 leading-relaxed font-light">{paragraph}</p>
                  )}

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs">
                      <span className="text-xs font-bold text-maple-red block">{activeLang === 'vi' ? '100% HỮU CƠ' : '100% ORGANIC'}</span>
                      <h4 className="font-bold text-sm text-[#1D1D1B]">{activeLang === 'vi' ? 'Nguồn Thực phẩm Hữu cơ' : 'Certified Organic Farm'}</h4>
                      <p className="text-xs text-neutral-500 font-light">{activeLang === 'vi' ? 'Cung cấp từ nông trại hữu cơ kiểm định, tươi sống mỗi ngày.' : 'Daily fresh delivery from accredited organic farms.'}</p>
                    </div>
                    <div className="p-4 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs">
                      <span className="text-xs font-bold text-maple-red block">{activeLang === 'vi' ? 'CÂN BẰNG CALO' : 'CALORIE BALANCED'}</span>
                      <h4 className="font-bold text-sm text-[#1D1D1B]">{activeLang === 'vi' ? 'Thực đơn Bác sĩ Nhi khoa' : 'Pediatric Dietitian Menu'}</h4>
                      <p className="text-xs text-neutral-500 font-light">{activeLang === 'vi' ? 'Tính toán lượng calo phù hợp từng độ tuổi phát triển.' : 'Calorie-balanced meals designed for child growth.'}</p>
                    </div>
                    <div className="p-4 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs">
                      <span className="text-xs font-bold text-maple-red block">{activeLang === 'vi' ? 'AN TOÀN TUỆT ĐỐI' : 'HYGIENE GUARANTEE'}</span>
                      <h4 className="font-bold text-sm text-[#1D1D1B]">{activeLang === 'vi' ? 'Bếp ăn 1 Chiều 5 Sao' : '5-Star Hygiene Standards'}</h4>
                      <p className="text-xs text-neutral-500 font-light">{activeLang === 'vi' ? 'Lưu mẫu thức ăn 24h và kiểm định vi sinh định kỳ.' : '24-hour food sampling & microbiology audits.'}</p>
                    </div>
                  </div>

                  {/* Sample Menu Table */}
                  <div className="p-5 bg-amber-50/50 border border-amber-200 rounded-2xs space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold text-amber-900 border-b border-amber-200 pb-2">
                      <span>{activeLang === 'vi' ? 'THỰC ĐƠN MẪU HÀNG NGÀY TẠI TRƯỜNG' : 'SAMPLE DAILY NUTRITION MENU'}</span>
                      <span className="text-[10px] font-bold">{activeLang === 'vi' ? 'CHỨNG NHẬN HỮU CƠ' : 'ORGANIC CERTIFIED'}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-800">
                      <div><strong className="block text-amber-900 text-[10px]">{activeLang === 'vi' ? 'Bữa Sáng:' : 'Breakfast:'}</strong> {activeLang === 'vi' ? 'Cháo yến mạch ngũ cốc organic & sữa hạt' : 'Organic oatmeal porridge & nut milk'}</div>
                      <div><strong className="block text-amber-900 text-[10px]">{activeLang === 'vi' ? 'Bữa Trưa 5 Sao:' : 'Lunch:'}</strong> {activeLang === 'vi' ? 'Cơm cá hồi sốt teriyaki, canh bí đỏ & rau luộc' : 'Salmon teriyaki, pumpkin soup & steamed veggies'}</div>
                      <div><strong className="block text-amber-900 text-[10px]">{activeLang === 'vi' ? 'Bữa Xế:' : 'Snack:'}</strong> {activeLang === 'vi' ? 'Bánh su kem phô mai & trái cây tươi mùa' : 'Cheese cream puff & seasonal fresh fruit'}</div>
                      <div><strong className="block text-amber-900 text-[10px]">{activeLang === 'vi' ? 'Bữa Chiều:' : 'Milk Time:'}</strong> {activeLang === 'vi' ? 'Sữa tươi tiệt trùng organic Maple Bear' : 'Organic Maple Bear whole milk'}</div>
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
            const tagline = activeLang === 'vi' ? 'Cơ sở Vật chất 5 Sao' : '5-Star Campus Facilities'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Không gian Học tập 5 Sao Sunshine City')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="flex justify-between items-end border-b border-neutral-200 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">
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
                      <div key={fIdx} className="group bg-[#FDFBF7] border border-neutral-300 overflow-hidden space-y-3 rounded-2xs shadow-2xs">
                        <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
                          <Image src={fac.img} alt={fac.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4 space-y-1">
                          <h4 className="font-bold text-base text-[#1D1D1B]">{fac.name}</h4>
                          <p className="text-xs text-neutral-600 font-light">{fac.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 08: ACADEMIC CALENDAR & 4 TERMS
          // -------------------------------------------------------------
          case 'CALENDAR': {
            const tagline = activeLang === 'vi' ? 'Lịch Học tập 2026 - 2027' : 'Academic Calendar 2026 - 2027'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Kế hoạch Học tập & Sự kiện Năm học 2026–2027')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <Calendar size={24} className="text-maple-red" />
                    <div>
                      <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { term: activeLang === 'vi' ? 'Học kỳ 1: Mùa Thu (Fall Semester)' : 'Term 1: Fall Semester', dates: '18/08/2026 – 30/10/2026', event: activeLang === 'vi' ? 'Lễ Khai giảng & Ngày hội Chào mừng Tân học sinh' : 'Welcome Orientation & Autumn Festival' },
                      { term: activeLang === 'vi' ? 'Học kỳ 2: Mùa Đông (Winter Semester)' : 'Term 2: Winter Semester', dates: '02/11/2026 – 22/01/2027', event: activeLang === 'vi' ? 'Đại hội Thể thao Sports Day & Lễ hội Giáng sinh' : 'Sports Day & Canadian Winter Carnival' },
                      { term: activeLang === 'vi' ? 'Học kỳ 3: Mùa Xuân (Spring Semester)' : 'Term 3: Spring Semester', dates: '08/02/2027 – 23/04/2027', event: activeLang === 'vi' ? 'Ngày hội Khám phá STEAM & Triển lãm Nghệ thuật' : 'STEAM Discovery Fair & Art Exhibition' },
                      { term: activeLang === 'vi' ? 'Học kỳ 4: Mùa Hè (Summer Immersion)' : 'Term 4: Summer Semester', dates: '04/05/2027 – 09/07/2027', event: activeLang === 'vi' ? 'Trại hè Tiếng Anh & Lễ Tốt nghiệp Lớp Lá SK' : 'Summer Immersion Camp & Graduation Concert' }
                    ].map((t, tIdx) => (
                      <div key={tIdx} className="p-5 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-[#1D1D1B]">{t.term}</span>
                            <span className="text-xs text-maple-red font-bold">{t.dates}</span>
                          </div>
                          <p className="text-xs text-neutral-600 pt-1 font-light">🎉 {activeLang === 'vi' ? 'Sự kiện:' : 'Event:'} {t.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 09: 4-STEP ADMISSIONS APPLICATION GUIDE
          // -------------------------------------------------------------
          case 'ADMISSIONS_PROCESS': {
            const tagline = activeLang === 'vi' ? 'Quy trình Đăng ký 4 Bước' : '4-Step Admissions Process'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Quy trình Đăng ký & Nhập học Mầm non')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { step: '01', name: activeLang === 'vi' ? 'Đăng ký Tư vấn' : 'Online Enquiry', desc: activeLang === 'vi' ? 'Điền form trực tuyến hoặc gọi Hotline 094 254 6655 để hẹn lịch.' : 'Submit online request or call Hotline.' },
                      { step: '02', name: activeLang === 'vi' ? 'Tham quan Trường 5 Sao' : 'Campus Visit', desc: activeLang === 'vi' ? 'Trải nghiệm không gian học tập & trao đổi cùng Ban Giám hiệu.' : 'Tour 5-star facilities & principal talk.' },
                      { step: '03', name: activeLang === 'vi' ? 'Quan sát Tương tác Bé' : 'Child Observation', desc: activeLang === 'vi' ? 'Buổi tương tác nhẹ nhàng giúp hiểu rõ tâm lý & nhu cầu bé.' : 'Gentle play session to assess readiness.' },
                      { step: '04', name: activeLang === 'vi' ? 'Nhập học & Welcome Kit' : 'Formal Enrollment', desc: activeLang === 'vi' ? 'Hoàn thiện hồ sơ & nhận bộ đồng phục, balo Canada cao cấp.' : 'Complete paper & get welcome uniform kit.' }
                    ].map((st, sIdx) => (
                      <div key={sIdx} className="p-6 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs relative">
                        <span className="text-3xl font-display font-extrabold text-maple-red">{st.step}</span>
                        <h4 className="font-bold text-base text-[#1D1D1B]">{st.name}</h4>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 10: TUITION FEE STRUCTURE TABLE
          // -------------------------------------------------------------
          case 'TUITION_TABLE': {
            const tagline = activeLang === 'vi' ? 'Biểu phí Năm học 2026 - 2027' : 'Tuition Fees 2026 - 2027'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Biểu phí Học tập Trọn gói Chuẩn Canada')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                      {tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { grade: activeLang === 'vi' ? 'Lớp Nhà Trẻ (12M - 24M)' : 'Toddler Program (12M-24M)', fee: activeLang === 'vi' ? '14,500,000 VNĐ / Tháng' : '14,500,000 VND / Month', detail: activeLang === 'vi' ? 'Bao gồm 100% Tiếng Anh thẩm thấu, ăn uống hữu cơ & chăm sóc 1:4' : 'Includes 100% English immersion, organic meals & 1:4 care' },
                      { grade: activeLang === 'vi' ? 'Lớp Mầm (2Y - 3Y)' : 'Nursery Program (2Y-3Y)', fee: activeLang === 'vi' ? '15,800,000 VNĐ / Tháng' : '15,800,000 VND / Month', detail: activeLang === 'vi' ? 'Bao gồm giáo trình Canada, Jolly Phonics & dã ngoại học tập' : 'Includes Canadian curriculum, Jolly Phonics & field trips' },
                      { grade: activeLang === 'vi' ? 'Lớp Chồi & Lá (3Y - 5Y)' : 'Kindergarten Program (3Y-5Y)', fee: activeLang === 'vi' ? '17,200,000 VNĐ / Tháng' : '17,200,000 VND / Month', detail: activeLang === 'vi' ? 'Bao gồm dự án STEAM, dã ngoại & trang bị hành trang Lớp 1' : 'Includes STEAM projects, field trips & primary readiness' }
                    ].map((f, fIdx) => (
                      <div key={fIdx} className="p-6 bg-[#FDFBF7] border-2 border-neutral-300 text-center space-y-3 rounded-2xs shadow-2xs">
                        <span className="text-xs font-bold uppercase text-neutral-500">{f.grade}</span>
                        <div className="text-2xl font-display font-extrabold text-maple-red">{f.fee}</div>
                        <p className="text-xs text-neutral-600 font-light">{f.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 11: FOUNDING FAMILIES SPECIAL INCENTIVE
          // -------------------------------------------------------------
          case 'FOUNDING_FAMILIES': {
            const tagline = activeLang === 'vi' ? 'Đặc quyền Phụ huynh Sáng lập 2026' : 'Founding Families Privilege Program 2026'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Chương trình Phụ huynh Sáng lập 2026')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Gói ưu đãi đặc quyền dành cho 50 gia đình đăng ký đầu tiên.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#151513] text-white border-2 border-maple-gold p-8 space-y-6 shadow-md rounded-2xs relative overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                    <Gift size={28} className="text-maple-gold" />
                    <div>
                      <span className="text-xs font-semibold text-maple-gold flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-gold inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{title}</h2>
                    </div>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">{paragraph}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-1 rounded-2xs">
                      <span className="text-xl font-display font-extrabold text-maple-gold">
                        {activeLang === 'vi' ? 'GIẢM 20% HỌC PHÍ' : '20% TUITION DISCOUNT'}
                      </span>
                      <p className="text-xs text-neutral-300">
                        {activeLang === 'vi' ? 'Áp dụng trọn đời suốt quá trình bé theo học tại trường.' : 'Lifetime discount for entire enrollment duration.'}
                      </p>
                    </div>
                    <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-1 rounded-2xs">
                      <span className="text-xl font-display font-extrabold text-maple-gold">
                        {activeLang === 'vi' ? 'MIỄN 100% PHÍ ĐẦU VÀO' : '100% WAIVED ENTRANCE FEES'}
                      </span>
                      <p className="text-xs text-neutral-300">
                        {activeLang === 'vi' ? 'Miễn phí CSVC & Phí xét tuyển (Trị giá 15.000.000 VNĐ).' : 'Waived facility & assessment fee (15M VND value).'}
                      </p>
                    </div>
                    <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-1 rounded-2xs">
                      <span className="text-xl font-display font-extrabold text-maple-gold">
                        {activeLang === 'vi' ? 'BỘ ĐỒNG PHỤC CANADA' : 'CANADIAN UNIFORM KIT'}
                      </span>
                      <p className="text-xs text-neutral-300">
                        {activeLang === 'vi' ? 'Tặng bộ đồng phục & balo đón trẻ cao cấp.' : 'Free Canadian uniform & backpack kit.'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 12: INTERNATIONAL FACULTY SHOWCASE
          // -------------------------------------------------------------
          case 'TEACHERS': {
            const tagline = activeLang === 'vi' ? 'Đội ngũ Giáo viên Quốc tế' : 'International Faculty & Educators'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Đội ngũ Giáo viên & Chuyên gia Giáo dục Canada')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, '100% giáo viên bản ngữ sở hữu bằng cử nhân sư phạm và chứng chỉ đào tạo Maple Bear Canada.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <GraduationCap size={28} className="text-maple-red" />
                    <div>
                      <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                    </div>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-neutral-700 leading-relaxed font-light">{paragraph}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    <div className="p-5 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs">
                      <Award size={24} className="text-maple-red" />
                      <h4 className="font-bold text-base text-[#1D1D1B]">{activeLang === 'vi' ? '100% Bằng Cử nhân Sư phạm' : '100% Certified ECE Degree'}</h4>
                      <p className="text-xs text-neutral-600 font-light">{activeLang === 'vi' ? 'Tốt nghiệp chuyên ngành Giáo dục Mầm non tại Canada, Anh, Mỹ, Úc.' : 'Graduated in Early Childhood Education from Canada, UK, US, Australia.'}</p>
                    </div>
                    <div className="p-5 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs">
                      <ShieldCheck size={24} className="text-maple-red" />
                      <h4 className="font-bold text-base text-[#1D1D1B]">{activeLang === 'vi' ? 'Chứng chỉ Sơ cấp cứu CPR' : 'Pediatric CPR & First Aid'}</h4>
                      <p className="text-xs text-neutral-600 font-light">{activeLang === 'vi' ? '100% giáo viên & trợ giảng được cấp chứng chỉ sơ cứu y tế y khoa.' : '100% staff certified in pediatric first aid.'}</p>
                    </div>
                    <div className="p-5 bg-[#FDFBF7] border border-neutral-300 space-y-2 rounded-2xs">
                      <Globe size={24} className="text-maple-red" />
                      <h4 className="font-bold text-base text-[#1D1D1B]">{activeLang === 'vi' ? 'Đào tạo Định kỳ Maple Bear Canada' : 'Maple Bear Global Faculty QA'}</h4>
                      <p className="text-xs text-neutral-600 font-light">{activeLang === 'vi' ? 'Tham gia khóa huấn luyện chuyên môn hằng năm từ chuyên gia Canada.' : 'Annual pedagogy training with Canadian experts.'}</p>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 13 & 14: HEALTH, SAFETY & SAFEGUARDING
          // -------------------------------------------------------------
          case 'HEALTH_SAFETY':
          case 'SAFEGUARDING': {
            const tagline = activeLang === 'vi' ? 'An toàn & Bảo vệ Trẻ em' : 'Health, Safety & Child Safeguarding'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Quy trình An toàn, Y tế & Bảo vệ Trẻ em')
            const paragraph = getBilingualText(block.body_paragraph_vi, block.body_paragraph_en, block.body_paragraph, 'Cam kết môi trường học tập an toàn tuyệt đối theo tiêu chuẩn Canada.')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <Stethoscope size={28} className="text-maple-red" />
                    <div>
                      <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                    </div>
                  </div>
                  {paragraph && (
                    <p className="text-sm text-neutral-700 leading-relaxed font-light">{paragraph}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-[#FDFBF7] border border-neutral-300 space-y-1 rounded-2xs">
                      <h4 className="font-bold text-sm text-[#1D1D1B]">{activeLang === 'vi' ? 'Khám Sức khỏe Hàng ngày' : 'Daily Health Screening'}</h4>
                      <p className="text-xs text-neutral-600 font-light">{activeLang === 'vi' ? 'Đo nhiệt độ, kiểm tra tay chân miệng và mắt trước khi vào lớp.' : 'Daily temperature & physical checks upon arrival.'}</p>
                    </div>
                    <div className="p-4 bg-[#FDFBF7] border border-neutral-300 space-y-1 rounded-2xs">
                      <h4 className="font-bold text-sm text-[#1D1D1B]">{activeLang === 'vi' ? 'Máy Lọc Không khí HEPA' : 'HEPA Air Purification'}</h4>
                      <p className="text-xs text-neutral-600 font-light">{activeLang === 'vi' ? 'Khử khuẩn 99.9% bụi mịn & vi khuẩn tại tất cả phòng học.' : '99.9% filtration of micro-dust in classrooms.'}</p>
                    </div>
                    <div className="p-4 bg-[#FDFBF7] border border-neutral-300 space-y-1 rounded-2xs">
                      <h4 className="font-bold text-sm text-[#1D1D1B]">{activeLang === 'vi' ? 'Zero-Tolerance Safeguarding' : 'Zero-Tolerance Child Safety'}</h4>
                      <p className="text-xs text-neutral-600 font-light">{activeLang === 'vi' ? 'Quy trình bảo vệ trẻ nghiêm ngặt theo tiêu chuẩn an toàn Canada.' : 'Strict child protection policy following Canadian standards.'}</p>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 15: PARENT TESTIMONIALS & REVIEWS (STRICT NO-MIXING!)
          // -------------------------------------------------------------
          case 'TESTIMONIALS': {
            const tagline = activeLang === 'vi' ? 'Cảm nhận Phụ huynh' : 'Parent Experience & Testimonials'
            const title = getBilingualText(
              block.title_vi,
              block.title_en,
              'Góc Cảm nhận từ Phụ huynh Sunshine Maple Bear',
              'Parent Experience & Testimonials'
            )
            const quote1 = getBilingualText(
              block.body_paragraph_vi,
              block.body_paragraph_en,
              '"Gửi con tại Sunshine Maple Bear là quyết định tuyệt vời nhất của gia đình. Các cô giáo yêu thương và bé giao tiếp Tiếng Anh rất tự nhiên mỗi ngày!"',
              '"Sending our child to Sunshine Maple Bear was the best decision. The teachers are caring and our daughter speaks English naturally every day!"'
            )
            const author1 = activeLang === 'vi'
              ? '— Phụ huynh bé Linh Chi (Lớp SK Sunshine City)'
              : '— Parent of Linh Chi (SK Class, Sunshine City)'

            const quote2 = activeLang === 'vi'
              ? '"Môi trường học 5 sao sạch sẽ, bữa ăn organic ngon miệng khiến bé về nhà lúc nào cũng hào hứng kể chuyện trường lớp."'
              : '"The 5-star clean environment and organic meals make my son so happy every single day after school."'
            
            const author2 = activeLang === 'vi'
              ? '— Phụ huynh bé Minh Đức (Lớp Nursery Sunshine City)'
              : '— Parent of Minh Duc (Nursery Class, Sunshine City)'

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#151513] text-white p-8 border border-neutral-800 space-y-6 shadow-md rounded-2xs">
                  <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                    <Quote size={28} className="text-maple-gold" />
                    <div>
                      <span className="text-xs font-semibold text-maple-gold flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-gold inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl font-display font-bold text-white mt-1">{title}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-neutral-900 border border-neutral-800 space-y-3 rounded-2xs">
                      <div className="text-amber-400 text-xs tracking-widest">★★★★★</div>
                      <p className="text-xs text-neutral-300 font-serif italic leading-relaxed">
                        {quote1}
                      </p>
                      <div className="pt-2 border-t border-neutral-800 text-xs font-semibold text-maple-gold">
                        {author1}
                      </div>
                    </div>

                    <div className="p-5 bg-neutral-900 border border-neutral-800 space-y-3 rounded-2xs">
                      <div className="text-amber-400 text-xs tracking-widest">★★★★★</div>
                      <p className="text-xs text-neutral-300 font-serif italic leading-relaxed">
                        {quote2}
                      </p>
                      <div className="pt-2 border-t border-neutral-800 text-xs font-semibold text-maple-gold">
                        {author2}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 16: FAQ ACCORDION
          // -------------------------------------------------------------
          case 'FAQ': {
            const tagline = activeLang === 'vi' ? 'Câu hỏi Thường gặp' : 'Frequently Asked Questions'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Giải đáp Thắc mắc Thường gặp')
            const faqsVi = block.feature_points_vi && block.feature_points_vi.length > 0 ? block.feature_points_vi : [
              'Giờ đón trả trẻ tại trường như thế nào? (Đón từ 07:30 AM - Trả đến 05:30 PM)',
              'Nguồn gốc thực phẩm bữa ăn cho trẻ? (100% thực phẩm hữu cơ organic tươi sống)',
              'Tỷ lệ giáo viên/học sinh là bao nhiêu? (1:4 đối với Nhà trẻ, 1:5 đến 1:10 đối với Mẫu giáo)'
            ]
            const faqsEn = block.feature_points_en && block.feature_points_en.length > 0 ? block.feature_points_en : [
              'What are the school drop-off and pick-up hours? (Drop-off 07:30 AM - Pick-up 05:30 PM)',
              'What is the source of food for children? (100% certified organic fresh ingredients)',
              'What is the staff-to-student ratio? (1:4 for Toddler, 1:5 to 1:10 for Kindergarten)'
            ]
            const faqs = activeLang === 'vi' ? faqsVi : faqsEn

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-neutral-200 p-8 space-y-6 shadow-2xs rounded-2xs">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <HelpCircle size={24} className="text-maple-red" />
                    <div>
                      <span className="text-xs font-semibold text-maple-red flex items-center gap-2 block">
                        <span className="w-1.5 h-1.5 rounded-full bg-maple-red inline-block" />
                        {tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1B] mt-1">{title}</h2>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {faqs.map((faq: string, fIdx: number) => (
                      <div key={fIdx} className="p-4 bg-[#FDFBF7] border border-neutral-200 text-xs font-bold text-[#1D1D1B] rounded-2xs">
                        ❓ {faq}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // -------------------------------------------------------------
          // WIDGET 17: TOUR BOOKING CTA BANNER
          // -------------------------------------------------------------
          case 'CTA': {
            const tagline = activeLang === 'vi' ? 'Hotline Tuyển sinh: 094 254 6655' : 'Admissions Hotline: 094 254 6655'
            const title = getBilingualText(block.title_vi, block.title_en, block.title, 'Sẵn sàng Đồng hành cùng Sunshine Maple Bear?')
            const intro = getBilingualText(block.intro_vi, block.intro_en, block.intro, 'Trải nghiệm không gian học tập 5 sao chuẩn Canada cùng Giám đốc Tuyển sinh.')
            const ctaPrimary = getBilingualText(block.cta_primary_text_vi, block.cta_primary_text_en, 'Đăng ký Tham quan Trường', 'Book a Campus Tour')

            return (
              <section key={block.id || idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 bg-[#151513] text-white border-2 border-maple-red flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg rounded-2xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-maple-gold text-xs font-semibold">
                      <PhoneCall size={14} /> {tagline}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white">{title}</h2>
                    <p className="text-xs text-neutral-300 font-light">
                      {intro}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={block.cta_primary_url || '/#contact-us'}
                      className="px-6 py-3 bg-maple-red hover:bg-red-700 text-white text-xs font-semibold tracking-normal transition-colors inline-flex items-center gap-2 rounded-2xs shadow-2xs border border-maple-red"
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
