import { PageShell } from '@/components/ds'
import { SectionHero, SectionRenderer } from '@/components/sections/SectionRenderer'
import { getStaticPageData } from '@/lib/static-pages-data'

export function generateMetadata() {
  const page = getStaticPageData('/admissions/process')
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

export default function AdmissionsProcessPage() {
  const page = getStaticPageData('/admissions/process')

  return (
    <PageShell hero={<SectionHero blocks={page.sectionsStack} title="Admissions process" image={page.bannerImage} />}>
      <SectionRenderer blocks={page.sectionsStack} />
    </PageShell>
  )
}
