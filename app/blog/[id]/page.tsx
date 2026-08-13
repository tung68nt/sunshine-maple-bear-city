import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { MOCK_BLOG_POSTS } from '@/lib/blog-data'
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, BookOpen, Clock, Tag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export function generateStaticParams() {
  const params = []
  for (const post of MOCK_BLOG_POSTS) {
    params.push({ id: post.id })
    if (post.slug) {
      params.push({ id: post.slug })
    }
  }
  return params
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const post = MOCK_BLOG_POSTS.find(p => p.id === params.id || p.slug === params.id)
  if (!post) return { title: 'Bài Viết Không Tồn Tại' }

  return {
    title: `${post.title} | Sunshine Maple Bear International Kindergarten`,
    description: post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || 'Tin tức và góc nhìn chuyên gia mầm non Canada.',
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Sunshine Maple Bear'],
      images: [{ url: post.featured_image || '/logo.png', alt: post.title }]
    }
  }
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = MOCK_BLOG_POSTS.find(p => p.id === params.id || p.slug === params.id) || MOCK_BLOG_POSTS[0]
  const relatedPosts = MOCK_BLOG_POSTS.filter(p => p.id !== post.id && p.slug !== post.slug).slice(0, 2)

  const tocItems = [
    { id: 'sec-1', label: '1. Đặt An Toàn Lên Hàng Đầu' },
    { id: 'sec-2', label: '2. Môi Trường Thẩm Thấu Anh Ngữ' },
    { id: 'sec-3', label: '3. Phương Pháp Giáo Dục Tích Cực' },
    { id: 'sec-4', label: '4. Kết Luận & Lộ Trình Cho Bé' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="flex-1">
        
        {/* Hero Header Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF4EB] border-b border-neutral-200/60 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/40 to-transparent pointer-events-none" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-5 animate-fade-in-up">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#9E1B1E] text-xs font-sans font-extrabold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#9E1B1E] animate-ping" />
                <span>{post.category || 'TIN TỨC MẦM NON CANADA'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#332C2B] leading-tight tracking-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#554D4B] font-medium pt-4 border-t border-neutral-200/60 max-w-xl mx-auto">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#C5A059]" />
                  <span>{new Date(post.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[#C5A059]" />
                  <span>Sunshine Maple Bear</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C5A059]" />
                  <span>5 phút đọc</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-[#9E1B1E] transition-colors uppercase tracking-wider">
                <ArrowLeft size={16} />
                <span>Quay lại danh sách bài viết</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Sticky TOC Sidebar */}
              <aside className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  {/* Table of Contents Box */}
                  <div className="p-7 bg-white rounded-3xl border border-neutral-200/80 shadow-sm space-y-4">
                    <h4 className="font-sans font-extrabold text-[#332C2B] text-xs uppercase tracking-wider border-b border-neutral-100 pb-3 flex items-center gap-2">
                      <BookOpen size={16} className="text-[#9E1B1E]" />
                      Mục Lục Bài Viết
                    </h4>
                    <nav className="space-y-2 text-xs font-semibold text-[#554D4B]">
                      {tocItems.map((item, idx) => (
                        <a
                          key={idx}
                          href={`#${item.id}`}
                          className="block p-2.5 rounded-2xl hover:bg-[#FAF4EB] hover:text-[#9E1B1E] transition-all truncate"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Tour Booking CTA Box */}
                  <div className="p-7 bg-[#FAF4EB] text-[#332C2B] rounded-3xl border border-neutral-200/80 shadow-xs space-y-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#9E1B1E]">
                      <ShieldCheck size={22} />
                    </div>
                    <h4 className="font-serif font-bold text-lg">Đăng Ký Tham Quan 5 Sao</h4>
                    <p className="text-xs text-[#554D4B] leading-relaxed font-light">
                      Trải nghiệm trực tiếp môi trường mầm non thẩm thấu tiếng Anh 100% bản quyền Canada tại Sunshine City.
                    </p>
                    <Link
                      href="/tour-booking"
                      className="block w-full py-3.5 bg-[#9E1B1E] hover:bg-[#801316] text-white text-center rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                    >
                      Đặt Lịch Hẹn Ngay
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Article Main Text Area */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200/80 shadow-sm space-y-8">
                  
                  {/* Featured Cover Image */}
                  {post.featured_image && (
                    <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  {/* Summary Callout Box */}
                  <div className="p-6 bg-[#FAF4EB] rounded-2xl border-l-4 border-[#C5A059] text-[#332C2B] font-medium text-sm sm:text-base leading-relaxed italic">
                    "{post.excerpt}"
                  </div>

                  {/* Main Rich Text Content */}
                  <div className="space-y-8 text-sm sm:text-base text-[#554D4B] font-body leading-relaxed">
                    <div id="sec-1" className="space-y-3 pt-2">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#332C2B] border-b border-neutral-100 pb-3">
                        1. Đặt An Toàn Lên Hàng Đầu Với Tiêu Chuẩn Quốc Tế
                      </h2>
                      <p>
                        Khi lựa chọn trường mầm non quốc tế như Sunshine Maple Bear tại Sunshine City, Phụ huynh tìm kiếm nhiều hơn một không gian học tập thông thường. Đó là sự an toàn tuyệt đối từ thể chất, cảm xúc đến quy trình chăm sóc y tế khép kín.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-[#554D4B] text-sm">
                        <li>Hệ thống cơ sở vật chất bo tròn không góc nhọn, sàn trải thảm cao cấp chống va đập.</li>
                        <li>Hệ thống camera giám sát CCTV 24/7 và kiểm soát an ninh nghiêm ngặt tại cổng trường.</li>
                        <li>Đội ngũ điều dưỡng y tế học đường trực 100% thời gian hoạt động.</li>
                      </ul>
                    </div>

                    <div id="sec-2" className="space-y-3 pt-4">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#332C2B] border-b border-neutral-100 pb-3">
                        2. Môi Trường Thẩm Thấu Anh Ngữ 100% Cùng GV Canada
                      </h2>
                      <p>
                        Trẻ học ngôn ngữ không bằng cách học vẹt từ vựng, mà thông qua giao tiếp và trải nghiệm trực quan hàng ngày. Tại Sunshine Maple Bear, 100% các môn học đều được giảng dạy bằng Tiếng Anh.
                      </p>
                      <div className="p-6 bg-red-50/60 rounded-2xl border border-red-100 flex gap-4 items-start">
                        <CheckCircle2 size={22} className="text-[#9E1B1E] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#332C2B] font-semibold leading-relaxed m-0">
                          Trẻ mầm non giai đoạn 1-5 tuổi có khả năng hấp thụ song ngữ tự nhiên như ngôn ngữ mẹ đẻ nếu được tiếp xúc trong môi trường thẩm thấu hoàn toàn.
                        </p>
                      </div>
                    </div>

                    <div id="sec-3" className="space-y-3 pt-4">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#332C2B] border-b border-neutral-100 pb-3">
                        3. Phương Pháp Kỷ Luật Tích Cực Không Đòn Roi
                      </h2>
                      <p>
                        Môi trường an toàn cảm xúc giúp trẻ luôn tự tin bày tỏ ý kiến, không sợ mắc lỗi. Đội ngũ giáo viên áp dụng phương pháp Kỷ Luật Tích Cực (Positive Discipline) được tập huấn chuẩn hóa bởi Hội Đồng Giáo Dục Maple Bear Toàn Cầu.
                      </p>
                    </div>

                    <div id="sec-4" className="space-y-3 pt-4">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#332C2B] border-b border-neutral-100 pb-3">
                        4. Kết Luận & Lộ Trình Dành Cho Bé
                      </h2>
                      <p>
                        Sự kết hợp giữa chương trình mầm non bản quyền Canada và cơ sở vật chất 5 sao tại Sunshine City mang đến nền tảng vững chắc nhất cho sự phát triển toàn diện của trẻ. Kính mời Phụ huynh đăng ký tham quan thực tế để trải nghiệm không gian học tập tuyệt vời cho con.
                      </p>
                    </div>
                  </div>

                  {/* Share & Author Footer */}
                  <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FAF4EB] text-[#9E1B1E] border border-red-100 flex items-center justify-center font-extrabold text-xs">
                        SMB
                      </div>
                      <div>
                        <h5 className="text-xs font-extrabold text-[#332C2B] uppercase">Sunshine Maple Bear</h5>
                        <p className="text-[12px] text-neutral-500 font-normal">Ban Biên Tập Giáo Dục Mầm Non Canada</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                      <span>Chia sẻ bài viết:</span>
                      <a href="#" className="p-2.5 rounded-full bg-[#FAF4EB] text-[#332C2B] hover:text-[#9E1B1E] border border-neutral-200/60"><Facebook size={14} /></a>
                      <a href="#" className="p-2.5 rounded-full bg-[#FAF4EB] text-[#332C2B] hover:text-[#9E1B1E] border border-neutral-200/60"><Twitter size={14} /></a>
                      <a href="#" className="p-2.5 rounded-full bg-[#FAF4EB] text-[#332C2B] hover:text-[#9E1B1E] border border-neutral-200/60"><Linkedin size={14} /></a>
                    </div>
                  </div>

                </div>

                {/* Related Articles Section */}
                {relatedPosts.length > 0 && (
                  <div className="space-y-6 pt-4">
                    <h3 className="text-lg font-serif font-bold text-[#332C2B] uppercase tracking-wide">
                      Bài Viết Liên Quan
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {relatedPosts.map((rel, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-7 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[11px] font-extrabold text-[#C5A059] uppercase tracking-wider block">{rel.category}</span>
                            <h4 className="text-base font-serif font-bold text-[#332C2B] hover:text-[#9E1B1E] transition-colors line-clamp-2">
                              <Link href={`/blog/${rel.slug || rel.id}`}>{rel.title}</Link>
                            </h4>
                            <p className="text-xs text-[#554D4B] line-clamp-2 leading-relaxed font-light">{rel.excerpt}</p>
                          </div>
                          <Link href={`/blog/${rel.slug || rel.id}`} className="inline-flex items-center gap-1.5 text-[#9E1B1E] text-xs font-bold uppercase tracking-wider">
                            Đọc tiếp <ArrowRight size={14} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
