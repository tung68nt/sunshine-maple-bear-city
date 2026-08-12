# Remediation roadmap

**Vai trò: CTO.** This is ordered by dependency and optimized for a one-week deadline. Do not release when a P0 acceptance criterion remains unchecked.

## Week 0–1: secure minimum viable launch (8–11 person-days)

| Day | Work | Dependency | Who can do it |
|---|---|---|---|
| 1 | Freeze CMS writes; rotate exposed password/keys; inventory dashboard policies | Owner access | Owner + dev |
| 1–2 | Implement Supabase SSR login/logout, profiles/RBAC, route handler guard | Auth project/email settings | Dev |
| 2–3 | Write and apply reviewed RLS + schema contract migration in preview | Backup/export first | Dev/DBA |
| 3–4 | Zod, sanitize HTML, escape emails, no-PII responses, Turnstile/honeypot | Turnstile site key | Dev |
| 4 | Fix tsc errors; ESLint/Prettier baseline; remove demo pages/assets from route | None | Dev |
| 5 | Manual/automated test flows, mobile keyboard/consent review | Preview environment | Dev + marketing |
| 6 | Backup export, restore rehearsal, CSP Report-Only, headers verification | Storage/destination | Owner + dev |
| 7 | Go/no-go review, Vercel production env, monitor and rollback owner | All P0 green | CTO/owner |

## Weeks 2–3

Create CI, Vitest/Playwright suite, generated types/DAL and forward migration discipline. Replace public static/mock data selectively with cached published DB read model. Split `pages`, `blog`, `events` editors only after behavior is covered.

## Owner decisions required

- Appoint data controller and approved retention period for unsuccessful admissions; approve final Vietnamese privacy/consent wording.
- Provide Supabase and Vercel dashboard access for policy, Auth, deploy protection and backup verification.
- Decide whether `admissions` may collect medical/passport data at all before authenticated admissions process. Recommendation: **do not collect it on public web forms**.
- Approve free-tier RPO/RTO and backup destination; fund persistent rate-limit/WAF/monitoring when lead volume grows.

## Exit criteria

**Vai trò: CTO.** Only change the verdict to “GO-LIVE CÓ ĐIỀU KIỆN” after every P0 checklist acceptance check is evidenced in a preview environment and owner signs risk acceptance for Free-tier backup limits. “SẴN SÀNG” additionally needs P1 complete, a successful restore drill, and 30 days of monitored stable operation.
