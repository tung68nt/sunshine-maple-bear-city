'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SCHOOL_INFO, SCHOOL_IMAGES } from '@/lib/constants'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createBrowserSupabaseClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(), password,
      })
      if (signInError) {
        setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.')
        return
      }
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Không thể kết nối dịch vụ đăng nhập. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] relative p-4 sm:p-6 overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-maple-red/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-maple-gold/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="bg-white rounded-2xs border border-neutral-200 shadow-sm overflow-hidden">
          
          {/* Header Banner */}
          <div className="p-8 text-center bg-[#151513] relative overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <Image src={SCHOOL_IMAGES.render.thuVien6} alt="" fill className="object-cover" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="relative w-12 h-12 mx-auto">
                <Image src="/logo.png" alt="Sunshine Maple Bear Logo" fill className="object-contain" priority />
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-display font-extrabold text-white uppercase tracking-tight leading-tight">
                  {SCHOOL_INFO.NAME}
                </h1>
                <span className="text-[10px] font-bold text-maple-gold uppercase tracking-widest block mt-1">
                  HỆ THỐNG QUẢN TRỊ NỘI BỘ CMS v2.6
                </span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xs text-xs border border-red-200 text-center font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                    <label htmlFor="admin-email" className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
                  Email Quản Trị Viên *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                      <input
                        id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black"
                    placeholder="admin@sunshinemaplebear.edu.vn"
                  />
                </div>
              </div>

              <div>
                    <label htmlFor="admin-password" className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">
                  Mật Khẩu *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                      <input
                        id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-2xs focus:outline-none focus:border-maple-red text-xs font-bold text-maple-black"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-maple-red text-white font-extrabold rounded-2xs hover:bg-red-700 transition-all text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Đăng Nhập CMS <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-end">
              <Link href="/" className="text-[11px] font-bold text-neutral-500 hover:text-maple-red">
                Trang chủ
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-neutral-500 font-medium">
          © {new Date().getFullYear()} Sunshine Maple Bear International Kindergarten. All rights reserved.
        </p>
      </div>
    </div>
  )
}
