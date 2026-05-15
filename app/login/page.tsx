'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { Lock, Mail, ArrowRight } from 'lucide-react'

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.session) {
        router.push('/admin')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError('Login failed. Please check your email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light-gray relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-maple-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-maple-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-white rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-neutral-100 overflow-hidden">
          <div className="p-10 text-center bg-[var(--color-dark)] relative">
            <div className="absolute inset-0 opacity-20">
              <Image src={SCHOOL_IMAGES.render.thuVien6} alt="Background" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-display font-bold text-white mb-2">Maple Bear</h1>
              <p className="text-white/60 text-sm font-light uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all text-sm font-medium"
                    placeholder="admin@sunshinemaplebear.edu.vn"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-maple-red/20 focus:border-maple-red transition-all text-sm font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-maple-red/20 flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-8">
          © {new Date().getFullYear()} Sunshine Maple Bear. All rights reserved.
        </p>
      </div>
    </div>
  )
}
