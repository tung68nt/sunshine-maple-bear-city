# Production reassessment — 2026-08-10

## Verdict

**Not ready for lead-generating go-live.** The deployment, database connection,
Supabase authentication and basic anonymous admin guard are live. However,
Turnstile is not configured, so public forms are intentionally rejected in
production; the CMS remains split between Supabase, static data and browser
storage; and the production deployment was uploaded from an uncommitted
working tree.

## Evidence actually verified

| Check | Result |
|---|---|
| Production deployment | Ready at `https://smbsunshinecity.vercel.app` |
| Public home | HTTP 200 |
| Health endpoint | HTTP 200; Supabase connection reported healthy |
| Anonymous `/admin` | HTTP 307 to `/login` |
| Anonymous `/api/admin/users` | HTTP 307 |
| Supabase admin user | Password login verified; profile role is `admin` and active |
| Production headers | CSP report-only, X-Frame-Options DENY, nosniff, strict referrer, permissions policy |
| Lint / typecheck / unit | Pass locally; 4 unit tests |
| Production dependency audit | Pass locally; no high production dependency vulnerability |
| Playwright E2E | **Not run**: Chromium executable is missing locally |
| CI and backup drill | Workflows exist; no completed GitHub CI run or restore-drill evidence |

## Prior-audit remediation status

### Fixed and evidenced (4 areas)

1. Demo login/admin cookie bypass has been removed; Supabase user + `profiles`
   role is enforced for server routes.
2. The hardening migration was successfully applied to the connected Supabase
   project; profiles, RLS policy work and compatibility columns are present.
3. Production no longer exposes the old unsafe admin route behaviour; the
   anonymous admin redirect and security headers are live.
4. Dependency, lint, TypeScript and build gates pass in the current tree.

### Partially remediated (4 areas)

1. PII forms have Zod, consent and server-side Turnstile checks, but the
   missing Turnstile configuration makes the forms unavailable in production.
2. Blog HTML is sanitized and CSP is report-only, but other CMS writes lack a
   common server-side request schema and some content paths remain unreviewed.
3. CI, backup and restore scripts/runbooks exist, but were not exercised in
   GitHub or against a restore target.
4. Image/header/performance improvements were made, but no field Lighthouse,
   Core Web Vitals or real-device accessibility evidence exists.

### Not remediated / regressed (5 areas)

1. **Data contract split:** content is still distributed across Supabase,
   `lib/static-pages-data.ts`, `lib/blog-data.ts`, `lib/homepage-builder.ts`
   and browser `localStorage`.
2. **Silent write failures:** dynamic form, events, forms and navigation APIs
   log some Supabase write failures then return success.
3. **No durable rate limiting:** public API rate limiting is process-local and
   ineffective across Vercel instances.
4. **No real DR:** no encrypted backup destination, Storage backup, restore
   drill record, RPO or RTO evidence.
5. **Release governance absent:** 109 working-tree changes remain uncommitted;
   the production deployment did not originate from an auditable protected-main
   CI run.

## Architecture and maintainability

The component tree uses sensible Next.js/App Router boundaries and the new
Supabase server/client helpers are a good direction. It is not yet a coherent
CMS architecture: pages are primarily client-side monoliths and multiple data
sources can disagree. The highest-risk large files are:

| File | LOC | Assessment |
|---|---:|---|
| `app/admin/pages/page.tsx` | 1,494 | Split state, editor, modal and persistence layers |
| `app/admin/blog/page.tsx` | 1,270 | Split form/editor/table/API concerns |
| `app/admin/events/page.tsx` | 1,245 | Remove browser-local event persistence |
| `app/admin/analytics/page.tsx` | 997 | Separate data/query/chart components |
| `lib/static-pages-data.ts` | 975 | Migrate canonical CMS data to one repository/data layer |
| `app/admin/forms/page.tsx` | 912 | Replace localStorage with authenticated API/Supabase source of truth |
| `components/admin/rich-text-editor.tsx` | 897 | Extract toolbar, media, colour and editor state |
| `components/sections/SectionRenderer.tsx` | 853 | Use section registry modules and typed contracts |

The 700+ LOC files are not an automatic runtime failure, but they violate
single-responsibility and make regression coverage difficult. No current
enforced file-size/complexity standard prevents further growth.

## UI/accessibility audit highlights

- Widespread `transition-all` violates performance/reduced-motion guidance.
- Many custom inputs use `focus:outline-none` without an equivalent
  `focus-visible` treatment.
- Forms commonly omit `autocomplete`, `spellCheck={false}` for email, and
  field-level error/focus management.
- The admin user page is functional but compressed into a single JSX line and
  needs semantic/refactor cleanup.
- Localized static data and client `localStorage` can create hydration/content
  inconsistency.

## Score (production evidence weighted)

| Domain | Score / 10 | Reason |
|---|---:|---|
| Authentication & RBAC | 7.0 | Real account, server guard and profile role verified |
| Data protection & PII | 5.0 | RLS/migration/consent exist; no full policy/PII-flow test |
| Public forms & anti-spam | 2.0 | Turnstile absent; forms cannot complete |
| App/API correctness | 4.0 | Several mutation APIs can report success after DB failure |
| XSS & headers | 6.0 | Sanitization/header baseline, CSP not enforced |
| Content/CMS architecture | 3.0 | Split source of truth and localStorage CMS paths |
| UI/accessibility | 3.5 | Repeated focus, motion and form-semantic issues |
| Performance | 5.0 | Build/image improvements; no measured field evidence |
| Backup/DR | 2.0 | Scripts only; no operational proof |
| QA/CI/release governance | 3.0 | Local gates pass; E2E/CI/committed release proof missing |
| Observability & operations | 4.0 | Health exists; no alerts, durable rate limits or runbook exercise |

**Overall: 4.3 / 10.** This is an improvement from the original live baseline,
but lower than the prior code-only estimate because production evidence now
reveals disabled lead capture and incomplete release operations.

## Required path to 8+/10

1. Configure Turnstile production keys and run valid/invalid form tests.
2. Change every mutation route to fail closed on Supabase errors and add Zod
   request schemas for all admin writes.
3. Move forms, events, pages and navigation off localStorage/static mock data
   into a single typed Supabase data layer.
4. Introduce a durable Vercel-compatible rate-limit store.
5. Commit changes, push to protected `main`, wait for CI, and deploy only from
   that commit.
6. Run an encrypted DB + Storage backup and isolated restore drill.
7. Split the listed 700+ LOC files; add accessibility fixes and E2E coverage.
