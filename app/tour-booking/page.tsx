'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CalendarCheck, Clock, MapPin, CheckCircle2, User, Phone, Mail, Building2, Users } from 'lucide-react'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function TourBookingPage() {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorPhone: '',
    visitorEmail: '',
    preferredDate: '',
    preferredTime: '09:30 AM',
    childAge: '12-24m',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/submissions/tour-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        alert('Có lỗi xảy ra. Vui lòng liên hệ Hotline 094 254 6655.')
      }
    } catch (err) {
      console.error(err)
      alert('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">
                  ĐẶT LỊCH THAM QUAN TRƯỜNG MẦM NON 5 SAO
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Trải Nghiệm <span className="text-maple-gold">Thực Tế</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Kính mời Phụ huynh cùng bé đến tham quan khuôn viên không gian học tập 5 sao tại Sunshine City và trao đổi trực tiếp cùng Ban Giám Hiệu.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isSuccess ? (
              <div className="max-w-2xl mx-auto text-center bg-white p-10 sm:p-14 rounded-2xs border border-neutral-200 shadow-sm space-y-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xs flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-2xl font-display font-extrabold text-maple-black">Đăng Ký Tham Quan Thành Công!</h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Cảm ơn Phụ huynh <strong className="text-maple-black">{formData.visitorName}</strong> đã đặt lịch tham quan trường Sunshine Maple Bear vào ngày <strong className="text-maple-red">{formData.preferredDate}</strong> ({formData.preferredTime}). Bộ phận Tuyển sinh sẽ gọi xác nhận trong 15 phút.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button onClick={() => setIsSuccess(false)} className="px-6 py-3 bg-maple-red text-white text-xs font-extrabold uppercase tracking-wider rounded-2xs hover:bg-red-700 transition-all">
                    Đặt Lịch Khác
                  </button>
                  <Link href="/" className="px-6 py-3 bg-neutral-100 text-maple-black text-xs font-extrabold uppercase tracking-wider rounded-2xs hover:bg-neutral-200 transition-all">
                    Về Trang Chủ
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Info Column */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-white p-8 rounded-2xs border border-neutral-200 shadow-sm space-y-6">
                    <h3 className="text-xl font-display font-extrabold text-maple-black uppercase border-b border-neutral-100 pb-3">
                      Hành Trình Tham Quan 5 Sao
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                      Mỗi buổi tham quan kéo dài từ 30 - 45 phút, giúp Phụ huynh có góc nhìn chân thực nhất về môi trường học tập và các hoạt động sinh hoạt hàng ngày của trẻ.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {[
                        { label: 'Phòng học Tiêu chuẩn', img: SCHOOL_IMAGES.render.lopHoc1 },
                        { label: 'Thư viện Sách', img: SCHOOL_IMAGES.render.thuVien3 },
                        { label: 'Sân chơi Vận động', img: SCHOOL_IMAGES.render.sanChoi2 },
                        { label: 'Phòng Âm nhạc', img: SCHOOL_IMAGES.render.phongChucNang1 },
                      ].map((item, idx) => (
                        <div key={idx} className="group relative h-28 rounded-2xs overflow-hidden border border-neutral-200 shadow-xs">
                          <Image src={item.img} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-bold uppercase tracking-wider truncate">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                      {[
                        { icon: <Clock size={16} />, title: 'Thời Gian Đón Tiếp', content: 'Thứ 2 - Thứ 7: 08:30 AM - 05:00 PM' },
                        { icon: <Building2 size={16} />, title: 'Địa Điểm Trường', content: SCHOOL_INFO.ADDRESS },
                        { icon: <Users size={16} />, title: 'Quy Mô Tham Quan', content: 'Tối đa 2 Phụ huynh & Bé mỗi lượt đón' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs">
                          <div className="p-2 bg-maple-red/10 rounded-2xs text-maple-red flex-shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-maple-black">{item.title}</h4>
                            <p className="text-neutral-600 font-normal mt-0.5">{item.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Form Column */}
                <div className="lg:col-span-7">
                  <div className="bg-white p-8 sm:p-12 rounded-2xs border border-neutral-200 shadow-sm space-y-6">
                    <div className="space-y-2 border-b border-neutral-100 pb-4">
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black uppercase">
                        Thông Tin Đăng Ký Tham Quan
                      </h3>
                      <p className="text-xs text-neutral-500 font-normal">
                        Vui lòng điền thông tin bên dưới để nhà trường chuẩn bị công tác đón tiếp chu đáo nhất.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Họ tên Phụ huynh *</label>
                          <input id="visitorName" type="text" name="visitorName" value={formData.visitorName} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="Nguyễn Văn A" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Số điện thoại Zalo *</label>
                          <input id="visitorPhone" type="tel" name="visitorPhone" value={formData.visitorPhone} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="0912 xxx xxx" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Địa chỉ Email *</label>
                          <input id="visitorEmail" type="email" name="visitorEmail" value={formData.visitorEmail} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="email@example.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Độ tuổi của bé</label>
                          <select id="childAge" name="childAge" value={formData.childAge} onChange={handleChange} className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black">
                            <option value="12-24m">12 - 24 tháng</option>
                            <option value="24-36m">24 - 36 tháng</option>
                            <option value="3-4y">3 - 4 tuổi</option>
                            <option value="4-5y">4 - 5 tuổi</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Ngày muốn tham quan *</label>
                          <input id="preferredDate" type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Khung giờ mong muốn</label>
                          <select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black">
                            <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                            <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="02:30 PM">02:30 PM - 03:30 PM</option>
                            <option value="04:00 PM">04:00 PM - 05:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">Ghi chú & Yêu cầu riêng</label>
                        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black resize-none" placeholder="Nhập thắc mắc hoặc thông tin cần nhà trường hỗ trợ..."></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-maple-red text-white font-extrabold rounded-2xs hover:bg-red-700 transition-all text-xs uppercase tracking-wider shadow-sm disabled:opacity-50"
                      >
                        {isSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Lịch Tham Quan'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
