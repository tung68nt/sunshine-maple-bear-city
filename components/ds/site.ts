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

export const NAV_LINKS = [
  { label: 'Giới thiệu', href: '/about' },
  { label: 'Tuyển sinh', href: '/admissions' },
  { label: 'Chương trình học', href: '/academics' },
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
