# Security audit

**Vai trò: AppSec.** Audit tĩnh; không gọi Supabase production hoặc khai thác hệ thống. Mọi line reference là trạng thái checkout hiện tại.

## Findings ưu tiên

| ID | Severity | Bằng chứng | Tác động / PoC chỉ mô tả | Bản vá cụ thể |
|---|---|---|---|---|
| SEC-01 | **Blocker** | `app/login/page.tsx:17-37` không gọi auth và luôn đặt cookie; `middleware.ts:42-43` chấp nhận cookie | Trong DevTools: `document.cookie='smb_admin_session=true; path=/'`, rồi mở `/admin`. Không cần biết password. | Xóa toàn bộ fake session; dùng `supabase.auth.signInWithPassword`, `getUser()` server-side và role trong `profiles`. |
| SEC-02 | **Critical** | Password/email hardcode tại `app/login/page.tsx:11-13,40-56` | Credential demo được public bundle, và trường password thực tế không được kiểm tra. | Xóa defaults/nút demo; rotate password, revoke session; search history và rotate mọi secret nghi ngờ. |
| SEC-03 | **Critical** | 10 route `app/api/admin/**` khởi tạo anon client, ví dụ `app/api/admin/blog/route.ts:4-50`; không có `auth.getUser`/role | Gọi trực tiếp `POST /api/admin/blog` với JSON để tạo/sửa/xóa nội dung nếu policy cho phép; middleware không bảo vệ authorization handler. | Mỗi handler gọi `requireRole(request, ['admin','editor'])`; server client lấy cookie session. |
| SEC-04 | **Critical** | PII public insert `WITH CHECK (true)`: migration `:313-315`; admission API accepts arbitrary body `:25-60` | Bot gửi payload hàng loạt. API trả `data?.[0] || body` (`:94-100`) nên có thể phản chiếu PII. | Dùng Zod whitelist; server service role chỉ sau Turnstile; trả `{success:true}` duy nhất; RLS không cho anon trực tiếp insert PII. |
| SEC-05 | **High** | Rich text render `dangerouslySetInnerHTML={{__html:value}}`: `components/admin/rich-text-editor.tsx:729`; không có DOMPurify/re-hype sanitize theo grep | Editor/admin bị chiếm quyền có thể lưu `<img onerror=...>`; khi public page render content có thể stored XSS. | Sanitize input và output bằng DOMPurify server-compatible, allowlist tags/attrs/protocols. |
| SEC-06 | **High** | HTML email interpolate raw input: `app/api/submissions/admission/route.ts:75-87`, tour `:75-88`, event `:16-25` | Payload HTML có thể làm email nội bộ chứa link/markup lừa đảo; là email injection content, không phải SQLi. | Escape HTML cho mọi interpolation; Zod max-length; text-only notification ưu tiên. |
| SEC-07 | **High** | `checkRateLimit` local process (xem `lib/rate-limit.ts:1-38`); submit routes tin `x-forwarded-for` `admission:15-16` | Vercel instances không share memory, attacker xoay IP header/instance để vượt limit. | Turnstile free + edge/WAF rule; dùng persistent store khi có ngân sách. Không tin x-forwarded-for do client tự đặt nếu platform không chuẩn hóa. |
| SEC-08 | **High** | No CSP/COOP/CORP; headers chỉ HSTS, frame, nosniff, referrer (`next.config.mjs:31-57`) | XSS impact lớn hơn, thiếu browser isolation. | Add nonce CSP and COOP/CORP policy mẫu bên dưới; test YouTube/analytics before enforce. |
| SEC-09 | **Medium** | `*.supabase.co` remote image allowlist `next.config.mjs:22-24` | Cho phép optimized fetch từ mọi project Supabase, không cần thiết. | Chỉ giữ `ddmdxidnovjesslxlbdy.supabase.co` và pathname bucket cần thiết. |
| SEC-10 | **Medium** | anon URL/key fallback source `lib/supabase.ts:3-6`, submit routes `:7-9` | Publishable key được phép public theo Supabase design, nhưng fallback khó rotate/môi trường lẫn nhau. | Bỏ fallback, fail fast khi env thiếu; service role chỉ `server-only` module. |

## Luồng auth và patch mẫu

**Vai trò: Senior full-stack/AppSec.** Thay `lib/supabase.ts` global anon client cho server bằng module tách client/server. Điều quan trọng là **không** gửi `SUPABASE_SERVICE_ROLE_KEY` tới bundle.

```diff
--- a/middleware.ts
+++ b/middleware.ts
@@
- const hasDemoSession = request.cookies.has('smb_admin_session')
@@
- if (request.nextUrl.pathname.startsWith('/admin') && !user && !hasDemoSession) {
+ if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
```

```ts
// lib/auth/require-role.ts — proposed
import 'server-only'
export async function requireRole(supabase: SupabaseClient, allowed: Role[]) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Response('Unauthorized', { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role,is_active').eq('id', user.id).single()
  if (!profile?.is_active || !allowed.includes(profile.role)) throw new Response('Forbidden', { status: 403 })
  return { user, profile }
}
```

Apply it at the first line of each admin method, not merely middleware. `viewer`: read public/report only; `editor`: page/blog/event/gallery draft/publish per policy; `admin`: users/settings/PII/delete.

## API inventory

| Route | Methods | Auth / role today | Server validation | Rate limit | Risk |
|---|---|---|---|---|---|
| `/api/admin/announcements` | GET, POST | No / No | No | No | Critical content disclosure/write |
| `/api/admin/announcements/[id]` | PUT, DELETE | No / No | No | No | Critical IDOR write/delete |
| `/api/admin/blog` | GET, POST | No / No | No | No | Critical write + placeholder |
| `/api/admin/blog/[id]` | PUT, DELETE | No / No | No | No | Critical IDOR |
| `/api/admin/events` | GET, POST, PUT | No / No | title/id only | No | Critical arbitrary CMS record |
| `/api/admin/forms` | GET, POST | No / No | title only | No | High schema/lead form tampering |
| `/api/admin/gallery` | GET, POST | No / No | No | No | High metadata write; no real upload |
| `/api/admin/gallery/[id]` | DELETE | No / No | No | No | High IDOR |
| `/api/admin/navigation` | GET, POST | No / No | inspect before fix | No | High navigation tampering |
| `/api/admin/pages` | GET, POST | No / No | inspect before fix | No | High page tampering |
| `/api/forms/[id]/submit` | POST | Public intended | No Zod | in-memory except partial | High arbitrary JSON/PII drafts |
| `/api/submissions/admission` | POST | Public intended | required+email | in-memory | High spam/PII reflection |
| `/api/submissions/tour-booking` | POST | Public intended | required+email | in-memory | High spam/PII reflection |
| `/api/submissions/event-registration` | POST | Public intended | No | No | High spam/email abuse |
| `/api/health` | GET | Public intended | N/A | No | Low; do not expose DB error details |

## RLS matrix — migration-defined state

**Vai trò: AppSec/DBA.** RLS enabled for all 13 tables (`migration:273-285`). The script defines only the policies below; Dashboard drift must be checked with SQL query `select * from pg_policies where schemaname='public';`.

| Table | SELECT | INSERT | UPDATE/DELETE | Đánh giá |
|---|---|---|---|---|
| pages | `USING(true)` | none | none | Public reads drafts/status ignored. |
| blog_posts | `USING(true)` | none | none | Public reads all posts. |
| gallery_items | `USING(true)` | none | none | Public read all. |
| staff | `USING(true)` | none | none | Public read all. |
| admissions | none | `WITH CHECK(true)` | none | Public arbitrary PII insert. |
| tour_bookings | none | `WITH CHECK(true)` | none | Public arbitrary PII insert. |
| events | `USING(true)` | none | none | Public reads private/unpublished. |
| custom_forms | `USING(true)` | none | none | Public reads form config. |
| form_responses | none | `WITH CHECK(true)` | none | Public arbitrary response/metadata insert. |
| utm_links | `USING(true)` | none | none | Campaign data unnecessarily public. |
| navigation_items | `USING(true)` | none | none | Acceptable only visible menu filter absent. |
| announcements | `USING(true)` | none | none | All content public. |
| system_settings | no policy | no policy | no policy | Denied to anon, good only if no dashboard drift. |

**Self-check (run only after replacing placeholders):**
```bash
curl -sS "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/admissions?select=*&limit=1" \
 -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
 -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY"
```
Expected after remediation: `[]` or permission error; never a record. Repeat for `tour_bookings,form_responses`. Do not paste real anon key into tickets.

## Security headers target

Start Report-Only CSP, then enforce after testing:
```text
default-src 'self'; script-src 'self' 'nonce-{nonce}' https://va.vercel-scripts.com https://www.youtube.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://ddmdxidnovjesslxlbdy.supabase.co https://i.ytimg.com; connect-src 'self' https://ddmdxidnovjesslxlbdy.supabase.co https://vitals.vercel-insights.com; frame-src https://www.youtube.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests
```
Also set `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-site`, and remove `X-Powered-By`.

## Required user confirmation

- Supabase Auth providers, email confirmation/MFA, leaked-password protection and Storage bucket policies cannot be observed from the repository.
- Verify no `SUPABASE_SERVICE_ROLE_KEY` appears in `.next/static` after adding it: `rg -l 'service_role|<unique-key-fragment>' .next/static` must produce no result.
- Rotate the project API keys and the exposed hardcoded password; git history review found no tracked `.env` filename, but this does not prove a key was never committed under another filename.
