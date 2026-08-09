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
  Compass
} from 'lucide-react'

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d')
  const [adminUiLang, setAdminUiLang] = useState<'vi' | 'en'>('vi')

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
        cpl: '138.000đ',
        cplGrowth: '-15.0% tối ưu ngân sách',
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
        cpl: '145.000đ',
        cplGrowth: '-12.5% tiết kiệm ngân sách',
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
        cpl: '152.000đ',
        cplGrowth: '-10.2% tối ưu chi phí',
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
        { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', views: '11,200', leads: 115, avgTime: '4m 08s', bounce: '21%' },
        { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', views: '9,800', leads: 78, avgTime: '3m 02s', bounce: '27%' },
        { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', views: '6,200', leads: 45, avgTime: '2m 42s', bounce: '33%' }
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
        visitsGrowth: '+35.4% so với năm 2025',
        leads: '2,180 Lead',
        leadsGrowth: '+42.0% mục tiêu năm 2026',
        cvr: '4.55%',
        cvrGrowth: '+1.1% tăng trưởng năm',
        cpl: '150.000đ',
        cplGrowth: '-14.0% tối ưu chi phí năm',
        avgTime: '2m 35s',
        avgTimeSub: '80% tìm kiếm tự nhiên'
      },
      channels: [
        { source: 'Facebook Ads', channel: 'facebook_ads / cpc', visits: '110,000', leads: 1080, cvr: '4.0%', share: 49, color: 'bg-blue-600' },
        { source: 'Google Search Ads', channel: 'google_search / cpc', visits: '76,000', leads: 690, cvr: '5.3%', share: 32, color: 'bg-emerald-600' },
        { source: 'Zalo OA & Broadcast', channel: 'zalo_oa / organic', visits: '35,000', leads: 270, cvr: '3.6%', share: 12, color: 'bg-[#0068FF]' },
        { source: 'Direct & Mã QR ấn phẩm', channel: 'direct / qr_code', visits: '24,000', leads: 140, cvr: '2.1%', share: 7, color: 'bg-amber-500' }
      ],
      funnel: [
        { step: '1. Lượt Truy Cập Website', count: '245,000', percent: '100%', note: 'Khách hàng truy cập toàn năm 2026' },
        { step: '2. Xem Trang Tuyển Sinh & Sự Kiện', count: '76,000', percent: '31.0%', note: 'Quan tâm thông tin học phí & Open Day' },
        { step: '3. Mở Form Đăng Ký / Đặt Tour', count: '10,800', percent: '14.2%', note: 'Tương tác điền thông tin' },
        { step: '4. Lead Xác Thực Thành Công', count: '2,180', percent: '20.1%', note: 'Thu thập đầy đủ SĐT & Email' },
        { step: '5. Đã Tham Quan Trường & Nhập Học', count: '940', percent: '43.1%', note: 'Chuyển đổi thành học sinh' }
      ],
      pages: [
        { path: '/', title: 'Homepage Sunshine Maple Bear', views: '120,000', leads: 480, avgTime: '2m 15s', bounce: '30%' },
        { path: '/events/open-day-aug-2026', title: 'Landing Page: Open Day Mùa Thu 2026', views: '54,000', leads: 910, avgTime: '3m 40s', bounce: '18%' },
        { path: '/admissions/tuition', title: 'Biểu Phí Học Phí & Ưu Đãi Founding Families', views: '38,000', leads: 390, avgTime: '4m 05s', bounce: '20%' },
        { path: '/academics/age-groups', title: 'Chương Trình Mầm Non Canada 12M-5Y', views: '21,000', leads: 240, avgTime: '3m 00s', bounce: '25%' },
        { path: '/about/why-maple-bear', title: 'Tại sao chọn Sunshine Maple Bear', views: '12,000', leads: 160, avgTime: '2m 38s', bounce: '32%' }
      ],
      locations: [
        { region: 'Khu đô thị Ciputra & Phú Thượng (Tây Hồ)', percentage: 47, leadCount: 1024 },
        { region: 'Phường Xuân La, Thụy Khuê & Yên Phụ', percentage: 26, leadCount: 566 },
        { region: 'Quận Cầu Giấy & Bắc Từ Liêm (Hà Nội)', percentage: 19, leadCount: 414 },
        { region: 'Các khu vực khác & Phụ huynh Ngoại tỉnh', percentage: 8, leadCount: 176 }
      ]
    }
  }

  const currentData = analyticsDataMap[timeRange]

  const handleExportPDF = () => {
    alert(adminUiLang === 'vi' ? `Đang khởi tạo & xuất file báo cáo Analytics PDF cho mốc [${timeRange.toUpperCase()}]...` : `Exporting PDF Analytics Report for [${timeRange.toUpperCase()}]...`)
  }

  return (
    <div className="space-y-8 text-[#1D1D1B] w-full animate-fade-in">
      
      {/* Top Header Bar */}
      <div className="bg-white border border-neutral-200 p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] font-semibold text-maple-red uppercase tracking-wider block">
            {adminUiLang === 'vi' ? 'Hệ thống Marketing Intelligence & Analytics' : 'Marketing Intelligence & Analytics System'}
          </span>
          <h2 className="text-xl font-display font-bold text-[#1D1D1B]">
            {adminUiLang === 'vi' ? 'Báo cáo Phân tích Tuyển sinh & Lưu lượng Website' : 'Admissions & Website Traffic Analytics'}
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            {adminUiLang === 'vi'
              ? `Đang xem số liệu báo cáo mốc thời gian: [${timeRange === '7d' ? '7 Ngày qua' : timeRange === '30d' ? '30 Ngày qua' : timeRange === '90d' ? 'Quý 3/2026' : 'Cả Năm 2026'}]`
              : `Viewing real-time analytics data for: [${timeRange.toUpperCase()}]`}
          </p>
        </div>

        {/* Dynamic Filters & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-[#FDFBF7] p-1 border border-neutral-300 rounded-2xs text-xs font-semibold">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === '7d' ? 'bg-[#1D1D1B] text-white shadow-xs' : 'text-neutral-600 hover:text-[#1D1D1B]'}`}
            >
              7 ngày
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === '30d' ? 'bg-[#1D1D1B] text-white shadow-xs' : 'text-neutral-600 hover:text-[#1D1D1B]'}`}
            >
              30 ngày
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === '90d' ? 'bg-[#1D1D1B] text-white shadow-xs' : 'text-neutral-600 hover:text-[#1D1D1B]'}`}
            >
              Quý 3
            </button>
            <button
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1 rounded-2xs transition-all ${timeRange === 'ytd' ? 'bg-[#1D1D1B] text-white shadow-xs' : 'text-neutral-600 hover:text-[#1D1D1B]'}`}
            >
              Năm 2026
            </button>
          </div>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#1D1D1B] hover:bg-maple-red text-white text-xs font-semibold transition-colors border border-[#1D1D1B] flex items-center gap-2 rounded-2xs shadow-2xs"
          >
            <Download size={15} />
            {adminUiLang === 'vi' ? 'Xuất Báo cáo PDF' : 'Export PDF Report'}
          </button>
        </div>
      </div>

      {/* 5 DYNAMIC KPI OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Lượt truy cập (Sessions)</span>
          <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{currentData.kpis.visits}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> {currentData.kpis.visitsGrowth}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs border-l-4 border-l-maple-red">
          <span className="text-[10px] font-bold text-maple-red uppercase tracking-wider block">Tổng Lead Tuyển sinh</span>
          <div className="text-2xl font-display font-extrabold text-maple-red">{currentData.kpis.leads}</div>
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
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Chi phí / Lead (CPL)</span>
          <div className="text-2xl font-display font-extrabold text-emerald-700">{currentData.kpis.cpl}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> {currentData.kpis.cplGrowth}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-4 space-y-2 rounded-2xs shadow-2xs">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Thời gian xem trung bình</span>
          <div className="text-2xl font-display font-extrabold text-[#1D1D1B]">{currentData.kpis.avgTime}</div>
          <span className="text-[11px] text-neutral-500 font-medium">{currentData.kpis.avgTimeSub}</span>
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
              <div key={idx} className="p-3.5 bg-[#FDFBF7] border border-neutral-200 space-y-2 rounded-2xs">
                <div className="flex justify-between items-center text-xs font-bold text-[#1D1D1B]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${ch.color}`} />
                    <span>{ch.source}</span>
                    <span className="text-[10px] font-mono text-neutral-400 font-normal">({ch.channel})</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-neutral-500">{ch.visits} lượt xem</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded-2xs">
                      🎯 {ch.leads} Lead ({ch.cvr})
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} transition-all duration-500`} style={{ width: `${ch.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 cols): Dynamic Admissions Conversion Funnel */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 space-y-5 rounded-2xs shadow-2xs">
          <div className="border-b border-neutral-200 pb-3">
            <span className="text-[10px] font-bold text-maple-gold block">PHỄU CHUYỂN ĐỔI TUYỂN SINH ({timeRange.toUpperCase()})</span>
            <h3 className="text-base font-display font-bold text-[#1D1D1B]">Tỷ lệ chuyển đổi qua các giai đoạn</h3>
          </div>

          <div className="space-y-3">
            {currentData.funnel.map((fStep, idx) => (
              <div key={idx} className="p-3 bg-[#151513] text-white border border-neutral-800 rounded-2xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{fStep.step}</span>
                  <span className="text-xs font-mono font-bold text-maple-gold">{fStep.count}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-neutral-400">
                  <span>{fStep.note}</span>
                  <span className="font-mono text-emerald-400 font-bold">Tỷ lệ: {fStep.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DYNAMIC SECTION 3: GEOGRAPHIC LOCATION & DEVICE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left (6 cols): Dynamic Geographic Location Distribution */}
        <div className="lg:col-span-6 bg-white border border-neutral-200 p-5 space-y-4 rounded-2xs shadow-2xs">
          <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-maple-gold block">BẢN ĐỒ VỊ TRÍ ĐỊA LÝ PHỤ HUYNH</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Khu vực địa bàn sinh sống của Phụ huynh</h3>
            </div>
            <MapPin size={18} className="text-maple-red" />
          </div>

          <div className="space-y-3">
            {currentData.locations.map((loc, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#1D1D1B]">
                  <span>{loc.region}</span>
                  <span className="font-mono font-bold text-maple-red">{loc.leadCount} Leads ({loc.percentage}%)</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-maple-red h-full rounded-full" style={{ width: `${loc.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (6 cols): Device & Browser Intelligence */}
        <div className="lg:col-span-6 bg-white border border-neutral-200 p-5 space-y-4 rounded-2xs shadow-2xs">
          <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-maple-gold block">THIẾT BỊ & NỀN TẢNG TRUY CẬP</span>
              <h3 className="text-base font-display font-bold text-[#1D1D1B]">Phân tích thiết bị Phụ huynh hay dùng</h3>
            </div>
            <Smartphone size={18} className="text-blue-600" />
          </div>

          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                <Smartphone size={13} /> Mobile Smartphone
              </span>
              <div className="text-xl font-display font-extrabold text-[#1D1D1B]">68%</div>
              <span className="text-[10px] text-neutral-400 block">iPhone (45%), Android (23%)</span>
            </div>

            <div className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                <Monitor size={13} /> Desktop / Laptop
              </span>
              <div className="text-xl font-display font-extrabold text-[#1D1D1B]">28%</div>
              <span className="text-[10px] text-neutral-400 block">macOS (18%), Windows (10%)</span>
            </div>

            <div className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                <Share2 size={13} /> Zalo / App Webview
              </span>
              <div className="text-xl font-display font-extrabold text-blue-600">34%</div>
              <span className="text-[10px] text-neutral-400 block">Truy cập từ Link Zalo/FB Ads</span>
            </div>

            <div className="p-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                <Compass size={13} /> Tablet / iPad
              </span>
              <div className="text-xl font-display font-extrabold text-[#1D1D1B]">4%</div>
              <span className="text-[10px] text-neutral-400 block">iPad Air & Galaxy Tab</span>
            </div>
          </div>
        </div>

      </div>

      {/* DYNAMIC SECTION 4: TOP PERFORMING PAGES TABLE */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4 rounded-2xs shadow-2xs">
        <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-[10px] font-bold text-maple-gold block">CHI TIẾT LƯỢT XEM THEO TRANG ({timeRange.toUpperCase()})</span>
            <h3 className="text-base font-display font-bold text-[#1D1D1B]">Các trang Landing Page & Bài viết có hiệu suất cao nhất</h3>
          </div>
          <span className="text-xs font-mono text-neutral-500">Cập nhật lúc: 19:32:00 (Real-time)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-neutral-200 text-neutral-600 font-semibold">
                <th className="py-2.5 px-4">Đường dẫn URL</th>
                <th className="py-2.5 px-4">Tiêu đề trang</th>
                <th className="py-2.5 px-4 text-center">Lượt xem (Views)</th>
                <th className="py-2.5 px-4 text-center">Lead Chuyển đổi</th>
                <th className="py-2.5 px-4 text-center">Thời gian trung bình</th>
                <th className="py-2.5 px-4 text-right">Tỷ lệ Thoát (Bounce)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-[#1D1D1B]">
              {currentData.pages.map((tp, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-maple-red">{tp.path}</td>
                  <td className="py-3 px-4 font-bold">{tp.title}</td>
                  <td className="py-3 px-4 font-mono font-bold text-center">{tp.views}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-mono font-bold rounded-2xs inline-block">
                      🎯 {tp.leads} Leads
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-neutral-600 text-center">{tp.avgTime}</td>
                  <td className="py-3 px-4 font-mono text-neutral-500 text-right">{tp.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
