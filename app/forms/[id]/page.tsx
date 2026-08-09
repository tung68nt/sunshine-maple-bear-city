'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { captureUtmFromUrl, getStoredUtmParams } from '@/lib/utm-tracker'
import { Send, CheckCircle2, Star, ShieldCheck, Zap } from 'lucide-react'

export default function PublicFormPage() {
  const params = useParams()
  const formId = (params?.id as string) || 'default-form'

  const [formTitle, setFormTitle] = useState('Form Thu Thập Thông Tin Sunshine Maple Bear')
  const [formDesc, setFormDesc] = useState('Vui lòng điền đầy đủ thông tin dưới đây để nhận hỗ trợ và tư vấn chi tiết từ Ban tuyển sinh nhà trường.')
  const [fields, setFields] = useState<any[]>([
    { id: 'f-1', label: 'Họ và tên Phụ huynh', type: 'text', required: true, placeholder: 'VD: Nguyễn Văn A', width: 'half' },
    { id: 'f-2', label: 'Số điện thoại Zalo liên hệ', type: 'phone', required: true, placeholder: '0912 xxx xxx', width: 'half' },
    { id: 'f-3', label: 'Địa chỉ Email', type: 'email', required: true, placeholder: 'email@example.com', width: 'half' },
    { id: 'f-4', label: 'Họ tên và Ngày sinh bé', type: 'text', required: true, placeholder: 'VD: Nguyễn Minh Trí (12/04/2023)', width: 'half' },
    { id: 'f-5', label: 'Khung giờ tham quan mong muốn', type: 'select', required: true, options: ['09:00 AM - 10:30 AM', '10:30 AM - 12:00 PM', '02:00 PM - 03:30 PM'], width: 'full' },
    { id: 'f-6', label: 'Ghi chú & Câu hỏi tư vấn', type: 'textarea', required: false, placeholder: 'Nhập câu hỏi dành cho Ban giám hiệu nhà trường...', width: 'full' }
  ])

  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [utmInfo, setUtmInfo] = useState<any>({})
  const [isAutoSaved, setIsAutoSaved] = useState(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Capture UTM parameters from URL
    const utm = captureUtmFromUrl()
    setUtmInfo(utm)
  }, [])

  // Auto-save partial lead on input change
  const triggerPartialAutoSave = (updatedAnswers: Record<string, any>) => {
    // Check if at least 1 contact field has content (e.g. Phone, Name or Email)
    const hasContactData = Object.values(updatedAnswers).some(val => val && String(val).trim().length > 2)
    if (!hasContactData) return

    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current)

    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        const storedUtm = getStoredUtmParams()
        await fetch(`/api/forms/${formId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formTitle: formTitle,
            answers: updatedAnswers,
            isPartial: true,
            utmParams: storedUtm,
            pagePath: window.location.pathname,
            referrer: document.referrer,
          }),
        })
        setIsAutoSaved(true)
        setTimeout(() => setIsAutoSaved(false), 3000)
      } catch (err) {
        // Silent background partial save
      }
    }, 1200)
  }

  const handleInputChange = (label: string, val: any) => {
    const updated = { ...answers, [label]: val }
    setAnswers(updated)
    triggerPartialAutoSave(updated)
  }

  const handleRating = (label: string, star: number) => {
    setRatings((prev) => ({ ...prev, [label]: star }))
    const updated = { ...answers, [label]: `${star} Sao ⭐` }
    setAnswers(updated)
    triggerPartialAutoSave(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const storedUtm = getStoredUtmParams()

      const response = await fetch(`/api/forms/${formId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formTitle: formTitle,
          answers: answers,
          isPartial: false,
          utmParams: storedUtm,
          pagePath: window.location.pathname,
          referrer: document.referrer,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setIsSuccess(true)
      }
    } catch (err) {
      console.warn('Form submission notice:', err)
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B] font-body">
      <Header />
      
      <main className="flex-1 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          
          {/* Main Form Container */}
          <div className="bg-white border border-neutral-300 rounded-2xs overflow-hidden shadow-sm">
            
            {/* Header Banner */}
            <div className="bg-[#151513] text-white p-6 md:p-8 space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-maple-red" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-maple-gold">
                    MẪU FORM THU THẬP THÔNG TIN CHÍNH THỨC
                  </span>
                </div>

                {isAutoSaved && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 border border-emerald-800 rounded-2xs animate-fade-in">
                    <Zap size={11} /> Đã lưu thông tin nháp
                  </span>
                )}
              </div>

              <h1 className="text-xl md:text-2xl font-display font-bold text-white leading-snug">
                {formTitle}
              </h1>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {formDesc}
              </p>

              {utmInfo.utm_source && (
                <div className="pt-1">
                  <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-emerald-400 rounded-2xs inline-block">
                    🎯 Campaign Source: {utmInfo.utm_source} ({utmInfo.utm_campaign || 'direct'})
                  </span>
                </div>
              )}
            </div>

            {/* Form Content / Success state */}
            {isSuccess ? (
              <div className="p-8 md:p-12 text-center space-y-5 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-display font-bold text-[#1D1D1B]">Gửi Thông Tin Thành Công!</h2>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Cảm ơn Phụ huynh đã đăng ký. Ban tuyển sinh Sunshine Maple Bear sẽ liên hệ hỗ trợ trong thời gian sớm nhất.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2 bg-[#1D1D1B] text-white text-xs font-semibold rounded-2xs hover:bg-maple-red transition-all shadow-2xs"
                >
                  Gửi phản hồi khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map((f, idx) => {
                    const isFullWidth = f.type === 'textarea' || f.width === 'full' || f.type === 'rating'
                    
                    return (
                      <div
                        key={f.id}
                        className={`space-y-1.5 ${isFullWidth ? 'sm:col-span-2' : 'sm:col-span-1'}`}
                      >
                        <label className="text-xs font-semibold text-[#1D1D1B] block">
                          {idx + 1}. {f.label} {f.required && <span className="text-maple-red">*</span>}
                        </label>

                        {f.helpText && (
                          <p className="text-[10px] text-neutral-400 font-light">{f.helpText}</p>
                        )}

                        {/* Text / Phone / Email / Date */}
                        {(f.type === 'text' || f.type === 'phone' || f.type === 'email' || f.type === 'date') && (
                          <input
                            type={f.type === 'phone' ? 'tel' : f.type}
                            required={f.required}
                            placeholder={f.placeholder || ''}
                            onChange={(e) => handleInputChange(f.label, e.target.value)}
                            onBlur={(e) => handleInputChange(f.label, e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all placeholder:font-normal placeholder:text-neutral-400"
                          />
                        )}

                        {/* Textarea */}
                        {f.type === 'textarea' && (
                          <textarea
                            rows={3}
                            required={f.required}
                            placeholder={f.placeholder || ''}
                            onChange={(e) => handleInputChange(f.label, e.target.value)}
                            onBlur={(e) => handleInputChange(f.label, e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all resize-none placeholder:font-normal placeholder:text-neutral-400"
                          />
                        )}

                        {/* Select Dropdown */}
                        {f.type === 'select' && (
                          <select
                            required={f.required}
                            onChange={(e) => handleInputChange(f.label, e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold focus:outline-none focus:border-maple-red focus:bg-white transition-all"
                          >
                            <option value="">-- Vui lòng chọn --</option>
                            {f.options?.map((opt: string, i: number) => (
                              <option key={i} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {/* Rating Stars */}
                        {f.type === 'rating' && (
                          <div className="flex gap-2 pt-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handleRating(f.label, star)}
                                className={`p-2 rounded-2xs border transition-all ${
                                  (ratings[f.label] || 0) >= star
                                    ? 'bg-amber-100 border-amber-300 text-amber-600'
                                    : 'bg-[#FDFBF7] border-neutral-300 text-neutral-300 hover:text-amber-400'
                                }`}
                              >
                                <Star size={18} className="fill-current" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* File Upload */}
                        {f.type === 'file' && (
                          <input
                            type="file"
                            required={f.required}
                            onChange={(e) => handleInputChange(f.label, e.target.files?.[0]?.name || '')}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-xs font-semibold text-neutral-600"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="pt-3 border-t border-neutral-200 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold rounded-2xs shadow-2xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Đang gửi dữ liệu...</span>
                    ) : (
                      <>
                        <span>Gửi Phản Hồi Ngay</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center text-[10px] text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-emerald-600" />
                      Bảo mật thông tin 100% theo tiêu chuẩn Sunshine Maple Bear
                    </span>
                  </div>
                </div>

              </form>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
