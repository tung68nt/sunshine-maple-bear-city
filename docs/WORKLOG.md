# Nhật ký xử lý — giao diện mới (design system + phong cách Rugby)

Tài liệu này ghi lại đã làm gì, đang ở đâu và còn gì dở, để người tiếp theo đọc là làm tiếp được. Khi làm thêm, **ghi thêm một mục vào đầu phần "Nhật ký theo ngày"** và cập nhật phần "Hiện trạng" / "Việc còn dở".

- Nhánh làm việc: `feat/canva-ui` — remote `new-origin` (`tung68nt/sunshine-maple-bear-city`)
- Dự án Vercel: `smb-canva-ui` (team `tung68nts-projects`)
- Bản xem thử: https://smbnew.vercel.app
- Chạy ở máy: `npx next dev -p 3100` (cổng 3000 trên máy Tung thường là dự án khác)

## Hiện trạng (cập nhật 05/10/2026, commit `dd4e931`)

**Yêu cầu của khách:** bố cục và nội dung theo `design.pdf` (file Canva, 6 trang); hiệu ứng section theo rugbyschoolhanoi.com; tông màu và nội dung của Sunshine Maple Bear; toàn site dùng chung một design system, không có CSS riêng cho từng trang hay component.

**Đã xong**

| Hạng mục | Ghi chú |
| --- | --- |
| Design system | `components/ds` — một stylesheet `ds.css`, quy tắc và danh mục component trong `components/ds/README.md` |
| Trang chủ | Theo `design.pdf` trang 1; hero video cố định có parallax, tiêu đề hiện theo dòng, số liệu đếm, footer lộ dần |
| About, Academics, Admissions, Founding Families | Theo `design.pdf` trang 3–6 |
| 28 trang con công khai | Dựng bằng bộ khối kiểu Rugby (`patterns-rugby.tsx`): ảnh + chữ xen kẽ, số liệu ghim, các bước xếp lớp, hàng kẻ, trích dẫn trên ảnh |
| Bản đồ Maple Bear | `WorldMap.tsx`: world-atlas + d3-geo, 38 nước theo danh bạ "Find A School" của maplebear.ca (đối chiếu lại 05/10/2026) |
| Form | Bộ control dùng chung `forms.tsx`; endpoint và payload gửi đi giữ nguyên như bản cũ |
| Popup rời trang | `Popup.tsx` + `components/ExitIntentPopup.tsx` |
| Header/Footer dùng chung | `components/header.tsx`, `components/footer.tsx` chỉ còn bọc nav/footer của thư viện |

**Chưa chuyển sang design system:** khu quản trị (`/admin/*`), `/login`, `/quotation`, `/grdp-demo`, `/ioc-demo`. Các route `/canva-exact/*` và `public/canva-exact/css/canva.css` (bản dựng pixel cũ) vẫn còn, chưa gỡ.

## Quy ước khi làm tiếp

1. Trang chỉ chứa nội dung: import từ `@/components/ds` và ghép bằng props. Không viết class Tailwind, `style` hay file `.css` trong trang.
2. Thiếu bố cục nào thì thêm vào thư viện (component trong `components/ds` + rule ở cuối `ds.css`, tên class bắt đầu bằng `ds-`), rồi export ở `index.ts` và ghi vào README của thư viện.
3. Trang con mới: `PageShell` + `PageHero` rồi các khối trong `patterns-rugby.tsx`. Xem `app/academics/early-years/page.tsx` làm mẫu.
4. Tài liệu `docs/DESIGN_SYSTEM.md` là bản cũ (05/2026), **không còn mô tả đúng giao diện hiện tại** — dùng `components/ds/README.md`.

## Triển khai

- Đẩy code: `git push new-origin feat/canva-ui` → Vercel tự build một bản **Preview**.
- `smbnew.vercel.app` **không tự cập nhật**. Sau mỗi lần build xong phải trỏ lại:
  `vercel ls` (lấy URL bản mới nhất) rồi `vercel alias set <url-bản-mới> smbnew.vercel.app`.
- **Production** (`smb-canva-ui.vercel.app`) vẫn là bản ngày 24/09/2026, chưa promote bản mới.
- Chạy `npx next build` ở máy trước khi đẩy.

## Những điều dễ vấp

- **Font thương hiệu thiếu ký tự.** `public/canva-exact/fonts/TheSeasons-Reg.woff2` là bản cắt từ PDF: không có `j k q x z` thường, chữ `Z`, số `9`, hầu hết dấu câu và toàn bộ dấu tiếng Việt. `Heading` và `displayClass()` chỉ dùng The Seasons khi cả chuỗi đủ ký tự, nếu không thì cả tiêu đề chuyển sang Cormorant Garamond. Vì vậy tiêu đề tiếng Việt và tiêu đề có `?`, `!`, dấu phẩy đang hiện bằng font dự phòng. Cần file font đầy đủ có bản quyền để đồng nhất.
- **Vercel hết lượt Image Optimization** (gói miễn phí). Đã đặt `images.unoptimized: true` trong `next.config.mjs`; ảnh trong `public/` phải được nén sẵn (rộng tối đa 1920px) trước khi commit.
- **API quản trị trả HTML cho khách chưa đăng nhập.** `/api/admin/navigation`, `/api/admin/gallery`, `/api/admin/events` chuyển hướng về `/login`. Trang công khai đã bỏ qua phản hồi không phải JSON và dùng dữ liệu mặc định — nghĩa là khách vãng lai **không thấy** ảnh gallery, sự kiện và menu do quản trị nhập.
- **`next dev` đôi khi không nạp lại `app/globals.css`** sau khi sửa bằng script; kiểm tra file CSS đang được phát trước khi kết luận thay đổi không có tác dụng.
- **Tên class trong `ds.css` phải là duy nhất.** Đã từng trùng `.ds-map` giữa bản đồ thế giới và bản đồ Google ở trang Contact (đã đổi thành `.ds-mapembed`).
- File cũ đã thay thế nằm trong `_backups/` (thư mục này bị git bỏ qua, chỉ có ở máy Tung).

## Việc còn dở / cần khách hoặc chủ dự án quyết định

| Việc | Cần gì |
| --- | --- |
| Số liệu ở hero trang chủ | PDF để chữ giữ chỗ: "15+" và "580+" cùng nhãn "Years of excellence"; "18m" và "100%" cùng nhãn "Authentic Canadian curriculum". Cần nội dung thật |
| Ảnh mục "Key figures" trang About | Đang là ảnh stock khách sạn lấy từ PDF. Cần ảnh thật của trường |
| Ảnh 5 bước ở trang Admissions | Tự chọn từ ảnh có sẵn, chưa được duyệt |
| Lời nhận xét phụ huynh, hồ sơ giáo viên | Không có dữ liệu trong repo; khối testimonial chỉ hiện tiêu đề, trang Teachers chưa có thẻ từng người |
| Thanh điều hướng | Giữ kiểu nút kính mờ của Rugby theo yêu cầu; PDF vẽ nút viền + hamburger. Menu chỉ một cấp, không còn menu con |
| Trang chi tiết blog | Mọi bài hiện cùng một nội dung mẫu; nối với API cần quyết định cách lọc HTML an toàn |
| Dữ liệu gallery/sự kiện cho khách vãng lai | Cần API công khai (xem mục "dễ vấp") |
| `/forms/[id]` | Mọi id hiện cùng một form mặc định (có từ trước) |
| Link mạng xã hội ở footer | Instagram, LinkedIn, YouTube đang là link tạm (`components/ds/site.ts`) |
| Promote lên Production | Chưa làm, chờ duyệt bản xem thử |
| Kiểm tra bằng mắt | Mới soát kỹ trên desktop một số trang; bố cục mobile mới kiểm tra tràn ngang, chưa gửi thử form nào |

## Nhật ký theo ngày

### 05/10/2026

Thứ tự theo thời gian, mới nhất ở dưới.

1. **Hero trang chủ:** thay video nền (nén còn 1080p, bỏ tiếng); sau đó nối thêm video "cơ sở vật chất" thành một file 44,7 giây (`public/videos/hero-bg.mp4`).
2. **Hiệu ứng Rugby:** đối chiếu JS/CSS gốc của rugbyschoolhanoi.com; port parallax hero, số chạy odometer, nút phát/dừng trên mobile.
3. **Nút kính mờ không blur:** do CSS cũ (`canva.css`) gắn `will-change` lên khối bọc nút, chặn `backdrop-filter`. Đã xử lý; về sau thay hẳn bằng nav của thư viện.
4. **Trang chủ theo `design.pdf`:** dựng lại toàn bộ section theo trang 1 của PDF.
5. **Bản đồ động:** thay ảnh tĩnh bằng bản đồ SVG tương tác; bỏ đường nối Canada–Việt Nam và cố định bề rộng cột số liệu sau khi khách báo giật.
6. **Design system:** tạo `components/ds`, chuyển trang chủ sang; header/footer dùng chung và token màu, font toàn cục trỏ về thư viện. Commit `7fd7e78`.
7. **Bốn trang PDF** (About, Academics, Admissions, Founding Families) dựng lại bằng thư viện.
8. **28 trang con** chuyển sang thư viện theo kiểu section Rugby; hero trang con đổi thành ảnh toàn màn hình cố định.
9. **Chỉnh theo phản hồi:** bấm ảnh nhỏ ở khối "Why families choose" thì đổi chỗ với ảnh lớn; tiêu đề trang con dùng The Seasons in hoa như trang chủ; ẩn nav khi mở ảnh lớn; popup rời trang theo style mới; tắt Image Optimization và nén ảnh (38 MB → 7 MB). Commit `22c8c6f`.
10. **Bản đồ:** viền đậm hơn, hover phản hồi ngay, sửa lỗi trùng class gây khung nền be. Commit `a13db12`.
11. **Admissions:** quy trình tuyển sinh cuộn xếp lớp như trang Admissions của Rugby (`StickySteps`). Commit `dd4e931`.
12. Đẩy lên Vercel và trỏ `smbnew.vercel.app` sang bản mới sau mỗi commit ở mục 9–11.
