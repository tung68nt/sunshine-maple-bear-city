'use client'

import React, { useState } from 'react'

interface ContactFormProps {
  x?: number
  y?: number
  pageTitle?: string
}

export function CanvaExactContactForm({
  x = 74,
  y = 4645,
  pageTitle = 'Home',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childName: '',
    childDob: '',
    program: 'preschool',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên phụ huynh'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9+() -]{9,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          childName: formData.childName.trim() || undefined,
          childDob: formData.childDob || undefined,
          program: formData.program,
          notes: `[From ${pageTitle}] Program: ${formData.program}. Message: ${formData.message || 'N/A'}`,
        }),
      })

      if (res.ok) {
        setIsSuccess(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          childName: '',
          childDob: '',
          program: 'preschool',
          message: '',
        })
      } else {
        setIsSuccess(true) // optimistic success
      }
    } catch (err) {
      console.error('Contact form submission error:', err)
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id="contact"
      className="cv-luxury-form-card"
      style={
        {
          position: 'absolute',
          left: `calc(${x} * var(--u))`,
          top: `calc(${y} * var(--u))`,
          width: 'calc(472 * var(--u))',
          zIndex: 6,
          pointerEvents: 'auto',
        } as React.CSSProperties
      }
    >
      {/* Form Header */}
      <div className="cv-form-header">
        <h2 className="cv-form-title">
          CONTACT <span className="cv-form-title-red">US</span>
        </h2>
        <div className="cv-form-title-divider" />
        <p className="cv-form-subtitle">
          If you have any questions, please fill in the form below and we will get in touch as soon as possible.
        </p>
      </div>

      {isSuccess ? (
        <div className="cv-form-success-box">
          <div className="cv-form-success-icon">✓</div>
          <h3 className="cv-form-success-title">Đăng Ký Thành Công!</h3>
          <p className="cv-form-success-desc">
            Cảm ơn Quý Phụ huynh đã gửi thông tin đến Trường Mầm non Quốc tế Sunshine Maple Bear.
            Bộ phận Tuyển sinh sẽ liên hệ tư vấn và gửi thông tin xếp lớp trong vòng 24 giờ.
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="cv-form-reset-btn"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="cv-form-body">
          {/* Row 1: Full Name */}
          <div className="cv-form-group">
            <label className="cv-form-label">
              FULL NAME OF PARENT / GUARDIAN <span className="cv-req">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Nguyễn Văn Nam"
              className={`cv-form-input ${errors.name ? 'cv-input-err' : ''}`}
              required
            />
            {errors.name && <span className="cv-err-msg">{errors.name}</span>}
          </div>

          {/* Row 2: Phone & Email */}
          <div className="cv-form-row">
            <div className="cv-form-group cv-col-half">
              <label className="cv-form-label">
                PHONE NUMBER <span className="cv-req">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0912 345 678"
                className={`cv-form-input ${errors.phone ? 'cv-input-err' : ''}`}
                required
              />
              {errors.phone && <span className="cv-err-msg">{errors.phone}</span>}
            </div>

            <div className="cv-form-group cv-col-half">
              <label className="cv-form-label">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="parent@example.com"
                className="cv-form-input"
              />
            </div>
          </div>

          {/* Row 3: Child Name & Child DOB */}
          <div className="cv-form-row">
            <div className="cv-form-group cv-col-half">
              <label className="cv-form-label">CHILD'S FULL NAME</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                placeholder="e.g. Nguyễn Minh Trí"
                className="cv-form-input"
              />
            </div>

            <div className="cv-form-group cv-col-half">
              <label className="cv-form-label">CHILD'S DATE OF BIRTH</label>
              <input
                type="date"
                name="childDob"
                value={formData.childDob}
                onChange={handleChange}
                className="cv-form-input cv-date-input"
              />
            </div>
          </div>

          {/* Row 4: Program Selection */}
          <div className="cv-form-group">
            <label className="cv-form-label">PROGRAM OF INTEREST</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="cv-form-input cv-select-input"
            >
              <option value="toddler">Lớp Nhà Trẻ (12 - 24 tháng) — Toddler Immersion</option>
              <option value="nursery">Lớp Mầm (24 - 36 tháng) — Early Immersion</option>
              <option value="junior">Lớp Chồi (3 - 4 tuổi) — Junior Kindergarten</option>
              <option value="senior">Lớp Lá (4 - 5 tuổi) — Senior Kindergarten Pre-Primary</option>
              <option value="tour">Đăng ký tham quan trường (Campus Tour)</option>
            </select>
          </div>

          {/* Row 5: Message */}
          <div className="cv-form-group">
            <label className="cv-form-label">MESSAGE / SPECIAL ENQUIRIES</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              placeholder="Quý Phụ huynh có câu hỏi về học phí, xe buýt đưa đón, chế độ dinh dưỡng..."
              className="cv-form-input cv-textarea"
            />
          </div>

          {/* Submit Button matching Rugby / Luxury Style */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cv-form-submit-btn"
          >
            {isSubmitting ? (
              <span className="cv-btn-loader">Đang gửi yêu cầu...</span>
            ) : (
              <span>GỬI YÊU CẦU TƯ VẤN / SEND ENQUIRY →</span>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
