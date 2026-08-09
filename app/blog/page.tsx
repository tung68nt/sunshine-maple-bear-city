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
        const res = await fetch('/api/admin/blog')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data)
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
        <section className="relative py-20 md:py-28 bg-[#151513] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151513] via-[#151513]/90 to-transparent z-10" />
          <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-3xl mx-auto space-y-5 animate-fade-in-up">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span className="w-1.5 h-4 bg-maple-gold rounded-full inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-maple-gold">TIN TỨC & GÓC NHÌN CHUYÊN GIA MẦM NON</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                Góc Nhìn <span className="text-maple-gold">Giáo Dục</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Cập nhật những tin tức mới nhất về hoạt động trường, phương pháp giáo dục Canada và kinh nghiệm nuôi dạy con song ngữ.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-10 h-10 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 font-light text-sm">Đang tải bài viết...</p>
                </div>
              ) : posts.length > 0 ? (
                <>
                  {/* Featured Post */}
                  <div className="group relative bg-white rounded-2xs overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-64 md:h-full min-h-[260px]">
                        <Image
                          src={posts[0].featured_image || SCHOOL_IMAGES.render.lopHoc1}
                          alt={posts[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-maple-red text-white text-[10px] font-extrabold uppercase tracking-wider rounded-2xs">Nổi bật</span>
                          <span className="text-xs text-neutral-400 font-medium">
                            {new Date(posts[0].created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-maple-black mb-3 leading-snug group-hover:text-maple-red transition-colors">
                          {posts[0].title}
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 font-normal mb-6 line-clamp-3 leading-relaxed">
                          {posts[0].excerpt}
                        </p>
                        <Link href={`/blog/${posts[0].slug || posts[0].id}`} className="inline-flex items-center gap-2 text-maple-red font-bold text-xs uppercase tracking-wider group/btn">
                          Xem chi tiết <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Regular Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.slice(1).map((post, idx) => (
                      <div key={idx} className="group flex flex-col bg-white rounded-2xs overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                        <div className="relative h-52 w-full overflow-hidden">
                          <Image
                            src={post.featured_image || SCHOOL_IMAGES.render.lopHoc2}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-maple-black text-[10px] font-bold uppercase tracking-wider rounded-2xs shadow-xs">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                            <Calendar size={13} className="text-maple-gold" />
                            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                          </div>
                          
                          <h3 className="text-base font-display font-bold text-maple-black mb-3 group-hover:text-maple-red transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-xs text-neutral-600 font-normal leading-relaxed mb-6 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-maple-red font-extrabold text-xs uppercase tracking-wider">
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
              <div className="bg-white p-6 rounded-2xs border border-neutral-200 shadow-sm">
                <h4 className="text-base font-display font-extrabold text-maple-black mb-4 uppercase tracking-wide">
                  Tìm Kiếm Bài Viết
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="w-full bg-[#FDFBF7] border border-neutral-200 rounded-2xs px-4 py-3 text-xs focus:outline-none focus:border-maple-red transition-all font-bold"
                  />
                  <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-2xs border border-neutral-200 shadow-sm">
                <h4 className="text-base font-display font-extrabold text-maple-black mb-4 uppercase tracking-wide">
                  Chủ Đề Nổi Bật
                </h4>
                <div className="space-y-2">
                  {categories.map((cat, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-3 bg-[#FDFBF7] rounded-2xs text-xs font-bold text-neutral-700 hover:bg-maple-red hover:text-white transition-all group">
                      <span>{cat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-2xs bg-neutral-200 text-neutral-700 group-hover:bg-white group-hover:text-maple-red font-mono">
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
