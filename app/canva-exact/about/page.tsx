import type { Metadata } from 'next'
import { CanvaExactAbout } from '@/components/canva-exact'

export const metadata: Metadata = { title: 'About Us | Sunshine Maple Bear', robots: { index: false } }

export default function Page() {
  return <CanvaExactAbout />
}
