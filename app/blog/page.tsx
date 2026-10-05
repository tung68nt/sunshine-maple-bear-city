'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Block, CallToAction, EmptyState, FilterBar, Grid, Lead, LoadingState, PageHero, PageShell, Pagination, PostCard } from '@/components/ds'
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

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'safety-foundation',
    slug: 'safety-foundation',
    title: 'Tại Sao An Toàn Là Nền Tảng Hàng Đầu Tại Sunshine Maple Bear?',
    excerpt: 'Khám phá cách Sunshine Maple Bear xây dựng môi trường an toàn chuẩn Canada từ thể chất, cảm xúc đến dinh dưỡng học đường cho bé.',
    content: 'Chăm sóc an toàn toàn diện cho trẻ mầm non...',
    category: 'Chương trình học',
    author: 'Sunshine Maple Bear',
    created_at: '2026-05-10T00:00:00Z',
    featured_image: SCHOOL_IMAGES.render.lopHoc1,
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
    featured_image: SCHOOL_IMAGES.render.lopHoc2,
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
    featured_image: SCHOOL_IMAGES.render.canTeen,
  },
]

const ALL = 'all'
const PAGE_SIZE = 9

/** lower-case, accents removed — so "dinh duong" finds "Dinh Dưỡng" */
const fold = (text: string) =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')

const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('vi-VN')
}

function BlogListing() {
  const searchParams = useSearchParams()
  const searchParam = searchParams.get('search') || ''

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(searchParam)
  const [category, setCategory] = useState(ALL)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog')
        if (res.ok) {
          const payload = await res.json()
          if (Array.isArray(payload.data) && payload.data.length > 0) {
            setPosts(
              payload.data.map((post: any) => ({
                ...post,
                featured_image: post.cover_image_url || post.featured_image || post.image_url,
                excerpt: post.excerpt || post.summary_vi || post.summary_en || '',
              }))
            )
          } else {
            setPosts(FALLBACK_POSTS)
          }
        } else {
          setPosts(FALLBACK_POSTS)
        }
      } catch (err) {
        console.error(err)
        setPosts(FALLBACK_POSTS)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // the site navigation searches by sending visitors to /blog?search=…
  useEffect(() => {
    setQuery(searchParam)
    setPage(1)
  }, [searchParam])

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((post) => {
      if (post.category) counts.set(post.category, (counts.get(post.category) || 0) + 1)
    })
    return [{ value: ALL, label: 'Tất cả bài viết', count: posts.length }, ...[...counts].map(([value, count]) => ({ value, label: value, count }))]
  }, [posts])

  const filtered = useMemo(() => {
    const needle = fold(query.trim())
    return posts.filter((post) => {
      if (category !== ALL && post.category !== category) return false
      if (!needle) return true
      return fold(`${post.title} ${post.excerpt} ${post.category}`).includes(needle)
    })
  }, [posts, query, category])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const isFiltered = query.trim() !== '' || category !== ALL

  const reset = () => {
    setQuery('')
    setCategory(ALL)
    setPage(1)
  }

  return (
    <Block id="bai-viet">
      <FilterBar
        search={query}
        onSearch={(value) => {
          setQuery(value)
          setPage(1)
        }}
        searchLabel="Tìm Kiếm Bài Viết"
        placeholder="Nhập từ khóa tìm kiếm..."
        categoriesLabel="Chủ Đề Nổi Bật"
        categories={loading ? undefined : categories}
        active={category}
        onSelect={(value) => {
          setCategory(value)
          setPage(1)
        }}
      />

      {loading ? (
        <LoadingState text="Đang tải bài viết..." />
      ) : posts.length === 0 ? (
        <EmptyState text="Chưa có bài viết nào được đăng tải." />
      ) : filtered.length === 0 ? (
        <EmptyState text="Không tìm thấy bài viết phù hợp." action={{ label: 'Tất cả bài viết', onClick: reset }} />
      ) : (
        <>
          <Grid cols={3}>
            {visible.map((post, i) => {
              const featured = !isFiltered && current === 1 && i === 0
              return (
                <PostCard
                  key={post.slug || post.id}
                  href={`/blog/${post.slug || post.id}`}
                  image={{ src: post.featured_image || (featured ? SCHOOL_IMAGES.render.lopHoc1 : SCHOOL_IMAGES.render.lopHoc2), alt: post.title }}
                  meta={[featured ? 'Nổi bật' : post.category, formatDate(post.created_at)].filter(Boolean).join(' · ')}
                  title={post.title}
                  text={post.excerpt}
                  delay={(i % 3) * 0.15}
                />
              )
            })}
          </Grid>
          <Pagination
            page={current}
            pages={pages}
            onChange={(next) => {
              setPage(next)
              document.getElementById('bai-viet')?.scrollIntoView({ behavior: 'smooth' })
            }}
            label="Phân trang bài viết"
            prevLabel="Trang trước"
            nextLabel="Trang sau"
          />
        </>
      )}
    </Block>
  )
}

/** News listing: content and data only — every element comes from the design system. */
export default function BlogPage() {
  return (
    <PageShell hero={<PageHero title="Tin tức" image={SCHOOL_IMAGES.render.thuVien5} crumbs={[{ label: 'Trang chủ', href: '/' }]} />}>
      <Lead
        kicker="TIN TỨC & GÓC NHÌN CHUYÊN GIA MẦM NON"
        title="Góc Nhìn Giáo Dục"
        accent="Giáo Dục"
        image={{ src: SCHOOL_IMAGES.render.thuVien7, alt: 'Thư viện Sunshine Maple Bear' }}
      >
        Cập nhật những tin tức mới nhất về hoạt động trường, phương pháp giáo dục Canada và kinh nghiệm nuôi dạy con song ngữ.
      </Lead>

      <Suspense
        fallback={
          <Block>
            <LoadingState text="Đang tải bài viết..." />
          </Block>
        }
      >
        <BlogListing />
      </Suspense>

      <CallToAction
        title="Đăng Ký Tham Quan 5 Sao"
        text="Trải nghiệm trực tiếp môi trường mầm non thẩm thấu tiếng Anh 100% bản quyền Canada tại Sunshine City."
        actions={[{ label: 'Đặt Lịch Hẹn Ngay', href: '/tour-booking' }]}
      />
    </PageShell>
  )
}
