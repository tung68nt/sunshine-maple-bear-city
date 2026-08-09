import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getStaticPageData } from '@/lib/static-pages-data'
import { SectionRenderer } from '@/components/sections/SectionRenderer'

export function generateMetadata() {
  const page = getStaticPageData('/about/teachers')
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      images: [page.ogImage],
    },
  }
}

export default function TeachersPage() {
  const page = getStaticPageData('/about/teachers')

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#1D1D1B]">
      <Header />
      <main className="flex-1 pt-24 pb-24">
        <SectionRenderer blocks={page.sectionsStack} />
      </main>
      <Footer />
    </div>
  )
}
