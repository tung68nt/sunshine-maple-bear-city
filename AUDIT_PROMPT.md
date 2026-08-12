# MASTER PROMPT — TOÀN DIỆN AUDIT & PRODUCTION-READINESS REVIEW
## Dự án: Sunshine Maple Bear (smb_sunshinecity) — Next.js 16 / React 19 / Supabase / Tailwind v4 / Vercel

> Copy toàn bộ nội dung dưới đây làm prompt. Đã được viết bám sát codebase thực tế.

---

## 0. VAI TRÒ

Bạn đồng thời đóng 5 vai, và phải nêu rõ mình đang nói với tư cách nào ở mỗi phần kết luận:

1. **CTO** — chịu trách nhiệm quyết định "hệ thống này có được phép go-live hay không", rủi ro kinh doanh, chi phí vận hành, kế hoạch nhân sự & lộ trình kỹ thuật.
2. **Giám đốc UI/UX (Design Director)** — hệ thống thiết kế, accessibility WCAG 2.2 AA, information architecture, conversion (đây là website tuyển sinh trường mầm non — lead generation là KPI số 1).
3. **Senior Full-stack Engineer (Next.js App Router / React Server Components)** — kiến trúc code, pattern, data fetching, caching, hiệu năng.
4. **Chuyên gia bảo mật ứng dụng web (AppSec / OWASP)** — auth, authz, RLS, injection, DoS, chiếm quyền admin, rò rỉ dữ liệu trẻ em (dữ liệu PII của trẻ vị thành niên — mức nhạy cảm cao nhất).
5. **SRE / DBA** — migration, backup, disaster recovery, RPO/RTO, observability.

Nguyên tắc bắt buộc:
- **Không suy đoán. Đọc file thật, trích dẫn `path:line` cho mọi phát hiện.**
- Mỗi phát hiện phải có: mức độ (Blocker / Critical / High / Medium / Low), bằng chứng, tác động thực tế, cách khai thác (nếu là lỗ hổng), và bản vá cụ thể dạng diff/code.
- Không đưa lời khuyên chung chung kiểu "nên thêm validation". Phải chỉ đúng file, đúng dòng, đúng đoạn code thay thế.
- Nếu một vấn đề không thể xác minh bằng code tĩnh (vd: cấu hình Supabase Dashboard, DNS, WAF), hãy liệt kê thành **"Cần người dùng xác nhận"** kèm câu hỏi chính xác cần trả lời.

---

## 1. BỐI CẢNH HỆ THỐNG (đã khảo sát thực tế — dùng làm điểm khởi đầu, hãy tự kiểm chứng lại)

- Next.js **16.2.6**, React 19, App Router, TypeScript 5.7, Tailwind v4, shadcn/ui + Radix, deploy Vercel.
- Backend: **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`, và cả `@supabase/auth-helpers-nextjs` đã deprecated — trùng lặp thư viện auth).
- ~189 file `.ts/.tsx` trong `app/`, `components/`, `lib/`; tổng ~33k LOC.
- Site công khai: trang chủ, about/*, academics/*, admissions/*, blog, events, gallery, community/*, contact, tour-booking, quotation, faq, privacy, terms, forms/[id].
- CMS admin tại `app/admin/*`: pages, blog, events, gallery, navigation, users, forms, admissions, tour-bookings, announcements, staff, settings, analytics, utm-builder.
- API: `app/api/admin/*`, `app/api/submissions/*`, `app/api/forms/[id]/submit`, `app/api/health`.
- DB: **1 file migration duy nhất** `supabase/migrations/20260808_master_schema.sql` (315 dòng, ~13 bảng, có `CREATE POLICY`/RLS).
- Lib: `lib/supabase.ts`, `lib/constants.ts`, `lib/rate-limit.ts`, `lib/static-pages-data.ts` (1041 dòng), `lib/blog-data.ts`, `lib/homepage-builder.ts`, `lib/utm-tracker.ts`, `lib/visitor-tracking.ts`.
- **Không có bất kỳ test nào** (không jest/vitest/playwright), **không có CI** (`.github/` không tồn tại), không có ESLint config rõ ràng dù `npm run lint` tồn tại.

### Các dấu hiệu đỏ đã phát hiện sơ bộ — bắt buộc điều tra sâu và xác minh từng cái

| # | Dấu hiệu | Nơi |
|---|---|---|
| R1 | Đăng nhập admin là **giả**: `handleLogin` không gọi Supabase Auth, chỉ `document.cookie = 'smb_admin_session=true'` + `localStorage`. Mật khẩu không được kiểm tra. Bất kỳ ai cũng có thể tự set cookie này và vào toàn bộ CMS. | `app/login/page.tsx` |
| R2 | Middleware chấp nhận `hasDemoSession` (cookie `smb_admin_session`) như một phiên hợp lệ, kể cả khi Supabase auth fail → **bypass hoàn toàn** | `middleware.ts` |
| R3 | Có nút "demo account" điền sẵn email + mật khẩu thật trong source, và mật khẩu hardcode trong state khởi tạo | `app/login/page.tsx` |
| R4 | `lib/supabase.ts` **hardcode fallback** URL project + publishable key ngay trong source đã commit | `lib/supabase.ts:3-4` |
| R5 | Toàn bộ `app/api/admin/*` **không có bất kỳ kiểm tra xác thực/phân quyền nào** trong handler — chỉ dựa vào middleware (mà middleware đã bị bypass). Ai gọi thẳng `POST /api/admin/blog` cũng ghi được DB. | `app/api/admin/**/route.ts` |
| R6 | API dùng **anon key** phía server → mọi thứ phụ thuộc RLS. Nếu RLS có policy `USING (true)` thì DB mở toang. Không thấy dùng service_role ở đâu. | `app/api/admin/*`, migration |
| R7 | `next.config.mjs`: `typescript.ignoreBuildErrors: true` → build xanh nhưng type error được nuốt | `next.config.mjs` |
| R8 | Thiếu **CSP** (Content-Security-Policy) và COOP/CORP trong `headers()`; `X-Frame-Options: SAMEORIGIN` chưa đủ | `next.config.mjs` |
| R9 | `remotePatterns` cho phép `images.unsplash.com` và `*.supabase.co` (wildcard toàn bộ Supabase, không chỉ project của mình) | `next.config.mjs` |
| R10 | Placeholder/mock còn sót: `featured_image: 'https://via.placeholder.com/800x400'` hardcode khi tạo blog post; `lib/blog-data.ts`, `lib/static-pages-data.ts` là dữ liệu tĩnh — cần xác định trang nào đang đọc static thay vì DB | `app/api/admin/blog/route.ts`, `lib/*-data.ts` |
| R11 | Thư mục rác/trùng lặp: `components/sections_backup_rounded/` (bản copy của `components/sections/`), `ANH REN/` (ảnh gốc chưa nén nằm trong repo), `.DS_Store`, `tsconfig.tsbuildinfo` (322KB) đã commit, `app/test-page/`, `SETUP_DATABASE.sql` + `UPDATE_DATABASE.sql` trong `docs/` chồng chéo với `supabase/migrations/` | root, `docs/`, `components/` |
| R12 | `.env` và `.env.local` **tồn tại trong thư mục dự án** — cần xác minh chúng chưa từng bị commit vào git history (`.gitignore` có ignore, nhưng phải kiểm tra history) | root |
| R13 | File quá dài: `app/admin/pages/page.tsx` 1494 dòng, `admin/blog` 1269, `admin/events` 1245, `lib/static-pages-data.ts` 1041, `admin/analytics` 997, `admin/forms` 912, `rich-text-editor.tsx` 898, `SectionRenderer.tsx` 853 | xem bảng LOC |
| R14 | `components/admin/rich-text-editor.tsx` — nguy cơ **stored XSS** nếu nội dung HTML từ editor được render bằng `dangerouslySetInnerHTML` trên trang public | `components/`, `app/blog/[id]`, `app/[static pages]` |
| R15 | `lib/rate-limit.ts` — rate limit in-memory sẽ **vô hiệu trên Vercel serverless** (mỗi instance một bộ nhớ riêng) | `lib/rate-limit.ts` |
| R16 | Form submission công khai (`/api/submissions/*`, `/api/forms/[id]/submit`) — thu thập PII trẻ em: họ tên, ngày sinh, hộ chiếu, tình trạng y tế, dị ứng, tiêm chủng. Đây là dữ liệu **nhạy cảm bậc cao** theo Nghị định 13/2023/NĐ-CP về BVDLCN. Cần audit riêng. | `lib/supabase.ts` interface `Admission` |
| R17 | Chỉ có **1 migration duy nhất** đặt tên `master_schema` → không có lịch sử migration tăng tiến, không rollback được, khả năng schema production đã drift khỏi file này | `supabase/migrations/` |
| R18 | Không có backup strategy, không có seed script, không có `db reset` reproducibility | toàn hệ thống |

---

## 2. PHẠM VI AUDIT — 12 HẠNG MỤC

### A. Kiến trúc & cấu trúc mã nguồn
- Đánh giá cấu trúc thư mục so với chuẩn Next.js App Router production (feature-based vs type-based; có nên có `src/`, `features/`, `server/`, `types/`, `config/`).
- Xác định pattern hiện tại là gì (nếu có) và mức độ nhất quán: data fetching (RSC vs `useEffect` + `fetch` client-side), state management, error boundary, `loading.tsx` / `error.tsx` / `not-found.tsx` có đủ ở từng route segment không.
- **Server Components vs Client Components**: đếm số file có `'use client'` không cần thiết; chỉ ra file nào đang fetch dữ liệu ở client mà đáng lẽ phải là RSC.
- Tách tầng: có `data access layer` (DAL) không? API route gọi thẳng Supabase từ handler — đánh giá và đề xuất `lib/db/*.ts` repository layer + Zod schema dùng chung.
- **File quá dài**: với từng file >400 dòng, đưa kế hoạch tách cụ thể (tên file con, ranh giới trách nhiệm, thứ tự refactor an toàn).
- Trùng lặp code: `components/sections/` vs `components/sections_backup_rounded/` — diff và quyết định xoá.
- Type safety: `any` xuất hiện ở đâu, `ignoreBuildErrors` che giấu bao nhiêu lỗi (hãy chạy `tsc --noEmit` và đếm).

### B. Rác hệ thống, cache, vệ sinh repo ("AI vibe code" check)
- Liệt kê **mọi** file/thư mục nên xoá hoặc chuyển ra khỏi repo, kèm lý do và lệnh xoá an toàn.
- Kiểm tra git history có commit nhầm secret / file lớn không (`git log --stat`, tìm `.env`, key, ảnh >1MB).
- Đánh giá `.gitignore` còn thiếu gì.
- Ảnh trong `public/images/` và `ANH REN/`: tổng dung lượng, ảnh chưa tối ưu, ảnh không được tham chiếu ở đâu (dead assets).
- Dependency hygiene: package thừa (`axios` khi đã có `fetch`, `@supabase/auth-helpers-nextjs` deprecated trùng `@supabase/ssr`, `recharts` dùng ở đâu), package lỗi thời, `pnpm audit` / `npm audit` kết quả.
- File tài liệu rải rác ở root (`CAU_TRUC_ADMIN_CMS_TRANG_TINH.md`, `DANH_SACH_TRANG_WEBSITE.md`, `DELIVERY_CHECKLIST.md`, `sitemap.md`) chồng chéo với `docs/` — đề xuất cấu trúc docs chuẩn.

### C. Bảo mật — Authentication & Authorization (ƯU TIÊN SỐ 1)
- Truy vết đầy đủ luồng đăng nhập hiện tại và **viết PoC khai thác** (chỉ mô tả, không cần thực thi) chứng minh có thể vào `/admin` mà không cần mật khẩu.
- Thiết kế lại auth đúng chuẩn: Supabase Auth + `@supabase/ssr` cookie-based session, `middleware.ts` chỉ refresh session, **authorization kiểm tra tại từng route handler và từng Server Action**, RBAC (admin / editor / viewer) lưu ở bảng `profiles` + custom claims.
- Kiểm tra **mọi** route trong `app/api/**` và liệt kê thành bảng: `route | method | yêu cầu auth? | yêu cầu role? | có validate input? | có rate limit? | rủi ro`.
- Bảo vệ chống: privilege escalation, IDOR (`/api/admin/blog/[id]`, `/forms/[id]`, `/admin/forms/[id]/responses`), mass assignment (body được spread thẳng vào insert?), CSRF (Server Actions & cookie SameSite), session fixation, cookie flags (`HttpOnly`, `Secure`, `SameSite=Strict` — cookie hiện tại đặt bằng JS nên **không thể** HttpOnly → nêu rõ).

### D. Bảo mật — Supabase & RLS
- Đọc toàn bộ `supabase/migrations/20260808_master_schema.sql`. Với **từng bảng**, lập bảng: `table | RLS bật? | policy SELECT | INSERT | UPDATE | DELETE | đánh giá`.
- Tìm mọi policy `USING (true)` / `WITH CHECK (true)` — đây là lỗ hổng đọc/ghi công khai.
- Xác định bảng nào chứa PII (admissions, tour_bookings, form_submissions, users/profiles) và chứng minh dữ liệu đó **không thể** đọc được bằng anon key từ trình duyệt. Viết đúng câu lệnh `curl` để người dùng tự kiểm chứng.
- Đánh giá việc client-side dùng `lib/supabase.ts` (anon key expose ra browser — đúng theo thiết kế Supabase, nhưng chỉ an toàn nếu RLS chặt).
- Đề xuất dùng `service_role` key **chỉ ở server** cho các thao tác admin, kèm cảnh báo tuyệt đối không để lọt vào bundle client (kiểm tra bằng cách grep trong `.next/static`).
- Storage buckets: policy upload, giới hạn MIME/size, chống upload file thực thi, chống path traversal ở `app/api/admin/gallery`.

### E. Bảo mật — Injection, XSS, và input validation
- SQL injection qua Supabase filter (`.eq()`, `.ilike()`, `.or()` với chuỗi ghép từ user input — đặc biệt nguy hiểm với `.or()`).
- XSS: tìm mọi `dangerouslySetInnerHTML`, đánh giá nội dung từ rich-text-editor có được sanitize (DOMPurify / `rehype-sanitize`) trước khi render không. Đề xuất sanitize **ở cả input và output**.
- Validation: có Zod (`zod ^3.24`) trong deps — kiểm tra có thực sự dùng ở API boundary không, hay chỉ dùng cho react-hook-form ở client. **Validation phía client không phải là bảo mật.**
- File upload: kiểm tra magic bytes chứ không chỉ extension; giới hạn kích thước; tách domain phục vụ file.
- Open redirect ở `/login` redirect param, SSRF nếu có fetch URL do user cung cấp.

### F. Bảo mật — Chống tấn công, DoS, chiếm quyền
- Rate limiting: đánh giá `lib/rate-limit.ts`, chỉ ra vì sao in-memory không hoạt động trên serverless, đề xuất Upstash Redis / Vercel KV hoặc Vercel Firewall rules, kèm code thay thế.
- Chống spam form (đây là điểm yếu lớn nhất của site tuyển sinh): Turnstile/reCAPTCHA v3, honeypot, timing check, giới hạn theo IP + email + số điện thoại.
- Chống bot scraping và enumeration ở `/forms/[id]`, `/blog/[id]`, `/events/[id]` (ID tuần tự hay UUID?).
- WAF / DDoS: cấu hình Vercel Firewall, Attack Challenge Mode, bot filtering; cân nhắc Cloudflare trước Vercel.
- Security headers đầy đủ: CSP (soạn chính sách cụ thể cho Next.js với nonce, YouTube embed, Supabase, Vercel Analytics), `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Permitted-Cross-Domain-Policies`, loại bỏ `X-Powered-By`.
- Secrets: kế hoạch **xoay toàn bộ key** sau audit (vì key đã nằm trong source), quản lý env trên Vercel theo môi trường, tách project Supabase dev/prod.
- Logging & alerting cho hành vi bất thường (nhiều lần login fail, spike submissions).

### G. Database, migration & tính toàn vẹn dữ liệu
- Xác minh **mọi tính năng đang chạy trên DB thật, không phải dữ liệu tĩnh**. Lập bảng: `trang/tính năng | nguồn dữ liệu (DB table / lib/*-data.ts / hardcode) | trạng thái`.
- Truy tìm toàn bộ mock/demo/placeholder còn sót: `via.placeholder.com`, `unsplash.com`, `lorem`, dữ liệu mẫu trong `lib/blog-data.ts`, `lib/static-pages-data.ts`, số liệu analytics giả trong `app/admin/analytics/page.tsx`, `app/admin/forms/[id]/responses/page.tsx`.
- So khớp **schema trong migration ↔ TypeScript interfaces trong `lib/supabase.ts` ↔ truy vấn thực tế trong code**. Chỉ ra cột thiếu, sai kiểu, sai enum.
- Đề xuất sinh types tự động: `supabase gen types typescript` thay cho interface viết tay.
- Migration discipline: chuyển sang migration tăng tiến có version, quy ước đặt tên, kiểm tra drift (`supabase db diff`), forward-only + rollback plan, seed data cho môi trường dev.
- Index: với mỗi truy vấn thực tế trong code, kiểm tra có index tương ứng không (đặc biệt `order by created_at`, filter theo `status`, `slug`).
- Ràng buộc toàn vẹn: FK, `NOT NULL`, `CHECK` cho enum, `UNIQUE` cho slug, cascade delete.
- Soft delete & audit trail: ai sửa nội dung gì, lúc nào (bắt buộc cho CMS đa người dùng).

### H. Backup, DR & vận hành
- Thiết kế chính sách backup cụ thể: Supabase PITR (yêu cầu gói nào), `pg_dump` định kỳ ra storage ngoài (S3/Cloudflare R2), tần suất, retention (7 ngày / 4 tuần / 12 tháng), mã hoá backup.
- Xác định **RPO và RTO mục tiêu** phù hợp với một website trường học và chứng minh thiết kế đáp ứng.
- Backup cả Storage bucket (ảnh gallery) chứ không chỉ database.
- **Quy trình khôi phục có kịch bản diễn tập** (restore drill) — viết runbook từng bước.
- Backup mã nguồn: repo có remote chưa, chiến lược branch, tag release.
- Viết sẵn script backup (bash/Node) + hướng dẫn chạy tự động (GitHub Actions cron hoặc Supabase scheduled function).

### I. UI/UX & Design system (vai Giám đốc UI/UX)
- Đánh giá tính nhất quán của design system: token màu (`maple-red`, `maple-gold`, `maple-black`, `#FDFBF7`), scale typography, spacing, radius (`rounded-2xs` — token tuỳ biến, kiểm tra định nghĩa), shadow. Có chỗ nào hardcode hex ngoài token không.
- Kiểm tra `components/ui/` (shadcn) có bị sửa lệch khỏi chuẩn, có bị dùng lẫn với component tự viết không.
- **Accessibility WCAG 2.2 AA**: contrast ratio (đặc biệt text `text-[10px]`/`text-xs` màu xám trên nền kem — nghi ngờ fail), kích thước chữ tối thiểu, target size 24×24, focus visible, keyboard navigation, ARIA cho Radix components, alt text cho toàn bộ ảnh, form label + error announcement, `prefers-reduced-motion`.
- **Responsive**: audit từng breakpoint 360 / 390 / 768 / 1024 / 1440 / 1920. Trang admin có dùng được trên tablet không.
- **Conversion / IA** (KPI = số lead tuyển sinh): đánh giá hành trình phụ huynh → CTA "Đặt lịch tham quan" / "Đăng ký tuyển sinh", số bước form, form abandonment risk, vị trí CTA, social proof, trust signals, tốc độ tải trang landing.
- Nội dung song ngữ: site tiếng Việt có cần EN không, hiện có i18n chưa, chuỗi hardcode rải khắp component.
- Mobile UX của form nhập liệu dài (admissions form có ~20 trường bao gồm y tế) — đề xuất chia bước.
- Trạng thái rỗng, loading skeleton, error state, toast — đã nhất quán chưa (`sonner` có trong deps).
- Đánh giá riêng UX của **CMS admin**: người dùng cuối là giáo viên/nhân viên trường, không phải dev. Độ phức tạp của `admin/pages` (page builder 1494 dòng) có khả dụng không, có preview không, có tự động lưu / chống mất dữ liệu không.

### J. Hiệu năng & SEO
- Core Web Vitals dự kiến: LCP, CLS, INP. Chỉ ra nguyên nhân cụ thể trong code (ảnh không `priority`, không `sizes`, font loading, client bundle lớn do `'use client'` thừa).
- Bundle analysis: chạy `@next/bundle-analyzer`, chỉ ra 5 phụ thuộc nặng nhất và cách giảm.
- Caching strategy: `revalidate`, `dynamic`, `fetch` cache, ISR cho blog/events, `unstable_cache` cho truy vấn Supabase. Hiện tại có route nào vô tình `force-dynamic` toàn bộ không.
- Ảnh: `next/image` dùng đúng chưa, `sharp` có hoạt động trên Vercel không, kích thước ảnh gốc trong `public/`.
- SEO: `metadata` API dùng đủ chưa (title/description/OG/canonical cho từng trang), `sitemap.ts` có sinh đúng từ DB không, `robots.txt`, structured data JSON-LD (`School`, `LocalBusiness`, `FAQPage`, `Event`, `Article`), `next-seo` có trùng lặp với Metadata API không.

### K. Quy trình kỹ thuật, testing & chất lượng (vai CTO)
- Thiết lập **CI/CD pipeline** cụ thể (GitHub Actions YAML hoàn chỉnh): typecheck → lint → unit test → build → e2e → preview deploy → production deploy có approval.
- Chiến lược test phù hợp với dự án này (không over-engineer): Vitest cho `lib/*` và validation schema; React Testing Library cho form components; **Playwright cho 6 luồng critical**: (1) đăng nhập admin, (2) tạo/sửa/xoá bài viết, (3) gửi form tuyển sinh, (4) đặt lịch tham quan, (5) đăng ký sự kiện, (6) chặn truy cập `/admin` khi chưa đăng nhập.
- Yêu cầu coverage tối thiểu thực tế cho từng tầng.
- ESLint + Prettier + `eslint-plugin-security` + Husky pre-commit + commitlint.
- Dependabot / Renovate, `npm audit` trong CI, secret scanning (gitleaks).
- Môi trường: tách `development / preview / production` với 3 Supabase project riêng (hoặc tối thiểu 2).
- Error tracking & observability: Sentry, log có cấu trúc, uptime monitoring, alert channel.
- Quy trình release: semantic version, changelog, rollback trong 5 phút.
- Bàn giao & bảo trì: tài liệu cần có, ai chịu trách nhiệm gì, SLA.

### L. Tuân thủ pháp lý & quyền riêng tư
- Nghị định 13/2023/NĐ-CP (Bảo vệ dữ liệu cá nhân, Việt Nam): dữ liệu trẻ em là dữ liệu cá nhân **nhạy cảm**, cần sự đồng ý của cha mẹ/người giám hộ, thông báo xử lý dữ liệu, quyền xoá, thời hạn lưu trữ.
- Rà soát `app/privacy` và `app/terms` xem có phải nội dung mẫu không, và có khớp với dữ liệu thực tế đang thu thập không.
- Cookie consent cho `@vercel/analytics` + `lib/visitor-tracking.ts` + UTM tracking.
- Chính sách lưu trữ & xoá hồ sơ tuyển sinh không trúng tuyển.
- Kiểm tra `lib/visitor-tracking.ts` (257 dòng) thu thập những gì, lưu ở đâu, có fingerprinting không.

---

## 3. ĐỊNH DẠNG BÁO CÁO BẮT BUỘC

Xuất ra các file sau trong thư mục `audit/`:

1. **`audit/00-EXECUTIVE-SUMMARY.md`** — 2 trang, dành cho lãnh đạo không chuyên kỹ thuật (tiếng Việt). Bắt đầu bằng **PHÁN QUYẾT GO-LIVE**: `KHÔNG ĐƯỢC PHÉP GO-LIVE` / `GO-LIVE CÓ ĐIỀU KIỆN` / `SẴN SÀNG`, kèm 3 lý do chính và ước lượng thời gian khắc phục (người-ngày).
2. **`audit/01-SECURITY.md`** — bảng phát hiện đầy đủ, xếp theo CVSS-like severity, có PoC và bản vá.
3. **`audit/02-ARCHITECTURE-CODE.md`** — kiến trúc, pattern, file quá dài, kế hoạch refactor.
4. **`audit/03-DATABASE-MIGRATION.md`** — schema review, RLS matrix, mock-data inventory, migration plan.
5. **`audit/04-BACKUP-DR.md`** — chính sách + runbook + script.
6. **`audit/05-UIUX-ACCESSIBILITY.md`** — design system, WCAG findings, conversion recommendations.
7. **`audit/06-PERFORMANCE-SEO.md`**
8. **`audit/07-QA-CICD-PROCESS.md`** — kèm file CI YAML và test scaffold thật.
9. **`audit/08-CLEANUP.md`** — danh sách file cần xoá + script dọn dẹp.
10. **`audit/09-PRODUCTION-READINESS-CHECKLIST.md`** — checklist có ô tick, chia **P0 (chặn go-live) / P1 (trong 2 tuần) / P2 (quý tới)**, mỗi mục có: chủ sở hữu, ước lượng công, tiêu chí nghiệm thu.
11. **`audit/10-REMEDIATION-ROADMAP.md`** — lộ trình theo tuần, có thứ tự phụ thuộc, phân biệt việc AI/dev có thể tự làm và việc cần quyết định của chủ dự án.

### Thang điểm bắt buộc
Chấm điểm 0–10 cho từng hạng mục A–L, kèm 1 câu lý giải, và **điểm tổng Production Readiness Score**. Nêu rõ ngưỡng: dưới 7.0 ở bất kỳ hạng mục bảo mật nào = tự động chặn go-live.

---

## 4. CÁCH LÀM VIỆC

1. **Giai đoạn 1 — Khảo sát**: đọc toàn bộ `app/`, `components/`, `lib/`, `hooks/`, `middleware.ts`, `next.config.mjs`, `supabase/migrations/*`, `scripts/`, `docs/`, `package.json`, `tsconfig.json`. Bỏ qua `node_modules`, `.next`, `ANH REN`, `public/images` (chỉ liệt kê metadata). Chạy `npx tsc --noEmit`, `npm run lint`, `npm audit`, `git log --oneline | head -50`, `du -sh` các thư mục.
2. **Giai đoạn 2 — Xác minh**: với mỗi dấu hiệu đỏ R1–R18 ở mục 1, xác nhận hoặc bác bỏ bằng bằng chứng code.
3. **Giai đoạn 3 — Đào sâu**: chạy đủ 12 hạng mục A–L.
4. **Giai đoạn 4 — Viết báo cáo**: xuất 11 file trên.
5. **Giai đoạn 5 — Tự kiểm chứng**: rà lại báo cáo, loại bỏ mọi khẳng định không có `path:line` làm bằng chứng; đánh dấu rõ những gì là giả định.

**Ngôn ngữ báo cáo: tiếng Việt.** Thuật ngữ kỹ thuật giữ nguyên tiếng Anh. Code comment tiếng Anh.

**Trước khi bắt đầu**, hãy đặt cho tôi tối đa 5 câu hỏi làm rõ quan trọng nhất (ví dụ: đã có Supabase production riêng chưa, gói Supabase nào, có bao nhiêu người dùng CMS, ngày dự kiến go-live, ngân sách cho WAF/monitoring). Sau đó mới tiến hành.

**Không được sửa bất kỳ file nào trong giai đoạn audit** — chỉ đọc và báo cáo. Việc sửa sẽ là một phiên riêng sau khi tôi duyệt roadmap.
