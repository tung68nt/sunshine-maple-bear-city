'use client'

import { useEffect, useState } from 'react'
import { Block, BlockHeader, CallToAction, EmptyState, Fact, Grid, Lead, LoadingState, PageHero, PageShell, PostCard, Stack } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

interface EventItem {
  id: string
  slug: string
  title: string
  date: string
  start_date: string
  time: string
  location: string
  description: string
  cover_image: string
  category: string
}

const FALLBACK_EVENTS: EventItem[] = [
  {
    id: 'evt-101',
    slug: 'open-day-2026-canada-sunshine-city',
    title: 'Open Day 2026: Hành Trình Khám Phá Mầm Non Canada Tại Sunshine City',
    date: '2026-08-22',
    start_date: '2026-08-22T08:30:00Z',
    time: '08:30 AM - 11:30 AM',
    location: 'Khuôn viên Trường Mầm Non Sunshine Maple Bear, Tòa S4 Sunshine City',
    description: 'Sự kiện trải nghiệm không gian học tập thẩm thấu tiếng Anh 100% cùng đội ngũ chuyên gia giáo dục Canada. Phụ huynh trực tiếp trao đổi cùng Ban Giám Hiệu và nhận ưu đãi học phí lên tới 30%.',
    cover_image: SCHOOL_IMAGES.render.lopHoc1,
    category: 'Open Day',
  },
  {
    id: 'evt-102',
    slug: 'workshop-phu-huynh-ky-luat-tich-cuc',
    title: 'Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực Chuẩn Canada',
    date: '2026-08-29',
    start_date: '2026-08-29T09:00:00Z',
    time: '09:00 AM - 11:00 AM',
    location: 'Hội trường Thư viện 5 Sao, Sunshine City Campus',
    description: 'Buổi tư vấn chuyên sâu giúp Phụ huynh nắm bắt tâm lý trẻ mầm non giai đoạn 1-5 tuổi, ứng dụng phương pháp giáo dục hành vi tích cực không đòn roi.',
    cover_image: SCHOOL_IMAGES.render.thuVien6,
    category: 'Workshop',
  },
]

/** category · date · time · place, as shown on each event card */
const eventMeta = (event: EventItem) =>
  [
    event.category || 'Sự kiện',
    new Date(event.start_date || event.date).toLocaleDateString('vi-VN'),
    event.time || new Date(event.start_date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    event.location || 'Sunshine City Campus',
  ].join(' · ')

/** Events listing: content and data only — every element comes from the design system. */
export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/admin/events')
        // the endpoint redirects signed-out visitors to the login page (HTML), so check the type too
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data)
          } else {
            setEvents(FALLBACK_EVENTS)
          }
        } else {
          setEvents(FALLBACK_EVENTS)
        }
      } catch (err) {
        console.error(err)
        setEvents(FALLBACK_EVENTS)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <PageShell hero={<PageHero title="Sự kiện" image={SCHOOL_IMAGES.render.phongChucNang1} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}>
      <Lead
        kicker="SỰ KIỆN & LỄ HỘI THƯỜNG NIÊN"
        title="Sự Kiện Nổi Bật"
        accent="Nổi Bật"
        image={{ src: SCHOOL_IMAGES.render.thuVien1, alt: 'Không gian tổ chức sự kiện tại Sunshine Maple Bear' }}
      >
        Khám phá chuỗi sự kiện trải nghiệm học tập, workshop chuyên đề và các lễ hội rực rỡ sắc màu tại Sunshine Maple Bear.
      </Lead>

      <Block tone="sand">
        <Stack gap="lg">
          <BlockHeader title="Lịch Sự Kiện Sắp Diễn Ra">Đăng ký tham gia ngay để nhận tấm vé trải nghiệm môi trường mầm non 5 sao dành cho bé.</BlockHeader>

          {loading ? (
            <LoadingState text="Đang tải lịch sự kiện..." />
          ) : events.length === 0 ? (
            <EmptyState text="Hiện chưa có sự kiện nào sắp diễn ra." />
          ) : (
            <Grid cols={3}>
              {events.map((event, i) => (
                <PostCard
                  key={event.id}
                  href={`/events/${event.slug || event.id}`}
                  image={{ src: event.cover_image || SCHOOL_IMAGES.render.thuVien1, alt: `Event: ${event.title}` }}
                  meta={eventMeta(event)}
                  title={event.title}
                  text={event.description}
                  delay={(i % 3) * 0.15}
                />
              ))}
            </Grid>
          )}
        </Stack>
      </Block>

      <Block>
        <Grid cols={2}>
          <Fact
            title="2,500+ Phụ Huynh"
            text="Đã tin tưởng tham dự các chuỗi sự kiện Open Day & Workshop chuyên đề nuôi dạy con song ngữ tại nhà trường."
          />
          <Fact
            title="50+ Lễ Hội Thường Niên"
            text="Hàng năm tổ chức chuỗi sự kiện giáo dục, lễ hội hóa trang Halloween, Giáng Sinh, Tết Cổ Truyền cho học sinh."
            delay={0.15}
          />
        </Grid>
      </Block>

      <CallToAction
        title="Đăng Ký Tham Gia"
        text="Đăng ký tham gia ngay để nhận tấm vé trải nghiệm môi trường mầm non 5 sao dành cho bé."
        actions={[{ label: 'Đặt Lịch Hẹn Ngay', href: '/tour-booking' }]}
      />
    </PageShell>
  )
}
