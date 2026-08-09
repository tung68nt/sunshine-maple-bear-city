import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { MOCK_BLOG_POSTS } from '@/lib/blog-data'
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/not-found'
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
  if (!post) return { title: 'Article Not Found' }

  return {
    title: `${post.title} | Sunshine Maple Bear News & Blog`,
    description: post.summary || post.content?.substring(0, 160) || 'Read the latest news and educational insights from Sunshine Maple Bear International Kindergarten.',
    alternates: {
      canonical: `https://www.sunshinemaplebear.edu.vn/blog/${post.slug || post.id}`
    },
    openGraph: {
      title: post.title,
      description: post.summary || 'Sunshine Maple Bear International Kindergarten News',
      url: `https://www.sunshinemaplebear.edu.vn/blog/${post.slug || post.id}`,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author || 'Sunshine Maple Bear'],
      images: [{ url: post.image || '/logo.png', alt: post.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.image || '/logo.png']
    }
  }
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = MOCK_BLOG_POSTS.find(p => p.id === params.id || p.slug === params.id)
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Post Not Found</h1>
          <Link href="/blog" className="px-4 py-2 bg-[#1D1D1B] text-white rounded-2xs text-xs font-bold inline-block">
            Back to Blog List
          </Link>
        </div>
      </div>
    )
  }

  const toc = [
    '1. Purpose and Significance',
    '2. Context and Methodology',
    '3. Implementation Details',
    '4. Outcomes'
  ]

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary,
    'image': post.image || 'https://www.sunshinemaplebear.edu.vn/logo.png',
    'datePublished': post.created_at,
    'author': {
      '@type': 'Organization',
      'name': post.author || 'Sunshine Maple Bear International Kindergarten'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Sunshine Maple Bear International Kindergarten',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.sunshinemaplebear.edu.vn/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.sunshinemaplebear.edu.vn/blog/${post.slug || post.id}`
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
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
              <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--color-gray)] hover:text-[var(--color-primary)] mb-8 transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to list</span>
              </Link>

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
                    {post.author}
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-bold text-[#1D1D1B] leading-tight">
                  {post.title}
                </h1>

                <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed">
                  {post.summary}
                </p>
              </header>

              {post.image && (
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none text-neutral-700 space-y-6">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </article>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
