'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LogOut, Menu, X, LayoutDashboard, Users, FileText, Calendar, Image as ImageIcon, Settings } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()

  const adminMenuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Admissions', href: '/admin/admissions', icon: Users },
    { label: 'Tour Bookings', href: '/admin/tour-bookings', icon: Calendar },
    { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-neutral-light-gray">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[var(--color-dark)] text-white transition-all duration-300 flex flex-col border-r border-neutral-medium-gray`}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h2 className="text-lg font-bold">Admin Panel</h2>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {adminMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group"
                title={!isSidebarOpen ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="text-sm font-medium group-hover:text-maple-gold transition-colors">
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-red-400 hover:text-red-300"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
