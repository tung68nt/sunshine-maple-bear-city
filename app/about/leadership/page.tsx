import { PageShell } from '@/components/ds'
import { SectionHero, SectionRenderer } from '@/components/sections/SectionRenderer'
import { getStaticPageData } from '@/lib/static-pages-data'

export function generateMetadata() {
  const page = getStaticPageData('/about/leadership')
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

export default function LeadershipPage() {
  const page = getStaticPageData('/about/leadership')

  return (
    <PageShell hero={<SectionHero blocks={page.sectionsStack} title="Leadership" image={page.bannerImage} />}>
      <SectionRenderer blocks={page.sectionsStack} />
    </PageShell>
  )
}
