import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Scale, FileSignature, AlertCircle, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-[#151513] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151513] via-[#151513]/90 to-transparent z-10" />
          <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-5 animate-fade-in-up">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">
                  QUY ĐỊNH & THỎA THUẬN CHUNG
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Điều Khoản <span className="text-maple-gold">Sử Dụng</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
                Vui lòng đọc kỹ các điều khoản dưới đây trước khi truy cập và sử dụng dịch vụ thông tin của Sunshine Maple Bear.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Sidebar Navigator */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-28 p-6 bg-white rounded-2xs border border-neutral-200 shadow-sm space-y-5">
                  <h3 className="text-lg font-display font-extrabold text-maple-black border-b border-neutral-200 pb-3 uppercase tracking-wide">
                    Quy Định Hiện Hành
                  </h3>
                  <ul className="space-y-3.5 text-xs font-bold text-neutral-600">
                    <li className="flex items-center gap-2.5 text-maple-gold cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-gold" />
                      1. Quyền Sở Hữu Trí Tuệ
                    </li>
                    <li className="flex items-center gap-2.5 hover:text-maple-gold cursor-pointer transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      2. Quy Định Sử Dụng Website
                    </li>
                    <li className="flex items-center gap-2.5 hover:text-maple-gold cursor-pointer transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      3. Miễn Trừ Trách Nhiệm
                    </li>
                    <li className="flex items-center gap-2.5 hover:text-maple-gold cursor-pointer transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      4. Liên Kết Bên Thứ Ba
                    </li>
                  </ul>
                  <div className="pt-5 border-t border-neutral-200">
                    <Link href="/privacy" className="flex items-center justify-between group">
                      <span className="text-xs font-extrabold text-maple-black group-hover:text-maple-gold transition-colors uppercase">
                        Xem Chính Sách Bảo Mật
                      </span>
                      <ArrowRight size={16} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-maple-gold transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="lg:col-span-8">
                <div className="bg-white p-8 sm:p-12 rounded-2xs border border-neutral-200 shadow-sm space-y-8">
                  
                  {/* Notice Box */}
                  <div className="bg-maple-gold/10 p-6 rounded-2xs border-l-4 border-maple-gold flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xs bg-white flex items-center justify-center text-maple-gold flex-shrink-0 shadow-xs">
                      <Info size={20} />
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed m-0">
                      Bằng việc truy cập và tiếp tục sử dụng website này, Phụ huynh đồng ý tuân thủ và chịu sự ràng buộc bởi các Điều khoản & Điều kiện dưới đây. Nếu không đồng ý, xin vui lòng ngừng truy cập.
                    </p>
                  </div>

                  <div className="space-y-6 text-sm text-neutral-700 leading-relaxed font-body">
                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3">
                      1. Quyền Sở Hữu Trí Tuệ
                    </h2>
                    <p>
                      Toàn bộ nội dung hiển thị trên website bao gồm: văn bản, thiết kế đồ họa, hình ảnh, logo, video clip và mã nguồn đều thuộc quyền sở hữu hợp pháp của hệ thống Sunshine Maple Bear và được bảo hộ bởi luật Sở hữu trí tuệ Việt Nam.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li>Nghiêm cấm mọi hành vi sao chép, trích dẫn, phân phối hoặc tái sử dụng nội dung vì mục đích thương mại khi chưa có sự đồng ý bằng văn bản từ Ban Giám Hiệu.</li>
                      <li>Thương hiệu "Maple Bear" và hình ảnh nhãn hiệu biểu tượng là tài sản sở hữu trí tuệ đã được đăng ký toàn cầu.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 pt-4">
                      2. Quy Định Sử Dụng Website
                    </h2>
                    <p>Người sử dụng cam kết KHÔNG thực hiện các hành vi sau:</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li>Phát tán mã độc, virus hoặc thực hiện các cuộc tấn công mạng gây cản trở hoạt động của máy chủ.</li>
                      <li>Sử dụng thông tin trên website để bôi nhọ, xúc phạm danh dự hoặc gây ảnh hưởng xấu tới uy tín nhà trường.</li>
                      <li>Truy cập trái phép vào dữ liệu hệ thống lưu trữ của Phụ huynh và Học sinh.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 pt-4">
                      3. Miễn Trừ Trách Nhiệm
                    </h2>
                    <p>Nhà trường luôn nỗ lực đảm bảo thông tin đăng tải được chính xác nhất. Tuy nhiên:</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li>Thông tin về chính sách tuyển sinh, học phí và lịch trình hoạt động có thể điều chỉnh phù hợp với thực tế năm học mà không cần báo trước.</li>
                      <li>Nhà trường không chịu trách nhiệm pháp lý đối với bất kỳ thiệt hại gián tiếp nào phát sinh từ việc gián đoạn kết nối mạng internet của người dùng.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 pt-4">
                      4. Liên Kết Bên Thứ Ba
                    </h2>
                    <p>
                      Website có thể chứa liên kết tới các trang web của đối tác hoặc tổ chức giáo dục liên kết (VD: Maple Bear Global Schools). Việc cung cấp liên kết này nhằm mục đích hỗ trợ tra cứu cho Phụ huynh. Nhà trường không chịu trách nhiệm về nội dung hay chính sách bảo mật của các website bên thứ ba này.
                    </p>
                  </div>

                  {/* Warning Box */}
                  <div className="p-6 bg-[#FDFBF7] rounded-2xs border border-neutral-200 flex items-start gap-4">
                    <div className="p-2.5 bg-neutral-200/50 rounded-2xs text-neutral-600">
                      <AlertCircle size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-display font-extrabold text-maple-black mb-1">
                        Hiệu Lực & Sửa Đổi
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-0">
                        Các Điều khoản Sử dụng này có hiệu lực kể từ thời điểm được đăng tải công khai. Sunshine Maple Bear có quyền sửa đổi, bổ sung nội dung bất kỳ lúc nào để phù hợp với quy định pháp luật và hoạt động thực tế.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
