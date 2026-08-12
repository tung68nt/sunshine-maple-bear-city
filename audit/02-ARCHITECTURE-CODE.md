# Architecture & code review

**Vai trò: Senior Full-stack Engineer.** Next App Router structure exists, but data ownership is split among static libraries, localStorage, browser Supabase client and API handlers. There is no repository/DAL or shared server schemas.

## Observed patterns

- Global anon Supabase client is imported by both client and route code: `lib/supabase.ts:1-11`; `app/api/admin/events/route.ts:2`.
- Public pages use static data: `app/about/story/page.tsx:3`, `app/admissions/process/page.tsx:3`, `app/blog/[id]/page.tsx:4`; page editor separately uses DB (`app/api/admin/pages/route.ts:11-47`). CMS changes therefore do not reliably affect public pages.
- Admin role is client-controlled localStorage: `app/admin/layout.tsx:98-114`; user management is localStorage: `app/admin/users/page.tsx:131-145`.
- Only the app root was found with shared metadata; no `loading.tsx`, `error.tsx`, or `not-found.tsx` route boundary was found by inventory. `app/blog/[id]/page.tsx:7` imports nonexistent `next/not-found`, causing type failure.

## Type safety result

`npx tsc --noEmit` exits non-zero with **17 diagnostics**, while `next.config.mjs:3-5` suppresses build errors. Representative failures: `app/admin/analytics/page.tsx:523` union mismatch; `app/admin/blog/page.tsx:307` `any`→`never`; `app/admin/pages/page.tsx:382,412` unsupported `BODY`; `components/admin/rich-text-editor.tsx:760` undefined `X`; public page shape mismatches at `app/gallery/page.tsx:51-54` and `app/events/[id]/page.tsx:243-251`.

## Refactor plan for files >400 LOC

| Current | Safe split boundary |
|---|---|
| `app/admin/pages/page.tsx` (1494) | `features/pages/types.ts`, `page-registry.ts`, `PageList.tsx`, `PageEditor.tsx`, `SectionPalette.tsx`, `use-page-draft.ts`; first extract pure types/constants, then tests, then UI. |
| `app/admin/blog/page.tsx` (1269) | `features/blog/article-schema.ts`, `ArticleTable.tsx`, `ArticleEditor.tsx`, `SeoPanel.tsx`, `use-articles.ts`. |
| `app/admin/events/page.tsx` (1245) | `features/events/event-schema.ts`, `EventTable.tsx`, `EventEditor.tsx`, `event-repository.ts`. |
| `lib/static-pages-data.ts` (1041) | Put immutable content under `content/pages/*.ts`; do not mix it with CMS contracts. Prefer DB read model after migration. |
| `app/admin/analytics/page.tsx` (997) | `analytics-fixtures.ts` (clearly dev-only), `KpiCards`, `FunnelChart`, `VisitorTable`, server query layer. |
| `app/admin/forms/page.tsx` (912) | `features/forms/form-schema.ts`, `FormTable`, `FormBuilder`, `FieldEditor`. |
| `components/admin/rich-text-editor.tsx` (898) | `toolbar-config.ts`, `RichTextToolbar`, `LinkDialog`, `HtmlPreview` (sanitized). |
| `components/sections/SectionRenderer.tsx` (853) | Map discriminated section types to one component file per section; renderer only dispatches. |
| `app/admin/gallery/page.tsx` (782) | `MediaTree`, `MediaGrid`, `UploadDialog`, server upload action. |
| `components/ui/sidebar.tsx` (726) | Upstream shadcn component: retain only local wrapper/custom tokens or track vendored version. |
| `app/admin/navigation/page.tsx` (693), `users/page.tsx` (653), `layout.tsx` (558) | Extract fixture/data, table, modal and permission model. |

## Component boundary and performance

The inventory finds many page-level `'use client'` files, including `app/page.tsx:1`, `app/blog/page.tsx:1`, `app/events/page.tsx:1`, `app/forms/[id]/page.tsx:1`, and most marketing pages. A page need not be client merely because one form/widget is interactive. Make route `page.tsx` an RSC, query content on server/ISR, and isolate only form, carousel, filter and menu widgets as client components. This reduces browser JS and stops page data from diverging.

Proposed structure:
```text
app/(public)/…/page.tsx        # RSC composition + metadata
app/api/…/route.ts             # thin transport only
features/{blog,forms,pages}/   # UI, zod schema, types
lib/supabase/{client,server,admin}.ts
lib/db/{blog,forms,pages}.ts   # authorization-aware repositories
lib/auth/require-role.ts
```

## Duplication and cleanup decision

`components/sections_backup_rounded/` is a tracked parallel set of sections (for example matching `DailySchedule.tsx`, `WhyChooseUs.tsx`, `HeroSection.tsx`). It should be deleted only after `rg "sections_backup_rounded"` returns no runtime import and visual regression comparison is approved. `FloatingCTA_backup_rounded.tsx` deserves the same treatment.
