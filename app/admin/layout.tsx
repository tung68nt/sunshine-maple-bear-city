'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  Layers,
  Settings,
  UserCheck,
  CalendarCheck,
  BarChart3,
  LogOut,
  Menu,
  ShieldCheck,
  ExternalLink,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ClipboardList,
  Link2,
  Lock
} from 'lucide-react'

export type AdminRole = 'admin' | 'principal' | 'admissions' | 'marketing' | 'teacher'

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  admin: [
    '/admin',
    '/admin/blog',
    '/admin/gallery',
    '/admin/staff',
    '/admin/pages',
    '/admin/navigation',
    '/admin/events',
    '/admin/forms',
    '/admin/utm-builder',
    '/admin/admissions',
    '/admin/tour-bookings',
    '/admin/analytics',
    '/admin/users',
    '/admin/settings'
  ],
  principal: [
    '/admin',
    '/admin/blog',
    '/admin/staff',
    '/admin/events',
    '/admin/admissions',
    '/admin/tour-bookings',
    '/admin/analytics',
    '/admin/users'
  ],
  admissions: [
    '/admin',
    '/admin/admissions',
    '/admin/tour-bookings',
    '/admin/events',
    '/admin/forms',
    '/admin/utm-builder',
    '/admin/analytics'
  ],
  marketing: [
    '/admin',
    '/admin/blog',
    '/admin/gallery',
    '/admin/staff',
    '/admin/pages',
    '/admin/navigation',
    '/admin/events',
    '/admin/forms',
    '/admin/utm-builder',
    '/admin/announcements',
    '/admin/analytics'
  ],
  teacher: [
    '/admin',
    '/admin/blog',
    '/admin/gallery',
    '/admin/events'
  ]
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentRole, setCurrentRole] = useState<AdminRole>('admin')
  const [adminLang, setAdminLang] = useState<'vi' | 'en'>('vi')
  const [isNotiOpen, setIsNotiOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)

  useEffect(() => {
    const savedLang = localStorage.getItem('smb_admin_ui_lang') as 'vi' | 'en'
    if (savedLang === 'en' || savedLang === 'vi') setAdminLang(savedLang)

    const savedRole = localStorage.getItem('smb_admin_active_role') as AdminRole
    if (savedRole && ROLE_PERMISSIONS[savedRole]) {
      setCurrentRole(savedRole)
    }
  }, [])

  const handleSetRole = (role: AdminRole) => {
    setCurrentRole(role)
    localStorage.setItem('smb_admin_active_role', role)
  }

  const handleSetLang = (lang: 'vi' | 'en') => {
    setAdminLang(lang)
    localStorage.setItem('smb_admin_ui_lang', lang)
    window.dispatchEvent(new CustomEvent('smbAdminUiLangChange', { detail: lang }))
  }

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Campus Tour Booking',
      desc: 'Nguyễn Văn Nam booked a tour for 12/08/2026 at 09:30 AM.',
      time: '10 mins ago',
      type: 'TOUR',
      read: false,
      href: '/admin/tour-bookings'
    },
    {
      id: '2',
      title: 'New Admissions Enquiry',
      desc: 'Đỗ Đức Mạnh submitted an enquiry for Canadian Kindergarten.',
      time: '35 mins ago',
      type: 'ADMISSION',
      read: false,
      href: '/admin/admissions'
    },
    {
      id: '3',
      title: 'GA4 Analytics Monthly Report',
      desc: 'System generated monthly traffic & conversion analytics report.',
      time: '2 hours ago',
      type: 'SYSTEM',
      read: false,
      href: '/admin/analytics'
    }
  ])

  const notiRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(e.target as Node)) {
        setIsNotiOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const handleNotificationClick = (id: string, href: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
    setUnreadCount(prev => Math.max(0, prev - 1))
    setIsNotiOpen(false)
    router.push(href)
  }

  const allowedRoutes = ROLE_PERMISSIONS[currentRole] || ROLE_PERMISSIONS.admin

  const fullNavSections = [
    {
      group: adminLang === 'vi' ? 'Quản lý Nội dung CMS' : 'CMS Content',
      items: [
        { label: adminLang === 'vi' ? 'Tổng quan Dashboard' : 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: adminLang === 'vi' ? 'Bài viết & Tin tức' : 'Blog & Articles', href: '/admin/blog', icon: FileText },
        { label: adminLang === 'vi' ? 'Thư viện Hình ảnh' : 'Media & Gallery', href: '/admin/gallery', icon: ImageIcon },
        { label: adminLang === 'vi' ? 'Đội ngũ Giáo viên' : 'Staff & Educators', href: '/admin/staff', icon: Users },
        { label: adminLang === 'vi' ? 'Quản lý Trang tĩnh' : 'Static Pages CMS', href: '/admin/pages', icon: Layers },
        { label: adminLang === 'vi' ? 'Cấu hình Menu Navbar' : 'Navbar Menu Builder', href: '/admin/navigation', icon: Menu },
      ]
    },
    {
      group: adminLang === 'vi' ? 'Marketing & Sự kiện' : 'Marketing & Events',
      items: [
        { label: adminLang === 'vi' ? 'Sự kiện Trường' : 'School Events', href: '/admin/events', icon: Calendar },
        { label: adminLang === 'vi' ? 'Dựng Form Động' : 'Form Builder Engine', href: '/admin/forms', icon: ClipboardList },
        { label: adminLang === 'vi' ? 'Tạo Link UTM Campaign' : 'UTM Link Generator', href: '/admin/utm-builder', icon: Link2 },
      ]
    },
    {
      group: adminLang === 'vi' ? 'Vận hành & Tuyển sinh' : 'Operations & Enquiries',
      items: [
        { label: adminLang === 'vi' ? 'Hồ sơ Tuyển sinh' : 'Admissions Enquiries', href: '/admin/admissions', icon: UserCheck },
        { label: adminLang === 'vi' ? 'Đặt lịch Tham quan' : 'Tour Bookings', href: '/admin/tour-bookings', icon: CalendarCheck },
        { label: adminLang === 'vi' ? 'Báo cáo & Phân tích' : 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
        { label: adminLang === 'vi' ? 'Phân quyền & User CMS' : 'CMS Users & Roles', href: '/admin/users', icon: ShieldCheck },
        { label: adminLang === 'vi' ? 'Cấu hình Hệ thống' : 'General Settings', href: '/admin/settings', icon: Settings },
      ]
    }
  ]

  // Filter sections by role permissions
  const filteredNavSections = fullNavSections.map(sec => ({
    ...sec,
    items: sec.items.filter(item => allowedRoutes.includes(item.href))
  })).filter(sec => sec.items.length > 0)

  const roleBadges: Record<AdminRole, { label: string; color: string }> = {
    admin: { label: adminLang === 'vi' ? 'Super Admin' : 'Super Admin', color: 'bg-maple-red text-white' },
    principal: { label: adminLang === 'vi' ? 'Ban Giám Hiệu' : 'Academic Principal', color: 'bg-amber-600 text-white' },
    admissions: { label: adminLang === 'vi' ? 'Phòng Tuyển Sinh' : 'Admissions Team', color: 'bg-blue-600 text-white' },
    marketing: { label: adminLang === 'vi' ? 'Phòng Marketing' : 'Marketing Team', color: 'bg-purple-600 text-white' },
    teacher: { label: adminLang === 'vi' ? 'Tổ Giáo Viên' : 'Educators Team', color: 'bg-emerald-600 text-white' },
  }

  // Check if current route is allowed for the active role
  const isRouteAllowed = allowedRoutes.some(r => pathname === r || pathname.startsWith(`${r}/`))

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-[#1D1D1B] font-body overflow-hidden relative">
      
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-20 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-[#151513] text-white transition-all duration-300 flex flex-col border-r border-neutral-800 z-30`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-3 border-b border-neutral-800 flex items-center justify-between relative">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2.5 min-w-0 pr-6">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image src="/logo.png" alt="Sunshine Maple Bear Logo" fill className="object-contain" priority />
              </div>
              <div className="min-w-0">
                <span className="font-display font-extrabold text-xs text-white block truncate leading-none">
                  Maple Bear CMS
                </span>
                <span className="text-[9px] text-neutral-400 font-mono block mt-0.5">
                  Sunshine City v2.6
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors border border-neutral-700 rounded-2xs"
                title="Collapse Sidebar"
              >
                <ChevronLeft size={14} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center w-full py-1">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800 rounded-2xs"
                title="Expand Sidebar"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Role Selector Badge (RBAC Dynamic Role Switcher) */}
        {isSidebarOpen && (
          <div className="p-3 bg-neutral-900/80 border-b border-neutral-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-neutral-300 flex items-center gap-1">
                <ShieldCheck size={12} className="text-maple-gold" />
                Active RBAC Role:
              </span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-2xs whitespace-nowrap ${roleBadges[currentRole].color}`}>
                {roleBadges[currentRole].label}
              </span>
            </div>
            <select
              value={currentRole}
              onChange={(e) => handleSetRole(e.target.value as AdminRole)}
              className="w-full bg-[#151513] border border-neutral-700 text-xs text-white p-1.5 focus:outline-none focus:border-maple-red font-bold rounded-2xs cursor-pointer"
            >
              <option value="admin">Super Admin (Chủ Đầu Tư / Full Access)</option>
              <option value="principal">Ban Giám Hiệu (BGH / Academic Principal)</option>
              <option value="admissions">Phòng Tuyển Sinh (Admissions & Enrollment)</option>
              <option value="marketing">Phòng Marketing & Truyền Thông (MarCom)</option>
              <option value="teacher">Tổ Giáo Viên & Chuyên Gia (Educators)</option>
            </select>
          </div>
        )}

        {/* Navigation items (Filtered dynamically by RBAC role) */}
        <nav className={`flex-1 ${isSidebarOpen ? 'p-2.5' : 'py-2 px-0'} space-y-4 overflow-y-auto`}>
          {filteredNavSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {isSidebarOpen && (
                <span className="px-3 text-[10px] font-semibold text-neutral-400 block mb-1 pt-1.5">
                  {sec.group}
                </span>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center ${
                      isSidebarOpen ? 'gap-2.5 px-3 py-2 text-xs font-bold' : 'justify-center py-2.5 w-full'
                    } transition-all ${
                      isActive
                        ? 'bg-maple-red text-white'
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-maple-gold" />
                    )}
                    <Icon size={18} className={isActive ? 'text-white' : 'text-neutral-400'} />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Action */}
        <div className="p-2.5 border-t border-neutral-800 space-y-1.5">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center ${
              isSidebarOpen ? 'justify-start gap-2 px-3' : 'justify-center'
            } w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-colors border border-neutral-800 rounded-2xs`}
            title="View Public Site"
          >
            <ExternalLink size={16} />
            {isSidebarOpen && <span>View Public Site</span>}
          </Link>
          <button
            onClick={() => {
              document.cookie = 'smb_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
              localStorage.removeItem('smb_admin_session')
              window.location.href = '/login'
            }}
            className={`flex items-center ${
              isSidebarOpen ? 'justify-start gap-2 px-3' : 'justify-center'
            } w-full py-2 bg-neutral-900 hover:bg-red-950 text-red-400 text-xs font-bold transition-colors border border-neutral-800 rounded-2xs`}
            title="Log Out"
          >
            <LogOut size={16} />
            {isSidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* CMS Top Header Bar */}
        <header className="bg-white border-b border-neutral-200 px-5 py-2.5 flex items-center justify-between z-20 relative shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 border border-neutral-300 bg-[#FDFBF7] hover:bg-[#1D1D1B] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
              title={isSidebarOpen ? "Collapse CMS Sidebar" : "Expand CMS Sidebar"}
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              <span className="hidden sm:inline">
                {isSidebarOpen
                  ? (adminLang === 'vi' ? 'Thu Gọn Sidebar' : 'Collapse Sidebar')
                  : (adminLang === 'vi' ? 'Mở Sidebar' : 'Expand Sidebar')}
              </span>
            </button>

            <div>
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase tracking-wider">
                Management System
              </span>
              <h1 className="text-sm font-display font-bold text-[#1D1D1B] flex items-center gap-2">
                <span>Sunshine Maple Bear Operations Portal</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#FDFBF7] border border-neutral-300 p-0.5 rounded-2xs text-xs font-semibold">
              <button
                onClick={() => handleSetLang('vi')}
                className={`px-2 py-1 flex items-center gap-1 transition-colors ${
                  adminLang === 'vi' ? 'bg-[#1D1D1B] text-white shadow-2xs' : 'text-neutral-600 hover:text-[#1D1D1B]'
                }`}
              >
                <span>🇻🇳</span>
                <span>VI</span>
              </button>
              <button
                onClick={() => handleSetLang('en')}
                className={`px-2 py-1 flex items-center gap-1 transition-colors ${
                  adminLang === 'en' ? 'bg-[#1D1D1B] text-white shadow-2xs' : 'text-neutral-600 hover:text-[#1D1D1B]'
                }`}
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Notifications Popover */}
            <div className="relative" ref={notiRef}>
              <button
                onClick={() => setIsNotiOpen(!isNotiOpen)}
                className="relative w-9 h-9 flex items-center justify-center bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#1D1D1B] transition-all border border-neutral-300 rounded-2xs shadow-2xs"
                title="Notifications"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-maple-red text-white text-[10px] font-extrabold flex items-center justify-center rounded-full border-2 border-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotiOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 rounded-2xs">
                  <div className="p-3 bg-[#151513] text-white flex items-center justify-between border-b border-neutral-800">
                    <div className="flex items-center gap-1.5">
                      <Bell size={14} className="text-maple-gold" />
                      <span className="text-xs font-bold">Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] text-maple-gold hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 size={12} /> Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n.id, n.href)}
                        className={`p-3 hover:bg-neutral-50 cursor-pointer transition-colors ${
                          !n.read ? 'bg-amber-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#1D1D1B]">{n.title}</h4>
                          <span className="text-[9px] text-neutral-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-maple-red text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                SM
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-[#1D1D1B] block leading-none">
                  {adminLang === 'vi' ? 'Giám đốc Tuyển sinh' : 'Admissions Director'}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">
                  admin@sunshinemaplebear.edu.vn
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Stage Container / RBAC Access Guard */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#FDFBF7]">
          <div className="max-w-[1600px] mx-auto">
            {isRouteAllowed ? (
              children
            ) : (
              /* RBAC 403 Access Denied Guard View */
              <div className="bg-white border border-neutral-300 p-8 md:p-12 text-center space-y-5 rounded-2xs shadow-sm max-w-xl mx-auto my-12">
                <div className="w-16 h-16 bg-red-100 text-maple-red rounded-full flex items-center justify-center mx-auto">
                  <Lock size={32} />
                </div>
                <div className="space-y-2">
                  <span className="px-2.5 py-1 bg-red-100 text-maple-red border border-red-200 text-[10px] font-bold uppercase tracking-wider rounded-2xs">
                    403 ACCESS RESTRICTED BY RBAC ROLE
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#1D1D1B]">
                    {adminLang === 'vi' ? 'Quyền Hạn Không Đủ Để Truy Cập Trang Này' : 'Access Restricted For Your Role'}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-md mx-auto">
                    {adminLang === 'vi'
                      ? `Vai trò hiện tại của bạn là (${roleBadges[currentRole].label}) không có quyền thao tác trên tính năng này. Hãy chuyển sang vai trò Super Admin để truy cập đầy đủ.`
                      : `Your current active role (${roleBadges[currentRole].label}) is not authorized to access this section.`}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => handleSetRole('admin')}
                    className="px-5 py-2.5 bg-maple-red hover:bg-red-700 text-white text-xs font-semibold rounded-2xs shadow-2xs transition-all"
                  >
                    Chuyển sang vai trò Super Admin
                  </button>

                  <Link
                    href="/admin"
                    className="px-5 py-2.5 bg-[#1D1D1B] hover:bg-neutral-800 text-white text-xs font-semibold rounded-2xs shadow-2xs transition-all"
                  >
                    Quay lại Dashboard Tổng quan
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="py-2.5 px-6 border-t border-neutral-200 bg-white text-center text-[11px] text-neutral-500 font-medium flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>© 2026 Sunshine Maple Bear International School. All rights reserved.</div>
          <div>
            <span>Thiết kế & Phát triển bởi </span>
            <a
              href="https://tulie.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maple-red hover:underline font-bold"
            >
              Tulie Agency
            </a>
          </div>
        </footer>

      </div>

    </div>
  )
}
