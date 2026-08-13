'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, ArrowRight, Search, Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SCHOOL_IMAGES } from '@/lib/constants'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  created_at: string
  featured_image: string
  slug: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog')
        if (res.ok) {
          const payload = await res.json()
          if (Array.isArray(payload.data) && payload.data.length > 0) {
            setPosts(payload.data.map((post: any) => ({ ...post, featured_image: post.cover_image_url || post.featured_image || post.image_url, excerpt: post.excerpt || post.summary_vi || post.summary_en || '' })))
          } else {
            setFallbackPosts()
          }
        } else {
          setFallbackPosts()
        }
      } catch (err) {
        console.error(err)
        setFallbackPosts()
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const setFallbackPosts = () => {
    setPosts([
      {
        id: 'safety-foundation',
        slug: 'safety-foundation',
        title: 'Tại Sao An Toàn Là Nền Tảng Hàng Đầu Tại Sunshine Maple Bear?',
        excerpt: 'Khám phá cách Sunshine Maple Bear xây dựng môi trường an toàn chuẩn Canada từ thể chất, cảm xúc đến dinh dưỡng học đường cho bé.',
        content: 'Chăm sóc an toàn toàn diện cho trẻ mầm non...',
        category: 'Chương trình học',
        author: 'Sunshine Maple Bear',
        created_at: '2026-05-10T00:00:00Z',
        featured_image: SCHOOL_IMAGES.render.lopHoc1
      },
      {
        id: '2',
        slug: 'parent-partnership',
        title: 'Đồng Hành Cùng Con Trong Giai Đoạn Thẩm Thấu Ngôn Ngữ',
        excerpt: 'Chuyên gia giáo dục Canada chia sẻ phương pháp tương tác tiếng Anh tự nhiên tại nhà cùng phụ huynh.',
        content: 'Giai đoạn từ 1-5 tuổi là thời điểm vàng...',
        category: 'Góc Phụ Huynh',
        author: 'Hội Đồng Cố Vấn Canada',
        created_at: '2026-05-02T00:00:00Z',
        featured_image: SCHOOL_IMAGES.render.lopHoc2
      },
      {
        id: '3',
        slug: 'nutrition-menu-2026',
        title: 'Thực Đơn Dinh Dưỡng Hữu Cơ 5 Sao Cho Trẻ Mầm Non',
        excerpt: 'Tìm hiểu quy trình kiểm soát nguồn thực phẩm hữu cơ khép kín và chế độ ăn cân bằng dưỡng chất cho học sinh.',
        content: 'Dinh dưỡng là nền tảng thể lực tốt nhất...',
        category: 'Dinh Dưỡng',
        author: 'Ban Dinh Dưỡng School Care',
        created_at: '2026-04-28T00:00:00Z',
        featured_image: SCHOOL_IMAGES.render.canTeen
      }
    ])
  }

  const categories = [
    { name: 'Tất cả bài viết', count: 12 },
    { name: 'Chương trình học Canada', count: 5 },
    { name: 'Góc Phụ huynh & Nuôi dạy con', count: 4 },
    { name: 'Dinh dưỡng & Sức khỏe', count: 3 },
    { name: 'Sự kiện & Hoạt động trường', count: 6 },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF4EB] border-b border-neutral-200/60 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/40 to-transparent pointer-events-none" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#9E1B1E] text-xs font-sans font-extrabold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#9E1B1E] animate-ping" />
                <span>TIN TỨC & GÓC NHÌN CHUYÊN GIA MẦM NON</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#332C2B] tracking-tight">
                Góc Nhìn <span className="italic font-normal text-[#9E1B1E]">Giáo Dục</span>
              </h1>
              <p className="text-base sm:text-lg text-[#554D4B] font-light max-w-2xl mx-auto leading-relaxed">
                Cập nhật những tin tức mới nhất về hoạt động trường, phương pháp giáo dục Canada và kinh nghiệm nuôi dạy con song ngữ.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-10">
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-10 h-10 border-4 border-[#9E1B1E]/20 border-t-[#9E1B1E] rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 font-light text-sm">Đang tải bài viết...</p>
                </div>
              ) : posts.length > 0 ? (
                <>
                  {/* Featured Post */}
                  <div className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
                        <Image
                          src={posts[0].featured_image || SCHOOL_IMAGES.render.lopHoc1}
                          alt={posts[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3.5 py-1 bg-[#9E1B1E] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                            Nổi bật
                          </span>
                          <span className="text-xs text-neutral-400 font-medium">
                            {new Date(posts[0].created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#332C2B] mb-3 leading-snug group-hover:text-[#9E1B1E] transition-colors">
                          {posts[0].title}
                        </h2>
                        <p className="text-sm text-[#554D4B] font-light mb-6 line-clamp-3 leading-relaxed">
                          {posts[0].excerpt}
                        </p>
                        <Link href={`/blog/${posts[0].slug || posts[0].id}`} className="inline-flex items-center gap-2 text-[#9E1B1E] font-bold text-xs uppercase tracking-wider group/btn">
                          Xem chi tiết <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Regular Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.slice(1).map((post, idx) => (
                      <div key={idx} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={post.featured_image || SCHOOL_IMAGES.render.lopHoc2}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#332C2B] text-xs font-bold uppercase tracking-wider rounded-full shadow-xs border border-neutral-100">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-7">
                          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                            <Calendar size={13} className="text-[#C5A059]" />
                            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                          </div>
                          
                          <h3 className="text-lg font-serif font-bold text-[#332C2B] mb-3 group-hover:text-[#9E1B1E] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-sm text-[#554D4B] font-light leading-relaxed mb-6 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[#9E1B1E] font-bold text-xs uppercase tracking-wider">
                            <Link href={`/blog/${post.slug || post.id}`} className="hover:underline">Đọc bài viết</Link>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-neutral-400 font-light">
                  Chưa có bài viết nào được đăng tải.
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Search */}
              <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-sm">
                <h4 className="text-sm font-sans font-extrabold text-[#332C2B] mb-4 uppercase tracking-wider">
                  Tìm Kiếm Bài Viết
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="w-full bg-[#FAF4EB] border border-neutral-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#9E1B1E] transition-all font-medium text-[#332C2B] placeholder:text-neutral-400"
                  />
                  <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-sm">
                <h4 className="text-sm font-sans font-extrabold text-[#332C2B] mb-4 uppercase tracking-wider">
                  Chủ Đề Nổi Bật
                </h4>
                <div className="space-y-2.5">
                  {categories.map((cat, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-3.5 bg-[#FAF4EB]/60 rounded-2xl text-xs font-semibold text-[#554D4B] hover:bg-[#9E1B1E] hover:text-white transition-all group">
                      <span>{cat.name}</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-neutral-600 group-hover:bg-white/20 group-hover:text-white font-mono border border-neutral-200/50 group-hover:border-transparent">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
