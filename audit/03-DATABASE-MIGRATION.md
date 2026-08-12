# Database, migration & data-source audit

**Vai trò: DBA/Senior Full-stack Engineer.** The only migration is an idempotent master schema (`supabase/migrations/20260808_master_schema.sql:1-315`), not an incremental reproducible history. `CREATE TABLE IF NOT EXISTS` plus `ALTER ... ADD COLUMN IF NOT EXISTS` cannot prove production schema equivalence or provide a rollback.

## Schema/code contract mismatches

| Area | Evidence | Impact |
|---|---|---|
| Blog | Schema uses `title_vi,title_en,summary_vi,content_vi,cover_image_url,status` (`migration:38-52`); API writes `title,excerpt,content,featured_image` (`app/api/admin/blog/route.ts:37-44`). | Writes fail or silently return placeholder fallback depending on existing drift. |
| Gallery | Schema has `category,url` (`migration:63-70`); API writes `album,image_url` (`app/api/admin/gallery/route.ts:37-43`). | Upload metadata incompatible; no actual Storage upload. |
| Announcements | Schema has bilingual fields / `is_active` (`migration:247-256`); API writes `title,content,priority,status,target_audience` (`app/api/admin/announcements/route.ts:35-42`). | API cannot work against declared schema. |
| Admissions | Interface expects passport/medical/vaccination fields (`lib/supabase.ts:14-39`); declared table has only base contact/child fields (`migration:96-106`); API writes `address` (`admission route:47-58`) absent from migration. | Sensitive-data claim/code/schema drift, failures or dashboard drift. |
| Tour booking | Interface uses `tour_date,tour_time,num_adults` (`lib/supabase.ts:42-56`); migration uses `preferred_date,preferred_time` (`migration:118-128`); API also writes `number_of_visitors` (`tour route:47-58`) absent. | Contract invalid. |
| Dynamic forms | API writes `is_partial` (`forms submit:33-60`), not in declared `form_responses` columns (`migration:194-201`). | Draft persistence fails on clean DB. |

## Data source inventory

| Page/feature | Source observed | Status |
|---|---|---|
| Homepage | `lib/homepage-builder.ts`, client `app/page.tsx:17` | Not verified DB-backed. |
| Static content pages (about, academics, admissions) | `lib/static-pages-data.ts` imports, e.g. `app/about/story/page.tsx:3` | Static, CMS mismatch. |
| Blog detail/news grid/sitemap | `lib/blog-data.ts` (`app/blog/[id]/page.tsx:4`, `components/sections/NewsGrid.tsx:6`, `app/sitemap.ts:2`) | Static/mock path. |
| CMS page manager | `/api/admin/pages` → `pages` | DB attempt, contract needs verification. |
| CMS events/forms/blog/gallery | API routes → named tables | DB attempts, several schema mismatches. |
| Analytics, form response inspector, UTM builder | fixtures/localStorage (`app/admin/forms/[id]/responses/page.tsx:114-130`, `app/admin/utm-builder/page.tsx:23-67`) | Demo/local, not operational truth. |

## Migration plan

1. Export dashboard schema and policies; compare with repo (`supabase db diff`) in a non-production linked project. Do not apply master schema to production blind.
2. Freeze write traffic; create timestamped forward-only migrations: `YYYYMMDDHHMMSS_create_profiles.sql`, `..._normalize_content.sql`, `..._rls.sql`, `..._indexes.sql`.
3. Define Zod schema first, generate Supabase types (`supabase gen types typescript`), then make API/repository compile against generated `Database` type.
4. Add `profiles(id uuid references auth.users, role check (...), is_active)` and audit events; add FKs from author/owner fields. Use UUID server-generated IDs, not `Date.now()` IDs (`app/api/admin/events/route.ts:29`).
5. Enforce `CHECK` status enums, `NOT NULL`, URL/length policy at application layer, and `updated_at` trigger. Add indexes for actual filters: `blog_posts(status,published_at desc)`, `events(is_public,start_date)`, `form_responses(form_id,created_at desc)`, `admissions(status,created_at desc)`, `tour_bookings(status,created_at desc)`.
6. Keep migrations forward-only. Rollback means a new compensating migration plus restore of tested backup, never editing applied history. Add `supabase/seed.sql` deterministic non-PII fixtures and prove `supabase db reset` in CI.

## Mock/placeholder inventory

- `via.placeholder.com`: blog creation `app/api/admin/blog/route.ts:43`; gallery creation `app/api/admin/gallery/route.ts:41`.
- Static/mocked blog data and static pages: imports listed in data inventory above.
- Analytics and form-response UI contain constructed examples/localStorage rather than verified database sources (`app/admin/forms/[id]/responses/page.tsx:57-63,114-130`). These must visibly say “demo” or be removed before decision-making.

## User confirmation required

Run in Supabase SQL editor and attach result to change ticket: `select tablename, policyname, cmd, qual, with_check from pg_policies where schemaname='public' order by tablename, policyname;`. Static source cannot determine dashboard drift, extension state, database backups, actual indexes, or Storage policies.
