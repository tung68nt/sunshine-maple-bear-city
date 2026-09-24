import type { Metadata } from 'next'
import { CanvaExactAcademics } from '@/components/canva-exact'

export const metadata: Metadata = { title: 'Academics | Sunshine Maple Bear', robots: { index: false } }

export default function Page() {
  return <CanvaExactAcademics />
}
