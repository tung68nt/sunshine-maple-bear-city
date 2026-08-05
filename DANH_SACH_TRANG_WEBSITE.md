# DANH SÁCH CHI TIẾT CÁC TRANG & GIAO DIỆN WEBSITE SUNSHINE MAPLE BEAR
**Phạm vi dự án:** 23 Trang hiển thị (Public Pages) + 10 Trang quản trị (Admin Dashboard CMS)

---

## 1. CÁC TRANG HIỂN THỊ CÔNG KHAI (PUBLIC PAGES)
Giao diện hiển thị cho Phụ huynh, Học sinh và Khách truy cập bên ngoài:

| STT | Tên Trang / Layout | URL Route | Loại nội dung | Mô tả giao diện |
| :--- | :--- | :--- | :---: | :--- |
| 1 | **Trang chủ** | `/` | Trang chủ chính | Hero banner, Giới thiệu nhanh, Khối lớp, Đánh giá, Tin tức nổi bật. |
| 2 | **Giới thiệu** | `/about` | Trang tĩnh | Lịch sử trường, Sứ mệnh - Tầm nhìn, Cơ sở vật chất, Giá trị cốt lõi. |
| 3 | **Chương trình học tổng quan** | `/academics` | Trang tĩnh | Giới thiệu phương pháp giáo dục Canada, 8 vùng phát triển, 6 trụ cột. |
| 4 | **Khối lớp nhỏ (Early Years)** | `/academics/early-years` | Trang tĩnh | Lớp nhà trẻ (12 tháng - 3 tuổi), lịch sinh hoạt mẫu, sĩ số. |
| 5 | **Khối lớp lớn (Kindergarten)** | `/academics/kindergarten` | Trang tĩnh | Lớp mẫu giáo (3 tuổi - 5 tuổi), phương pháp học qua trải nghiệm. |
| 6 | **Hoạt động ngoại khóa** | `/academics/extracurricular` | Trang tĩnh | Lớp năng khiếu, CLB nghệ thuật, dã ngoại, trại hè. |
| 7 | **Quy trình Tuyển sinh** | `/admissions` | Trang tĩnh/Form | Các bước nộp hồ sơ, điều kiện nhập học, thời gian tuyển sinh. |
| 8 | **Biểu phí & Học bổng** | `/admissions/tuition-fees` | Trang tĩnh | Học phí chi tiết theo cấp học, chính sách ưu đãi nhập học sớm. |
| 9 | **Đặt lịch tham quan trường** | `/tour-booking` | Trang chứa Form | Form đặt lịch tích hợp bộ lịch tương tác chọn ngày & khung giờ trống. |
| 10 | **Thư viện hình ảnh** | `/gallery` | Trang động | Lưới album ảnh phân loại theo hoạt động lớp học, sự kiện trường. |
| 11 | **Danh sách Tin tức & Bài viết** | `/blog` | Trang động | Phân trang danh sách bài viết chia sẻ kiến thức nuôi dạy con, tin tức. |
| 12 | **Chi tiết Bài viết** | `/blog/[id]` | Trang động | Nội dung bài viết chi tiết, thanh mục lục động (TOC), bài liên quan. |
| 13 | **Danh sách Sự kiện** | `/events` | Trang động | Lịch biểu sự kiện, các thẻ sự kiện sắp diễn ra và đã kết thúc. |
| 14 | **Chi tiết Sự kiện** | `/events/[id]` | Trang động | Thông tin chương trình sự kiện, bản đồ địa điểm và form đăng ký (RSVP). |
| 15 | **Cổng thông tin phụ huynh** | `/community/parent-portal` | Trang tĩnh | Trang tổng quan giới thiệu và hướng dẫn phụ huynh đăng nhập hệ thống. |
| 16 | **Bảo vệ an toàn trẻ em** | `/community/safeguarding` | Trang tĩnh | Cam kết an toàn, quy chuẩn đưa đón học sinh, kiểm soát ra vào. |
| 17 | **Dinh dưỡng & Sức khỏe** | `/community/health` | Trang tĩnh | Thực đơn dinh dưỡng tuần, quy định cách ly y tế khi trẻ ốm. |
| 18 | **Câu hỏi thường gặp (FAQ)** | `/faq` | Trang tĩnh | Bộ câu hỏi đáp nhanh (Accordion) về tuyển sinh, xe đưa đón, bán trú. |
| 19 | **Liên hệ & Tuyển dụng** | `/contact` | Trang chứa Form | Bản đồ trường, SĐT/Hotline, email, biểu mẫu gửi phản hồi nhanh. |
| 20 | **Trang đăng nhập** | `/login` | Trang đăng nhập | Form xác thực email/mật khẩu truy cập hệ thống quản trị. |
| 21 | **Chính sách bảo mật** | `/privacy` | Trang pháp lý | Điều khoản bảo mật dữ liệu cá nhân của phụ huynh & học sinh. |
| 22 | **Điều khoản dịch vụ** | `/terms` | Trang pháp lý | Các thỏa thuận sử dụng website và quy định pháp lý đi kèm. |
| 23 | **Công cụ báo học phí** | `/quotation` | Trang tính toán | Bảng tính học phí tự động dựa trên khối học và dịch vụ đăng ký. |

---

## 2. CÁC TRANG QUẢN TRỊ NỘI DUNG (ADMIN DASHBOARD CMS)
Giao diện đăng nhập dành riêng cho Ban giám hiệu và Admin trường quản lý dữ liệu:

| STT | Tên Trang Quản Trị | URL Route | Chức năng chi tiết |
| :--- | :--- | :--- | :--- |
| 1 | **Dashboard tổng quan** | `/admin` | Biểu đồ tăng trưởng tuyển sinh, danh sách việc cần làm, thống kê nhanh. |
| 2 | **Quản lý Đơn tuyển sinh** | `/admin/admissions` | Danh sách hồ sơ đăng ký học sinh, phê duyệt/từ chối đơn, ghi chú nội bộ. |
| 3 | **Quản lý Lịch tham quan** | `/admin/tour-bookings` | Lịch biểu (Calendar View) tiếp đón phụ huynh tham quan, gửi email xác nhận. |
| 4 | **Quản lý Tin tức / Blog** | `/admin/blog` | Trình soạn thảo bài viết mới (WYSIWYG), biên tập nội dung, tối ưu SEO. |
| 5 | **Quản lý Thư viện ảnh** | `/admin/gallery` | Upload ảnh kéo thả, chia album ảnh theo chủ đề, sửa chú thích. |
| 6 | **Quản lý Thông báo** | `/admin/announcements` | Soạn thông báo khẩn, gửi email đồng loạt tới toàn bộ phụ huynh. |
| 7 | **Báo cáo & Thống kê** | `/admin/analytics` | Xem thống kê lượng truy cập, tỷ lệ chuyển đổi, báo cáo Google Analytics. |
| 8 | **Quản lý Nhân sự / Đội ngũ** | `/admin/staff` | Thêm giáo viên/Ban giám hiệu mới, đăng ảnh, tiểu sử lên trang Giới thiệu. |
| 9 | **Quản lý Trang tĩnh** | `/admin/content/pages` | Dropdown chọn trang (Giới thiệu, Sứ mệnh...) để chỉnh sửa trực tiếp text. |
| 10 | **Cài đặt chung hệ thống** | `/admin/settings` | Thay đổi hotline, email, link mạng xã hội tự động đồng bộ Header/Footer. |
