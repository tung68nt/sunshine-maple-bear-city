# Cấu trúc Website (Sitemap) & Thống kê số lượng trang

Dưới đây là danh sách chi tiết toàn bộ các trang (pages) và trang con (subpages) trên website **Sunshine Maple Bear** dựa trên cấu trúc menu và mã nguồn hiện tại. Bảng liệt kê này giúp làm cơ sở chính xác cho việc báo giá thiết kế và lập trình.

## 1. Trang chủ (Homepage)
- **Trang chủ** (Hiển thị tổng quan các dịch vụ, triết lý, tin tức và liên kết nhanh)

## 2. Về chúng tôi (About Us)
- **Giới thiệu chung (Welcome to Sunshine)** 
  *(Lưu ý: Các phần "Triết lý & Giá trị cốt lõi" và "Đội ngũ lãnh đạo" được tích hợp chung trên trang này dưới dạng các section / anchor link)*
- **Cơ sở vật chất & Hình ảnh (Facilities & Campus / Gallery)**

## 3. Chương trình học (Academics)
- **Phương pháp giáo dục Canada (Canadian Immersion Methodology)** (Trang tổng quan)
- **Khối mầm non nhỏ (Early Years: 12 tháng - 3 tuổi)**
- **Khối mầm non lớn (Kindergarten: 3 tuổi - 5 tuổi)**
- **Hoạt động ngoại khóa (Extracurricular Activities)**

## 4. Cộng đồng & Tin tức (Community)
- **Danh sách Tin tức & Góc nhìn (Blog / News List)**
- **Trang chi tiết Tin tức (Blog Detail Layout)**
- **Danh sách Sự kiện (School Events List)**
- **Trang chi tiết Sự kiện (Event Detail Layout)**
- **Cổng thông tin phụ huynh (Parent Portal)**
- **Bảo vệ & An toàn trẻ em (Safeguarding & Child Protection)**
- **Sức khỏe & Dinh dưỡng (Health & Nutrition)**

## 5. Tuyển sinh (Admissions)
- **Tổng quan & Quy trình tuyển sinh (Admissions Process)**
- **Học phí & Học bổng (Tuition Fees & Scholarships)**
- **Đặt lịch tham quan trường (Book a School Tour)** (Trang chứa form đặc thù)
- **Câu hỏi thường gặp (FAQ)**

## 6. Liên hệ & Tiện ích chung
- **Liên hệ & Tuyển dụng (Contact & Careers)**
- **Trang Đăng nhập (Login)**
- **Chính sách bảo mật (Privacy Policy)**
- **Điều khoản sử dụng (Terms of Service)**

## 7. Các trang tính năng riêng biệt (Hệ thống nội bộ / Tool)
- **Công cụ tạo báo giá tự động (Quotation Tool)**

## 8. Hệ thống quản trị nội dung (Admin CMS)
Để website có thể cập nhật nội dung động (Dynamic Content), cần thiết kế và lập trình các trang quản trị (Admin pages) tương ứng để đấu nối cơ sở dữ liệu:
- **Dashboard Tổng quan (Admin Home)**: Thống kê truy cập, lượt đăng ký tham quan, báo cáo nhanh.
- **Admin Trang chủ**: Quản lý Banner/Slider, thông báo nổi bật.
- **Admin Về chúng tôi**: Cập nhật nội dung giới thiệu, triết lý, và danh sách Đội ngũ lãnh đạo/Giáo viên.
- **Admin Thư viện & Cơ sở vật chất (Gallery)**: Quản lý các album ảnh theo cơ sở.
- **Admin Chương trình học**: 
  - Cập nhật bài viết Phương pháp giáo dục Canada.
  - Quản lý thông tin Khối mầm non nhỏ & lớn (Cập nhật lớp học, sĩ số, thông tin chi tiết).
  - Quản lý danh sách Hoạt động ngoại khóa.
- **Admin Blog / Tin tức**: Quản lý (Thêm/Sửa/Xóa) bài viết, danh mục tin, quản lý tác giả.
- **Admin Sự kiện**: Tạo mới, lên lịch và quản lý nội dung sự kiện trường học.
- **Admin Cổng phụ huynh & An toàn (Community)**: Quản lý nội dung Safeguarding, Health & Nutrition, và Parent Portal.
- **Admin Tuyển sinh & Học phí**: Cập nhật thông tin quy trình, biểu phí (Tuition Fees), và chính sách học bổng.
- **Admin FAQ**: Quản lý bộ câu hỏi/đáp thường gặp.
- **Admin Quản lý Data khách hàng (Lead Management)**: Theo dõi và xử lý dữ liệu từ form Đặt lịch tham quan (Tour Booking) và Form liên hệ.
- **Admin Cấu hình chung**: Quản lý các thông tin dùng chung toàn trang như (SĐT, Email, Địa chỉ 3 cơ sở), link Mạng xã hội, cấu hình Header/Footer.

---

### BẢNG TỔNG HỢP SỐ LƯỢNG MÀN HÌNH / LAYOUT

| Nhóm trang | Số lượng Frontend | Số lượng Admin CMS | Tổng số layout |
|:---|:---:|:---:|:---:|
| 1. Trang chủ | 1 | 1 | 2 |
| 2. Về chúng tôi & Hình ảnh | 2 | 2 | 4 |
| 3. Chương trình học | 4 | 4 | 8 |
| 4. Cộng đồng, Tin bài & Sự kiện | 7 | 4 | 11 |
| 5. Tuyển sinh, Học phí & FAQ | 4 | 3 | 7 |
| 6. Liên hệ, Form đăng ký & Tiện ích | 4 | 2 | 6 |
| 7. Tính năng (Quotation Tool, Dashboard) | 1 | 1 | 2 |
| **TỔNG CỘNG** | **23** | **17** | **40** |

*(Ghi chú: Tổng số khoảng **40 layout/trang** đại diện cho các template hiển thị phía người dùng (Frontend) và các màn hình quản trị dữ liệu tương ứng (Backend CMS) cần được thiết kế (UI/UX) và lập trình API đấu nối Cơ sở dữ liệu.)*
