'use client'

import { useState } from 'react'
import { AsidePanel, Button, Captcha, Checkbox, Field, Form, FormActions, FormMessage, Heading, Input, Select, Text, Textarea } from '@/components/ds'

interface EventRegistrationFormProps {
  eventTitle: string
  eventDate?: string
  eventLocation?: string
}

const PARTICIPANT_OPTIONS = ['1 người (Chỉ Phụ huynh)', '2 người (Phụ huynh & Bé)', '3 người (Cả gia đình & Bé)', 'Trên 3 người']

export function EventRegistrationForm({ eventTitle }: EventRegistrationFormProps) {
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
    setFormData({ ...formData, [name]: value })
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
      <AsidePanel tone="sand">
        <FormMessage tone="success" title="Đăng Ký Tham Dự Thành Công!">
          <p>
            Cảm ơn Phụ huynh đã đăng ký tham dự sự kiện <strong>{eventTitle}</strong>. Ban tuyển sinh Sunshine Maple Bear sẽ liên hệ qua SĐT / Zalo để gửi mã vé mời & xác nhận lịch làm việc.
          </p>
        </FormMessage>
        <Button variant="soft" onClick={() => setIsSuccess(false)}>
          Đăng ký cho người thân
        </Button>
      </AsidePanel>
    )
  }

  return (
    <AsidePanel tone="sand" title="ĐĂNG KÝ XÁC NHẬN THAM DỰ">
      <Heading as="h2" size="md" tone="deep" caps={false}>
        Form Đăng Ký Giữ Chỗ Tham Dự
      </Heading>
      <Text variant="small">Vui lòng điền thông tin để Ban tuyển sinh Sunshine Maple Bear chuẩn bị phần quà & sắp xếp chỗ ngồi chu đáo cho bé.</Text>

      <Form onSubmit={handleSubmit}>
        <Field label="Họ và tên Phụ huynh" required full>
          <Input type="text" name="name" required placeholder="VD: Nguyễn Văn A" value={formData.name} onChange={handleChange} />
        </Field>
        <Field label="Số điện thoại Zalo" required full>
          <Input type="tel" name="phone" required placeholder="0912 xxx xxx" value={formData.phone} onChange={handleChange} />
        </Field>
        <Field label="Địa chỉ Email" required full>
          <Input type="email" name="email" required placeholder="email@example.com" value={formData.email} onChange={handleChange} />
        </Field>
        <Field label="Số lượng người tham dự (Dự kiến)" full>
          <Select name="participants" value={formData.participants} onChange={handleChange} options={PARTICIPANT_OPTIONS} />
        </Field>
        <Field label="Ghi chú / Thắc mắc dành cho Ban Giám hiệu (Tùy chọn)" full>
          <Textarea
            name="note"
            rows={3}
            placeholder="VD: Bé 24 tháng tuổi, muốn tìm hiểu dịch vụ xe bus đưa đón Ciputra..."
            value={formData.note}
            onChange={handleChange}
          />
        </Field>
        <Checkbox required checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}>
          Tôi đồng ý để nhà trường liên hệ và xử lý thông tin theo Chính sách quyền riêng tư.
        </Checkbox>
        <Captcha onToken={(turnstileToken) => setFormData((current) => ({ ...current, turnstileToken }))} />
        <FormActions align="center" note="Bảo mật thông tin 100% theo tiêu chuẩn Sunshine Maple Bear">
          <Button type="submit" variant="solid" block disabled={isSubmitting}>
            {isSubmitting ? 'Đang gửi thông tin...' : 'Gửi Đăng Ký Giữ Chỗ Ngay'}
          </Button>
        </FormActions>
      </Form>
    </AsidePanel>
  )
}
