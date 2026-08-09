'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Brain, Heart, Globe, Palmtree, Music, BookOpen, Users, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AcademicsPage() {
  const BEAR_CLASSES = [
    {
      nameVi: 'Lớp Toddler (Mầm)',
      nameEn: 'Toddler (12 - 24 tháng)',
      desc: 'Tập trung phát triển cảm xúc, vận động tinh và làm quen với ngữ âm tiếng Anh tự nhiên.',
      image: SCHOOL_IMAGES.render.lopHoc1,
    },
    {
      nameVi: 'Lớp Junior (Chồi)',
      nameEn: 'Nursery (24 - 36 tháng)',
      desc: 'Mở rộng vốn từ vựng tiếng Anh, hình thành thói quen tự lập và tư duy sáng tạo thông qua các trò chơi giáo dục.',
      image: SCHOOL_IMAGES.render.lopHoc2,
    },
    {
      nameVi: 'Lớp Senior (Lá)',
      nameEn: 'Junior Kindergarten (3 - 4 tuổi)',
      desc: 'Phát triển tư duy logic, toán học mầm non, khoa học trải nghiệm và phản xạ giao tiếp tiếng Anh 100%.',
      image: SCHOOL_IMAGES.render.lopHoc3,
    },
    {
      nameVi: 'Lớp SK (Dự Bị Tiểu Học)',
      nameEn: 'Senior Kindergarten (4 - 5 tuổi)',
      desc: 'Chuẩn bị hành trang tâm lý, kỹ năng tự học và năng lực tiếng Anh vượt trội để sẵn sàng bước vào trường tiểu học quốc tế.',
      image: SCHOOL_IMAGES.render.lopHoc5,
    },
  ]

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
                  CHƯƠNG TRÌNH MẦM NON BẢN QUYỀN CANADA
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Chương Trình <span className="text-maple-gold">Đào Tạo</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Chương trình mầm non bản quyền Canada với môi trường giao tiếp thẩm thấu 100% bằng Tiếng Anh cùng đội ngũ giáo viên bản ngữ.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
                  <span className="text-xs font-bold uppercase tracking-wider text-maple-red">TRIẾT LÝ GIÁO DỤC</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-maple-black leading-snug">
                  Lấy Trẻ Làm Trung Tâm <br /><span className="text-maple-red">Chuẩn Quốc Tế Canada</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Chương trình Maple Bear được phát triển bởi các chuyên gia giáo dục hàng đầu Canada dựa trên nghiên cứu sự phát triển não bộ của trẻ mầm non. Chúng tôi kiến tạo môi trường học tập tự nhiên giúp trẻ luôn tự tin và vui vẻ.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-6 bg-white rounded-2xs border border-neutral-200 shadow-sm flex items-start gap-4">
                    <div className="p-2.5 bg-maple-red/10 rounded-2xs text-maple-red flex-shrink-0">
                      <Brain size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-maple-black">Tư Duy Tự Lập</h4>
                      <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-0.5">Khuyến khích quan sát và tự giải quyết vấn đề.</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-2xs border border-neutral-200 shadow-sm flex items-start gap-4">
                    <div className="p-2.5 bg-maple-gold/10 rounded-2xs text-maple-gold flex-shrink-0">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-maple-black">Sáng Tạo Không Giới Hạn</h4>
                      <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-0.5">Tôn trọng sự khác biệt cá nhân của từng trẻ.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xs overflow-hidden aspect-4/3 border border-neutral-200 shadow-sm">
                <Image
                  src={SCHOOL_IMAGES.render.lopHoc5}
                  alt="Creative classroom activities"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8 Key Areas of Development */}
        <section className="py-16 sm:py-24 bg-white border-t border-b border-neutral-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-xs font-bold text-maple-red uppercase tracking-wider">8 LĨNH VỰC PHÁT TRIỂN</h2>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-maple-black">Phát Triển Toàn Diện Đa Chiều</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Brain size={24} />, title: 'Nhận Thức & Tư Duy', desc: 'Xây dựng nền tảng tư duy logic, toán học mầm non và khám phá khoa học.' },
                { icon: <Users size={24} />, title: 'Kỹ Năng Xã Hội', desc: 'Rèn luyện khả năng làm việc nhóm, chia sẻ và tinh thần trách nhiệm.' },
                { icon: <Heart size={24} />, title: 'Trí Tuệ Cảm Xúc (EQ)', desc: 'Giúp trẻ xây dựng sự thấu cảm, tự tin và quản lý cảm xúc tích cực.' },
                { icon: <Globe size={24} />, title: 'Anh Ngữ Thẩm Thấu 100%', desc: 'Giao tiếp hoàn toàn bằng tiếng Anh tự nhiên cùng GV bản ngữ Canada.' },
                { icon: <Palmtree size={24} />, title: 'Vận Động Thể Chất', desc: 'Phát triển vận động thô và vận động tinh qua các bài tập thể chất.' },
                { icon: <Music size={24} />, title: 'Nghệ Thuật & Âm Nhạc', desc: 'Kích thích cảm thụ nghệ thuật và nhịp điệu trong giai đoạn vàng.' },
                { icon: <Sparkles size={24} />, title: 'Sáng Tạo Cá Nhân', desc: 'Tự do thể hiện ý tưởng qua hội họa và trò chơi đóng vai.' },
                { icon: <BookOpen size={24} />, title: 'Kỹ Năng Sống Tự Lập', desc: 'Hình thành thói quen tự chăm sóc bản thân và quy tắc an toàn.' },
              ].map((area, idx) => (
                <div key={idx} className="p-6 bg-[#FDFBF7] rounded-2xs border border-neutral-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-white rounded-2xs flex items-center justify-center text-maple-red shadow-xs border border-neutral-100">
                    {area.icon}
                  </div>
                  <h4 className="text-base font-bold text-maple-black">{area.title}</h4>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grade Levels Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-xs font-bold text-maple-red uppercase tracking-wider">CÁC KHỐI LỚP HỌC</h2>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-maple-black">Lộ Trình Theo Độ Tuổi</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BEAR_CLASSES.map((g, idx) => (
                <div key={idx} className="bg-white rounded-2xs border border-neutral-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-2/5 h-48 sm:h-auto flex-shrink-0">
                    <Image src={g.image} alt={g.nameEn} fill className="object-cover" />
                  </div>
                  <div className="p-6 sm:p-8 flex-1 space-y-3 flex flex-col justify-center">
                    <span className="text-[10px] font-extrabold text-maple-gold uppercase tracking-wider block">{g.nameEn}</span>
                    <h4 className="text-lg font-display font-extrabold text-maple-black">{g.nameVi}</h4>
                    <p className="text-xs text-neutral-600 font-normal leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
