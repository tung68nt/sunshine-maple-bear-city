import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
                  CHÍNH SÁCH BẢO MẬT & AN TOÀN DỮ LIỆU
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Chính Sách <span className="text-maple-gold">Bảo Mật</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
                Tại Sunshine Maple Bear, chúng tôi cam kết bảo vệ thông tin cá nhân của Phụ huynh và Học sinh theo các tiêu chuẩn an toàn dữ liệu nghiêm ngặt nhất.
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
                    Mục Lục Nội Dung
                  </h3>
                  <ul className="space-y-3.5 text-xs font-bold text-neutral-600">
                    <li className="flex items-center gap-2.5 text-maple-red cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-maple-red" />
                      1. Mục Đích Thu Thập Thông Tin
                    </li>
                    <li className="flex items-center gap-2.5 hover:text-maple-red cursor-pointer transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      2. Phạm Vi Sử Dụng Dữ Liệu
                    </li>
                    <li className="flex items-center gap-2.5 hover:text-maple-red cursor-pointer transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      3. Cam Kết Bảo Mật An Toàn
                    </li>
                    <li className="flex items-center gap-2.5 hover:text-maple-red cursor-pointer transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      4. Quyền Lợi Của Phụ Huynh
                    </li>
                  </ul>
                  <div className="pt-5 border-t border-neutral-200">
                    <Link href="/terms" className="flex items-center justify-between group">
                      <span className="text-xs font-extrabold text-maple-black group-hover:text-maple-red transition-colors uppercase">
                        Xem Điều Khoản Sử Dụng
                      </span>
                      <ArrowRight size={16} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-maple-red transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="lg:col-span-8">
                <div className="bg-white p-8 sm:p-12 rounded-2xs border border-neutral-200 shadow-sm space-y-8">
                  
                  {/* Notice Box */}
                  <div className="bg-maple-red/5 p-6 rounded-2xs border-l-4 border-maple-red flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xs bg-maple-red/10 flex items-center justify-center text-maple-red flex-shrink-0">
                      <Info size={20} />
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed m-0">
                      Chính sách bảo mật này được cập nhật lần cuối vào ngày 01 tháng 01 năm 2026. Phụ huynh nên định kỳ kiểm tra để nắm rõ các điều khoản cập nhật mới nhất (nếu có).
                    </p>
                  </div>

                  <div className="space-y-6 text-sm text-neutral-700 leading-relaxed font-body">
                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3">
                      1. Mục Đích Thu Thập Thông Tin
                    </h2>
                    <p>
                      Nhà trường thu thập thông tin cá nhân của Phụ huynh và Học sinh thông qua hệ thống Website (Form đăng ký tham quan, Form đăng ký tư vấn tuyển sinh) nhằm phục vụ các mục đích sau:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li>Hỗ trợ, giải đáp thắc mắc và cung cấp thông tin tư vấn chính xác nhất về lộ trình học tập của bé.</li>
                      <li>Sắp xếp lịch trình tham quan trường 5 sao và chuẩn bị công tác đón tiếp chu đáo.</li>
                      <li>Gửi bản tin giáo dục, thông báo sự kiện trường và các chính sách ưu đãi học phí mới nhất (khi Phụ huynh đồng ý nhận tin).</li>
                      <li>Hoàn thiện thủ tục nhập học chính thức cho học sinh.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 pt-4">
                      2. Phạm Vi Sử Dụng Dữ Liệu
                    </h2>
                    <p>Các thông tin thu thập bao gồm:</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li>Thông tin Phụ huynh: Họ và tên, Số điện thoại Zalo, Địa chỉ Email, Địa chỉ nơi ở.</li>
                      <li>Thông tin Học sinh (nếu có): Họ tên bé, Ngày tháng năm sinh, Khối lớp quan tâm.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 pt-4">
                      3. Cam Kết Bảo Mật An Toàn
                    </h2>
                    <p>Sunshine Maple Bear cam kết bảo mật tuyệt đối dữ liệu cá nhân:</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li><strong className="text-maple-black">Không bán, trao đổi hoặc chia sẻ</strong> thông tin cá nhân cho bất kỳ bên thứ ba nào vì mục đích thương mại.</li>
                      <li>Dữ liệu được lưu trữ mã hóa an toàn trên hệ thống Server bảo mật cao, hạn chế quyền truy cập nghiêm ngặt.</li>
                      <li>Tuân thủ đầy đủ các quy định của pháp luật Việt Nam về an toàn thông tin mạng.</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black border-b border-neutral-100 pb-3 pt-4">
                      4. Quyền Lợi Của Phụ Huynh
                    </h2>
                    <p>Phụ huynh có toàn quyền:</p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                      <li>Yêu cầu kiểm tra, cập nhật, điều chỉnh hoặc xóa bỏ thông tin cá nhân khỏi hệ thống bất kỳ lúc nào.</li>
                      <li>Từ chối nhận tin nhắn quảng cáo bằng cách bấm nút "Unsubscribe" ở cuối mỗi email gửi từ nhà trường.</li>
                    </ul>
                  </div>

                  {/* Support Box */}
                  <div className="p-6 bg-[#FDFBF7] rounded-2xs border border-neutral-200 flex items-start gap-4">
                    <div className="p-2.5 bg-maple-gold/10 rounded-2xs text-maple-gold">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-display font-extrabold text-maple-black mb-1">
                        Liên Hệ Bộ Phận Hỗ Trợ
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-0">
                        Nếu Phụ huynh có bất kỳ thắc mắc nào liên quan đến Chính sách Bảo mật, vui lòng liên hệ Bộ phận Tuyển sinh & Chăm sóc qua Hotline: <strong className="text-maple-red">094 254 6655</strong> hoặc Email: <strong className="text-maple-black">tuyensinh@sunshinemaplebear.edu.vn</strong>.
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
