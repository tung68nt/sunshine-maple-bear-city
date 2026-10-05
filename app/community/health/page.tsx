import { PageShell } from '@/components/ds'
import { SectionHero, SectionRenderer } from '@/components/sections/SectionRenderer'
import { getStaticPageData } from '@/lib/static-pages-data'

export function generateMetadata() {
  const page = getStaticPageData('/community/health')
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

export default function HealthSafetyPage() {
  const page = getStaticPageData('/community/health')

  return (
    <PageShell hero={<SectionHero blocks={page.sectionsStack} title="Health and safety" image={page.bannerImage} />}>
      <SectionRenderer blocks={page.sectionsStack} />
    </PageShell>
  )
}
