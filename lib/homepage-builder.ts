export interface HomepageSection {
  id: string
  name: string
  enabled: boolean
  order: number
  customTitle?: string
  customSubTitle?: string
  customDescription?: string
}

export interface HomepageVariant {
  id: string
  title: string
  slug: string
  isDefault: boolean
  updatedAt: string
  description: string
}

export const INITIAL_HOMEPAGE_SECTIONS: HomepageSection[] = [
  {
    id: 'banner',
    name: '1. Hero Banner (Fullscreen Video & CTAs)',
    enabled: true,
    order: 1,
    customTitle: 'Welcome to Maple Bear International Kindergarten',
    customSubTitle: 'Where Your Child Thrives, Every Day. A Canadian Education for Life-Long Success',
    customDescription: 'At Sunshine Maple Bear International Kindergarten, children learn through exploration, play and meaningful experiences inspired by the internationally recognised Canadian curriculum. Every day is thoughtfully designed to help children thrive academically, socially and emotionally.'
  },
  {
    id: 'why_choose',
    name: '2. Why Families Choose Maple Bear',
    enabled: true,
    order: 2,
    customTitle: 'Why Families Choose Maple Bear',
    customDescription: 'At Sunshine Maple Bear International Kindergarten, every day is designed to inspire curiosity, build confidence and nurture a lifelong love of learning. Through the Maple Bear Canadian Curriculum, caring educators and a safe, engaging environment, children are supported to grow academically, socially and emotionally.'
  },
  {
    id: 'philosophy',
    name: '3. Our School Philosophy (5 Value Cards)',
    enabled: true,
    order: 3,
    customTitle: 'Our School Philosophy',
    customDescription: "At Sunshine Maple Bear, our values shape every learning experience, every interaction and every step of each child's journey."
  },
  {
    id: 'curriculum',
    name: '4. The Maple Bear Canadian Curriculum',
    enabled: true,
    order: 4,
    customTitle: 'The Maple Bear Canadian Curriculum',
    customDescription: "Canada’s education system consistently ranks among the best in the world. Our Program is based on the Official Canadian Curriculum, designed to develop children's academic, social, emotional and physical well-being in the early year."
  },
  {
    id: 'gallery',
    name: '5. School Gallery & Lightbox',
    enabled: true,
    order: 5,
    customTitle: 'Thư Viện Hình Ảnh Campus 5 Sao',
    customDescription: 'Khám phá không gian học tập chuẩn chuẩn quốc tế Canada tại Sunshine City, Ciputra.'
  },
  {
    id: 'event',
    name: '6. Join Us For Open Day (Events)',
    enabled: true,
    order: 6,
    customTitle: 'Join Us For Open Day',
    customDescription: 'Experience the Maple Bear difference. Meet our teachers, explore our campus and discover our learning environment.'
  },
  {
    id: 'around_world',
    name: '7. Maple Bear Around The World',
    enabled: true,
    order: 7,
    customTitle: 'Maple Bear Around The World',
    customDescription: 'There are currently more than 500 Maple Bear early childhood, elementary, middle, and high schools in 37 countries around the world. We operate in conformity with local education regulations and strive to meet the expectations of all our parents no matter the culture or the country.'
  },
  {
    id: 'contact',
    name: '8. Contact Us (Admissions & Tour Form)',
    enabled: true,
    order: 8,
    customTitle: 'Contact Us',
    customDescription: 'If you have any questions, please fill in the form below and we will get in touch as soon as possible.'
  }
]

export const INITIAL_HOMEPAGE_VARIANTS: HomepageVariant[] = [
  {
    id: 'variant-main',
    title: 'Trang Chủ Mặc Định (Official Canadian Homepage)',
    slug: '/',
    isDefault: true,
    updatedAt: '2026-08-09 14:00',
    description: 'Bản trang chủ chuẩn theo bộ nhận diện thương hiệu Sunshine Maple Bear & Excel Spec.'
  },
  {
    id: 'variant-openday',
    title: 'Trang Chủ Chiến Dịch Open Day Mùa Thu 2026 (Draft)',
    slug: '/events/open-day-aug-2026',
    isDefault: false,
    updatedAt: '2026-08-08 10:15',
    description: 'Biến thể trang chủ ưu tiên thông tin sự kiện Open Day và ưu đãi Founding Families.'
  },
  {
    id: 'variant-founding',
    title: 'Trang Chủ Tuyển Sinh Founding Families 2026 (Draft)',
    slug: '/admissions/founding-families',
    isDefault: false,
    updatedAt: '2026-08-05 16:30',
    description: 'Biến thể trang chủ tập trung vào gói ưu đãi giảm 20% học phí trọn đời.'
  }
]

export function getHomepageSectionsConfig(): HomepageSection[] {
  if (typeof window === 'undefined') return INITIAL_HOMEPAGE_SECTIONS
  try {
    const saved = localStorage.getItem('smb_homepage_sections_config')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Error loading homepage section config:', e)
  }
  return INITIAL_HOMEPAGE_SECTIONS
}

export function saveHomepageSectionsConfig(sections: HomepageSection[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('smb_homepage_sections_config', JSON.stringify(sections))
}

export function getHomepageVariants(): HomepageVariant[] {
  if (typeof window === 'undefined') return INITIAL_HOMEPAGE_VARIANTS
  try {
    const saved = localStorage.getItem('smb_homepage_variants')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Error loading homepage variants:', e)
  }
  return INITIAL_HOMEPAGE_VARIANTS
}

export function saveHomepageVariants(variants: HomepageVariant[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('smb_homepage_variants', JSON.stringify(variants))
}
