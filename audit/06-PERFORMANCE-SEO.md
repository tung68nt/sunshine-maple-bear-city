# Performance & SEO

**Vai trò: Senior Full-stack Engineer/Design Director.** Static source review only; no deployed URL/Lighthouse trace was supplied, so CWV values are hypotheses, not measurements.

## Findings

- **High — JS scope:** Many marketing routes declare `'use client'`, e.g. `app/page.tsx:1`, `app/blog/page.tsx:1`, `app/events/page.tsx:1`, `app/forms/[id]/page.tsx:1`. This moves layout/content/data to the client and risks LCP/INP.
- **High — image weight:** `public` is 34 MB and `public/images` 32 MB; at least 19 rendered JPG files exceed 1 MB (inventory command result). `ANH REN` is an additional 33 MB source set. Optimize source images, give `next/image` correct `sizes`, and priority only to LCP image.
- **Medium — cache/data:** no `revalidate`, `dynamic`, or `unstable_cache` usage was found in route/page search; static blog sitemap imports `MOCK_BLOG_POSTS` (`app/sitemap.ts:2`) rather than published DB records.
- **Medium — SEO data drift:** root metadata/canonical are declared in `app/layout.tsx:30-76`; many public page-specific metadata functions exist, but dynamic blog uses mock data (`app/blog/[id]/page.tsx:4`) and sitemap cannot reflect CMS changes.
- **Low — remote image scope:** wildcard Supabase host in `next.config.mjs:22-24` should be constrained (also a security concern).

## One-week performance plan

1. Make page shells RSC and cache published DB reads with ISR (`revalidate: 300` appropriate for CMS content); invalidate tag on publish.
2. Convert 1MB+ originals to WebP/AVIF, preserve originals outside git; set width/height or fill parent aspect ratio to prevent CLS.
3. Add `@next/bundle-analyzer` in a temporary branch; report actual five largest chunks before removing dependencies. `recharts` is imported by `components/ui/chart.tsx:4`, so lazy-load it only on admin analytics.
4. Generate sitemap from published blog/events/pages and add JSON-LD per type (`Article`, `Event`, `FAQPage`; root has organization JSON-LD at `app/layout.tsx:89-140`).
5. Measure production with Lighthouse mobile, Vercel Speed Insights (if available free), and real-user CWV before/after. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile.
