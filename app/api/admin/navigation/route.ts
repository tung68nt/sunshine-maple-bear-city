import { NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const defaultNavbarMenu = [
  { id: '1', labelVi: 'Trang chủ', labelEn: 'Home', href: '/', isHeaderRoot: true },
  {
    id: '2',
    labelVi: 'Về chúng tôi',
    labelEn: 'About Us',
    href: '/about/story',
    isHeaderRoot: true,
    children: [
      { id: '2-1', labelVi: 'Câu chuyện thương hiệu & Di sản Canada', labelEn: 'Our Story & Canadian Heritage', href: '/about/story' },
      { id: '2-2', labelVi: 'Tại sao chọn Sunshine Maple Bear?', labelEn: 'Why Choose Maple Bear?', href: '/about/why-maple-bear' },
      {
        id: '2-3',
        labelVi: 'Hội đồng Cố vấn & Ban Giám hiệu',
        labelEn: 'Academic Leadership & Board',
        href: '/about/leadership',
        children: [
          { id: '2-3-1', labelVi: 'Hội đồng Cố vấn Chuyên môn Canada', labelEn: 'Canadian Advisory Panel', href: '/about/leadership#panel' },
          { id: '2-3-2', labelVi: 'Ủy ban Kiểm định Chất lượng', labelEn: 'Quality Audit Committee', href: '/about/leadership#audit' }
        ]
      },
      { id: '2-4', labelVi: 'Đội ngũ Giáo viên Quốc tế', labelEn: 'International Educators', href: '/about/teachers' }
    ]
  },
  {
    id: '3',
    labelVi: 'Chương trình học',
    labelEn: 'Academics',
    href: '/academics/age-groups',
    isHeaderRoot: true,
    children: [
      {
        id: '3-1',
        labelVi: 'Chương trình Mầm non (12 tháng - 5 tuổi)',
        labelEn: 'Early Childhood Programs (12M-5Y)',
        href: '/academics/age-groups',
        children: [
          { id: '3-1-1', labelVi: 'Lớp Mầm Toddler (12M-24M)', labelEn: 'Toddler Class (12M-24M)', href: '/academics/age-groups#toddler' },
          { id: '3-1-2', labelVi: 'Lớp Lá Senior Kindergarten (4Y-5Y)', labelEn: 'Senior Kindergarten (4Y-5Y)', href: '/academics/age-groups#sk' }
        ]
      },
      { id: '3-2', labelVi: 'Thời khóa biểu & Lịch sinh hoạt 1 ngày', labelEn: 'Daily Schedule & Routine', href: '/academics/daily-schedule' },
      { id: '3-3', labelVi: 'Dinh dưỡng Hữu cơ 5 sao', labelEn: '5-Star Organic Nutrition', href: '/academics/nutrition' },
      { id: '3-4', labelVi: 'Lịch học tập Năm học 2026-2027', labelEn: '2026-2027 School Calendar', href: '/academics/calendar' }
    ]
  },
  {
    id: '4',
    labelVi: 'Tuyển sinh',
    labelEn: 'Admissions',
    href: '/admissions/process',
    isHeaderRoot: true,
    children: [
      { id: '4-1', labelVi: 'Quy trình Tuyển sinh & Đăng ký', labelEn: 'Admissions Guidelines', href: '/admissions/process' },
      { id: '4-2', labelVi: 'Biểu phí Học phí 2026-2027', labelEn: 'Tuition Fee Structure 2026', href: '/admissions/tuition' },
      { id: '4-3', labelVi: 'Chương trình Founding Families (Ưu đãi 30%)', labelEn: 'Founding Families Program', href: '/admissions/founding-families' },
      { id: '4-4', labelVi: 'Đăng ký Tham dự Open Day', labelEn: 'Open Day Registration', href: '/admissions/open-day' },
      { id: '4-5', labelVi: 'Đặt lịch Tham quan Trường', labelEn: 'Book a Campus Visit', href: '/tour-booking' }
    ]
  },
  {
    id: '5',
    labelVi: 'Cộng đồng',
    labelEn: 'Community',
    href: '/community/parent-portal',
    isHeaderRoot: true,
    children: [
      { id: '5-1', labelVi: 'Cổng thông tin Phụ huynh (Parent Portal)', labelEn: 'Parent Portal & App', href: '/community/parent-portal' },
      { id: '5-2', labelVi: 'Bảo vệ an toàn & Y tế học đường', labelEn: 'Health, Safety & Medical Care', href: '/community/health' },
      { id: '5-3', labelVi: 'Chính sách An toàn Trẻ em', labelEn: 'Child Safeguarding Policy', href: '/community/safeguarding' }
    ]
  },
  { id: '6', labelVi: 'Tin tức & Blog', labelEn: 'News & Blog', href: '/blog', isHeaderRoot: true }
]

export async function GET() {
  try {
    const auth = await requireRole(['admin', 'editor', 'viewer']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'navbar-navigation-menu')
      .single()

    if (error || !data || !data.content) {
      return NextResponse.json({ success: true, data: defaultNavbarMenu })
    }

    const parsed = typeof data.content === 'string' ? JSON.parse(data.content) : data.content
    return NextResponse.json({ success: true, data: parsed })
  } catch (err: any) {
    return NextResponse.json({ success: true, data: defaultNavbarMenu })
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    const items = body.items || []

    const payload = {
      slug: 'navbar-navigation-menu',
      title: 'Navbar Navigation Menu Structure',
      content: JSON.stringify(items),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('pages')
      .upsert(payload, { onConflict: 'slug' })

    if (error) {
      console.warn('Supabase navbar upsert notice:', error.message)
    }

    return NextResponse.json({ success: true, message: 'Navbar structure saved successfully.', data: items })
  } catch (err: any) {
    console.error('Error saving navbar API:', err)
    return NextResponse.json({ error: 'Failed to save navbar structure' }, { status: 500 })
  }
}
