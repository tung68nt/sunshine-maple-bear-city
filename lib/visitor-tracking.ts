export interface IPVisitorSession {
  ip: string
  location: string
  firstSeen: string
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
    firstSeen: '2026-08-08 14:10:00',
    lastSeen: '2026-08-09 09:42:15',
    totalVisits: 4,
    totalDurationSeconds: 615, // ~10 mins
    visitedPages: [
      { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', durationSeconds: 245, timestamp: '14:10:15' },
      { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', durationSeconds: 130, timestamp: '14:14:25' },
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
    firstSeen: '2026-08-09 08:00:20',
    lastSeen: '2026-08-09 08:15:40',
    totalVisits: 2,
    totalDurationSeconds: 420, // 7 mins
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
    firstSeen: '2026-08-08 16:15:00',
    lastSeen: '2026-08-08 16:30:12',
    totalVisits: 1,
    totalDurationSeconds: 240, // 4 mins
    visitedPages: [
      { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', durationSeconds: 180, timestamp: '16:15:00' },
      { path: '/forms/open-day', title: 'Form Đăng Ký Open Day Mùa Thu', durationSeconds: 60, timestamp: '16:30:12' }
    ],
    linkedLeadId: 'FORM-2026-105',
    parentName: 'Đỗ Đức Mạnh',
    phone: '0904***321',
    score: 74,
    temperature: 'WARM'
  },
  {
    ip: '42.116.14.99',
    location: 'Phú Thượng, Tây Hồ, Hà Nội',
    firstSeen: '2026-08-09 11:20:00',
    lastSeen: '2026-08-09 11:23:45',
    totalVisits: 1,
    totalDurationSeconds: 85, // 1.4 mins
    visitedPages: [
      { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', durationSeconds: 85, timestamp: '11:20:00' }
    ],
    score: 35,
    temperature: 'COLD'
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
