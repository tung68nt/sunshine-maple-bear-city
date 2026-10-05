import Link from 'next/link'
import { PageHero, PageShell, TextBlock } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

/** Privacy policy: content only — every element comes from the design system. */
export default function PrivacyPage() {
  return (
    <PageShell
      hero={<PageHero title="Chính Sách Bảo Mật" image={SCHOOL_IMAGES.render.thuVien2} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}
    >
      <TextBlock narrow title="Chính sách bảo mật & an toàn dữ liệu">
        <p>
          Tại Sunshine Maple Bear, chúng tôi cam kết bảo vệ thông tin cá nhân của Phụ huynh và Học sinh theo các tiêu chuẩn an toàn dữ
          liệu nghiêm ngặt nhất.
        </p>
        <p>
          Chính sách bảo mật này được cập nhật lần cuối vào ngày 01 tháng 01 năm 2026. Phụ huynh nên định kỳ kiểm tra để nắm rõ các
          điều khoản cập nhật mới nhất (nếu có).
        </p>
      </TextBlock>

      <TextBlock narrow tone="white" title="Mục Lục Nội Dung">
        <ul>
          <li>
            <a href="#muc-dich">1. Mục Đích Thu Thập Thông Tin</a>
          </li>
          <li>
            <a href="#pham-vi">2. Phạm Vi Sử Dụng Dữ Liệu</a>
          </li>
          <li>
            <a href="#cam-ket">3. Cam Kết Bảo Mật An Toàn</a>
          </li>
          <li>
            <a href="#quyen-loi">4. Quyền Lợi Của Phụ Huynh</a>
          </li>
        </ul>

        <h3 id="muc-dich">1. Mục Đích Thu Thập Thông Tin</h3>
        <p>
          Nhà trường thu thập thông tin cá nhân của Phụ huynh và Học sinh thông qua hệ thống Website (Form đăng ký tham quan, Form đăng
          ký tư vấn tuyển sinh) nhằm phục vụ các mục đích sau:
        </p>
        <ul>
          <li>Hỗ trợ, giải đáp thắc mắc và cung cấp thông tin tư vấn chính xác nhất về lộ trình học tập của bé.</li>
          <li>Sắp xếp lịch trình tham quan trường 5 sao và chuẩn bị công tác đón tiếp chu đáo.</li>
          <li>
            Gửi bản tin giáo dục, thông báo sự kiện trường và các chính sách ưu đãi học phí mới nhất (khi Phụ huynh đồng ý nhận tin).
          </li>
          <li>Hoàn thiện thủ tục nhập học chính thức cho học sinh.</li>
        </ul>

        <h3 id="pham-vi">2. Phạm Vi Sử Dụng Dữ Liệu</h3>
        <p>Các thông tin thu thập bao gồm:</p>
        <ul>
          <li>Thông tin Phụ huynh: Họ và tên, Số điện thoại Zalo, Địa chỉ Email, Địa chỉ nơi ở.</li>
          <li>Thông tin Học sinh (nếu có): Họ tên bé, Ngày tháng năm sinh, Khối lớp quan tâm.</li>
        </ul>

        <h3 id="cam-ket">3. Cam Kết Bảo Mật An Toàn</h3>
        <p>Sunshine Maple Bear cam kết bảo mật tuyệt đối dữ liệu cá nhân:</p>
        <ul>
          <li>
            <strong>Không bán, trao đổi hoặc chia sẻ</strong> thông tin cá nhân cho bất kỳ bên thứ ba nào vì mục đích thương mại.
          </li>
          <li>Dữ liệu được lưu trữ mã hóa an toàn trên hệ thống Server bảo mật cao, hạn chế quyền truy cập nghiêm ngặt.</li>
          <li>Tuân thủ đầy đủ các quy định của pháp luật Việt Nam về an toàn thông tin mạng.</li>
        </ul>

        <h3 id="quyen-loi">4. Quyền Lợi Của Phụ Huynh</h3>
        <p>Phụ huynh có toàn quyền:</p>
        <ul>
          <li>Yêu cầu kiểm tra, cập nhật, điều chỉnh hoặc xóa bỏ thông tin cá nhân khỏi hệ thống bất kỳ lúc nào.</li>
          <li>Từ chối nhận tin nhắn quảng cáo bằng cách bấm nút &quot;Unsubscribe&quot; ở cuối mỗi email gửi từ nhà trường.</li>
        </ul>
      </TextBlock>

      <TextBlock narrow tone="sand" title="Liên Hệ Bộ Phận Hỗ Trợ">
        <p>
          Nếu Phụ huynh có bất kỳ thắc mắc nào liên quan đến Chính sách Bảo mật, vui lòng liên hệ Bộ phận Tuyển sinh &amp; Chăm sóc qua
          Hotline: <strong>094 254 6655</strong> hoặc Email: <strong>tuyensinh@sunshinemaplebear.edu.vn</strong>.
        </p>
        <p>
          <Link href="/terms">Xem Điều Khoản Sử Dụng</Link>
        </p>
      </TextBlock>
    </PageShell>
  )
}
