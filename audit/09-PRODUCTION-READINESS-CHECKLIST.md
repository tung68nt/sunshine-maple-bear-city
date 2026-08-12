# Production readiness checklist

**Vai trò: CTO.** Checkbox means evidence must be attached to release ticket, not merely “implemented”.

## P0 — blocks go-live

- [ ] **Owner: Senior dev, 2d** Replace fake login/session with Supabase SSR Auth; acceptance: DevTools cookie cannot access `/admin`, server handler returns 401/403.
- [ ] **Owner: Senior dev + owner, 1.5d** RBAC profiles + handler enforcement; acceptance: editor cannot manage users/PII, viewer cannot write.
- [ ] **Owner: DBA, 1d** Apply reviewed RLS migration; acceptance: anon curl cannot SELECT PII or write admin tables; public published content works.
- [ ] **Owner: Senior dev, 1d** Zod/Turnstile/honeypot/length limits; acceptance: invalid payload/failed token return 400/403 and PII response absent.
- [ ] **Owner: Senior dev, 1d** Sanitize rich text and escape email; acceptance: XSS test corpus renders inert.
- [ ] **Owner: Senior dev, 1d** Remove `ignoreBuildErrors`, fix all tsc errors; install/configure lint; acceptance: pnpm typecheck/lint/build exit 0.
- [ ] **Owner: Product/legal, 0.5d** Consent, privacy notice, retention/deletion contact; acceptance: required guardian consent recorded before sensitive collection.
- [ ] **Owner: Owner/SRE, 0.5d** Secret/password rotation and Vercel env set; acceptance: no hardcoded secret; service role absent from static bundle.

## P1 — within two weeks

- [ ] **Owner: Senior dev, 2d** Incremental migrations/generated DB types/DAL; acceptance: clean DB reset and CI compile.
- [ ] **Owner: SRE, 1d** Daily DB + Storage backup and isolated restore drill; acceptance: RPO/RTO report.
- [ ] **Owner: QA/dev, 2d** CI plus six Playwright critical flows; acceptance: protected PR quality gates.
- [ ] **Owner: Design/marketing, 1.5d** Mobile multi-step form/a11y review; acceptance: axe no serious issue and manual keyboard pass.
- [ ] **Owner: Dev, 1d** CSP Report-Only then enforce; acceptance: no critical violations and headers scanner pass.

## P2 — next quarter

- [ ] **Owner: Dev, 5d** Refactor monolithic admin/section files; acceptance: feature modules and regression tests.
- [ ] **Owner: SRE, 2d** Persistent distributed rate limit/WAF/alerting when budget permits; acceptance: abuse test and alert drill.
- [ ] **Owner: Marketing, 2d** Replace fixture/static pages with reviewed CMS read model; acceptance: publish → sitemap/page update in ≤5min.
- [ ] **Owner: CTO, 1d/quarter** Dependency, access, retention and restore review; acceptance: signed review log.
