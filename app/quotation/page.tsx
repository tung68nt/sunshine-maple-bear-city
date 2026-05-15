'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileText, CheckCircle2, ShieldCheck, Zap, Sparkles, ArrowRight, Download, Server, Layout, Search } from 'lucide-react'
import Link from 'next/link'

export default function QuotationPage() {
  const downloadPdf = () => {
    // In a real app, this would trigger a PDF download or open a print dialog
    window.print()
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 print:bg-white">
      {/* Hide header/footer when printing */}
      <div className="print:hidden">
        <Header />
      </div>
      
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Action Bar - Hidden in print */}
          <div className="mb-8 flex justify-end print:hidden">
            <button 
              onClick={downloadPdf}
              className="flex items-center gap-2 px-6 py-3 bg-maple-black text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Download size={18} /> Tải PDF / In Báo Giá
            </button>
          </div>

          {/* Proposal Document */}
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
            {/* Document Header */}
            <div className="bg-maple-black p-10 md:p-16 relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-maple-black via-maple-black to-maple-red/20" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-maple-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-2">
                    <Sparkles size={16} className="text-maple-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/90">Giải Pháp Digital Bespoke</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                    Đề Xuất Phát Triển <br />
                    <span className="text-maple-gold">Website Giáo Dục</span>
                  </h1>
                  <p className="text-white/70 text-lg">Dự án: Hệ thống Website Sunshine Maple Bear</p>
                </div>
                
                <div className="text-left md:text-right space-y-1">
                  <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Kính gửi</p>
                  <p className="text-xl font-bold text-white">Ban Giám Hiệu</p>
                  <p className="text-white/80">Cơ sở: Sunshine City, Ciputra</p>
                  <p className="text-white/50 text-sm pt-2">Ngày: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-16 space-y-20">
              
              {/* 1. Tổng quan */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-neutral-100 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-maple-red/10 flex items-center justify-center text-maple-red">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-maple-black">1. Tổng Quan Dự Án</h2>
                </div>
                <div className="prose prose-lg max-w-none text-neutral-600">
                  <p>
                    Hệ thống website của <strong>Sunshine Maple Bear (Sunshine City)</strong> được thiết kế nhằm mục tiêu trở thành một công cụ tuyển sinh đắc lực và bộ mặt thương hiệu uy tín. Chúng tôi tập trung vào việc tạo ra một hành trình trải nghiệm mượt mà cho phụ huynh, từ khâu tìm hiểu chương trình giáo dục Canada đến lúc đặt lịch tham quan và nộp đơn nhập học trực tuyến.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {[
                    { icon: <Layout />, title: 'Trải nghiệm cao cấp', desc: 'Giao diện hiện đại, tinh tế, chuẩn quốc tế.' },
                    { icon: <Zap />, title: 'Tối ưu tuyển sinh', desc: 'Hệ thống Form thông minh, quản lý Lead tập trung.' },
                    { icon: <ShieldCheck />, title: 'Nền tảng vững chắc', desc: 'Tốc độ tải siêu nhanh, bảo mật tuyệt đối.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-3">
                      <div className="text-maple-red">{item.icon}</div>
                      <h4 className="font-bold text-maple-black">{item.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Giải pháp */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-neutral-100 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-maple-gold/10 flex items-center justify-center text-maple-gold">
                    <Server size={24} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-maple-black">2. Giải Pháp Kỹ Thuật</h2>
                </div>
                <p className="text-lg text-neutral-600">Dự án sử dụng những công nghệ hàng đầu thế giới (Premium Stack) nhằm đảm bảo hiệu suất và bảo mật cấp doanh nghiệp:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { tech: 'Next.js 16 (React)', role: 'Frontend', desc: 'Đảm bảo tốc độ tải trang dưới 1s và tối ưu SEO tuyệt đối.' },
                    { tech: 'Payload CMS', role: 'Quản trị (CMS)', desc: 'Hệ thống quản lý nội dung linh hoạt cho bộ phận Marketing.' },
                    { tech: 'PostgreSQL', role: 'Database', desc: 'Cơ sở dữ liệu ổn định và bảo mật cao cấp nhất.' },
                    { tech: 'Vercel Infrastructure', role: 'Hạ tầng', desc: 'Mạng lưới Edge Network toàn cầu, chống DDoS hiệu quả.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-neutral-200 hover:border-maple-red/30 transition-colors">
                      <div className="w-2 h-full bg-maple-red rounded-full" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider">{item.role}</span>
                        </div>
                        <h4 className="font-bold text-maple-black text-lg">{item.tech}</h4>
                        <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Báo giá */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-neutral-100 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Search size={24} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-maple-black">3. Bảng Báo Giá Chi Tiết</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 text-neutral-500 text-sm uppercase tracking-wider">
                        <th className="p-4 rounded-tl-2xl font-bold">Hạng mục</th>
                        <th className="p-4 font-bold">Chi tiết</th>
                        <th className="p-4 font-bold text-center">SL</th>
                        <th className="p-4 font-bold text-right rounded-tr-2xl">Thành tiền (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {/* Phần I */}
                      <tr className="bg-neutral-50/50">
                        <td colSpan={4} className="p-4 font-bold text-maple-red text-sm uppercase tracking-widest">Phần I: Thiết kế UI & Frontend</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Trang Chủ & Core Pages</td>
                        <td className="p-4 text-neutral-600 text-sm">Thiết kế UI/UX độc bản. Trang chủ, Giới thiệu, Liên hệ với Micro-interactions.</td>
                        <td className="p-4 text-center text-neutral-500">3</td>
                        <td className="p-4 text-right font-medium">19,500,000</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Curriculum & Admission</td>
                        <td className="p-4 text-neutral-600 text-sm">Trang chi tiết chương trình học, Quy trình tuyển sinh, Form Đặt lịch.</td>
                        <td className="p-4 text-center text-neutral-500">4</td>
                        <td className="p-4 text-right font-medium">20,000,000</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Tin tức, Gallery & Utility</td>
                        <td className="p-4 text-neutral-600 text-sm">Blog, Thư viện ảnh, FAQ, 404, Chính sách bảo mật.</td>
                        <td className="p-4 text-center text-neutral-500">11</td>
                        <td className="p-4 text-right font-medium">27,500,000</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Global Components</td>
                        <td className="p-4 text-neutral-600 text-sm">Mega Header/Footer, Mobile Nav, SEO Metadata Framework.</td>
                        <td className="p-4 text-center text-neutral-500">Gói</td>
                        <td className="p-4 text-right font-medium">8,000,000</td>
                      </tr>
                      <tr className="font-bold bg-neutral-50/30">
                        <td colSpan={3} className="p-4 text-right text-neutral-500">Cộng Phần I:</td>
                        <td className="p-4 text-right text-maple-black">75,000,000</td>
                      </tr>

                      {/* Phần II */}
                      <tr className="bg-neutral-50/50">
                        <td colSpan={4} className="p-4 font-bold text-maple-red text-sm uppercase tracking-widest border-t-2 border-white">Phần II: CMS Quản trị & Backend</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Hệ thống CMS</td>
                        <td className="p-4 text-neutral-600 text-sm">Quản lý Blog, Lớp học, Gallery ảnh, Trang tĩnh.</td>
                        <td className="p-4 text-center text-neutral-500">Gói</td>
                        <td className="p-4 text-right font-medium">18,000,000</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Logic Form & Email</td>
                        <td className="p-4 text-neutral-600 text-sm">Xử lý form tuyển sinh, tự động thông báo Email.</td>
                        <td className="p-4 text-center text-neutral-500">Gói</td>
                        <td className="p-4 text-right font-medium">12,000,000</td>
                      </tr>
                      <tr className="font-bold bg-neutral-50/30">
                        <td colSpan={3} className="p-4 text-right text-neutral-500">Cộng Phần II:</td>
                        <td className="p-4 text-right text-maple-black">30,000,000</td>
                      </tr>

                      {/* Phần III */}
                      <tr className="bg-neutral-50/50">
                        <td colSpan={4} className="p-4 font-bold text-maple-red text-sm uppercase tracking-widest border-t-2 border-white">Phần III: Hạ tầng & Tối ưu</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-maple-black">Security & SEO Tech</td>
                        <td className="p-4 text-neutral-600 text-sm">SSL, Schema Markup, Sitemap, Tối ưu Core Web Vitals.</td>
                        <td className="p-4 text-center text-neutral-500">Gói</td>
                        <td className="p-4 text-right font-medium">10,000,000</td>
                      </tr>
                      <tr className="font-bold bg-neutral-50/30">
                        <td colSpan={3} className="p-4 text-right text-neutral-500">Cộng Phần III:</td>
                        <td className="p-4 text-right text-maple-black">10,000,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tổng kết */}
                <div className="bg-maple-black text-white p-8 rounded-3xl mt-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-white/70">
                      <span>Tổng giá trị niêm yết:</span>
                      <span className="line-through">115,000,000 VNĐ</span>
                    </div>
                    <div className="flex justify-between items-center text-maple-gold font-bold pb-4 border-b border-white/20">
                      <span>Ưu đãi Gói "Giáo dục Tương lai" (23%):</span>
                      <span>- 26,200,000 VNĐ</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <div>
                        <span className="block text-2xl md:text-3xl font-display font-bold text-white">Tổng chi phí thực hiện</span>
                        <span className="text-sm text-white/50 italic font-light mt-1 block">Bằng chữ: Tám mươi tám triệu tám trăm nghìn đồng chẵn.</span>
                      </div>
                      <span className="text-3xl md:text-4xl font-display font-bold text-maple-gold">88,800,000 VNĐ</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Cam kết & Tiến độ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section className="space-y-6">
                  <h3 className="text-2xl font-bold text-maple-black border-b border-neutral-100 pb-4">Cam kết chất lượng</h3>
                  <ul className="space-y-4">
                    {[
                      'Thiết kế độc bản, không sử dụng template.',
                      'Tốc độ tải trang tối ưu (Lighthouse > 90).',
                      'Bảo hành & Hỗ trợ kỹ thuật 12 tháng.',
                      'Bàn giao toàn bộ Source Code & Tài liệu HDSD.'
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-600">
                        <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-6">
                  <h3 className="text-2xl font-bold text-maple-black border-b border-neutral-100 pb-4">Tiến độ thực hiện (8 tuần)</h3>
                  <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-2 before:w-0.5 before:bg-neutral-100">
                    {[
                      { time: 'Tuần 1-2', task: 'Thống nhất UI/UX trên Figma' },
                      { time: 'Tuần 3-5', task: 'Lập trình Frontend & Backend CMS' },
                      { time: 'Tuần 6-7', task: 'Kiểm thử (QA), Tối ưu SEO & Nhập liệu' },
                      { time: 'Tuần 8', task: 'Đào tạo sử dụng và Bàn giao chính thức' },
                    ].map((step, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-maple-gold border-4 border-white shadow-sm" />
                        <span className="font-bold text-maple-black block text-sm">{step.time}</span>
                        <span className="text-neutral-500 text-sm">{step.task}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Signature */}
              <div className="pt-16 border-t border-neutral-100 flex justify-between items-end">
                <div className="space-y-2">
                  <p className="font-bold text-maple-black">Tulie Solutions & Services</p>
                  <p className="text-sm text-neutral-500 italic">Kiến tạo giải pháp công nghệ hiệu quả.</p>
                </div>
                <div className="text-right space-y-16">
                  <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">Đại diện đề xuất</p>
                  <div className="space-y-1">
                    <p className="font-bold text-maple-black text-lg">Giám Đốc Dự Án</p>
                    <p className="text-sm text-neutral-500">Tulie Agency</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Print/Back to Home */}
          <div className="mt-12 text-center print:hidden">
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-maple-red font-medium transition-colors">
              <ArrowRight size={18} className="rotate-180" /> Quay lại trang chủ
            </Link>
          </div>
        </div>
      </main>
      
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  )
}
