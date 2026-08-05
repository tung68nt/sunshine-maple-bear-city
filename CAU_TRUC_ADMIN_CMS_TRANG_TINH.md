# THIẾT KẾ CẤU TRÚC TRANG QUẢN TRỊ NỘI DUNG TĨNH (STATIC PAGES CMS)
Tài liệu định hướng thiết kế giao diện Admin và Cơ sở dữ liệu để cập nhật nội dung cho các trang tĩnh (Trang chủ, Giới thiệu, Chương trình học, Dinh dưỡng, An toàn...) một cách tối ưu và trực quan cho người sử dụng không chuyên.

---

## 1. PHƯƠNG ÁN THIẾT KẾ: BỘ SOẠN THẢO THEO PHẦN (STRUCTURED SECTION EDITOR)
Thay vì sử dụng bộ editor kéo thả tự do dễ gây vỡ bố cục (Layout) và lệch chuẩn nhận diện thương hiệu của Maple Bear, hệ thống sử dụng phương pháp **Structured Section Editor** (Quản lý nội dung theo cấu trúc từng phần):

*   **Cách hoạt động:** Giao diện Admin chia mỗi trang tĩnh thành các Section (Phần) khớp chính xác với giao diện ngoài Frontend.
*   **Loại trường nhập liệu:** Mỗi Section cung cấp các trường nhập liệu tương ứng: Text Input (cho Tiêu đề), Rich Text Editor (cho đoạn mô tả dài), Image Upload (cho ảnh banner/ảnh minh họa) và Repeatable List (để thêm/bớt danh sách phần tử dạng lưới).
*   **Ưu điểm:** Giữ thiết kế chuẩn Premium 100%, responsive hoạt động hoàn hảo, nhân sự trường chỉ cần nhập chữ và upload ảnh là chạy.

---

## 2. THIẾT KẾ CẤU TRÚC GIAO DIỆN QUẢN TRỊ (ADMIN UI LAYOUT)

Trang quản trị các trang tĩnh sẽ nằm ở URL: `/admin/content/pages`.  
Tại đây, Admin chọn trang cần chỉnh sửa ở thanh danh sách bên trái (Sidebar), vùng bên phải sẽ hiển thị các Tab chỉnh sửa theo từng phần.

### 2.1. Quản lý Trang chủ (`/admin/content/pages?slug=home`)
Trang chủ gồm các phần sau:

```
[Tab: Hero Banner]
 ├── Ảnh nền Banner (Upload kéo thả kéo/thả)
 ├── Tiêu đề chính (Text Input - Ví dụ: "Nurturing Global Citizens")
 ├── Dòng mô tả ngắn (Text Area)
 └── Nút Kêu gọi Hành động (CTA: Text và Link liên kết)

[Tab: Lý do chọn trường - Why Choose Us]
 ├── Mô tả tiêu đề phụ (Text Input)
 └── Danh sách các cột lợi ích (Tối đa 4 cột, hỗ trợ sắp xếp):
      ├── Phần tử 1: [Icon (Dropdown chọn)] | [Tiêu đề cột] | [Mô tả ngắn]
      ├── Phần tử 2: [Icon (Dropdown chọn)] | [Tiêu đề cột] | [Mô tả ngắn]
      └── (Nút Thêm lợi ích / Xóa lợi ích)

[Tab: Khối lớp & Chương trình]
 ├── Tiêu đề & Mô tả phần Khối lớp
 └── Chọn các Khối lớp muốn nổi bật ra Trang chủ (Checkbox chọn từ danh sách Lớp học)
```

---

### 2.2. Quản lý Trang Giới thiệu (`/admin/content/pages?slug=about`)
Trang giới thiệu gồm các phần sau:

```
[Tab: Câu chuyện lịch sử - Our Story]
 ├── Hình ảnh câu chuyện (Upload ảnh chất lượng cao)
 ├── Tiêu đề chính (Text Input)
 ├── Nội dung câu chuyện (Trình soạn thảo WYSIWYG - Chèn được link, in đậm/nghiêng)
 └── Các số liệu thống kê (Milestones):
      ├── Số lượng trường toàn cầu (Số: 550+ | Đơn vị: Trường học)
      └── Số lượng quốc gia (Số: 30+ | Đơn vị: Quốc gia & Vùng lãnh thổ)

[Tab: Sứ mệnh & Tầm nhìn - Mission & Vision]
 ├── [Sứ mệnh]: Tiêu đề | Đoạn văn bản mô tả | Icon đại diện
 └── [Tầm nhìn]: Tiêu đề | Đoạn văn bản mô tả | Icon đại diện

[Tab: Giá trị cốt lõi - Core Values]
 └── Danh sách 5 giá trị cốt lõi (Có thể kéo thả thay đổi thứ tự):
      ├── Phần tử 1: [Tên giá trị (Ví dụ: Safety First)] | [Mô tả chi tiết] | [Ảnh/Icon đại diện]
      └── (Hỗ trợ Thêm/Sửa/Xóa phần tử)
```

---

### 2.3. Quản lý Chương trình học (`/admin/content/pages?slug=academics`)
Dùng để quản lý thông tin các khối học chính (Early Years, Kindergarten, Extracurricular).

```
[Tab: Tổng quan Academics]
 ├── Banner chính của trang Chương trình học
 ├── Tiêu đề & Giới thiệu triết lý Giáo dục Canada
 └── Rich Text giới thiệu "8 Vùng phát triển toàn diện của Trẻ"

[Tab: Các Khối học (Nhà trẻ / Mẫu giáo)]
 └── Mỗi khối học có form quản lý chi tiết:
      ├── Tên khối học (Ví dụ: Khối Nhà trẻ - Early Years)
      ├── Độ tuổi tiếp nhận (Ví dụ: 12 tháng - 36 tháng)
      ├── Sĩ số tối đa/lớp (Số)
      ├── Ngôn ngữ giảng dạy (Ví dụ: Song ngữ / Quốc tế)
      ├── Lịch sinh hoạt mẫu (Upload file PDF hoặc biên tập thời khóa biểu dạng bảng)
      └── Ảnh đại diện & Gallery ảnh riêng của khối lớp
```

---

### 2.4. Quản lý Thông tin liên lạc & Cấu hình chung (`/admin/settings`)
Quản lý các thông tin lặp đi lặp lại ở Header, Footer và trang Liên hệ:

```
[Tab: Thông tin liên hệ]
 ├── Tên trường pháp lý (Text Input)
 ├── Hotline chính | Số điện thoại Tuyển sinh (Text Input)
 ├── Email tiếp nhận thông tin (Email Input)
 └── Danh sách các Cơ sở (Hỗ trợ Thêm/Sửa/Xóa):
      ├── Cơ sở 1: [Tên cơ sở] | [Địa chỉ chi tiết] | [Link Google Maps nhúng]
      └── Cơ sở 2: [Tên cơ sở] | [Địa chỉ chi tiết] | [Link Google Maps nhúng]

[Tab: Mạng xã hội & Khác]
 ├── Link Fanpage Facebook
 ├── Link kênh YouTube
 ├── Logo trường (Upload ảnh PNG trong suốt)
 └── Mã theo dõi (Google Analytics ID, Facebook Pixel ID...)
```

---

## 3. CƠ SỞ DỮ LIỆU ĐỂ LƯU TRỮ (DATABASE SCHEMA DESIGN)

Để lưu trữ các nội dung động theo từng phần này, hệ thống sẽ sử dụng hai bảng chính trong Supabase:

### Bảng 1: Bảng `pages` (Cho các trang tĩnh có cấu trúc cố định)
Mỗi trang tĩnh là một dòng (row) trong bảng. Các phần nội dung phức tạp được cấu trúc hóa dưới định dạng **JSONB** để dễ dàng truy xuất và mở rộng.

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL, -- 'home', 'about', 'safeguarding', 'health'
  title VARCHAR(255) NOT NULL,       -- Tiêu đề chính để SEO
  
  -- Lưu toàn bộ cấu trúc nội dung của trang dưới dạng JSON
  -- Ví dụ trang About: { "story": { "title": "...", "content": "..." }, "milestones": [...] }
  content JSONB NOT NULL DEFAULT '{}', 
  
  -- SEO Metadata
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(255),
  
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bảng 2: Bảng `settings` (Cho cấu hình liên hệ và toàn trang)
Lưu các biến cấu hình dạng Key - Value để gọi ra mọi vị trí trên trang:

```sql
CREATE TABLE settings (
  key VARCHAR(255) PRIMARY KEY, -- 'school_phone', 'school_email', 'school_address_1'
  value TEXT NOT NULL,          -- Nội dung cấu hình tương ứng
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. LUỒNG XỬ LÝ KỸ THUẬT (DATA FLOW)
1.  **Khi Admin chỉnh sửa:** Admin lưu thông tin trên UI -> Client gửi dữ liệu dạng JSON lên API route `POST /api/admin/pages` -> API kiểm tra quyền Admin, thực hiện lưu trữ JSON vào Supabase.
2.  **Phía Người dùng truy cập (Frontend):** 
    *   Sử dụng cơ chế **Incremental Static Regeneration (ISR)** hoặc **Server-side Rendering (SSR)** của Next.js.
    *   Trang `/about` sẽ lấy dữ liệu từ bảng `pages` nơi `slug = 'about'`. Sau đó render trực tiếp các giá trị JSON vào đúng các Component UI tương ứng.
    *   Đảm bảo tốc độ tải trang gần như tức thì do nội dung được build tĩnh và cache trên CDN toàn cầu của Vercel.
