'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'
import { CheckCircle2, Calendar, FileText, ArrowRight, ShieldCheck, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    childName: '',
    childDOB: '',
    childGender: 'male',
    desiredGrade: 'Lớp Mầm (12 - 24 tháng)',
    allergies: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSubmitMessage('Cảm ơn Phụ huynh đã gửi hồ sơ tuyển sinh! Bộ phận Tuyển sinh sẽ liên hệ tư vấn trực tiếp trong vòng 24 giờ.')
        setFormData({
          parentName: '', parentEmail: '', parentPhone: '', parentAddress: '',
          childName: '', childDOB: '', childGender: 'male',
          desiredGrade: 'Lớp Mầm (12 - 24 tháng)', allergies: '', notes: ''
        })
      } else {
        setSubmitMessage('Có lỗi xảy ra khi gửi thông tin. Vui lòng liên hệ trực tiếp Hotline: 094 254 6655 để được hỗ trợ.')
      }
    } catch (err) {
      console.error(err)
      setSubmitMessage('Có lỗi xảy ra khi kết nối máy chủ. Vui lòng thử lại sau.')
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
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">TUYỂN SINH NĂM HỌC 2026-2027</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Tuyển Sinh <span className="text-maple-gold">Mầm Non 5 Sao</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Sunshine Maple Bear chào đón các công dân toàn cầu nhí gia nhập môi trường giáo dục thẩm thấu tiếng Anh 100% chuẩn Canada.
              </p>
            </div>
          </div>
        </section>

        {/* Main Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Process & Info */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-6 sm:p-8 rounded-2xs border border-neutral-200 shadow-sm space-y-6">
                  <h3 className="text-lg font-display font-extrabold text-maple-black uppercase border-b border-neutral-100 pb-3">
                    Quy Trình 4 Bước Tuyển Sinh
                  </h3>
                  <div className="space-y-6">
                    {[
                      { step: '01', title: 'Đăng Ký Tư Vấn', desc: 'Phụ huynh điền thông tin online hoặc gọi hotline 094 254 6655.' },
                      { step: '02', title: 'Tham Quan 5 Sao', desc: 'Trực tiếp trải nghiệm cơ sở vật chất và gặp gỡ Ban Giám Hiệu.' },
                      { step: '03', title: 'Đánh Giá Khả Năng', desc: 'Trẻ tham gia buổi quan sát phản xạ tiếng Anh và vận động cùng GV Canada.' },
                      { step: '04', title: 'Hoàn Thiện Nhập Học', desc: 'Nộp hồ sơ và làm thủ tục bàn giao đón bé tới trường.' },
                    ].map((st, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded-2xs bg-maple-red text-white flex items-center justify-center font-extrabold text-xs flex-shrink-0 shadow-xs">
                          {st.step}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-maple-black">{st.title}</h4>
                          <p className="text-xs text-neutral-600 font-normal mt-0.5 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xs border border-neutral-200 shadow-sm space-y-4">
                  <h3 className="text-base font-display font-extrabold text-maple-black flex items-center gap-2.5 uppercase border-b border-neutral-100 pb-3">
                    <FileText className="text-maple-gold" size={18} />
                    Hồ Sơ Cần Chuẩn Bị
                  </h3>
                  <ul className="space-y-3 text-xs text-neutral-600 font-normal">
                    {[
                      'Bản sao Giấy khai sinh / Hộ chiếu của bé',
                      '4 ảnh thẻ (4x6cm) chụp trong 6 tháng gần nhất',
                      'Bản sao Phiếu tiêm chủng y tế',
                      'Giấy khám sức khỏe mầm non hợp lệ',
                      'Bản sao CCCD / Hộ chiếu của Phụ huynh',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-[#151513] text-white rounded-2xs border border-neutral-800 shadow-sm space-y-4">
                  <h3 className="text-lg font-display font-extrabold">Hotline Tư Vấn Tuyển Sinh</h3>
                  <p className="text-xs text-white/70 font-normal leading-relaxed">
                    Bộ phận Tuyển sinh sẵn sàng đồng hành và tư vấn chi tiết cho Phụ huynh từ Thứ 2 đến Thứ 7.
                  </p>
                  <div className="pt-2 border-t border-neutral-800">
                    <a href={`tel:${SCHOOL_INFO.PHONE}`} className="block text-2xl font-extrabold text-maple-gold hover:text-white transition-colors">
                      {SCHOOL_INFO.PHONE}
                    </a>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-8">
                <div className="bg-white p-8 sm:p-12 rounded-2xs border border-neutral-200 shadow-sm space-y-8">
                  <div className="space-y-2 border-b border-neutral-100 pb-6">
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-maple-black uppercase">
                      Phiếu Đăng Ký Tuyển Sinh
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600">
                      Vui lòng cung cấp đầy đủ thông tin để nhà trường chuẩn bị tư vấn phương án học tập phù hợp nhất cho bé.
                    </p>
                  </div>

                  {submitMessage && (
                    <div className={`p-6 rounded-2xs border text-xs sm:text-sm ${
                      submitMessage.includes('Cảm ơn')
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      <div className="flex gap-3 items-center">
                        <Info size={20} className="flex-shrink-0" />
                        <span>{submitMessage}</span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-extrabold text-maple-black uppercase tracking-wider text-maple-red">
                        1. Thông Tin Phụ Huynh
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Họ tên Phụ huynh *</label>
                          <input id="parentName" type="text" name="parentName" value={formData.parentName} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="Nguyễn Văn A" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Địa chỉ Email *</label>
                          <input id="parentEmail" type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="email@example.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Số điện thoại liên hệ *</label>
                          <input id="parentPhone" type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="0912 xxx xxx" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Địa chỉ sinh sống</label>
                          <input id="parentAddress" type="text" name="parentAddress" value={formData.parentAddress} onChange={handleChange} className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="Tòa S4, Sunshine City, Hà Nội" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                      <h4 className="text-sm font-extrabold text-maple-black uppercase tracking-wider text-maple-gold">
                        2. Thông Tin Học Sinh
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Họ tên của bé *</label>
                          <input id="childName" type="text" name="childName" value={formData.childName} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" placeholder="Nguyễn Minh An" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Ngày tháng năm sinh *</label>
                          <input id="childDOB" type="date" name="childDOB" value={formData.childDOB} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Giới tính</label>
                          <select id="childGender" name="childGender" value={formData.childGender} onChange={handleChange} className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black">
                            <option value="male">Bé Trai</option>
                            <option value="female">Bé Gái</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">Khối lớp muốn đăng ký *</label>
                          <select id="desiredGrade" name="desiredGrade" value={formData.desiredGrade} onChange={handleChange} required className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black">
                            <option value="Lớp Mầm (12 - 24 tháng)">Lớp Mầm (12 - 24 tháng)</option>
                            <option value="Lớp Chồi (24 - 36 tháng)">Lớp Chồi (24 - 36 tháng)</option>
                            <option value="Lớp Lá (3 - 4 tuổi)">Lớp Lá (3 - 4 tuổi)</option>
                            <option value="Lớp Dự Bị Tiêu Học (4 - 5 tuổi)">Lớp Dự Bị Tiêu Học (4 - 5 tuổi)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                      <h4 className="text-sm font-extrabold text-maple-black uppercase tracking-wider text-neutral-700">
                        3. Ghi Chú Sức Khỏe & Dinh Dưỡng
                      </h4>
                      <div>
                        <textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black resize-none" placeholder="Ghi rõ dị ứng thực phẩm, thuốc hoặc lưu ý sức khỏe đặc biệt của bé (nếu có)..."></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-maple-red text-white font-extrabold rounded-2xs hover:bg-red-700 transition-all text-xs uppercase tracking-wider shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Đang Gửi Hồ Sơ...' : 'Gửi Đăng Ký Tuyển Sinh'}
                    </button>
                  </form>
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
