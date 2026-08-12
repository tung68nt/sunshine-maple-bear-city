# Current reassessment — 2026-08-10

## Scope and evidence

This reassessment covers the working tree only. It does **not** assert that the
currently deployed Vercel/Supabase environment has these changes, because no
deployment, Supabase dashboard, backup destination, or preview URL was made
available to verify them.

Local evidence executed on 2026-08-10:

```text
pnpm lint                              PASS
pnpm typecheck                         PASS
pnpm test:unit                         PASS (4 tests)
pnpm build                             PASS
pnpm audit --prod --audit-level=high   PASS
pnpm test:e2e                          2 skipped (PLAYWRIGHT_BASE_URL absent)
```

## Remediation coverage

| Original risk | Current code state | Production evidence still required |
|---|---|---|
| Demo/admin bypass | Removed; Supabase SSR session + profile role guard | Create real users and confirm anon/admin/editor/viewer paths |
| Privileged APIs | All admin routes require server-side role guard | Apply migration and test RLS policies in preview |
| PII public writes/reads | Public writes use server-only service key after Zod + consent + Turnstile; PII RLS migration supplied | Apply migration, configure Turnstile, submit/deny tests |
| XSS in editor | Server-side HTML allowlist is applied before blog persistence | Browser security regression and CSP report review |
| Fake CMS users | Replaced with authenticated Supabase invitation/profile management | Configure service role and email redirect allow-list |
| Silent form persistence failures | Database failures now return an error; no fallback recipient is embedded | Configure `ADMIN_EMAIL`, Resend sender, and test delivery |
| Headers and dependency risk | CSP report-only and security headers set; production dependency audit passes | Review CSP reports then enforce; verify deployed headers |
| Backups / DR | Backup and restore-drill scripts + runbook supplied | Encrypted destination, actual backup and documented restore drill |
| CI | GitHub workflow checks build/unit/audit/gitleaks | Push to GitHub and observe a passing protected-main run |

## Score

The codebase release candidate is approximately **5.5 / 10**, up from the
earlier incomplete baseline. The deployed system cannot be scored above
**2.5 / 10** without evidence that the code is committed, deployed, migrated,
and configured.

The remaining score is intentionally withheld for external controls and for
architecture work still outstanding: static/mock content remains mixed with
CMS data, public rate-limiting is process-local (not durable on serverless),
and broader performance/accessibility data needs real-device measurement.

## Non-negotiable gates for a maximum audit result

1. Apply `supabase/migrations/20260809090000_security_rbac_and_data_contract.sql`
   to a preview project, then production after a verified backup.
2. Set all variables in `.env.example` in Vercel; keep service-role and
   Turnstile secrets server-only. Configure Supabase Auth redirect URLs.
3. Provision only the required 2–3 users through `/admin/users`; validate
   role denial and deactivate/reactivate one test account.
4. Configure Turnstile, a verified Resend sender and `ADMIN_EMAIL`; run one
   valid and one invalid form submission for each public form.
5. Put a durable rate-limit store behind public forms (for example a managed
   Redis/KV service) or use an equivalent Vercel/Supabase-backed control.
6. Configure encrypted database **and Storage** backup retention; complete and
   record an isolated restore drill.
7. Deploy a preview URL, run the Playwright critical-flow suite against it,
   inspect headers/CSP reports, then promote from protected `main` only.
8. Replace remaining static/mock CMS paths with one Supabase data contract and
   conduct a real-device accessibility/performance audit.

Until all eight gates have evidence, claiming a maximum audit score would be
misleading.
