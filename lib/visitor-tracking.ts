export interface IPVisitorSession {
  ip: string
  location: string
  device: string
  campaign: string
  firstSeen: string // YYYY-MM-DD HH:mm:ss
  lastSeen: string
  totalVisits: number
  totalDurationSeconds: number
  visitedPages: {
    path: string
    title: string
    durationSeconds: number
    timestamp: string
  }[]
  linkedLeadId?: string
  parentName?: string
  phone?: string
  score: number // 0 - 100
  temperature: 'HOT' | 'WARM' | 'COLD'
}

export const MOCK_IP_SESSIONS: IPVisitorSession[] = [
  {
    ip: '113.190.242.88',
    location: 'Ciputra, Tây Hồ, Hà Nội',
    device: 'Mobile (iPhone 15 Pro)',
    campaign: 'facebook_ads / cpc',
    firstSeen: '2026-08-09 09:10:00',
    lastSeen: '2026-08-09 09:42:15',
    totalVisits: 4,
    totalDurationSeconds: 615,
    visitedPages: [
      { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', durationSeconds: 245, timestamp: '09:10:15' },
      { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', durationSeconds: 130, timestamp: '09:14:25' },
      { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', durationSeconds: 180, timestamp: '09:39:10' },
      { path: '/tour-booking', title: 'Form Đặt Lịch Tham Quan Campus', durationSeconds: 60, timestamp: '09:42:15' }
    ],
    linkedLeadId: 'ADM-2026-081',
    parentName: 'Nguyễn Văn Nam',
    phone: '0983***888',
    score: 92,
    temperature: 'HOT'
  },
  {
    ip: '14.232.180.105',
    location: 'Xuân La, Tây Hồ, Hà Nội',
    device: 'Desktop (macOS / Chrome)',
    campaign: 'google_search / cpc',
    firstSeen: '2026-08-09 08:00:20',
    lastSeen: '2026-08-09 08:15:40',
    totalVisits: 2,
    totalDurationSeconds: 420,
    visitedPages: [
      { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', durationSeconds: 150, timestamp: '08:00:20' },
      { path: '/tour-booking', title: 'Form Đặt Lịch Tham Quan Campus', durationSeconds: 270, timestamp: '08:15:40' }
    ],
    linkedLeadId: 'TOUR-2026-042',
    parentName: 'Lê Thu Trang',
    phone: '0912***678',
    score: 85,
    temperature: 'HOT'
  },
  {
    ip: '118.70.12.44',
    location: 'Cầu Giấy, Hà Nội',
    device: 'Mobile (Samsung Galaxy S24)',
    campaign: 'zalo_oa / organic',
    firstSeen: '2026-08-08 16:15:00',
    lastSeen: '2026-08-08 16:30:12',
    totalVisits: 3,
    totalDurationSeconds: 380,
    visitedPages: [
      { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', durationSeconds: 180, timestamp: '16:15:00' },
      { path: '/forms/open-day', title: 'Form Đăng Ký Open Day Mùa Thu', durationSeconds: 200, timestamp: '16:30:12' }
    ],
    linkedLeadId: 'FORM-2026-105',
    parentName: 'Đỗ Đức Mạnh',
    phone: '0904***321',
    score: 78,
    temperature: 'WARM'
  },
  {
    ip: '42.116.14.99',
    location: 'Phú Thượng, Tây Hồ, Hà Nội',
    device: 'Desktop (Windows / Edge)',
    campaign: 'direct / qr_code',
    firstSeen: '2026-08-09 11:20:00',
    lastSeen: '2026-08-09 11:23:45',
    totalVisits: 1,
    totalDurationSeconds: 85,
    visitedPages: [
      { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', durationSeconds: 85, timestamp: '11:20:00' }
    ],
    score: 35,
    temperature: 'COLD'
  },
  {
    ip: '171.244.38.12',
    location: 'Bắc Từ Liêm, Hà Nội',
    device: 'Mobile (iPad Pro)',
    campaign: 'facebook_ads / cpc',
    firstSeen: '2026-08-07 10:05:00',
    lastSeen: '2026-08-07 10:28:10',
    totalVisits: 2,
    totalDurationSeconds: 510,
    visitedPages: [
      { path: '/academics/kindergarten', title: 'Khối Mầm Nhỡ & Mầm Lớn (JK & SK)', durationSeconds: 210, timestamp: '10:05:00' },
      { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', durationSeconds: 300, timestamp: '10:28:10' }
    ],
    linkedLeadId: 'ADM-2026-079',
    parentName: 'Phạm Minh Anh',
    phone: '0978***555',
    score: 88,
    temperature: 'HOT'
  },
  {
    ip: '113.160.88.201',
    location: 'Yên Phụ, Tây Hồ, Hà Nội',
    device: 'Desktop (macOS / Safari)',
    campaign: 'google_search / cpc',
    firstSeen: '2026-08-05 15:22:00',
    lastSeen: '2026-08-05 15:35:40',
    totalVisits: 1,
    totalDurationSeconds: 290,
    visitedPages: [
      { path: '/about/teachers', title: 'Đội Ngũ Giáo Viên Bản Ngữ Canada & Việt Nam', durationSeconds: 150, timestamp: '15:22:00' },
      { path: '/academics/nutrition', title: 'Chế Độ Dinh Dưỡng Hữu Cơ 5 Sao', durationSeconds: 140, timestamp: '15:35:40' }
    ],
    score: 52,
    temperature: 'WARM'
  },
  {
    ip: '27.72.95.14',
    location: 'Thụy Khuê, Tây Hồ, Hà Nội',
    device: 'Mobile (Xiaomi 14)',
    campaign: 'zalo_oa / organic',
    firstSeen: '2026-08-03 19:40:00',
    lastSeen: '2026-08-03 20:05:12',
    totalVisits: 3,
    totalDurationSeconds: 720,
    visitedPages: [
      { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', durationSeconds: 320, timestamp: '19:40:00' },
      { path: '/tour-booking', title: 'Form Đặt Lịch Tham Quan Campus', durationSeconds: 400, timestamp: '20:05:12' }
    ],
    linkedLeadId: 'TOUR-2026-039',
    parentName: 'Trần Hoàng Long',
    phone: '0936***999',
    score: 95,
    temperature: 'HOT'
  }
]

export function calculateLeadScore(pages: { path: string; durationSeconds: number }[]): { score: number; temperature: 'HOT' | 'WARM' | 'COLD' } {
  let score = 0
  const hasTuition = pages.some(p => p.path.includes('tuition'))
  const hasTour = pages.some(p => p.path.includes('tour') || p.path.includes('booking'))
  const hasOpenDay = pages.some(p => p.path.includes('open-day') || p.path.includes('events'))
  const totalTime = pages.reduce((acc, curr) => acc + curr.durationSeconds, 0)

  if (hasTuition) score += 35
  if (hasTour) score += 35
  if (hasOpenDay) score += 20
  if (totalTime > 300) score += 10

  if (score >= 80) return { score: Math.min(score, 100), temperature: 'HOT' }
  if (score >= 50) return { score, temperature: 'WARM' }
  return { score, temperature: 'COLD' }
}
