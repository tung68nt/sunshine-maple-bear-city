# QA, CI/CD & engineering process

**Vai trò: CTO.** Today there are no tests or `.github/` workflow files in the inventory. `npm run lint` invokes `eslint .` but fails `eslint: command not found`; `pnpm-lock.yaml` exists while `npm audit` fails `ENOLOCK`. Use pnpm consistently.

## Required pipeline

```yaml
# .github/workflows/ci.yml — proposed
name: ci
on: [pull_request, push]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test:unit
      - run: pnpm build
      - run: pnpm audit --prod --audit-level=high
```

Add separate Playwright job against a preview deployment only after test credentials and isolated Supabase project exist. Production deploy requires protected main branch + named owner approval. Add gitleaks/Dependabot, Prettier and Husky only after baseline formatting is agreed.

Runnable-placement artifacts are provided without modifying production configuration: `audit/templates/ci.yml`, `audit/templates/authz.spec.ts`, and `audit/templates/critical-flows.spec.ts`. They intentionally use `todo` until the auth implementation and isolated test environment exist; moving them into the repository alone must not be misrepresented as test coverage.

## Test minimum

| Layer | Minimum / acceptance |
|---|---|
| Unit (Vitest) | Zod schemas, HTML escaping, role guard, rate-limit adapter. ≥80% of new security code. |
| Component (RTL) | Consent checkbox, required/error states, disabled submit. |
| E2E (Playwright) | Login valid/invalid; unauthenticated `/admin` denied; create/edit/delete blog; admission form; tour booking; event registration. Use test data/project only. |
| Smoke | Production public pages, `robots`, sitemap, health endpoint, no PII response. |

## Release runbook

Version/tag after CI green; preview test; owner approval; production deploy; five-minute rollback is revert to previous Vercel deployment plus schema-compatible forward migration plan. Monitor errors/form delivery for 24h. Install Sentry or, on zero budget, Vercel logs + emailed health check with a written rotation owner.
