# Executive summary — Sunshine Maple Bear

## PHÁN QUYẾT GO-LIVE: **KHÔNG ĐƯỢC PHÉP GO-LIVE**

**Vai trò: CTO.** Không được đưa website/CMS hiện tại lên Internet trong tuần tới. Ba lý do chặn:

1. **CMS không có xác thực thực sự.** Form login đặt cookie do JavaScript kiểm soát và middleware tin cookie đó; bất kỳ người nào cũng có thể trở thành admin. Bằng chứng: `app/login/page.tsx:17-37`, `middleware.ts:12-59`.
2. **Dữ liệu tuyển sinh/PII có thể bị ghi công khai, spam và có nguy cơ lộ qua API/RLS.** Migration cho phép insert công khai vào `admissions`, `tour_bookings`, `form_responses` (`supabase/migrations/20260808_master_schema.sql:313-315`); backend trả lại PII đã gửi (`app/api/submissions/admission/route.ts:94-100`).
3. **Bản build không đáng tin cậy.** 17 TypeScript errors bị che bằng `ignoreBuildErrors` (`next.config.mjs:3-5`); lint không chạy vì không có binary/config.

### Bối cảnh và quyết định vận hành

**Vai trò: CTO/SRE.** Nhóm marketing 2–3 người, Supabase Free và Vercel Free có thể phục vụ một landing site nhỏ, nhưng không thay thế auth, RLS và kiểm soát dữ liệu. Với mốc một tuần, phạm vi hợp lý là một **P0 hardening release**, không phải hoàn thiện CMS page builder hay analytics. Ước lượng: **8–11 người-ngày** (1 senior full-stack + 0.5 ngày owner UAT); nếu chỉ có một người, dời go-live ít nhất 2 tuần hoặc tắt CMS/form PII.

### Điều phải hoàn thành trước khi mở site

- Thay fake login bằng Supabase Auth SSR, thực thi role tại tất cả handler; bỏ cookie `smb_admin_session` và mật khẩu trong source.
- RLS deny-by-default: public chỉ đọc nội dung đã published; insert lead chỉ qua server và payload hợp lệ; PII chỉ role admin.
- Zod server-side, escaping email HTML, Cloudflare Turnstile free + honeypot + rate limit phù hợp free tier.
- Tắt `ignoreBuildErrors`, sửa toàn bộ 17 lỗi, cài ESLint, typecheck/lint/build xanh.
- Không trả PII trong response, bổ sung consent và quy trình retention/deletion.

### Production Readiness Score

| Hạng mục | Điểm /10 | Lý do ngắn |
|---|---:|---|
| A Kiến trúc | 3.5 | Client-heavy, không DAL, file đơn khối lớn. |
| B Vệ sinh repo | 3.0 | Bản sao/rác/asset 67 MB và git-tracked `.DS_Store`. |
| C Auth/Authz | 0.0 | Bypass admin không cần mật khẩu. |
| D Supabase/RLS | 2.0 | RLS bật nhưng public policies quá rộng, không RBAC. |
| E Injection/XSS | 2.5 | Rich text unsanitized, email HTML interpolation. |
| F Chống tấn công | 2.0 | In-memory rate-limit, thiếu anti-bot và headers. |
| G Database/migration | 3.0 | Một master migration, contract schema/code lệch. |
| H Backup/DR | 1.0 | Chưa có policy/runbook/restore drill. |
| I UI/UX/A11y | 5.0 | Brand nhất quán một phần, client forms dài và nhiều text 10px. |
| J Performance/SEO | 4.5 | Static/client bundle lớn, sitemap/blog dùng mock. |
| K QA/CI/CD | 1.5 | Không test/CI; type errors bị nuốt. |
| L Privacy/pháp lý | 2.0 | Thu PII trẻ em nhưng consent/retention/cookie governance chưa đủ. |

**Điểm tổng: 2.5/10.** Theo ngưỡng đã thống nhất, bất kỳ hạng mục bảo mật nào dưới 7.0 tự động chặn go-live.

### Cần chủ dự án xác nhận

1. Supabase Free không có PITR: có chấp nhận RPO 24h/RTO 8h với backup thủ công ngoài nền tảng miễn phí không?
2. Ai là Data Controller/DPO đầu mối, và ai phê duyệt thông báo đồng ý của phụ huynh?
3. Có thể dùng Cloudflare Turnstile (free) và một domain email đã xác thực cho Resend không?
4. Supabase dashboard hiện có Storage buckets/policies, Auth email provider, và dữ liệu production nào? Không thể xác minh từ source.
