'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { X, Gift, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function ExitIntentPopup() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show popup if mouse moves to the top of the window (closing tab, switching tab)
      // and popup hasn't been shown yet
      if (e.clientY <= 0 || e.clientY < 5) {
        const hasShownPopup = localStorage.getItem('smb_fomo_shown')
        if (!hasShownPopup) {
          setIsVisible(true)
          localStorage.setItem('smb_fomo_shown', 'true')
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsVisible(false)}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-black/50 hover:bg-black/20 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-auto relative hidden md:block">
          <Image
            src="/images/render/LOP_HOC_DIEN_HINH_1_.jpg"
            alt="Sunshine Maple Bear Students"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90 md:to-transparent md:bg-gradient-to-t md:from-black/60" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="w-12 h-12 bg-maple-red/10 text-maple-red rounded-2xl flex items-center justify-center mb-6">
            <Gift size={24} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-black text-maple-black mb-4 leading-tight">
            Wait! Before You Go...
          </h2>
          
          <p className="text-neutral-600 font-light mb-8 text-lg">
            Register for a school tour today and receive an exclusive <strong className="text-maple-red">20% Tuition Scholarship</strong> for the first year, plus a free Maple Bear uniform set!
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/tour-booking" 
              onClick={() => setIsVisible(false)}
              className="flex items-center justify-center gap-2 w-full py-4 px-8 bg-maple-red text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Claim My Offer Now <ArrowRight size={20} />
            </Link>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="w-full py-4 text-neutral-500 font-medium hover:text-maple-black transition-colors"
            >
              No thanks, I'll pass
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
