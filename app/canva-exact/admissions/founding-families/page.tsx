import type { Metadata } from 'next'
import { CanvaExactFoundingFamilies } from '@/components/canva-exact'

export const metadata: Metadata = { title: 'Founding Families | Sunshine Maple Bear', robots: { index: false } }

export default function Page() {
  return <CanvaExactFoundingFamilies />
}
