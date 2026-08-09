'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, PhoneCall, ArrowRight, ShieldCheck, CheckCircle2, Globe, Building2, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'
import Image from 'next/image'

export default function ContactPage() {
  const [activeLang, setActiveLang] = useState<'vi' | 'en'>('vi')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form input state
  const [parentName, setParentName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [childAge, setChildAge] = useState('Lớp Mầm (12 - 24 tháng)')
  const [topic, setTopic] = useState('Tư vấn học phí & Chương trình Mầm non Canada')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_site_lang') as 'vi' | 'en') || 'vi'
    setActiveLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setActiveLang(e.detail)
      }
    }

    window.addEventListener('smbLanguageChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbLanguageChange', handleLangChange as EventListener)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const responsePayload = {
      id: `resp-cnt-${Date.now()}`,
      formId: 'form-contact-enquiry-2026',
      submittedAt: new Date().toLocaleString('vi-VN'),
      answers: {
        'Họ và tên Phụ huynh': parentName,
        'Số điện thoại liên hệ': phone,
        'Địa chỉ Email': email,
        'Độ tuổi của bé': childAge,
        'Nội dung cần tư vấn': `${topic}: ${message}`
      },
      utm: {
        utm_source: 'website_contact_page',
        utm_medium: 'organic_form',
        utm_campaign: 'sunshine_city_contact_2026'
      },
      metadata: {
        ip: '118.70.182.45',
        city: 'Ha Noi',
        country: 'VN',
        submittedPagePath: '/contact',
        sectionId: 'sec-contact-main-form'
      }
    }

    try {
      // Save locally to custom form engine response registry
      const existingKey = 'smb_form_responses_form-contact-enquiry-2026'
      const existing = JSON.parse(localStorage.getItem(existingKey) || '[]')
      localStorage.setItem(existingKey, JSON.stringify([responsePayload, ...existing]))

      // Send to API endpoint
      await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responsePayload)
      })
    } catch (err) {
      console.log('Submission saved locally:', err)
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setParentName('')
      setPhone('')
      setEmail('')
      setMessage('')
    }, 1200)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B] font-body">
      <Header />
      <main className="flex-1">
        
        {/* HERO BANNER - SUNSHINE MAPLE BEAR 5-STAR BRAND STYLE */}
        <section className="relative py-16 lg:py-24 bg-[#151513] text-white border-b border-neutral-800 overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none">
            <Image
              src={SCHOOL_IMAGES.render.hanhLang2}
              alt="Sunshine Maple Bear Campus"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#151513] via-[#151513]/90 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
              <span className="text-xs font-bold text-maple-gold uppercase tracking-wider">
                {activeLang === 'vi' ? 'HỆ THỐNG LIÊN HỆ & TƯ VẤN 24/7' : 'CONTACT & ADMISSIONS SUPPORT'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              {activeLang === 'vi' ? (
                <>Liên Hệ Với <span className="text-maple-gold">Sunshine Maple Bear</span></>
              ) : (
                <>Connect With <span className="text-maple-gold">Sunshine Maple Bear</span></>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
              {activeLang === 'vi'
                ? 'Bộ phận Tuyển sinh sẵn sàng đồng hành, tư vấn chương trình mầm non bản quyền Canada và sắp xếp lịch tham quan thực tế cơ sở vật chất 5 sao tại Sunshine City.'
                : 'Our admissions team is available to assist you with Canadian kindergarten programs and schedule a 5-star campus tour at Sunshine City.'}
            </p>
          </div>
        </section>

        {/* MAIN CONTENT SECTION */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* LEFT COLUMN: CONTACT INFORMATION & SOCIAL */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white border border-neutral-200/80 p-6 sm:p-8 rounded-2xs shadow-2xs space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-maple-red uppercase tracking-widest block">
                      {activeLang === 'vi' ? 'THÔNG TIN BỘ PHẬN TUYỂN SINH' : 'ADMISSIONS CONTACT INFO'}
                    </span>
                    <h2 className="text-2xl font-display font-extrabold text-[#1D1D1B] mt-1">
                      {activeLang === 'vi' ? 'Trường Mầm Non Sunshine Maple Bear' : 'Sunshine Maple Bear Campus'}
                    </h2>
                    <p className="text-xs text-neutral-500 font-light mt-1">
                      {activeLang === 'vi' ? 'Cơ sở Sunshine City - Khu đô thị Ciputra Nam Thăng Long, Hà Nội.' : 'Sunshine City Campus - Ciputra Urban Area, Hanoi.'}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    
                    {/* Item 1: Address */}
                    <div className="flex gap-4 items-start p-3 bg-[#FDFBF7] border border-neutral-200/60 rounded-2xs">
                      <div className="w-10 h-10 rounded-2xs bg-red-50 text-maple-red flex items-center justify-center flex-shrink-0 border border-red-200/60">
                        <MapPin size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-[#1D1D1B]">{activeLang === 'vi' ? 'Địa chỉ Cơ sở' : 'Campus Address'}</h4>
                        <p className="text-xs text-neutral-600 font-normal leading-relaxed">{SCHOOL_INFO.ADDRESS}</p>
                      </div>
                    </div>

                    {/* Item 2: Hotline */}
                    <div className="flex gap-4 items-start p-3 bg-[#FDFBF7] border border-neutral-200/60 rounded-2xs">
                      <div className="w-10 h-10 rounded-2xs bg-amber-50 text-maple-gold flex items-center justify-center flex-shrink-0 border border-amber-200/60">
                        <PhoneCall size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-[#1D1D1B]">{activeLang === 'vi' ? 'Hotline Tư vấn Tuyển sinh' : 'Admissions Hotline'}</h4>
                        <p className="text-sm font-mono font-bold text-maple-red">{SCHOOL_INFO.PHONE}</p>
                      </div>
                    </div>

                    {/* Item 3: Email */}
                    <div className="flex gap-4 items-start p-3 bg-[#FDFBF7] border border-neutral-200/60 rounded-2xs">
                      <div className="w-10 h-10 rounded-2xs bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 border border-blue-200/60">
                        <Mail size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-[#1D1D1B]">Email Tiếp Nhận</h4>
                        <p className="text-xs font-mono text-neutral-700">{SCHOOL_INFO.EMAIL}</p>
                      </div>
                    </div>

                    {/* Item 4: Hours */}
                    <div className="flex gap-4 items-start p-3 bg-[#FDFBF7] border border-neutral-200/60 rounded-2xs">
                      <div className="w-10 h-10 rounded-2xs bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-200/60">
                        <Clock size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-[#1D1D1B]">{activeLang === 'vi' ? 'Giờ Làm Việc Văn Phòng' : 'Office Hours'}</h4>
                        <p className="text-xs text-neutral-600">Thứ Hai – Thứ Sáu: 07:30 AM – 18:00 PM</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Social Connect Box */}
                <div className="bg-[#151513] text-white p-6 rounded-2xs border border-neutral-800 space-y-4 shadow-2xs">
                  <h4 className="text-sm font-display font-bold text-maple-gold uppercase tracking-wider flex items-center gap-2">
                    <Globe size={15} /> Kênh Truyền Thông Chính Thức
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Theo dõi các hoạt động học tập, sự kiện thường niên và hình ảnh thực tế của các bé tại Sunshine Maple Bear.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-maple-red border border-neutral-800 text-xs font-semibold text-white rounded-2xs transition-colors"
                    >
                      Facebook Fanpage
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-maple-red border border-neutral-800 text-xs font-semibold text-white rounded-2xs transition-colors"
                    >
                      YouTube Channel
                    </a>
                    <a
                      href="https://zalo.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-maple-red border border-neutral-800 text-xs font-semibold text-white rounded-2xs transition-colors"
                    >
                      Zalo Official Account
                    </a>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: CONTACT FORM (CONNECTED TO FORM ENGINE) */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-neutral-200/80 p-6 sm:p-8 rounded-2xs shadow-2xs space-y-6">
                  
                  <div className="border-b border-neutral-200 pb-4">
                    <span className="text-[10px] font-bold text-maple-red uppercase tracking-widest block">
                      FORM ĐĂNG KÝ TƯ VẤN & NHẬN BÁO GIÁ HỌC PHÍ
                    </span>
                    <h3 className="text-xl font-display font-extrabold text-[#1D1D1B] mt-1">
                      {activeLang === 'vi' ? 'Gửi Yêu Cầu Tư Vấn Trực Tiếp' : 'Send an Enquiry Message'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      Ban Tuyển sinh sẽ liên hệ phản hồi qua SĐT/Zalo trong vòng 24 giờ làm việc.
                    </p>
                  </div>

                  {submitSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xs text-xs space-y-1 animate-fade-in">
                      <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <span>Gửi thông tin tư vấn thành công!</span>
                      </div>
                      <p className="pl-6 text-neutral-700">
                        Cảm ơn Quý Phụ huynh đã quan tâm đến Trường Mầm non Sunshine Maple Bear. Bộ phận Tuyển sinh sẽ sớm liên hệ trực tiếp qua SĐT/Zalo để tư vấn chi tiết.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold block mb-1 text-[#1D1D1B]">Họ và tên Phụ huynh *</label>
                        <input
                          type="text"
                          required
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder="VD: Nguyễn Văn Nam"
                          className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs font-bold text-xs focus:outline-none focus:border-maple-red"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1 text-[#1D1D1B]">Số điện thoại Zalo liên hệ *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="VD: 0912 345 678"
                          className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs font-mono font-bold text-xs focus:outline-none focus:border-maple-red"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold block mb-1 text-[#1D1D1B]">Địa chỉ Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="VD: parent@example.com"
                          className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs font-mono text-xs focus:outline-none focus:border-maple-red"
                        />
                      </div>

                      <div>
                        <label className="font-semibold block mb-1 text-[#1D1D1B]">Độ tuổi của bé *</label>
                        <select
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs font-semibold text-xs focus:outline-none focus:border-maple-red"
                        >
                          <option value="Lớp Mầm (12 - 24 tháng)">Lớp Mầm (12 - 24 tháng)</option>
                          <option value="Lớp Chồi (24 - 36 tháng)">Lớp Chồi (24 - 36 tháng)</option>
                          <option value="Lớp Lá (3 - 4 tuổi)">Lớp Lá (3 - 4 tuổi)</option>
                          <option value="Lớp Dự Bị Tiền Tiểu Học (4 - 5 tuổi)">Lớp Dự Bị Tiền Tiểu Học (4 - 5 tuổi)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-[#1D1D1B]">Chủ đề Phụ huynh quan tâm *</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs font-semibold text-xs focus:outline-none focus:border-maple-red"
                      >
                        <option value="Tư vấn học phí & Chương trình Mầm non Canada">Tư vấn học phí & Chương trình Mầm non Canada</option>
                        <option value="Đăng ký tham quan thực tế cơ sở Sunshine City">Đăng ký tham quan thực tế cơ sở Sunshine City</option>
                        <option value="Chính sách ưu đãi Cư dân Sunshine City">Chính sách ưu đãi Cư dân Sunshine City</option>
                        <option value="Thông tin thực đơn & Dịch vụ Xe bus đón trả">Thông tin thực đơn & Dịch vụ Xe bus đón trả</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1 text-[#1D1D1B]">Nội dung thắc mắc / Lời nhắn tư vấn</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Vui lòng ghi rõ các câu hỏi hoặc mong muốn đặt lịch tham quan trường..."
                        className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs focus:outline-none focus:border-maple-red"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-4">
                      <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                        <ShieldCheck size={12} className="text-emerald-600" /> Thông tin bảo mật 100%
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-maple-red hover:bg-red-700 text-white font-bold text-xs rounded-2xs shadow-2xs transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Đang gửi thông tin...</span>
                        ) : (
                          <>
                            <span>Gửi Đăng Ký Tư Vấn</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MAP SECTION - SUNSHINE CITY GOOGLE MAP EMBED */}
        <section className="relative py-8 bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-maple-red rounded-full" />
              <h3 className="text-lg font-display font-extrabold text-[#1D1D1B]">Bản Đồ Vị Trí Cơ Sở Sunshine City</h3>
            </div>
          </div>

          <div className="h-[420px] w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.36430335017!2d105.7946927760205!3d21.058105680599553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aa6d98d2466f%3A0xe7819957793d5f3!2sSunshine%20City!5e0!3m2!1sen!2s!4v1715610000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunshine Maple Bear Sunshine City Location Map"
            />
            
            <div className="absolute top-6 left-6 hidden lg:block max-w-xs">
              <div className="bg-white/95 backdrop-blur-md p-5 border border-neutral-200 rounded-2xs shadow-md space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-maple-red text-white rounded-2xs flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-bold text-[#1D1D1B]">Sunshine City Campus</h4>
                    <p className="text-[10px] text-maple-gold font-bold uppercase">Khu đô thị Ciputra</p>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
                  Vị trí đắc địa tại KĐT Ciputra, thuận tiện di chuyển từ đại lộ Võ Chí Công & Phạm Văn Đồng. Có khu vực đỗ xe an toàn cho phụ huynh.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-bold rounded-2xs shadow-2xs transition-colors gap-1.5"
                >
                  <span>Chỉ Đường Trên Google Maps</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
