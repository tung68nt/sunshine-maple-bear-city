'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HelpCircle, ChevronDown, ChevronUp, Phone, Mail, ArrowRight } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'
import Link from 'next/link'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
  })

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const faqs = [
    {
      category: 'Chương Trình Học Canada',
      items: [
        {
          q: 'Chương trình học tại Sunshine Maple Bear có điểm gì khác biệt?',
          a: 'Sunshine Maple Bear áp dụng phương pháp thẩm thấu ngôn ngữ tiếng Anh 100% bản quyền từ Maple Bear Global Schools (Canada). Trẻ không học ngữ pháp lý thuyết mà học thông qua trải nghiệm góc sensory, nghệ thuật Atelier, vận động và tư duy phản biện.'
        },
        {
          q: 'Thời lượng sử dụng tiếng Anh tại trường như thế nào?',
          a: 'Học sinh chương trình Quốc tế được giao tiếp và thụ hưởng môi trường tiếng Anh 100% cả ngày cùng Giáo viên bản ngữ Canada có bằng cấp cử nhân sư phạm mầm non.'
        }
      ]
    },
    {
      category: 'Tuyển Sinh & Học Phí',
      items: [
        {
          q: 'Trẻ mấy tháng tuổi có thể đăng ký nhập học?',
          a: 'Trường nhận học sinh từ 12 tháng tuổi (Lớp Mầm) cho đến 5 tuổi (Lớp Dự bị Tiểu học).'
        },
        {
          q: 'Học phí tại Sunshine Maple Bear đã bao gồm tiền ăn và dắt dâu chưa?',
          a: 'Học phí được niêm yết theo năm học. Phí tiền ăn, phí xe bus đưa đón và phí hoạt động ngoại khóa sẽ có biểu phí chi tiết kèm theo. Cư dân Sunshine City được hưởng ưu đãi đặc quyền.'
        }
      ]
    },
    {
      category: 'Dinh Dưỡng & An Toàn Học Đường',
      items: [
        {
          q: 'Thực đơn của trẻ được chuẩn bị như thế nào?',
          a: 'Nhà trường tự hào áp dụng tiêu chuẩn dinh dưỡng hữu cơ 5 sao khép kín. Thực đơn được tính toán calo chi tiết bởi chuyên gia dinh dưỡng, đảm bảo thực phẩm tươi sạch hàng ngày.'
        },
        {
          q: 'Nhà trường có dịch vụ xe bus đưa đón tại nhà không?',
          a: 'Có. Hệ thống xe bus học đường cao cấp được trang bị ghế an toàn, có sự giám sát 1:1 của cô quản xe và hệ thống định vị GPS theo dõi hành trình.'
        }
      ]
    }
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
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">GIẢI ĐÁP THẮC MẮC PHỤ HUYNH</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Câu Hỏi <span className="text-maple-gold">Thường Gặp</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Tổng hợp đầy đủ thông tin về chương trình học Canada, quy trình tuyển sinh và chế độ chăm sóc cho bé.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Sidebar Navigator */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-28 p-6 bg-white rounded-2xs border border-neutral-200 shadow-sm space-y-5">
                  <h3 className="text-base font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 uppercase tracking-wide">
                    Danh Mục Trợ Giúp
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((cat, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left p-3 rounded-2xs text-xs font-bold text-neutral-700 bg-[#FDFBF7] hover:bg-maple-red hover:text-white transition-all"
                        onClick={() => {
                          const element = document.getElementById(`cat-${idx}`)
                          element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main FAQ Accordions */}
              <div className="lg:col-span-8 space-y-10">
                {faqs.map((cat, cIdx) => (
                  <div key={cIdx} id={`cat-${cIdx}`} className="bg-white p-6 sm:p-8 rounded-2xs border border-neutral-200 shadow-sm space-y-6">
                    <h3 className="text-lg font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 uppercase tracking-wide text-maple-red">
                      {cat.category}
                    </h3>
                    <div className="space-y-4">
                      {cat.items.map((item, iIdx) => {
                        const key = `${cIdx}-${iIdx}`
                        const isOpen = !!openItems[key]
                        return (
                          <div key={iIdx} className="border border-neutral-200 rounded-2xs overflow-hidden">
                            <button
                              onClick={() => toggleItem(key)}
                              className="w-full flex items-center justify-between p-4 bg-[#FDFBF7] text-left hover:bg-neutral-100 transition-colors"
                            >
                              <span className="font-bold text-xs sm:text-sm text-maple-black pr-4">{item.q}</span>
                              {isOpen ? <ChevronUp size={16} className="text-maple-red flex-shrink-0" /> : <ChevronDown size={16} className="text-neutral-400 flex-shrink-0" />}
                            </button>
                            {isOpen && (
                              <div className="p-4 bg-white border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                                {item.a}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
