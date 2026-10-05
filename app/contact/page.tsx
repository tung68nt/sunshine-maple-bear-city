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
  Input,
  Lead,
  MapEmbed,
  PageHero,
  PageShell,
  Rows,
  Select,
  TextBlock,
  Textarea,
  pickText,
  useSiteLanguage,
} from '@/components/ds'
import { SCHOOL_IMAGES, SCHOOL_INFO } from '@/lib/constants'

const AGE_OPTIONS = ['Lớp Mầm (12 - 24 tháng)', 'Lớp Chồi (24 - 36 tháng)', 'Lớp Lá (3 - 4 tuổi)', 'Lớp Dự Bị Tiền Tiểu Học (4 - 5 tuổi)']

const TOPIC_OPTIONS = [
  'Tư vấn học phí & Chương trình Mầm non Canada',
  'Đăng ký tham quan thực tế cơ sở Sunshine City',
  'Chính sách ưu đãi Cư dân Sunshine City',
  'Thông tin thực đơn & Dịch vụ Xe bus đón trả',
]

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.36430335017!2d105.7946927760205!3d21.058105680599553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aa6d98d2466f%3A0xe7819957793d5f3!2sSunshine%20City!5e0!3m2!1sen!2s!4v1715610000000!5m2!1sen!2s'

/** Contact: content and form logic only — every element comes from the design system. */
export default function ContactPage() {
  const lang = useSiteLanguage()
  const t = (vi: string, en: string) => pickText(lang, vi, en)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [parentName, setParentName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [childName, setChildName] = useState('')
  const [childDob, setChildDob] = useState('')
  const [childAge, setChildAge] = useState(AGE_OPTIONS[0])
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/submissions/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          parentPhone: phone,
          parentEmail: email,
          childName,
          childDob,
          gradeLevel: childAge,
          notes: `Chủ đề quan tâm: ${topic}${message ? `\n\nLời nhắn: ${message}` : ''}`,
          consent,
          turnstileToken,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Không thể gửi thông tin. Vui lòng thử lại.')

      setSubmitSuccess(true)
      setParentName('')
      setPhone('')
      setEmail('')
      setChildName('')
      setChildDob('')
      setMessage('')
      setConsent(false)
      setTurnstileToken('')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Không thể gửi thông tin. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageShell hero={<PageHero title={t('Liên hệ', 'Contact')} image={SCHOOL_IMAGES.render.hanhLang2} crumbs={[{ label: t('Trang chủ', 'Home'), href: '/' }]} />}>
      <Lead
        kicker={t('HỆ THỐNG LIÊN HỆ & TƯ VẤN 24/7', 'CONTACT & ADMISSIONS SUPPORT')}
        title={t('Liên Hệ Với Sunshine Maple Bear', 'Connect With Sunshine Maple Bear')}
        accent="Sunshine Maple Bear"
        image={{ src: SCHOOL_IMAGES.render.hanhLang1, alt: 'Sunshine Maple Bear Campus' }}
        actions={[{ label: t('Gửi Yêu Cầu Tư Vấn Trực Tiếp', 'Send an Enquiry Message'), href: '#enquiry' }]}
      >
        {t(
          'Bộ phận Tuyển sinh sẵn sàng đồng hành, tư vấn chương trình mầm non bản quyền Canada và sắp xếp lịch tham quan thực tế cơ sở vật chất 5 sao tại Sunshine City.',
          'Our admissions team is available to assist you with Canadian kindergarten programs and schedule a 5-star campus tour at Sunshine City.'
        )}
      </Lead>

      <Divider />

      <Block>
        <BlockHeader
          kicker={t('THÔNG TIN BỘ PHẬN TUYỂN SINH', 'ADMISSIONS CONTACT INFO')}
          title={t('Trường Mầm Non Sunshine Maple Bear', 'Sunshine Maple Bear Campus')}
        >
          {t('Cơ sở Sunshine City - Khu đô thị Ciputra Nam Thăng Long, Hà Nội.', 'Sunshine City Campus - Ciputra Urban Area, Hanoi.')}
        </BlockHeader>
        <Rows
          rows={[
            { label: t('Địa chỉ Cơ sở', 'Campus Address'), value: SCHOOL_INFO.ADDRESS },
            { label: t('Hotline Tư vấn Tuyển sinh', 'Admissions Hotline'), value: SCHOOL_INFO.PHONE },
            { label: 'Email Tiếp Nhận', value: SCHOOL_INFO.EMAIL },
            { label: t('Giờ Làm Việc Văn Phòng', 'Office Hours'), value: 'Thứ Hai – Thứ Sáu: 07:30 AM – 18:00 PM' },
          ]}
        />
      </Block>

      <TextBlock
        tone="sand"
        title="Kênh Truyền Thông Chính Thức"
        actions={[
          { label: 'Facebook Fanpage', href: 'https://facebook.com', variant: 'soft' },
          { label: 'YouTube Channel', href: 'https://youtube.com', variant: 'soft' },
          { label: 'Zalo Official Account', href: 'https://zalo.me', variant: 'soft' },
        ]}
      >
        Theo dõi các hoạt động học tập, sự kiện thường niên và hình ảnh thực tế của các bé tại Sunshine Maple Bear.
      </TextBlock>

      <Block id="enquiry" tone="white">
        <BlockHeader kicker="FORM ĐĂNG KÝ TƯ VẤN & NHẬN BÁO GIÁ HỌC PHÍ" title={t('Gửi Yêu Cầu Tư Vấn Trực Tiếp', 'Send an Enquiry Message')}>
          Ban Tuyển sinh sẽ liên hệ phản hồi qua SĐT/Zalo trong vòng 24 giờ làm việc.
        </BlockHeader>

        {submitSuccess && (
          <FormMessage tone="success" title="Gửi thông tin tư vấn thành công!">
            Cảm ơn Quý Phụ huynh đã quan tâm đến Trường Mầm non Sunshine Maple Bear. Bộ phận Tuyển sinh sẽ sớm liên hệ trực tiếp qua SĐT/Zalo để tư
            vấn chi tiết.
          </FormMessage>
        )}
        {submitError && <FormMessage tone="error">{submitError}</FormMessage>}

        <Form onSubmit={handleSubmit}>
          <Field label="Họ và tên Phụ huynh" required>
            <Input name="parentName" required value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="VD: Nguyễn Văn Nam" autoComplete="name" />
          </Field>
          <Field label="Số điện thoại Zalo liên hệ" required>
            <Input name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="VD: 0912 345 678" autoComplete="tel" />
          </Field>
          <Field label="Địa chỉ Email" required>
            <Input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="VD: parent@example.com" autoComplete="email" />
          </Field>
          <Field label="Họ và tên của bé" required>
            <Input name="childName" required value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="VD: Nguyễn Minh An" />
          </Field>
          <Field label="Ngày sinh của bé" required>
            <Input name="childDob" type="date" required max={new Date().toISOString().slice(0, 10)} value={childDob} onChange={(e) => setChildDob(e.target.value)} />
          </Field>
          <Field label="Độ tuổi của bé" required>
            <Select name="childAge" value={childAge} onChange={(e) => setChildAge(e.target.value)} options={AGE_OPTIONS} />
          </Field>
          <Field label="Chủ đề Phụ huynh quan tâm" required full>
            <Select name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} options={TOPIC_OPTIONS} />
          </Field>
          <Field label="Nội dung thắc mắc / Lời nhắn tư vấn" full>
            <Textarea
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Vui lòng ghi rõ các câu hỏi hoặc mong muốn đặt lịch tham quan trường..."
            />
          </Field>
          <Checkbox required checked={consent} onChange={(e) => setConsent(e.target.checked)}>
            Tôi đồng ý để Sunshine Maple Bear liên hệ tư vấn theo thông tin đã cung cấp.
          </Checkbox>
          <Captcha onToken={setTurnstileToken} />
          <FormActions note="Thông tin bảo mật 100%">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi thông tin...' : 'Gửi Đăng Ký Tư Vấn'}
            </Button>
          </FormActions>
        </Form>
      </Block>

      <TextBlock
        kicker="Sunshine City Campus — Khu đô thị Ciputra"
        title="Bản Đồ Vị Trí Cơ Sở Sunshine City"
        actions={[{ label: 'Chỉ Đường Trên Google Maps', href: 'https://maps.google.com', variant: 'soft' }]}
      >
        Vị trí đắc địa tại KĐT Ciputra, thuận tiện di chuyển từ đại lộ Võ Chí Công & Phạm Văn Đồng. Có khu vực đỗ xe an toàn cho phụ huynh.
      </TextBlock>
      <MapEmbed src={MAP_SRC} title="Sunshine Maple Bear Sunshine City Location Map" />

      <CallToAction
        title={t('Đăng ký tham quan thực tế cơ sở Sunshine City', 'Schedule a 5-star campus tour at Sunshine City')}
        actions={[{ label: t('Đặt lịch tham quan', 'Book a tour'), href: '/tour-booking' }]}
      />
    </PageShell>
  )
}
