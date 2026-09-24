import type { Metadata } from 'next'
import { CanvaExactAdmissions } from '@/components/canva-exact'

export const metadata: Metadata = { title: 'Admissions | Sunshine Maple Bear', robots: { index: false } }

export default function Page() {
  return <CanvaExactAdmissions />
}
