'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MOCK_BLOG_POSTS } from '@/lib/constants'

export function NewsGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.news-card')
            cards.forEach((card, idx) => {
              setTimeout(() => card.classList.add('is-visible'), idx * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="inline-block text-sm font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
              News & Events
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[var(--color-dark)]">
              Latest Highlights
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-display font-bold link-underline"
          >
            View All News
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MOCK_BLOG_POSTS.map((post, idx) => (
            <article key={post.id} className="news-card scroll-animate fade-up group">
              <div className="rounded-2xl overflow-hidden bg-white border border-[var(--color-gray-light)] card-hover">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-display font-bold">
                      {post.categoryEn}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs text-[var(--color-gray)] font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h3 className="font-display font-bold text-lg text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.titleEn}
                  </h3>
                  <p className="text-sm text-[var(--color-gray)] line-clamp-2">
                    {post.excerptEn}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-sm font-display font-bold text-[var(--color-primary)] pt-2 group-hover:gap-2 transition-all"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
