'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Article,
  ArticleHero,
  AsidePanel,
  Block,
  Button,
  CallToAction,
  Grid,
  Heading,
  List,
  Media,
  MetaList,
  PageShell,
  PostCard,
  Rows,
  Stack,
  Text,
} from '@/components/ds'
import { EventRegistrationForm } from '@/components/event-registration-form'

interface EventDetail {
  id: string
  title: string
  category: string
  startDate: string
  endDate: string
  location: string
  coverImage: string
  maxAttendees: number
  registeredCount: number
  description: string
  agenda?: { time: string; activity: string }[]
  highlights?: string[]
  galleryImages?: string[]
}

const FALLBACK_IMAGE = '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'

const event1: EventDetail = {
  id: 'evt-101',
  title: 'Open Day 2026: Hành Trình Khám Phá Mầm Non Canada 100% Tiếng Anh',
  category: 'Open Day',
  startDate: '22/08/2026 (08:30 AM - 11:30 AM)',
  endDate: '2026-08-22 11:30',
  location: 'S4 Building, Sunshine City, Ciputra, Hà Nội',
  coverImage: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
  maxAttendees: 100,
  registeredCount: 42,
  description: 'Trải nghiệm không gian học tập chuẩn mầm non Canada 5 sao tại Sunshine City, tham dự giờ học trải nghiệm song ngữ 100% Tiếng Anh, tư vấn 1-1 với Ban Giám hiệu và nhận ưu đãi học phí Founding Families lên tới 30%.',
  highlights: [
    '100% Giáo viên bản ngữ Canada có bằng cử nhân sư phạm mầm non quốc tế',
    'Tham quan phòng học chuẩn Maple Bear, phòng STEAM & thư viện 5.000 đầu sách',
    'Thưởng thức thực đơn dinh dưỡng hữu cơ 5 sao từ đầu bếp khách sạn cao cấp',
    'Miễn 100% phí ghi danh và giảm 30% học phí trọn đời cho cư dân Sunshine City',
  ],
  agenda: [
    { time: '08:30 - 09:00', activity: 'Đón tiếp Phụ huynh, check-in và thưởng thức Tiệc trà Welcome Tea' },
    { time: '09:00 - 09:45', activity: 'Tham quan hệ thống phòng học, khu vui chơi ngoài trời & phòng chức năng' },
    { time: '09:45 - 10:30', activity: 'Hội thảo Ban Giám Hiệu: Phương pháp nhúng ngôn ngữ Tiếng Anh tự nhiên' },
    { time: '10:30 - 11:15', activity: 'Lớp học thử Tiếng Anh trải nghiệm cho bé với Giáo viên Canada' },
    { time: '11:15 - 11:30', activity: 'Tư vấn lộ trình học tập 1-1 & Nhận gói quà tặng tuyển sinh' },
  ],
}

const event2: EventDetail = {
  id: 'evt-102',
  title: 'Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực & Nuôi Dạy Con Song Ngữ',
  category: 'Workshop',
  startDate: '29/08/2026 (09:00 AM - 11:00 AM)',
  endDate: '2026-08-29 11:00',
  location: 'Hội trường Thư viện Maple Bear Sunshine City',
  coverImage: '/images/render/THU_VIEN_6_.jpg',
  maxAttendees: 50,
  registeredCount: 28,
  description: 'Chuyên gia giáo dục mầm non Canada chia sẻ bí quyết giúp trẻ phát triển ngôn ngữ tự nhiên, hình thành tư duy độc lập và giải quyết các hành vi tâm lý lứa tuổi 1-5 tuổi.',
  highlights: [
    'Gặp gỡ Chuyên gia Đào tạo Giáo dục Mầm non Canada',
    'Phương pháp Kỷ luật tích cực không đòn roi, không quát mắng',
    'Bí quyết tạo môi trường tắm ngôn ngữ Tiếng Anh tại nhà cho con',
    'Giải đáp trực tiếp thắc mắc tâm lý trẻ em từ 12 tháng đến 5 tuổi',
  ],
  agenda: [
    { time: '09:00 - 09:15', activity: 'Đón tiếp Phụ huynh & Giao lưu đầu giờ' },
    { time: '09:15 - 10:15', activity: 'Chuyên đề: Kỷ luật tích cực & Phát triển song ngữ sớm' },
    { time: '10:15 - 11:00', activity: 'Q&A Giải đáp thắc mắc 1-1 cùng Chuyên gia' },
  ],
}

const event3: EventDetail = {
  id: 'evt-103',
  title: 'Lễ Hội Mùa Thu Autumn Harvest Festival & Trải Nghiệm Ẩm Thực 5 Sao',
  category: 'Festival',
  startDate: '12/09/2026 (15:00 PM - 18:00 PM)',
  endDate: '2026-09-12 18:00',
  location: 'Khuôn viên Sân chơi Ngoài trời Sunshine City',
  coverImage: '/images/render/HANH_LANG_2_.jpg',
  maxAttendees: 150,
  registeredCount: 89,
  description: 'Sự kiện trải nghiệm văn hóa mùa thu phương Tây dành cho bé và gia đình. Tham gia các hoạt động làm thủ công STEAM, vẽ tranh lá thu và thưởng thức buffet dinh dưỡng 5 sao.',
  highlights: [
    'Trải nghiệm văn hóa mùa thu Canada & Phương Tây',
    'Góc sáng tạo STEAM: Làm đèn lồng, trang trí quả bí ngô & vẽ tranh',
    'Buffet tiệc trà & bánh ngọt dinh dưỡng 5 sao chế biến tại chỗ',
    'Chụp ảnh gia đình miễn phí tại khu check-in Thu Vàng',
  ],
  agenda: [
    { time: '15:00 - 15:30', activity: 'Check-in nhận quà Lễ hội & Trang phục chụp ảnh' },
    { time: '15:30 - 16:30', activity: 'Hoạt động trải nghiệm STEAM & Trò chơi vận động ngoài trời' },
    { time: '16:30 - 17:30', activity: 'Thưởng thức Buffet tiệc trà Lễ hội Thu 5 sao' },
    { time: '17:30 - 18:00', activity: 'Bốc thăm may mắn & Trao quà kỷ niệm' },
  ],
}

const defaultEventsMap: Record<string, EventDetail> = {
  'evt-101': event1,
  'open-day-2026-canada-sunshine-city': event1,
  'evt-102': event2,
  'workshop-phu-huynh-ky-luat-tich-cuc': event2,
  'evt-103': event3,
  'le-hoi-mua-thu-autumn-harvest-2026': event3,
}

const eventLinks = [
  { href: '/events/open-day-2026-canada-sunshine-city', event: event1 },
  { href: '/events/workshop-phu-huynh-ky-luat-tich-cuc', event: event2 },
  { href: '/events/le-hoi-mua-thu-autumn-harvest-2026', event: event3 },
]

/** Event detail and registration: content and data only — every element comes from the design system. */
export default function EventDetailPage() {
  const params = useParams()
  const rawId = (params?.id as string) || 'evt-101'
  const [event, setEvent] = useState<EventDetail>(defaultEventsMap[rawId] || defaultEventsMap['evt-101'])

  useEffect(() => {
    // Check if there is CMS saved data in localStorage first
    try {
      const savedLocal = localStorage.getItem(`smb_event_${rawId}`)
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal)
        setEvent(parsed)
        return
      }
    } catch (e) {}

    if (defaultEventsMap[rawId]) {
      setEvent(defaultEventsMap[rawId])
    } else {
      setEvent({
        ...defaultEventsMap['evt-101'],
        id: rawId,
        title: `Sự kiện Trường Mầm Non Sunshine Maple Bear (${rawId})`,
      })
    }
  }, [rawId])

  const otherEvents = eventLinks.filter((item) => item.event.id !== event.id)

  return (
    <PageShell
      hero={
        <ArticleHero
          title={event.title}
          image={event.coverImage || FALLBACK_IMAGE}
          crumbs={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Sự kiện', href: '/events' },
          ]}
        />
      }
    >
      <Article
        aside={
          <>
            <MetaList
              items={[
                { label: 'Sự kiện', value: event.category },
                { label: 'Thời gian', value: event.startDate },
                { label: 'Địa điểm', value: event.location },
                { label: 'Đang mở đăng ký', value: `Còn ${event.maxAttendees - event.registeredCount} suất` },
                { label: 'Đã đăng ký', value: `${event.registeredCount} / ${event.maxAttendees} người` },
              ]}
            />
            <EventRegistrationForm eventTitle={event.title} eventDate={event.startDate} eventLocation={event.location} />
            <AsidePanel title="Quyền lợi Phụ huynh Đăng ký Trước:">
              <List items={['Nhận bộ quà tặng độc quyền từ Sunshine Maple Bear Canada.', 'Được xếp lịch tư vấn 1-1 riêng với Ban Giám hiệu.']} />
            </AsidePanel>
          </>
        }
      >
        <Stack>
          <Heading size="lg" tone="deep" caps={false}>
            Giới Thiệu Chi Tiết Sự Kiện
          </Heading>
          <Text variant="lead">{event.description}</Text>
          <Media src={event.coverImage || FALLBACK_IMAGE} alt={event.title} ratio="landscape" />
        </Stack>

        {event.galleryImages && event.galleryImages.length > 0 && (
          <Stack>
            <Heading size="md" tone="deep" caps={false}>
              Thư Viện Hình Ảnh Không Gian & Hoạt Động Sự Kiện
            </Heading>
            <Grid cols={3}>
              {event.galleryImages.map((imgUrl, idx) => (
                <Media key={idx} src={imgUrl} alt={`Gallery ${idx + 1}`} ratio="landscape" />
              ))}
            </Grid>
          </Stack>
        )}

        {event.highlights && event.highlights.length > 0 && (
          <Stack>
            <Heading size="md" tone="deep" caps={false}>
              Nội Dung Nổi Bật Dành Cho Phụ Huynh & Bé
            </Heading>
            <List items={event.highlights} />
          </Stack>
        )}

        {event.agenda && event.agenda.length > 0 && (
          <Stack>
            <Heading size="md" tone="deep" caps={false}>
              Lịch Trình Chi Tiết Sự Kiện (Agenda)
            </Heading>
            <Rows rows={event.agenda.map((ag) => ({ label: ag.time, note: ag.activity }))} />
          </Stack>
        )}

        <Button variant="soft" href="/events">
          Quay lại Danh sách Sự kiện
        </Button>
      </Article>

      {otherEvents.length > 0 && (
        <Block tone="sand">
          <Stack gap="lg">
            <Heading size="lg" tone="deep" caps={false}>
              Lịch Sự Kiện Sắp Diễn Ra
            </Heading>
            <Grid cols={3}>
              {otherEvents.map(({ href, event: other }, i) => (
                <PostCard
                  key={other.id}
                  href={href}
                  image={{ src: other.coverImage || FALLBACK_IMAGE, alt: other.title }}
                  meta={`${other.category} · ${other.startDate}`}
                  title={other.title}
                  text={other.description}
                  delay={i * 0.15}
                />
              ))}
            </Grid>
          </Stack>
        </Block>
      )}

      <CallToAction
        title="Sự Kiện Nổi Bật"
        text="Khám phá chuỗi sự kiện trải nghiệm học tập, workshop chuyên đề và các lễ hội rực rỡ sắc màu tại Sunshine Maple Bear."
        actions={[{ label: 'Quay lại Danh sách Sự kiện', href: '/events' }]}
      />
    </PageShell>
  )
}
