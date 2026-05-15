import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { SCHOOL_IMAGES } from '@/lib/constants'
import { MOCK_BLOG_POSTS } from '@/lib/blog-data'
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = MOCK_BLOG_POSTS.find(p => p.id === params.id || p.slug === params.id)
  
  if (!post) {
    notFound()
  }

  // Generate some TOC automatically or use fixed ones for now
  const toc = [
    '1. Purpose and Significance',
    '2. Context and Methodology',
    '3. Implementation Details',
    '4. Outcomes'
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white pt-24 md:pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar TOC */}
            <aside className="lg:w-1/4 order-2 lg:order-1">
              <div className="sticky top-32 space-y-8">
                <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
                  <h4 className="font-display font-bold text-[var(--color-dark)] mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-maple-red rounded-full" />
                    Table of Contents
                  </h4>
                  <nav className="space-y-4">
                    {toc.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={`#section-${idx + 1}`}
                        className="block text-sm text-[var(--color-gray)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="p-8 bg-maple-black rounded-3xl text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2">
                      <svg width="200" height="200" viewBox="0 0 14 14" fill="white">
                        <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <h4 className="font-bold text-xl">Book a School Tour</h4>
                    <p className="text-sm text-white/60">Experience a Canadian-standard educational environment today.</p>
                    <Link href="/tour-booking" className="block w-full py-3 bg-maple-red text-center rounded-xl font-bold hover:bg-red-700 transition-all">
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:w-3/4 order-1 lg:order-2">
              {/* Back Button */}
              <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--color-gray)] hover:text-[var(--color-primary)] mb-8 transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to list</span>
              </Link>

              {/* Article Header */}
              <header className="space-y-6 mb-12">
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
                  <span className="px-4 py-1.5 bg-maple-red/10 text-maple-red font-bold uppercase tracking-widest rounded-full">{post.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <User size={16} />
                    Board of Management
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-black text-maple-black leading-tight mb-8">
                  {post.title}
                </h1>

                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl">
                  <Image
                    src={post.featured_image || SCHOOL_IMAGES.render.phongChucNang1}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </header>

              <div 
                className="prose prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-maple-black prose-p:text-neutral-600 prose-p:font-light prose-p:leading-relaxed prose-a:text-maple-red prose-img:rounded-3xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Article Footer & Share */}
              <footer className="mt-16 pt-8 border-t border-[var(--color-gray-light)] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="font-display font-bold text-[var(--color-dark)]">Share article:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                      <Facebook size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                      <Twitter size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-all">
                      <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-neutral-600 hover:text-white transition-all">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
