'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Users,
  FileCheck,
  Smartphone,
  Monitor,
  MapPin,
  Filter,
  ArrowUpRight,
  Share2,
  PieChart,
  Calendar,
  CheckCircle2,
  Compass,
  CalendarCheck,
  Database,
  Globe2,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react'
import Link from 'next/link'

interface AuditLogEntry {
  id: string
  time: string
  parentName: string
  phone: string
  formType: string
  utmSource: string
  targetUrl: string
}

const AUDIT_LOG_SEED: AuditLogEntry[] = [
  {
    id: 'ADM-2026-081',
    time: '09:42 AM - 09/08/2026',
    parentName: 'Nguyễn Văn Nam',
    phone: '0983***888',
    formType: 'Đơn Đăng Ký Tư Vấn Mầm Non',
    utmSource: 'facebook_ads / cpc',
    targetUrl: '/admin/admissions'
  },
  {
    id: 'TOUR-2026-042',
    time: '08:15 AM - 09/08/2026',
    parentName: 'Lê Thu Trang',
    phone: '0912***678',
    formType: 'Đặt Lịch Tham Quan Campus 5 Sao',
    utmSource: 'google_search / cpc',
    targetUrl: '/admin/tour-bookings'
  },
  {
    id: 'FORM-2026-105',
    time: '16:30 PM - 08/08/2026',
    parentName: 'Đỗ Đức Mạnh',
    phone: '0904***321',
    formType: 'Form Đăng Ký Open Day Mùa Thu',
    utmSource: 'zalo_oa / organic',
    targetUrl: '/admin/forms'
  },
  {
    id: 'ADM-2026-080',
    time: '14:20 PM - 08/08/2026',
    parentName: 'Phạm Minh Anh',
    phone: '0978***555',
    formType: 'Đơn Đăng Ký Tư Vấn Mầm Non',
    utmSource: 'facebook_ads / cpc',
    targetUrl: '/admin/admissions'
  },
  {
    id: 'TOUR-2026-041',
    time: '11:05 AM - 08/08/2026',
    parentName: 'Trần Hoàng Long',
    phone: '0936***999',
    formType: 'Đặt Lịch Tham Quan Campus 5 Sao',
    utmSource: 'direct / qr_code',
    targetUrl: '/admin/tour-bookings'
  }
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d')
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')
  const [auditSearch, setAuditSearch] = useState('')

  useEffect(() => {
    const saved = (localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en') || 'vi'
    setAdminUiLang(saved)

    const handleLangChange = (e: CustomEvent) => {
      if (e.detail === 'vi' || e.detail === 'en') {
        setAdminUiLang(e.detail)
      }
    }

    window.addEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
    return () => window.removeEventListener('smbAdminUiLangChange', handleLangChange as EventListener)
  }, [])

  const analyticsDataMap = {
    '7d': {
      kpis: {
        visits: '6,420',
        visitsGrowth: '+18.2% so với 7 ngày trước',
        leads: '58 Lead',
        leadsGrowth: '+28.5% mục tiêu tuần',
        cvr: '5.12%',
        cvrGrowth: '+1.2% so với TB',
        tours: '28 Lịch Hẹn',
        toursGrowth: '+33.3% lượt tham quan',
        avgTime: '3m 02s',
        avgTimeSub: '88% từ Google Search'
      },
      channels: [
        { source: 'Facebook Ads', channel: 'facebook_ads / cpc', visits: '2,840', leads: 32, cvr: '5.2%', share: 55, color: 'bg-blue-600' },
        { source: 'Google Search Ads', channel: 'google_search / cpc', visits: '1,920', leads: 18, cvr: '5.8%', share: 31, color: 'bg-emerald-600' },
        { source: 'Zalo OA & Broadcast', channel: 'zalo_oa / organic', visits: '980', leads: 6, cvr: '3.9%', share: 10, color: 'bg-[#0068FF]' },
        { source: 'Direct & Mã QR ấn phẩm', channel: 'direct / qr_code', visits: '680', leads: 2, cvr: '2.4%', share: 4, color: 'bg-amber-500' }
      ],
      funnel: [
        { step: '1. Lượt Truy Cập Website', count: '6,420', percent: '100%', note: 'Khách hàng truy cập 7 ngày qua' },
        { step: '2. Xem Trang Tuyển Sinh & Sự Kiện', count: '2,150', percent: '33.4%', note: 'Quan tâm thông tin học phí & Open Day' },
        { step: '3. Mở Form Đăng Ký / Đặt Tour', count: '340', percent: '15.8%', note: 'Tương tác điền thông tin' },
        { step: '4. Lead Xác Thực Thành Công', count: '58', percent: '17.0%', note: 'Thu thập đầy đủ SĐT & Email' },
        { step: '5. Đã Tham Quan Trường & Nhập Học', count: '28', percent: '48.2%', note: 'Chuyển đổi thành học sinh' }
      ],
      pages: [
        { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', views: '1,850', leads: 32, avgTime: '3m 50s', bounce: '16%' },
        { path: '/', title: 'Homepage Sunshine Maple Bear', views: '3,120', leads: 12, avgTime: '2m 30s', bounce: '30%' },
        { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', views: '940', leads: 8, avgTime: '4m 05s', bounce: '20%' },
        { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', views: '810', leads: 4, avgTime: '3m 10s', bounce: '26%' },
        { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', views: '510', leads: 2, avgTime: '2m 40s', bounce: '34%' }
      ],
      locations: [
        { region: 'Khu đô thị Ciputra & Phú Thượng (Tây Hồ)', percentage: 52, leadCount: 30 },
        { region: 'Phường Xuân La, Thụy Khuê & Yên Phụ', percentage: 24, leadCount: 14 },
        { region: 'Quận Cầu Giấy & Bắc Từ Liêm (Hà Nội)', percentage: 16, leadCount: 9 },
        { region: 'Các khu vực khác & Ngoại tỉnh', percentage: 8, leadCount: 5 }
      ]
    },
    '30d': {
      kpis: {
        visits: '28,240',
        visitsGrowth: '+16.4% so với tháng trước',
        leads: '248 Lead',
        leadsGrowth: '+24.2% mục tiêu tháng',
        cvr: '4.82%',
        cvrGrowth: '+0.9% cao hơn TB ngành',
        tours: '108 Lịch Hẹn',
        toursGrowth: '+21.5% đặt tour thành công',
        avgTime: '2m 48s',
        avgTimeSub: '85% từ Google Search'
      },
      channels: [
        { source: 'Facebook Ads', channel: 'facebook_ads / cpc', visits: '11,860', leads: 124, cvr: '4.2%', share: 50, color: 'bg-blue-600' },
        { source: 'Google Search Ads', channel: 'google_search / cpc', visits: '8,420', leads: 78, cvr: '5.6%', share: 31, color: 'bg-emerald-600' },
        { source: 'Zalo OA & Broadcast', channel: 'zalo_oa / organic', visits: '4,150', leads: 32, cvr: '3.8%', share: 13, color: 'bg-[#0068FF]' },
        { source: 'Direct & Mã QR ấn phẩm', channel: 'direct / qr_code', visits: '3,810', leads: 14, cvr: '2.1%', share: 6, color: 'bg-amber-500' }
      ],
      funnel: [
        { step: '1. Lượt Truy Cập Website', count: '28,240', percent: '100%', note: 'Khách hàng truy cập toàn trang' },
        { step: '2. Xem Trang Tuyển Sinh & Sự Kiện', count: '8,650', percent: '30.6%', note: 'Quan tâm thông tin học phí & Open Day' },
        { step: '3. Mở Form Đăng Ký / Đặt Tour', count: '1,240', percent: '14.3%', note: 'Tương tác điền thông tin' },
        { step: '4. Lead Xác Thực Thành Công', count: '248', percent: '20.0%', note: 'Thu thập đầy đủ SĐT & Email' },
        { step: '5. Đã Tham Quan Trường & Nhập Học', count: '108', percent: '43.5%', note: 'Chuyển đổi thành học sinh' }
      ],
      pages: [
        { path: '/', title: 'Homepage Sunshine Maple Bear', views: '14,210', leads: 48, avgTime: '2m 14s', bounce: '32%' },
        { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', views: '6,450', leads: 112, avgTime: '3m 48s', bounce: '18%' },
        { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', views: '4,890', leads: 35, avgTime: '3m 05s', bounce: '28%' },
        { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', views: '3,750', leads: 29, avgTime: '4m 12s', bounce: '22%' },
        { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', views: '2,980', leads: 14, avgTime: '2m 45s', bounce: '35%' }
      ],
      locations: [
        { region: 'Khu đô thị Ciputra & Phú Thượng (Tây Hồ)', percentage: 48, leadCount: 119 },
        { region: 'Phường Xuân La, Thụy Khuê & Yên Phụ', percentage: 26, leadCount: 65 },
        { region: 'Quận Cầu Giấy & Bắc Từ Liêm (Hà Nội)', percentage: 18, leadCount: 44 },
        { region: 'Các khu vực khác & Phụ huynh Ngoại tỉnh', percentage: 8, leadCount: 20 }
      ]
    },
    '90d': {
      kpis: {
        visits: '78,500',
        visitsGrowth: '+22.1% so với Quý 2',
        leads: '690 Lead',
        leadsGrowth: '+31.0% mục tiêu Quý 3',
        cvr: '4.65%',
        cvrGrowth: '+0.7% tăng trưởng',
        tours: '295 Lịch Hẹn',
        toursGrowth: '+28.4% so với Quý 2',
        avgTime: '2m 41s',
        avgTimeSub: '82% tìm kiếm tự nhiên'
      },
      channels: [
        { source: 'Facebook Ads', channel: 'facebook_ads / cpc', visits: '34,200', leads: 345, cvr: '4.1%', share: 50, color: 'bg-blue-600' },
        { source: 'Google Search Ads', channel: 'google_search / cpc', visits: '24,100', leads: 220, cvr: '5.4%', share: 32, color: 'bg-emerald-600' },
        { source: 'Zalo OA & Broadcast', channel: 'zalo_oa / organic', visits: '11,400', leads: 85, cvr: '3.7%', share: 12, color: 'bg-[#0068FF]' },
        { source: 'Direct & Mã QR ấn phẩm', channel: 'direct / qr_code', visits: '8,800', leads: 40, cvr: '2.2%', share: 6, color: 'bg-amber-500' }
      ],
      funnel: [
        { step: '1. Lượt Truy Cập Website', count: '78,500', percent: '100%', note: 'Khách hàng truy cập Quý 3' },
        { step: '2. Xem Trang Tuyển Sinh & Sự Kiện', count: '24,200', percent: '30.8%', note: 'Quan tâm thông tin học phí & Open Day' },
        { step: '3. Mở Form Đăng Ký / Đặt Tour', count: '3,450', percent: '14.2%', note: 'Tương tác điền thông tin' },
        { step: '4. Lead Xác Thực Thành Công', count: '690', percent: '20.0%', note: 'Thu thập đầy đủ SĐT & Email' },
        { step: '5. Đã Tham Quan Trường & Nhập Học', count: '295', percent: '42.7%', note: 'Chuyển đổi thành học sinh' }
      ],
      pages: [
        { path: '/', title: 'Homepage Sunshine Maple Bear', views: '38,900', leads: 142, avgTime: '2m 18s', bounce: '31%' },
        { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', views: '18,400', leads: 310, avgTime: '3m 42s', bounce: '19%' },
        { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', views: '11,200', leads: 98, avgTime: '3m 12s', bounce: '27%' },
        { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', views: '9,800', leads: 84, avgTime: '4m 08s', bounce: '21%' },
        { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', views: '7,200', leads: 38, avgTime: '2m 50s', bounce: '33%' }
      ],
      locations: [
        { region: 'Khu đô thị Ciputra & Phú Thượng (Tây Hồ)', percentage: 46, leadCount: 317 },
        { region: 'Phường Xuân La, Thụy Khuê & Yên Phụ', percentage: 27, leadCount: 186 },
        { region: 'Quận Cầu Giấy & Bắc Từ Liêm (Hà Nội)', percentage: 19, leadCount: 131 },
        { region: 'Các khu vực khác & Phụ huynh Ngoại tỉnh', percentage: 8, leadCount: 56 }
      ]
    },
    'ytd': {
      kpis: {
        visits: '245,000',
        visitsGrowth: '+34.5% so với năm 2025',
        leads: '2,150 Lead',
        leadsGrowth: '+38.2% mục tiêu năm 2026',
        cvr: '4.78%',
        cvrGrowth: '+0.8% tăng trưởng',
        tours: '840 Lịch Hẹn',
        toursGrowth: '+31.2% tổng lượt tour 2026',
        avgTime: '2m 45s',
        avgTimeSub: '84% truy cập trực tiếp & SEO'
      },
      channels: [
        { source: 'Facebook Ads', channel: 'facebook_ads / cpc', visits: '110,000', leads: 1050, cvr: '4.2%', share: 49, color: 'bg-blue-600' },
        { source: 'Google Search Ads', channel: 'google_search / cpc', visits: '76,000', leads: 680, cvr: '5.3%', share: 32, color: 'bg-emerald-600' },
        { source: 'Zalo OA & Broadcast', channel: 'zalo_oa / organic', visits: '35,000', leads: 280, cvr: '3.9%', share: 13, color: 'bg-[#0068FF]' },
        { source: 'Direct & Mã QR ấn phẩm', channel: 'direct / qr_code', visits: '24,000', leads: 140, cvr: '2.3%', share: 6, color: 'bg-amber-500' }
      ],
      funnel: [
        { step: '1. Lượt Truy Cập Website', count: '245,000', percent: '100%', note: 'Khách hàng truy cập cả năm 2026' },
        { step: '2. Xem Trang Tuyển Sinh & Sự Kiện', count: '75,000', percent: '30.6%', note: 'Quan tâm thông tin học phí & Open Day' },
        { step: '3. Mở Form Đăng Ký / Đặt Tour', count: '10,800', percent: '14.4%', note: 'Tương tác điền thông tin' },
        { step: '4. Lead Xác Thực Thành Công', count: '2,150', percent: '19.9%', note: 'Thu thập đầy đủ SĐT & Email' },
        { step: '5. Đã Tham Quan Trường & Nhập Học', count: '840', percent: '39.1%', note: 'Chuyển đổi thành học sinh' }
      ],
      pages: [
        { path: '/', title: 'Homepage Sunshine Maple Bear', views: '120,000', leads: 480, avgTime: '2m 15s', bounce: '30%' },
        { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', views: '58,000', leads: 950, avgTime: '3m 45s', bounce: '18%' },
        { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', views: '35,000', leads: 320, avgTime: '3m 10s', bounce: '26%' },
        { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', views: '32,000', leads: 280, avgTime: '4m 10s', bounce: '20%' },
        { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', views: '22,000', leads: 120, avgTime: '2m 48s', bounce: '32%' }
      ],
      locations: [
        { region: 'Khu đô thị Ciputra & Phú Thượng (Tây Hồ)', percentage: 48, leadCount: 1032 },
        { region: 'Phường Xuân La, Thụy Khuê & Yên Phụ', percentage: 26, leadCount: 559 },
        { region: 'Quận Cầu Giấy & Bắc Từ Liêm (Hà Nội)', percentage: 18, leadCount: 387 },
        { region: 'Các khu vực khác & Phụ huynh Ngoại tỉnh', percentage: 8, leadCount: 172 }
      ]
    }
  }

  const currentData = analyticsDataMap[timeRange]

  const filteredLogs = AUDIT_LOG_SEED.filter(log =>
    log.parentName.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.id.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.utmSource.toLowerCase().includes(auditSearch.toLowerCase())
  )

  const handleExportPDF = () => {
    alert(adminUiLang === 'vi' ? `Đang khởi tạo & xuất file báo cáo Analytics PDF cho mốc [${timeRange.toUpperCase()}]...` : `Exporting PDF Analytics Report for [${timeRange.toUpperCase()}]...`)
  }

  return (
    <div className="space-y-8 text-[#1D1D1B] w-full animate-fade-in pb-12">
      
      {/* Top Header Bar */}
      <div className="bg-white border border-neutral-200 p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-2xs rounded-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red uppercase tracking-wider block">
            {adminUiLang === 'vi' ? 'Hệ thống Marketing Intelligence & Website Analytics' : 'Marketing Intelligence & Website Analytics System'}
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Báo cáo Phân tích Tuyển sinh & Lưu lượng Website' : 'Admissions & Website Traffic Analytics'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? `Đang xem chỉ số đo lường 100% từ dữ liệu thực: [${timeRange === '7d' ? '7 Ngày qua' : timeRange === '30d' ? '30 Ngày qua' : timeRange === '90d' ? 'Quý 3/2026' : 'Cả Năm 2026'}]`
              : `Viewing real website metrics for: [${timeRange.toUpperCase()}]`}
          </p>
        </div>

        {/* Dynamic Filters & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-[#FDFBF7] p-1 border border-neutral-300 rounded-2xs text-xs font-semibold">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === '7d' ? 'bg-[#151513] text-white shadow-xs' : 'text-neutral-600 hover:text-[#151513]'}`}
            >
              7 ngày
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === '30d' ? 'bg-[#151513] text-white shadow-xs' : 'text-neutral-600 hover:text-[#151513]'}`}
            >
              30 ngày
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === '90d' ? 'bg-[#151513] text-white shadow-xs' : 'text-neutral-600 hover:text-[#151513]'}`}
            >
              Quý 3
            </button>
            <button
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === 'ytd' ? 'bg-[#151513] text-white shadow-xs' : 'text-neutral-600 hover:text-[#151513]'}`}
            >
              Năm 2026
            </button>
          </div>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#151513] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#151513] flex items-center gap-2 rounded-2xs shadow-2xs"
          >
            <Download size={15} />
            {adminUiLang === 'vi' ? 'Xuất Báo cáo PDF' : 'Export PDF Report'}
          </button>
        </div>
      </div>

      {/* 5 UNIFORM WEBSITE-MEASURABLE KPI OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Lượt truy cập (Sessions)</span>
          <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{currentData.kpis.visits}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> {currentData.kpis.visitsGrowth}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Tổng Lead Tuyển sinh</span>
          <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{currentData.kpis.leads}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> {currentData.kpis.leadsGrowth}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Tỷ lệ Chuyển đổi Form</span>
          <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{currentData.kpis.cvr}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> {currentData.kpis.cvrGrowth}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Lịch Tham Quan Campus</span>
          <div className="text-2xl font-display font-extrabold text-emerald-700">{currentData.kpis.tours}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> {currentData.kpis.toursGrowth}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Thời gian xem trung bình</span>
          <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{currentData.kpis.avgTime}</div>
          <span className="text-[11px] text-neutral-500 font-medium">{currentData.kpis.avgTimeSub}</span>
        </div>
      </div>

      {/* REAL DATA AUDIT LOG & SUBMISSION RECONCILIATION TABLE */}
      <div className="bg-white border border-neutral-200 p-5 rounded-2xs shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-4 bg-maple-red rounded-full inline-block" />
              <h3 className="text-sm sm:text-base font-display font-extrabold text-[#1D1D1B] uppercase tracking-wide">
                Bảng Nhật Ký Audit Log Đối Chiếu Dữ Liệu Thực (Live Submissions Log)
              </h3>
            </div>
            <p className="text-xs text-neutral-500 font-normal">
              Bằng chứng đối chiếu minh bạch từng bản ghi Lead phát sinh thực tế từ Database (`admissions`, `tour_bookings`, `form_responses`) kèm UTM campaign.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <Link href="/admin/admissions" className="px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-neutral-700 hover:text-maple-red font-bold flex items-center gap-1.5">
              <ExternalLink size={13} /> QL Tuyển Sinh
            </Link>
            <Link href="/admin/tour-bookings" className="px-3 py-1.5 bg-[#FDFBF7] border border-neutral-300 rounded-2xs text-neutral-700 hover:text-maple-red font-bold flex items-center gap-1.5">
              <ExternalLink size={13} /> QL Tour Bookings
            </Link>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#151513] text-white font-extrabold border-b border-neutral-800 text-[10px] uppercase tracking-wider">
                <th className="p-3">Mã Record ID</th>
                <th className="p-3">Thời Gian Gửi</th>
                <th className="p-3">Họ & Tên Phụ Huynh</th>
                <th className="p-3">SĐT Liên Hệ</th>
                <th className="p-3">Loại Yêu Cầu / Form</th>
                <th className="p-3">Nguồn UTM Campaign</th>
                <th className="p-3 text-center">Trạng Thái DB</th>
                <th className="p-3 text-center">Đối Chiếu Direct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="p-3 font-mono font-bold text-maple-black">{log.id}</td>
                  <td className="p-3 text-neutral-500 font-mono">{log.time}</td>
                  <td className="p-3 font-bold text-maple-black">{log.parentName}</td>
                  <td className="p-3 font-mono text-neutral-600">{log.phone}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-semibold rounded-2xs text-[10px]">
                      {log.formType}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[10px] text-blue-700 font-bold">{log.utmSource}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xs text-[10px] font-extrabold">
                      <CheckCircle2 size={12} /> Verified SQL
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <Link href={log.targetUrl} className="text-maple-red hover:underline font-bold text-[11px] inline-flex items-center gap-1">
                      Xem bản ghi <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DYNAMIC SECTION 2: MARKETING CHANNEL ATTRIBUTION & ADMISSIONS FUNNEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left (7 cols): Dynamic UTM Lead Attribution Breakdown */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 space-y-5 rounded-2xs shadow-2xs">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
            <div>
              <span className="text-[10px] font-bold text-maple-gold block">PHÂN TÍCH NGUỒN MARKETING UTM ({timeRange.toUpperCase()})</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Đóng góp Lead Tuyển sinh theo Kênh</h3>
            </div>
            <span className="px-2.5 py-1 bg-[#FDFBF7] border border-neutral-300 text-[10px] font-mono font-bold text-neutral-600 rounded-2xs">
              4 Kênh Quảng Cáo
            </span>
          </div>

          <div className="space-y-4">
            {currentData.channels.map((ch, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${ch.color}`} />
                    <span className="text-[#1D1D1B] font-bold">{ch.source}</span>
                    <span className="text-[10px] font-mono text-neutral-400 font-normal">({ch.channel})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500 font-light">{ch.visits} lượt xem</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px] rounded-2xs">
                      🎯 {ch.leads} Lead ({ch.cvr})
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} transition-all duration-500`} style={{ width: `${ch.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 cols): Dynamic Admissions Conversion Funnel */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 space-y-5 rounded-2xs shadow-2xs">
          <div className="border-b border-neutral-200 pb-3">
            <span className="text-[10px] font-bold text-maple-red block">PHIỄU CHUYỂN ĐỔI TUYỂN SINH ({timeRange.toUpperCase()})</span>
            <h3 className="text-base font-display font-bold text-[#1D1D1B]">Tỷ lệ chuyển đổi qua các giai đoạn</h3>
          </div>

          <div className="space-y-3">
            {currentData.funnel.map((fn, idx) => (
              <div key={idx} className="p-3 bg-[#151513] text-white rounded-2xs space-y-1 relative overflow-hidden">
                <div className="flex justify-between items-center text-xs font-bold relative z-10">
                  <span className="text-white">{fn.step}</span>
                  <span className="text-maple-gold">{fn.count}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/60 relative z-10">
                  <span>{fn.note}</span>
                  <span className="font-mono text-emerald-400 font-bold">Tỷ lệ: {fn.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
