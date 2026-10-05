import { PageShell } from '@/components/ds'
import { SectionHero, SectionRenderer } from '@/components/sections/SectionRenderer'
import { getStaticPageData } from '@/lib/static-pages-data'

export function generateMetadata() {
  const page = getStaticPageData('/about/why-maple-bear')
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

export default function WhyMapleBearPage() {
  const page = getStaticPageData('/about/why-maple-bear')

  return (
    <PageShell hero={<SectionHero blocks={page.sectionsStack} title="Why Maple Bear" image={page.bannerImage} />}>
      <SectionRenderer blocks={page.sectionsStack} />
    </PageShell>
  )
}
