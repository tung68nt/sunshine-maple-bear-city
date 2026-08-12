'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, User, Phone, Mail, ShieldCheck } from 'lucide-react'
import { Turnstile } from '@/components/turnstile'

interface EventRegistrationFormProps {
  eventTitle: string
  eventDate?: string
  eventLocation?: string
}

export function EventRegistrationForm({ eventTitle, eventDate, eventLocation }: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    participants: '2 người (Phụ huynh & Bé)',
    note: '',
    consent: false,
    turnstileToken: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        eventTitle,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        participants: 1,
        note: formData.note,
        consent: formData.consent,
        turnstileToken: formData.turnstileToken,
      }

      const response = await fetch('/api/submissions/event-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Event registration rejected')
      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting event registration:', error)
      alert('Không thể gửi đăng ký. Vui lòng kiểm tra thông tin và thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white border border-neutral-300 rounded-2xs p-8 text-center space-y-5 shadow-md animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-display font-bold text-[#1D1D1B]">Đăng Ký Tham Dự Thành Công!</h3>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
            Cảm ơn Phụ huynh đã đăng ký tham dự sự kiện <strong>{eventTitle}</strong>. Ban tuyển sinh Sunshine Maple Bear sẽ liên hệ qua SĐT / Zalo để gửi mã vé mời & xác nhận lịch làm việc.
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2 bg-[#1D1D1B] text-white text-xs font-semibold rounded-2xs hover:bg-maple-red transition-all shadow-2xs"
        >
          Đăng ký cho người thân
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xs overflow-hidden shadow-2xs">
      
      {/* Header Banner */}
      <div className="bg-[#151513] text-white p-5 border-b border-neutral-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-maple-red animate-pulse" />
          <span className="text-[10px] font-bold text-maple-gold uppercase tracking-widest">
            ĐĂNG KÝ XÁC NHẬN THAM DỰ
          </span>
        </div>
        <h3 className="text-base font-display font-bold text-white">
          Form Đăng Ký Giữ Chỗ Tham Dự
        </h3>
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          Vui lòng điền thông tin để Ban tuyển sinh Sunshine Maple Bear chuẩn bị phần quà & sắp xếp chỗ ngồi chu đáo cho bé.
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 text-xs">
        
        <div>
          <label className="font-semibold text-[#1D1D1B] block mb-1">
            Họ và tên Phụ huynh <span className="text-maple-red">*</span>
          </label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              name="name"
              required
              placeholder="VD: Nguyễn Văn A"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="font-semibold text-[#1D1D1B] block mb-1">
              Số điện thoại Zalo <span className="text-maple-red">*</span>
            </label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="tel"
                name="phone"
                required
                placeholder="0912 xxx xxx"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#1D1D1B] block mb-1">
              Địa chỉ Email <span className="text-maple-red">*</span>
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="font-semibold text-[#1D1D1B] block mb-1">
            Số lượng người tham dự (Dự kiến)
          </label>
          <select
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all"
          >
            <option value="1 người (Chỉ Phụ huynh)">1 người (Chỉ Phụ huynh)</option>
            <option value="2 người (Phụ huynh & Bé)">2 người (Phụ huynh & Bé)</option>
            <option value="3 người (Cả gia đình & Bé)">3 người (Cả gia đình & Bé)</option>
            <option value="Trên 3 người">Trên 3 người</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-[#1D1D1B] block mb-1">
            Ghi chú / Thắc mắc dành cho Ban Giám hiệu (Tùy chọn)
          </label>
          <textarea
            name="note"
            rows={3}
            placeholder="VD: Bé 24 tháng tuổi, muốn tìm hiểu dịch vụ xe bus đưa đón Ciputra..."
            value={formData.note}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs focus:outline-none focus:border-maple-red focus:bg-white transition-all resize-none"
          />
        </div>

        <div className="pt-2 space-y-3">
          <label className="flex items-start gap-2 text-xs text-neutral-600">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5"
            />
            <span>Tôi đồng ý để nhà trường liên hệ và xử lý thông tin theo Chính sách quyền riêng tư.</span>
          </label>
          <Turnstile onTokenChange={(turnstileToken) => setFormData((current) => ({ ...current, turnstileToken }))} />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-maple-red hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-2xs shadow-2xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Đang gửi thông tin...</span>
            ) : (
              <>
                <span>Gửi Đăng Ký Giữ Chỗ Ngay</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>

          <div className="flex items-center justify-center text-[10px] text-neutral-400 gap-1 pt-1">
            <ShieldCheck size={12} className="text-emerald-600" />
            <span>Bảo mật thông tin 100% theo tiêu chuẩn Sunshine Maple Bear</span>
          </div>
        </div>

      </form>

    </div>
  )
}
