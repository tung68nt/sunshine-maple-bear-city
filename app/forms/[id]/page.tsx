'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import {
  Badge,
  Block,
  BlockHeader,
  Button,
  CallToAction,
  CheckboxGroup,
  Checkbox,
  Field,
  Form,
  FormActions,
  FormMessage,
  Input,
  PageHero,
  PageShell,
  RadioGroup,
  Rating,
  Select,
  Textarea,
} from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { captureUtmFromUrl, getStoredUtmParams } from '@/lib/utm-tracker'

/** Public page of an admin-defined form: content and form logic only — every element comes from the design system. */
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

  const renderField = (f: any, idx: number) => {
    const label = `${idx + 1}. ${f.label}`
    const full = f.type === 'textarea' || f.width === 'full' || f.type === 'rating'
    const options: string[] = Array.isArray(f.options) ? f.options : []

    if (f.type === 'rating') {
      return (
        <Rating
          key={f.id}
          label={label}
          required={f.required}
          hint={f.helpText}
          full
          value={ratings[f.label] || 0}
          onChange={(star) => handleRating(f.label, star)}
          stepLabel={(n) => `${n} sao`}
        />
      )
    }

    if (f.type === 'radio') {
      return (
        <RadioGroup
          key={f.id}
          label={label}
          name={f.id}
          required={f.required}
          hint={f.helpText}
          full={full}
          options={options}
          value={answers[f.label] ?? ''}
          onChange={(val) => handleInputChange(f.label, val)}
        />
      )
    }

    if (f.type === 'checkbox' && options.length > 0) {
      const chosen: string[] = answers[f.label] ? String(answers[f.label]).split(', ') : []
      return (
        <CheckboxGroup
          key={f.id}
          label={label}
          name={f.id}
          required={f.required}
          hint={f.helpText}
          full={full}
          options={options}
          value={chosen}
          onChange={(val) => handleInputChange(f.label, val.join(', '))}
        />
      )
    }

    if (f.type === 'checkbox') {
      return (
        <Checkbox key={f.id} required={f.required} onChange={(e) => handleInputChange(f.label, e.target.checked ? 'Có' : '')}>
          {label}
          {f.required ? ' *' : ''}
        </Checkbox>
      )
    }

    return (
      <Field key={f.id} label={label} required={f.required} hint={f.helpText} full={full}>
        {f.type === 'textarea' ? (
          <Textarea
            rows={3}
            required={f.required}
            placeholder={f.placeholder || ''}
            onChange={(e) => handleInputChange(f.label, e.target.value)}
            onBlur={(e) => handleInputChange(f.label, e.target.value)}
          />
        ) : f.type === 'select' ? (
          <Select required={f.required} onChange={(e) => handleInputChange(f.label, e.target.value)} options={options} placeholder="-- Vui lòng chọn --" />
        ) : f.type === 'file' ? (
          <Input type="file" required={f.required} onChange={(e) => handleInputChange(f.label, e.target.files?.[0]?.name || '')} />
        ) : (
          <Input
            type={f.type === 'phone' ? 'tel' : f.type === 'email' || f.type === 'date' ? f.type : 'text'}
            required={f.required}
            placeholder={f.placeholder || ''}
            onChange={(e) => handleInputChange(f.label, e.target.value)}
            onBlur={(e) => handleInputChange(f.label, e.target.value)}
          />
        )}
      </Field>
    )
  }

  return (
    <PageShell hero={<PageHero title="Đăng ký thông tin" image={SCHOOL_IMAGES.render.vanPhong} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}>
      <Block tone="white">
        <BlockHeader kicker="MẪU FORM THU THẬP THÔNG TIN CHÍNH THỨC" title={formTitle}>
          <p>{formDesc}</p>
          {utmInfo.utm_source && (
            <p>
              <Badge>
                Campaign Source: {utmInfo.utm_source} ({utmInfo.utm_campaign || 'direct'})
              </Badge>
            </p>
          )}
        </BlockHeader>

        {isSuccess ? (
          <>
            <FormMessage tone="success" title="Gửi Thông Tin Thành Công!">
              Cảm ơn Phụ huynh đã đăng ký. Ban tuyển sinh Sunshine Maple Bear sẽ liên hệ hỗ trợ trong thời gian sớm nhất.
            </FormMessage>
            <FormActions align="start">
              <Button onClick={() => setIsSuccess(false)}>Gửi phản hồi khác</Button>
            </FormActions>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            {fields.map(renderField)}
            <FormActions note={isAutoSaved ? 'Đã lưu thông tin nháp' : 'Bảo mật thông tin 100% theo tiêu chuẩn Sunshine Maple Bear'}>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi dữ liệu...' : 'Gửi Phản Hồi Ngay'}
              </Button>
            </FormActions>
          </Form>
        )}
      </Block>

      <CallToAction
        title="Sunshine Maple Bear"
        text="Ban tuyển sinh Sunshine Maple Bear sẽ liên hệ hỗ trợ trong thời gian sớm nhất."
        actions={[
          { label: 'Liên hệ', href: '/contact' },
          { label: 'Đặt lịch tham quan', href: '/tour-booking' },
        ]}
      />
    </PageShell>
  )
}
