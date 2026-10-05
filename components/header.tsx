import { SiteNav } from '@/components/ds'

/** Site header for pages not yet composed with <PageShell>: the design-system navigation. */
export function Header() {
  return (
    <div className="ds ds--chrome">
      <SiteNav />
    </div>
  )
}
