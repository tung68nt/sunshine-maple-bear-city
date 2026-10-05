'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Popup } from '@/components/ds'

/** Shows the tour offer once per visitor when the pointer leaves through the top of the window. */
export function ExitIntentPopup() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const isAdmin = pathname?.startsWith('/admin') ?? false

  useEffect(() => {
    if (isAdmin) return
    const onLeave = (e: MouseEvent) => {
      if (e.clientY >= 5 || localStorage.getItem('smb_fomo_shown')) return
      setVisible(true)
      localStorage.setItem('smb_fomo_shown', 'true')
    }
    document.addEventListener('mouseleave', onLeave)
    return () => document.removeEventListener('mouseleave', onLeave)
  }, [isAdmin])

  if (isAdmin || !visible) return null

  return (
    <Popup
      image={{ src: '/images/render/LOP_HOC_DIEN_HINH_1_.jpg', alt: 'A Sunshine Maple Bear classroom' }}
      kicker="Wait — a welcome offer"
      title="Before you go"
      action={{ label: 'Claim My Offer Now', href: '/tour-booking' }}
      dismissLabel="No thanks, I'll pass"
      onClose={() => setVisible(false)}
    >
      <p>
        Register for a school tour today and receive an exclusive <strong>20% Tuition Scholarship</strong> for the first year, plus a
        free Maple Bear uniform set!
      </p>
    </Popup>
  )
}
