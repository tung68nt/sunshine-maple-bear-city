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

export function AdminOverview() {
  const [adminLang, setAdminLang] = useState<'vi' | 'en'>('vi')

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

  const statsCards = [
    {
      label: adminLang === 'vi' ? 'Lịch Đặt Tham quan' : 'Tour Bookings',
      value: '42',
      change: adminLang === 'vi' ? '+18% tháng này' : '+18% this month',
      icon: CalendarCheck,
      color: 'text-maple-red'
    },
    {
      label: adminLang === 'vi' ? 'Hồ sơ Tuyển sinh' : 'Admissions Enquiries',
      value: '128',
      change: adminLang === 'vi' ? '+24% tháng này' : '+24% this month',
      icon: UserCheck,
      color: 'text-amber-600'
    },
    {
      label: adminLang === 'vi' ? 'Bài viết đã Đăng' : 'Published Articles',
      value: '19',
      change: adminLang === 'vi' ? '3 bản nháp chờ duyệt' : '3 drafts pending',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      label: adminLang === 'vi' ? 'Thư viện Hình ảnh' : 'Gallery Media',
      value: '144',
      change: adminLang === 'vi' ? '12 album hoạt động' : '12 active albums',
      icon: ImageIcon,
      color: 'text-emerald-600'
    }
  ]

  const recentBookings = [
    { id: 'TB-2026-089', parent: 'Nguyễn Văn Nam', phone: '0912 345 678', childAge: '3 Tuổi (Lớp Chồi)', tourDate: '12/08/2026', status: adminLang === 'vi' ? 'Đã xác nhận' : 'Confirmed' },
    { id: 'TB-2026-088', parent: 'Trần Thị Mai', phone: '0988 765 432', childAge: '18 Tháng (Nhà Trẻ)', tourDate: '14/08/2026', status: adminLang === 'vi' ? 'Đang chờ' : 'Pending' },
    { id: 'TB-2026-087', parent: 'Lê Hoàng Anh', phone: '0903 112 233', childAge: '4 Tuổi (Junior K)', tourDate: '15/08/2026', status: adminLang === 'vi' ? 'Đã xác nhận' : 'Confirmed' },
    { id: 'TB-2026-086', parent: 'Phạm Thu Trang', phone: '0945 667 889', childAge: '2 Tuổi (Lớp Mầm)', tourDate: '18/08/2026', status: adminLang === 'vi' ? 'Đã hoàn thành' : 'Completed' },
  ]

  const recentEnquiries = [
    { name: 'Đỗ Đức Mạnh', email: 'manh.do@gmail.com', phone: '0915 223 344', program: 'Mầm non Song ngữ Canada', date: '07/08/2026' },
    { name: 'Vũ Thị Hồng', email: 'hongvu@yahoo.com', phone: '0977 889 900', program: 'Lớp Nhà trẻ Đắm mình Tiếng Anh', date: '06/08/2026' },
    { name: 'Hoàng Nhật Minh', email: 'minh.hoang@company.com', phone: '0934 556 677', program: 'Lớp Lá Senior Kindergarten (SK)', date: '05/08/2026' },
  ]

  return (
    <div className="space-y-4 text-[#1D1D1B]">
      
      {/* Top Banner */}
      <div className="bg-[#151513] text-white p-4 sm:p-5 border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-[10px] font-semibold text-maple-gold block">
            {adminLang === 'vi' ? 'Tổng quan Bảng Điều hành' : 'Dashboard Overview'}
          </span>
          <h2 className="text-xl font-display font-extrabold text-white mt-0.5">
            {adminLang === 'vi' ? 'Chào mừng trở lại, Quản trị viên Tuyển sinh' : 'Welcome Back, Admissions Admin'}
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            {adminLang === 'vi'
              ? 'Trạng thái vận hành: Toàn bộ hệ thống hoạt động bình thường. Đã bảo mật Captcha & GA4 Analytics.'
              : 'System operation status: All systems online. Captcha active. GA4 tracking operational.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/tour-bookings"
            className="px-3.5 py-2 bg-maple-red text-white text-xs font-bold hover:bg-red-700 transition-colors border border-maple-red"
          >
            {adminLang === 'vi' ? 'Quản lý Đặt lịch' : 'Manage Bookings'}
          </Link>
          <Link
            href="/admin/forms"
            className="px-3.5 py-2 bg-white/10 text-white text-xs font-bold hover:bg-white hover:text-black transition-colors border border-white/20"
          >
            {adminLang === 'vi' ? 'Dựng Form Động' : 'Form Builder'}
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {statsCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div key={idx} className="bg-white border border-neutral-200 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-600">{card.label}</span>
                <div className={`w-8 h-8 border border-neutral-200 bg-[#FDFBF7] flex items-center justify-center ${card.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{card.value}</div>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <TrendingUp size={12} />
                  {card.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 2 Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Recent Tour Bookings (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
            <div>
              <span className="text-[10px] font-semibold text-maple-red block">
                {adminLang === 'vi' ? 'Hoạt động Vận hành' : 'Operations'}
              </span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                {adminLang === 'vi' ? 'Lịch Đặt Tham quan Mới nhất' : 'Recent Tour Bookings'}
              </h3>
            </div>
            <Link href="/admin/tour-bookings" className="text-xs font-bold text-maple-red hover:underline flex items-center gap-1">
              <span>{adminLang === 'vi' ? 'Xem Tất cả' : 'View All'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FDFBF7] text-neutral-600 font-semibold">
                  <th className="py-2 px-2.5">{adminLang === 'vi' ? 'Mã lịch hẹn' : 'Booking ID'}</th>
                  <th className="py-2 px-2.5">{adminLang === 'vi' ? 'Họ tên phụ huynh' : 'Parent Name'}</th>
                  <th className="py-2 px-2.5">{adminLang === 'vi' ? 'Số điện thoại' : 'Phone'}</th>
                  <th className="py-2 px-2.5">{adminLang === 'vi' ? 'Ngày tham quan' : 'Tour Date'}</th>
                  <th className="py-2 px-2.5">{adminLang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-2 px-2.5 font-mono font-bold text-[#1D1D1B]">{b.id}</td>
                    <td className="py-2 px-2.5 font-semibold text-[#1D1D1B]">{b.parent}</td>
                    <td className="py-2 px-2.5 font-mono text-neutral-600">{b.phone}</td>
                    <td className="py-2 px-2.5 font-mono font-semibold text-[#1D1D1B]">{b.tourDate}</td>
                    <td className="py-2 px-2.5">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-2xs ${
                        b.status === 'Confirmed' || b.status === 'Đã xác nhận'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : b.status === 'Pending' || b.status === 'Đang chờ'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-300'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Admissions Submissions (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 space-y-5 shadow-2xs rounded-2xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <div>
              <span className="text-[10px] font-semibold text-amber-600 block">
                {adminLang === 'vi' ? 'Hồ sơ Tìm hiểu' : 'Enquiries'}
              </span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">
                {adminLang === 'vi' ? 'Hồ sơ Tuyển sinh Mới' : 'New Admissions Submissions'}
              </h3>
            </div>
            <Link href="/admin/admissions" className="text-xs font-bold text-maple-red hover:underline flex items-center gap-1">
              <span>{adminLang === 'vi' ? 'Xem Tất cả' : 'View All'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq, idx) => (
              <div key={idx} className="p-4 bg-[#FDFBF7] border border-neutral-200 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-[#1D1D1B]">{enq.name}</h4>
                  <span className="text-[10px] font-mono text-neutral-400">{enq.date}</span>
                </div>
                <p className="text-xs text-neutral-600 font-mono">
                  {adminLang === 'vi' ? 'SĐT' : 'Phone'}: {enq.phone}
                </p>
                <p className="text-xs text-neutral-500 font-light truncate">Email: {enq.email}</p>
                <span className="text-[10px] font-bold text-maple-red block pt-1">
                  {adminLang === 'vi' ? 'Chương trình đăng ký' : 'Program'}: {enq.program}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminOverview
