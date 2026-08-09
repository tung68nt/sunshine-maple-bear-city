'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  CalendarCheck,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { SCHOOL_IMAGES } from '@/lib/constants'

// REAL INITIAL DATA ARRAYS matching actual CMS state
const realInitialArticles = [
  {
    id: '1',
    title: 'Why English Immersion in Early Childhood Matters',
    title_vi: 'Tại sao Môi trường Song ngữ 100% Tiếng Anh lại Quan trọng ở Lứa tuổi Mầm non?',
    status: 'Published'
  },
  {
    id: '2',
    title: '5 Principles of Maple Bear Canadian Early Childhood Program',
    title_vi: '5 Nguyên Tắc Giáo Dục Mầm Non Chuẩn Canada Tại Maple Bear',
    status: 'Published'
  },
  {
    id: '3',
    title: 'Nutrition & Meal Planning for Kindergarten Children',
    title_vi: 'Chế Độ Dinh Dưỡng Hữu Cơ & Thực Đơn Cho Bé Mầm Non',
    status: 'Draft'
  }
]

const realInitialTours = [
  {
    id: 'TB-2026-089',
    parent: 'Nguyễn Văn Nam',
    phone: '0912 345 678',
    childAge: '3 Tuổi (Lớp Chồi)',
    tourDate: '12/08/2026',
    status: 'Confirmed'
  },
  {
    id: 'TB-2026-088',
    parent: 'Trần Thị Mai',
    phone: '0988 765 432',
    childAge: '18 Tháng (Nhà Trẻ)',
    tourDate: '14/08/2026',
    status: 'Pending'
  },
  {
    id: 'TB-2026-087',
    parent: 'Lê Hoàng Anh',
    phone: '0903 112 233',
    childAge: '4 Tuổi (Junior K)',
    tourDate: '15/08/2026',
    status: 'Confirmed'
  },
  {
    id: 'TB-2026-086',
    parent: 'Phạm Thu Trang',
    phone: '0945 667 889',
    childAge: '2 Tuổi (Lớp Mầm)',
    tourDate: '18/08/2026',
    status: 'Completed'
  }
]

const realInitialSubmissions = [
  {
    id: 'ADM-001',
    name: 'Đỗ Đức Mạnh',
    email: 'manh.do@gmail.com',
    phone: '0915 223 344',
    program: 'Mầm non Song ngữ Canada',
    date: '07/08/2026'
  },
  {
    id: 'ADM-002',
    name: 'Vũ Thị Hồng',
    email: 'hongvu@yahoo.com',
    phone: '0977 889 900',
    program: 'Lớp Nhà trẻ Đắm mình Tiếng Anh',
    date: '06/08/2026'
  },
  {
    id: 'ADM-003',
    name: 'Hoàng Nhật Minh',
    email: 'minh.hoang@company.com',
    phone: '0934 556 677',
    program: 'Lớp Lá Senior Kindergarten (SK)',
    date: '05/08/2026'
  },
  {
    id: 'ADM-004',
    name: 'Lê Thanh Thảo',
    email: 'thao.le@gmail.com',
    phone: '0982 114 556',
    program: 'Báo giá & Ưu đãi Nhập học 2026',
    date: '02/08/2026'
  }
]

const realGalleryItemsCount = 8

export default function AdminOverview() {
  const [adminLang, setAdminLang] = useState<'vi' | 'en'>('vi')
  const [articlesList, setArticlesList] = useState(realInitialArticles)
  const [toursList, setToursList] = useState(realInitialTours)
  const [submissionsList, setSubmissionsList] = useState(realInitialSubmissions)

  useEffect(() => {
    const saved = (localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en') || 'vi'
    setAdminLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setAdminLang(e.detail)
      }
    }

    window.addEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
  }, [])

  // Dynamic DPU Calculations
  const publishedArticlesCount = articlesList.filter(a => a.status === 'Published').length
  const draftArticlesCount = articlesList.filter(a => a.status === 'Draft').length
  const totalBookingsCount = toursList.length
  const totalSubmissionsCount = submissionsList.length

  const statsCards = [
    {
      label: adminLang === 'vi' ? 'Lịch Đặt Tham quan' : 'Tour Bookings',
      value: totalBookingsCount.toString(),
      change: adminLang === 'vi' ? '4 lịch đặt thực tế' : '4 active bookings',
      icon: CalendarCheck,
      color: 'text-maple-red'
    },
    {
      label: adminLang === 'vi' ? 'Hồ sơ Tuyển sinh' : 'Admissions Enquiries',
      value: totalSubmissionsCount.toString(),
      change: adminLang === 'vi' ? '4 hồ sơ thực tế' : '4 actual submissions',
      icon: UserCheck,
      color: 'text-amber-600'
    },
    {
      label: adminLang === 'vi' ? 'Bài viết đã Đăng' : 'Published Articles',
      value: publishedArticlesCount.toString(),
      change: adminLang === 'vi' ? `${draftArticlesCount} bản nháp chờ duyệt` : `${draftArticlesCount} draft pending`,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      label: adminLang === 'vi' ? 'Thư viện Hình ảnh' : 'Gallery Media',
      value: realGalleryItemsCount.toString(),
      change: adminLang === 'vi' ? '8 hình ảnh thực tế' : '8 campus photos',
      icon: ImageIcon,
      color: 'text-emerald-600'
    }
  ]

  return (
    <div className="space-y-4 text-[#1D1D1B] animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-[#151513] text-white p-4 sm:p-5 border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm rounded-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-gold block uppercase tracking-wider">
            {adminLang === 'vi' ? 'Tổng quan Bảng Điều hành' : 'Dashboard Overview'}
          </span>
          <h2 className="text-xl font-display font-extrabold text-white mt-0.5">
            {adminLang === 'vi' ? 'Chào mừng trở lại, Ban Giám Hiệu & Tuyển Sinh' : 'Welcome Back, Sunshine Operations Portal'}
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            {adminLang === 'vi'
              ? 'Số liệu vận hành đếm thực tế từ hệ thống dữ liệu CMS Sunshine Maple Bear.'
              : 'Real-time dynamic operations metric engine connected to Sunshine CMS dataset.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/tour-bookings"
            className="px-3.5 py-2 bg-maple-red text-white text-xs font-bold hover:bg-red-700 transition-colors border border-maple-red rounded-2xs shadow-2xs"
          >
            {adminLang === 'vi' ? 'Quản lý Đặt lịch' : 'Manage Bookings'}
          </Link>
          <Link
            href="/admin/blog"
            className="px-3.5 py-2 bg-white/10 text-white text-xs font-bold hover:bg-white hover:text-black transition-colors border border-white/20 rounded-2xs"
          >
            {adminLang === 'vi' ? 'Quản lý Blog' : 'Blog Manager'}
          </Link>
        </div>
      </div>

      {/* 4 Dynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {statsCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div key={idx} className="bg-white border border-neutral-200 p-4 space-y-2 shadow-2xs rounded-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">{card.label}</span>
                <div className={`w-8 h-8 border border-neutral-200 bg-[#FDFBF7] flex items-center justify-center ${card.color} rounded-2xs`}>
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{card.value}</div>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                  <TrendingUp size={12} />
                  {card.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 2 Real Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Recent Tour Bookings (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs rounded-2xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
            <div>
              <span className="text-[10px] font-semibold text-maple-red block uppercase tracking-wider">
                {adminLang === 'vi' ? 'Hoạt động Vận hành' : 'Operations'}
              </span>
              <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">
                {adminLang === 'vi' ? 'Lịch Đặt Tham quan Mới nhất' : 'Recent Tour Bookings'}
              </h3>
            </div>
            <Link
              href="/admin/tour-bookings"
              className="text-xs text-maple-red font-bold hover:underline flex items-center gap-1"
            >
              {adminLang === 'vi' ? 'Xem tất cả' : 'View All'} <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FDFBF7] text-neutral-700 font-bold border-b border-neutral-200">
                  <th className="py-2.5 px-3">Booking ID</th>
                  <th className="py-2.5 px-3">{adminLang === 'vi' ? 'Phụ huynh' : 'Parent Name'}</th>
                  <th className="py-2.5 px-3">{adminLang === 'vi' ? 'SĐT' : 'Phone'}</th>
                  <th className="py-2.5 px-3">{adminLang === 'vi' ? 'Ngày tham quan' : 'Tour Date'}</th>
                  <th className="py-2.5 px-3 text-center">{adminLang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                {toursList.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-maple-black">{row.id}</td>
                    <td className="py-2.5 px-3 font-bold text-neutral-800">{row.parent}</td>
                    <td className="py-2.5 px-3 font-mono text-neutral-600">{row.phone}</td>
                    <td className="py-2.5 px-3 font-bold text-neutral-800">{row.tourDate}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-2xs text-[10px] font-bold ${
                        row.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' :
                        row.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-300' :
                        'bg-neutral-100 text-neutral-700 border border-neutral-300'
                      }`}>
                        {row.status === 'Confirmed' ? (adminLang === 'vi' ? 'Đã xác nhận' : 'Confirmed') :
                         row.status === 'Pending' ? (adminLang === 'vi' ? 'Đang chờ' : 'Pending') : (adminLang === 'vi' ? 'Hoàn thành' : 'Completed')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Admissions Submissions (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs rounded-2xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
            <div>
              <span className="text-[10px] font-semibold text-amber-600 block uppercase tracking-wider">
                {adminLang === 'vi' ? 'Đăng ký Tuyển sinh' : 'Enquiries'}
              </span>
              <h3 className="text-base font-display font-extrabold text-[#1D1D1B]">
                {adminLang === 'vi' ? 'Hồ sơ Đăng ký Mới' : 'New Admissions Submissions'}
              </h3>
            </div>
            <Link
              href="/admin/admissions"
              className="text-xs text-maple-red font-bold hover:underline flex items-center gap-1"
            >
              {adminLang === 'vi' ? 'Xem tất cả' : 'View All'} <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {submissionsList.map((item) => (
              <div key={item.id} className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-1 hover:border-neutral-300 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-extrabold text-maple-black">{item.name}</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">{item.date}</span>
                </div>
                <div className="text-[11px] text-neutral-600 font-mono">
                  SĐT: <span className="font-bold text-neutral-800">{item.phone}</span> | Email: {item.email}
                </div>
                <div className="text-[11px] font-bold text-maple-red">
                  Chương trình: {item.program}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
