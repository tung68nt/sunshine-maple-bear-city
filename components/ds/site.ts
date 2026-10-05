/** Site-wide content used by the shared chrome (navigation, footer, contact lines). */
export const SITE = {
  name: 'Sunshine Maple Bear',
  descriptor: 'International Kindergarten',
  logo: '/rugby/logo.png',
  mascot: '/images/maple-bear-mascot.png',
  phone: '094 254 6655',
  phoneHref: 'tel:0942546655',
  email: 'admissions@sunshinemaplebear.edu.vn',
  address: ['S4 Building, Sunshine City, Nam Thang Long', 'Urban Area, Phu Thuong Ward, Hanoi, Vietnam'],
  copyright: '© 2026 Sunshine Maple Bear International School. All rights reserved.',
  visitHref: '/#apply',
  applyHref: '/admissions',
}

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] }

/** Main menu. Items with `children` open a submenu panel; the rest are plain links. */
export const NAV_LINKS: NavItem[] = [
  {
    label: 'Giới thiệu',
    href: '/about',
    children: [
      { label: 'Câu chuyện thương hiệu & di sản Canada', href: '/about/story' },
      { label: 'Tại sao chọn Sunshine Maple Bear?', href: '/about/why-maple-bear' },
      { label: 'Hội đồng cố vấn & Ban giám hiệu', href: '/about/leadership' },
      { label: 'Đội ngũ giáo viên quốc tế', href: '/about/teachers' },
    ],
  },
  {
    label: 'Chương trình học',
    href: '/academics',
    children: [
      { label: 'Các nhóm tuổi', href: '/academics/age-groups' },
      { label: 'Early Years', href: '/academics/early-years' },
      { label: 'Kindergarten', href: '/academics/kindergarten' },
      { label: 'Một ngày tại Maple Bear', href: '/academics/daily-schedule' },
      { label: 'Dinh dưỡng', href: '/academics/nutrition' },
      { label: 'Hoạt động ngoại khoá', href: '/academics/extracurricular' },
      { label: 'Lịch năm học', href: '/academics/calendar' },
    ],
  },
  {
    label: 'Tuyển sinh',
    href: '/admissions',
    children: [
      { label: 'Quy trình tuyển sinh', href: '/admissions/process' },
      { label: 'Học phí', href: '/admissions/tuition' },
      { label: 'Founding Families', href: '/admissions/founding-families' },
      { label: 'Open Day', href: '/admissions/open-day' },
      { label: 'Đặt lịch tham quan', href: '/tour-booking' },
    ],
  },
  {
    label: 'Cộng đồng',
    href: '/community/parent-portal',
    children: [
      { label: 'Cổng thông tin phụ huynh', href: '/community/parent-portal' },
      { label: 'Y tế học đường', href: '/community/health' },
      { label: 'Chính sách an toàn trẻ em', href: '/community/safeguarding' },
    ],
  },
  { label: 'Thư viện ảnh', href: '/gallery' },
  { label: 'Sự kiện', href: '/events' },
  { label: 'Tin tức', href: '/blog' },
  { label: 'Liên hệ', href: '/contact' },
]

export const FOOTER_LINKS = [
  { label: 'About us', href: '/about' },
  { label: 'Admission', href: '/admissions' },
  { label: 'Academic', href: '/academics' },
  { label: 'Curriculum', href: '/academics' },
  { label: 'News', href: '/blog' },
]

export const SOCIAL_LINKS = [
  { name: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/sunshinemaplebear.edu.vn' },
  { name: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
] as const
