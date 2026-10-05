import Link from 'next/link'
import { PageHero, PageShell, TextBlock } from '@/components/ds'
import { SCHOOL_IMAGES } from '@/lib/constants'

/** Terms of use: content only — every element comes from the design system. */
export default function TermsPage() {
  return (
    <PageShell
      hero={<PageHero title="Điều Khoản Sử Dụng" image={SCHOOL_IMAGES.render.hanhLang1} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}
    >
      <TextBlock narrow title="Quy định & thỏa thuận chung">
        <p>
          Vui lòng đọc kỹ các điều khoản dưới đây trước khi truy cập và sử dụng dịch vụ thông tin của Sunshine Maple Bear.
        </p>
        <p>
          Bằng việc truy cập và tiếp tục sử dụng website này, Phụ huynh đồng ý tuân thủ và chịu sự ràng buộc bởi các Điều khoản &amp;
          Điều kiện dưới đây. Nếu không đồng ý, xin vui lòng ngừng truy cập.
        </p>
      </TextBlock>

      <TextBlock narrow tone="white" title="Quy Định Hiện Hành">
        <ul>
          <li>
            <a href="#so-huu-tri-tue">1. Quyền Sở Hữu Trí Tuệ</a>
          </li>
          <li>
            <a href="#su-dung-website">2. Quy Định Sử Dụng Website</a>
          </li>
          <li>
            <a href="#mien-tru">3. Miễn Trừ Trách Nhiệm</a>
          </li>
          <li>
            <a href="#lien-ket">4. Liên Kết Bên Thứ Ba</a>
          </li>
        </ul>

        <h3 id="so-huu-tri-tue">1. Quyền Sở Hữu Trí Tuệ</h3>
        <p>
          Toàn bộ nội dung hiển thị trên website bao gồm: văn bản, thiết kế đồ họa, hình ảnh, logo, video clip và mã nguồn đều thuộc
          quyền sở hữu hợp pháp của hệ thống Sunshine Maple Bear và được bảo hộ bởi luật Sở hữu trí tuệ Việt Nam.
        </p>
        <ul>
          <li>
            Nghiêm cấm mọi hành vi sao chép, trích dẫn, phân phối hoặc tái sử dụng nội dung vì mục đích thương mại khi chưa có sự đồng ý
            bằng văn bản từ Ban Giám Hiệu.
          </li>
          <li>
            Thương hiệu &quot;Maple Bear&quot; và hình ảnh nhãn hiệu biểu tượng là tài sản sở hữu trí tuệ đã được đăng ký toàn cầu.
          </li>
        </ul>

        <h3 id="su-dung-website">2. Quy Định Sử Dụng Website</h3>
        <p>Người sử dụng cam kết KHÔNG thực hiện các hành vi sau:</p>
        <ul>
          <li>Phát tán mã độc, virus hoặc thực hiện các cuộc tấn công mạng gây cản trở hoạt động của máy chủ.</li>
          <li>Sử dụng thông tin trên website để bôi nhọ, xúc phạm danh dự hoặc gây ảnh hưởng xấu tới uy tín nhà trường.</li>
          <li>Truy cập trái phép vào dữ liệu hệ thống lưu trữ của Phụ huynh và Học sinh.</li>
        </ul>

        <h3 id="mien-tru">3. Miễn Trừ Trách Nhiệm</h3>
        <p>Nhà trường luôn nỗ lực đảm bảo thông tin đăng tải được chính xác nhất. Tuy nhiên:</p>
        <ul>
          <li>
            Thông tin về chính sách tuyển sinh, học phí và lịch trình hoạt động có thể điều chỉnh phù hợp với thực tế năm học mà không
            cần báo trước.
          </li>
          <li>
            Nhà trường không chịu trách nhiệm pháp lý đối với bất kỳ thiệt hại gián tiếp nào phát sinh từ việc gián đoạn kết nối mạng
            internet của người dùng.
          </li>
        </ul>

        <h3 id="lien-ket">4. Liên Kết Bên Thứ Ba</h3>
        <p>
          Website có thể chứa liên kết tới các trang web của đối tác hoặc tổ chức giáo dục liên kết (VD: Maple Bear Global Schools).
          Việc cung cấp liên kết này nhằm mục đích hỗ trợ tra cứu cho Phụ huynh. Nhà trường không chịu trách nhiệm về nội dung hay
          chính sách bảo mật của các website bên thứ ba này.
        </p>
      </TextBlock>

      <TextBlock narrow tone="sand" title="Hiệu Lực & Sửa Đổi">
        <p>
          Các Điều khoản Sử dụng này có hiệu lực kể từ thời điểm được đăng tải công khai. Sunshine Maple Bear có quyền sửa đổi, bổ sung
          nội dung bất kỳ lúc nào để phù hợp với quy định pháp luật và hoạt động thực tế.
        </p>
        <p>
          <Link href="/privacy">Xem Chính Sách Bảo Mật</Link>
        </p>
      </TextBlock>
    </PageShell>
  )
}
