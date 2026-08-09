'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Target, Award, Heart, ShieldCheck, Users, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
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
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">VỀ CHÚNG TÔI & TRIẾT LÝ GIÁO DỤC CANADA</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Khai Mở <span className="text-maple-gold">Tiềm Năng Bé</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Sunshine Maple Bear là ngôi trường mầm non 5 sao nơi nuôi dưỡng ước mơ, định hình tính cách và chuẩn bị nền tảng vững chắc cho công dân toàn cầu nhí.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
                  <span className="text-xs font-bold uppercase tracking-wider text-maple-red">HÀNH TRÌNH PHÁT TRIỂN</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-maple-black leading-snug">
                  Phương Pháp Giáo Dục Mầm Non <span className="text-maple-red">Hàng Đầu Canada</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Tại Sunshine Maple Bear, chúng tôi mang tới chương trình mầm non bản quyền Canada được thiết kế bởi các chuyên gia giáo dục hàng đầu. Trẻ học tập thông qua trải nghiệm thực tế và thẩm thấu ngôn ngữ tiếng Anh 100% tự nhiên.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                  <div className="space-y-1">
                    <p className="text-3xl font-display font-extrabold text-maple-red">500+</p>
                    <p className="text-xs text-neutral-600 font-bold uppercase">Trường Trên Toàn Cầu</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-display font-extrabold text-maple-gold">35+</p>
                    <p className="text-xs text-neutral-600 font-bold uppercase">Quốc Gia & Vùng Lãnh Thổ</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10 rounded-2xs overflow-hidden aspect-4/3 border border-neutral-200 shadow-sm">
                  <Image
                    src={SCHOOL_IMAGES.render.lopHoc3}
                    alt="Learning at Sunshine Maple Bear"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 sm:py-24 bg-white border-t border-b border-neutral-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 sm:p-10 bg-[#FDFBF7] rounded-2xs border border-neutral-200 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-maple-red/10 rounded-2xs flex items-center justify-center text-maple-red">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-display font-extrabold text-maple-black">Sứ Mệnh Của Chúng Tôi</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Xây dựng nền tảng vững chắc về trí tuệ, trí tuệ cảm xúc (EQ) và nhân cách cho trẻ mầm non thông qua chương trình giáo dục Maple Bear Canada, giúp bé tự tin hội nhập cộng đồng quốc tế.
                </p>
              </div>

              <div className="p-8 sm:p-10 bg-[#FDFBF7] rounded-2xs border border-neutral-200 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-maple-gold/10 rounded-2xs flex items-center justify-center text-maple-gold">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-display font-extrabold text-maple-black">Tầm Nhìn Chiến Lược</h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Trở thành biểu tượng của giáo dục mầm non chất lượng cao, nơi mọi trẻ em đều được tôn trọng sự khác biệt, truyền cảm hứng khám phá và tỏa sáng tiềm năng cá nhân.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-xs font-bold text-maple-red uppercase tracking-wider">GIÁ TRỊ CỐT LÕI</h2>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-maple-black">5 Trụ Cột Định Hướng Chất Lượng</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: <ShieldCheck size={22} />, title: 'An Toàn Hàng Đầu', desc: 'An toàn thể chất, cảm xúc và quy trình vận hành học đường.' },
                { icon: <Heart size={22} />, title: 'Sức Khỏe & Dinh Dưỡng', desc: 'Chế độ ăn hữu cơ 5 sao và thói quen vận hành thể chất lành mạnh.' },
                { icon: <Award size={22} />, title: 'Định Hình Nhân Cách', desc: 'Thấu cảm, tôn trọng, tự lập và kỹ năng xã hội thông qua trải nghiệm.' },
                { icon: <Users size={22} />, title: 'Anh Ngữ Thẩm Thấu 100%', desc: 'Môi trường nói tiếng Anh hoàn toàn cùng giáo viên bản ngữ Canada.' },
                { icon: <CheckCircle2 size={22} />, title: 'Đồng Hành Cùng Gia Đình', desc: 'Kết nối minh bạch, chuyên nghiệp giữa nhà trường và Phụ huynh.' },
              ].map((val, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xs border border-neutral-200 shadow-sm text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-[#FDFBF7] rounded-2xs flex items-center justify-center text-maple-red border border-neutral-200">
                    {val.icon}
                  </div>
                  <h4 className="text-sm font-bold text-maple-black">{val.title}</h4>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">{val.desc}</p>
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
