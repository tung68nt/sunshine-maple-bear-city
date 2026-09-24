import type { Metadata } from 'next'
import { CanvaExactHome } from '@/components/canva-exact'

export const metadata: Metadata = { title: 'Home | Sunshine Maple Bear', robots: { index: false } }

export default function Page() {
  return <CanvaExactHome />
}
