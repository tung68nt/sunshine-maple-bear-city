# Re-assessment sau remediation — 2026-08-09

**Vai trò: CTO / AppSec / Senior Full-stack / SRE / Design Director.** Đây là audit tĩnh của working tree hiện tại. Không có quyền xác minh Supabase Dashboard, Vercel environment, Cloudflare Turnstile hay backup destination; các hạng mục đó không được tính là active production control.

## Phán quyết

### Production hiện tại: **KHÔNG ĐƯỢC PHÉP GO-LIVE**

Code remediation chưa được commit/deploy và migration chưa có bằng chứng đã apply. Do đó production đang phục vụ vẫn không được hưởng các kiểm soát mới.

### Release candidate sau deploy: **GO-LIVE CÓ ĐIỀU KIỆN**

Chỉ đạt trạng thái này khi migration/RLS, Supabase Auth profile, Vercel secrets và Turnstile đã được cấu hình, sau đó test theo mục “Gate” bên dưới. Không thể lên “SẴN SÀNG”: backup/DR, CI active, E2E, privacy governance và kiến trúc/data quality chưa hoàn thiện.

## Đối chiếu 18 red flags

| ID | Trạng thái | Bằng chứng hiện tại | Đánh giá |
|---|---|---|---|
| R1 fake login | **Đã xử lý trong code** | `app/login/page.tsx:18-37` gọi `signInWithPassword`; không còn fake session. | Effective sau deploy/Auth config. |
| R2 cookie bypass | **Đã xử lý trong code** | `proxy.ts:8-29` chỉ chấp nhận Supabase user; không còn `smb_admin_session`. | Effective sau deploy. |
| R3 credential demo | **Đã xử lý** | State login rỗng `app/login/page.tsx:11-15`; grep source không còn password. | Rotate credential cũ trên Dashboard vẫn bắt buộc. |
| R4 fallback key | **Đã xử lý** | `lib/supabase/env.ts` fail-fast; `.env.example` là placeholder. | Publishable key vẫn public by design. |
| R5 admin API unauthenticated | **Đã xử lý trong code** | Tất cả route `app/api/admin/**` import `requireRole`; ví dụ blog `:7,25`, pages `:7,42`. | Require migration `profiles`. |
| R6 anon server access / RLS | **Partial** | Server admin uses session client; public PII write uses `server-only` service client (`lib/supabase/admin.ts:1-10`). New RLS at migration `:45-84`. | Chưa active cho tới khi apply migration; service key cần Vercel secret. |
| R7 ignored TS errors | **Đã xử lý** | `next.config.mjs:4-6` false; `pnpm typecheck` pass. | Verified. |
| R8 missing headers | **Partial** | Header set added `next.config.mjs:24-69`; CSP đang `Report-Only`, không nonce/enforced. | Review violations rồi enforce CSP. |
| R9 wide image allowlist | **Đã xử lý** | Chỉ YouTube + exact Supabase host `next.config.mjs:9-22`. | Verified static. |
| R10 placeholders/static mock | **Partial** | API placeholders removed, nhưng `lib/static-pages-data.ts`, `lib/blog-data.ts`, analytics fixtures vẫn tồn tại. | CMS/public data still divergent. |
| R11 repo cleanup | **Chưa xử lý** | `sections_backup_rounded`, `ANH REN`, `.DS_Store`, `app/test-page` vẫn tracked. | Needs reviewed deletion/asset archival. |
| R12 git secret history | **Chưa đủ bằng chứng** | Không có tracked `.env` filename trong checked history, nhưng không có gitleaks/full secret scan. | Run gitleaks and rotate prior demo credentials. |
| R13 monolithic files | **Chưa xử lý** | Files >400 LOC unchanged. | P2 refactor. |
| R14 rich-text stored XSS | **Partial** | Preview now renders text `<pre>` at `components/admin/rich-text-editor.tsx:723-733`; no DOMPurify implementation. | Need sanitization before future public HTML rendering. |
| R15 serverless rate limit | **Partial** | In-memory limiter still used (`lib/rate-limit.ts:10-41`); Turnstile verification added (`lib/security.ts:15-25`). | Turnstile only effective when configured; persistent limiter missing. |
| R16 child PII | **Partial** | Public admission payload is reduced/validated/consented (`lib/validation/forms.ts:6-17`, `app/api/submissions/admission/route.ts:20-43`); client removes address/health input transmission. | Retention, deletion, legal notice and actual consent evidence still incomplete. |
| R17 migration discipline | **Partial** | Incremental migration added `20260809090000_...sql`. | Master migration remains; no db-diff/reset/rollback exercise. |
| R18 backup/DR | **Chưa xử lý** | No scheduled backup or restore evidence in repo. | Owner action required. |

**Tổng:** 7 đã xử lý code, 6 partial, 5 chưa xử lý/không thể xác minh.

## Điểm tái chấm A–L

| Hạng mục | Baseline | Release candidate | Active production | Lý giải |
|---|---:|---:|---:|---|
| A Architecture | 3.5 | 4.5 | 3.5 | Có auth/server boundary mới; DAL, RSC/data model, file lớn chưa đổi. |
| B Cleanup | 3.0 | 3.5 | 3.0 | Ignore/dependency cleanup tốt hơn; asset/rác chưa dọn. |
| C Auth/Authz | 0.0 | 6.5 | 0.0 | Auth/RBAC handler đầy đủ trong code; chưa activate `profiles`/deploy. |
| D Supabase/RLS | 2.0 | 5.0 | 2.0 | RLS migration deny PII mới tồn tại nhưng chưa apply. |
| E Injection/XSS | 2.5 | 5.5 | 2.5 | Zod/escaping tốt; sanitize HTML chuẩn chưa có. |
| F Anti-abuse | 2.0 | 4.5 | 2.0 | Turnstile/honeypot schema; limiter vẫn in-memory và config chưa xác minh. |
| G Database/migration | 3.0 | 4.5 | 3.0 | Có forward migration/index/profile; schema drift/mocks tồn tại. |
| H Backup/DR | 1.0 | 1.0 | 1.0 | Chưa thay đổi vận hành. |
| I UI/UX/A11y | 5.0 | 5.5 | 5.0 | Consent/minimization tốt hơn; responsive/accessibility toàn diện chưa test. |
| J Performance/SEO | 4.5 | 5.0 | 4.5 | Dependency/image host tốt hơn; RSC, image/ISR, dynamic sitemap chưa làm. |
| K QA/CI/CD | 1.5 | 5.0 | 1.5 | Lint/typecheck/unit scripts pass; CI workflow and E2E active missing. |
| L Privacy/legal | 2.0 | 3.5 | 2.0 | Consent surface/data minimization improved; legal notice, retention/DPO absent. |

**Production Readiness Score:**

- **Hiện production:** **2.5/10** (không có bằng chứng code/migration mới đã deploy).
- **Release candidate sau activation:** **4.6/10**. Vẫn dưới ngưỡng 7.0 ở C/D/E/F/L; tự động chặn go-live theo tiêu chí audit.

## Verified checks

```text
pnpm typecheck                 PASS
pnpm lint                      PASS (0 errors, 7 legacy warnings)
pnpm test:unit                 PASS (3 tests)
pnpm build                     PASS (Next 16.2.11)
pnpm audit --prod --audit-level=high  PASS (No known vulnerabilities found)
```

## Mandatory activation gate

1. Backup database + Storage, then apply migration in preview. Verify `pg_policies` and test anon PII curl returns no record.
2. In Supabase Auth create owner, then promote `profiles.role='admin'`; create 2–3 marketing users as `editor`.
3. Add Vercel Production/Preview env: `NEXT_PUBLIC_SUPABASE_URL`, publishable key, `SUPABASE_SERVICE_ROLE_KEY`, Resend key, `ADMIN_EMAIL`, Turnstile site + secret key. Never expose service role with `NEXT_PUBLIC_` prefix.
4. Create Turnstile widget for production domain; test invalid/missing token is rejected and valid submissions persist.
5. Run unauthenticated `/admin` and `/api/admin/*` tests; test viewer/editor/admin matrix.
6. Enforce CSP only after reviewing Report-Only telemetry; run mobile/keyboard UAT.
7. Complete a restore drill and record RPO/RTO; establish daily DB **and Storage** backup.

Until all seven gates have evidence, keep public PII forms disabled or do not go live.
