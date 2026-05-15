'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Newspaper, Search, ChevronRight } from 'lucide-react'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })

        if (error) throw error
        setPosts(data || [])
      } catch (error) {
        console.error('Error fetching blog posts, using mock data:', error)
        setPosts([
          {
            id: '1',
            title: 'Launching the Sunshine Talk 2026 English Speech Contest',
            excerpt: 'Enhancing academic excellence and building confident English communication skills through our annual speech competition.',
            category: 'Events',
            created_at: new Date('2026-03-20').toISOString(),
            featured_image: null,
          },
          {
            id: '2',
            title: 'Workshop: Preparing Your Child for Grade 1 Success',
            excerpt: 'Practical insights from child psychologists and primary school educators helping parents prepare the best foundation for their child.',
            category: 'Parenting Tips',
            created_at: new Date('2026-03-10').toISOString(),
            featured_image: null,
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const categories = [
    'All',
    'Education',
    'Nutrition',
    'Events',
    'Parenting Tips',
    'Curriculum',
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-dark)]">
          <div className="absolute inset-0 opacity-40">
            <Image
              src={SCHOOL_IMAGES.render.hanhLang1}
              alt="Blog Hero"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 to-[var(--color-dark)]/30" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maple-red/10 border border-maple-red/20 backdrop-blur-md mb-4">
                <Newspaper size={18} className="text-maple-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">News & Insights</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Knowledge <span className="text-maple-gold">Blog</span></h1>
              <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
                Stay updated with the latest school activities and expert insights on early childhood education and parenting.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16">
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-12 h-12 border-4 border-maple-red/20 border-t-maple-red rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-500 font-light">Loading articles...</p>
                </div>
              ) : posts.length > 0 ? (
                <>
                  {/* Featured Post */}
                  <div className="group relative bg-neutral-light-gray rounded-[40px] overflow-hidden border border-neutral-100 hover:shadow-2xl transition-all duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-80 md:h-full">
                        <Image
                          src={posts[0].featured_image || SCHOOL_IMAGES.render.lopHoc1}
                          alt={posts[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="px-4 py-1 bg-maple-red text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Featured</span>
                          <span className="text-sm text-neutral-400 font-light">{new Date(posts[0].created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-maple-black mb-4 leading-tight group-hover:text-maple-red transition-colors">{posts[0].title}</h2>
                        <p className="text-neutral-500 font-light mb-8 line-clamp-3 leading-relaxed">{posts[0].excerpt}</p>
                        <a href={`/blog/${posts[0].id}`} className="flex items-center gap-2 text-maple-red font-bold group/btn">
                          Read Article <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Regular Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {posts.slice(1).map((post, idx) => (
                      <div key={idx} className="group space-y-6">
                        <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                          <Image
                            src={post.featured_image || SCHOOL_IMAGES.render.lopHoc2}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-4 py-1 bg-white/90 backdrop-blur-sm text-maple-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">{post.category}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-xs text-neutral-400">
                            <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span className="flex items-center gap-2"><User size={14} /> Admin</span>
                          </div>
                          <h3 className="text-2xl font-bold text-maple-black group-hover:text-maple-red transition-colors leading-tight">{post.title}</h3>
                          <p className="text-neutral-500 font-light line-clamp-2 leading-relaxed">{post.excerpt}</p>
                          <a href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-maple-black font-bold text-sm group/link">
                            Read More <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-neutral-400 font-light">
                  No articles have been published yet.
                </div>
              )}

              {/* Pagination Placeholder */}
              {!loading && posts.length > 5 && (
                <div className="flex justify-center pt-10">
                  <div className="flex gap-2">
                    {[1, 2, 3].map(n => (
                      <button key={n} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all ${n === 1 ? 'bg-maple-red text-white shadow-lg' : 'bg-neutral-100 text-maple-black hover:bg-neutral-200'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Search */}
              <div className="bg-neutral-light-gray p-8 rounded-[32px] border border-neutral-100">
                <h4 className="text-lg font-bold text-maple-black mb-6">Search Articles</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter keywords..."
                    className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-maple-red transition-all"
                  />
                  <Search size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-neutral-light-gray p-8 rounded-[32px] border border-neutral-100">
                <h4 className="text-lg font-bold text-maple-black mb-6">Categories</h4>
                <div className="space-y-3">
                  {categories.map((cat, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl text-sm text-neutral-600 hover:text-maple-red transition-all group">
                      <span className="font-medium">{cat}</span>
                      <ChevronRight size={16} className="text-neutral-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Sidebar */}
              <div className="bg-[var(--color-dark)] text-white p-10 rounded-[32px] relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-maple-red/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <h4 className="text-2xl font-bold mb-4 relative z-10">Maple Bear <br />Newsletter</h4>
                <p className="text-white/60 font-light text-sm mb-8 relative z-10">Don&apos;t miss helpful articles and exciting upcoming events.</p>
                <form className="space-y-4 relative z-10">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-maple-gold transition-colors"
                  />
                  <button className="w-full py-4 bg-maple-red text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-maple-red/20">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
