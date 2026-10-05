'use client'

import { useState } from 'react'
import {
  Block,
  BlockHeader,
  Button,
  CallToAction,
  Captcha,
  Checkbox,
  Divider,
  Field,
  Form,
  FormActions,
  FormMessage,
  Gallery,
  Input,
  Lead,
  PageHero,
  PageShell,
  Rows,
  Select,
  Textarea,
} from '@/components/ds'
import { SCHOOL_IMAGES, SCHOOL_INFO } from '@/lib/constants'

const TOUR_STOPS = [
  { title: 'Phòng học Tiêu chuẩn', src: SCHOOL_IMAGES.render.lopHoc1 },
  { title: 'Thư viện Sách', src: SCHOOL_IMAGES.render.thuVien3 },
  { title: 'Sân chơi Vận động', src: SCHOOL_IMAGES.render.sanChoi2 },
  { title: 'Phòng Âm nhạc', src: SCHOOL_IMAGES.render.phongChucNang1 },
]

/** Tour booking: content and form logic only — every element comes from the design system. */
export default function TourBookingPage() {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorPhone: '',
    visitorEmail: '',
    preferredDate: '',
    preferredTime: '09:30 AM',
    childAge: '12-24m',
    notes: '',
    consent: false,
    turnstileToken: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/submissions/tour-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsSuccess(true)
      } else {
        setSubmitError('Có lỗi xảy ra. Vui lòng liên hệ Hotline 094 254 6655.')
      }
    } catch (err) {
      console.error(err)
      setSubmitError('Lỗi kết nối. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <PageShell hero={<PageHero title="Đặt lịch tham quan" image={SCHOOL_IMAGES.render.lopHoc2} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}>
      <Lead
        kicker="ĐẶT LỊCH THAM QUAN TRƯỜNG MẦM NON 5 SAO"
        title="Trải Nghiệm Thực Tế"
        accent="Thực Tế"
        image={{ src: SCHOOL_IMAGES.render.hanhLang1, alt: 'Khuôn viên Sunshine Maple Bear tại Sunshine City' }}
        actions={[{ label: 'Thông Tin Đăng Ký Tham Quan', href: '#booking' }]}
      >
        Kính mời Phụ huynh cùng bé đến tham quan khuôn viên không gian học tập 5 sao tại Sunshine City và trao đổi trực tiếp cùng Ban Giám Hiệu.
      </Lead>

      <Divider />

      {isSuccess ? (
        <Block id="booking" tone="white">
          <FormMessage tone="success" title="Đăng Ký Tham Quan Thành Công!">
            <p>
              Cảm ơn Phụ huynh <strong>{formData.visitorName}</strong> đã đặt lịch tham quan trường Sunshine Maple Bear vào ngày{' '}
              <strong>{formData.preferredDate}</strong> ({formData.preferredTime}). Bộ phận Tuyển sinh sẽ gọi xác nhận trong 15 phút.
            </p>
          </FormMessage>
          <FormActions align="start">
            <Button onClick={() => setIsSuccess(false)}>Đặt Lịch Khác</Button>
            <Button variant="soft" href="/">
              Về Trang Chủ
            </Button>
          </FormActions>
        </Block>
      ) : (
        <>
          <Block tone="sand">
            <BlockHeader title="Hành Trình Tham Quan 5 Sao" accent="5 Sao">
              Mỗi buổi tham quan kéo dài từ 30 - 45 phút, giúp Phụ huynh có góc nhìn chân thực nhất về môi trường học tập và các hoạt động sinh hoạt
              hàng ngày của trẻ.
            </BlockHeader>
            <Gallery items={TOUR_STOPS} cols={4} />
          </Block>

          <Block>
            <Rows
              rows={[
                { label: 'Thời Gian Đón Tiếp', value: 'Thứ 2 - Thứ 7: 08:30 AM - 05:00 PM' },
                { label: 'Địa Điểm Trường', value: SCHOOL_INFO.ADDRESS },
                { label: 'Quy Mô Tham Quan', value: 'Tối đa 2 Phụ huynh & Bé mỗi lượt đón' },
              ]}
            />
          </Block>

          <Block id="booking" tone="white">
            <BlockHeader title="Thông Tin Đăng Ký Tham Quan">
              Vui lòng điền thông tin bên dưới để nhà trường chuẩn bị công tác đón tiếp chu đáo nhất.
            </BlockHeader>

            {submitError && <FormMessage tone="error">{submitError}</FormMessage>}

            <Form onSubmit={handleSubmit}>
              <Field label="Họ tên Phụ huynh" required>
                <Input name="visitorName" value={formData.visitorName} onChange={handleChange} required placeholder="Nguyễn Văn A" autoComplete="name" />
              </Field>
              <Field label="Số điện thoại Zalo" required>
                <Input type="tel" name="visitorPhone" value={formData.visitorPhone} onChange={handleChange} required placeholder="0912 xxx xxx" autoComplete="tel" />
              </Field>
              <Field label="Địa chỉ Email" required>
                <Input type="email" name="visitorEmail" value={formData.visitorEmail} onChange={handleChange} required placeholder="email@example.com" autoComplete="email" />
              </Field>
              <Field label="Độ tuổi của bé">
                <Select
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  options={[
                    { value: '12-24m', label: '12 - 24 tháng' },
                    { value: '24-36m', label: '24 - 36 tháng' },
                    { value: '3-4y', label: '3 - 4 tuổi' },
                    { value: '4-5y', label: '4 - 5 tuổi' },
                  ]}
                />
              </Field>
              <Field label="Ngày muốn tham quan" required>
                <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
              </Field>
              <Field label="Khung giờ mong muốn">
                <Select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  options={[
                    { value: '09:00 AM', label: '09:00 AM - 10:00 AM' },
                    { value: '10:00 AM', label: '10:00 AM - 11:00 AM' },
                    { value: '02:30 PM', label: '02:30 PM - 03:30 PM' },
                    { value: '04:00 PM', label: '04:00 PM - 05:00 PM' },
                  ]}
                />
              </Field>
              <Field label="Ghi chú & Yêu cầu riêng" full>
                <Textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Nhập thắc mắc hoặc thông tin cần nhà trường hỗ trợ..." />
              </Field>
              <Checkbox required checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}>
                Tôi đồng ý để nhà trường liên hệ và xử lý thông tin theo Chính sách quyền riêng tư.
              </Checkbox>
              <Captcha onToken={(turnstileToken) => setFormData((current) => ({ ...current, turnstileToken }))} />
              <FormActions align="start">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Lịch Tham Quan'}
                </Button>
              </FormActions>
            </Form>
          </Block>
        </>
      )}

      <CallToAction
        title="Sunshine Maple Bear"
        text={`Hotline Tư vấn Tuyển sinh: ${SCHOOL_INFO.PHONE}`}
        actions={[
          { label: 'Liên hệ', href: '/contact' },
          { label: 'Thư viện hình ảnh', href: '/gallery' },
        ]}
      />
    </PageShell>
  )
}
