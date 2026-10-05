import type { Metadata } from 'next'
import {
  Article,
  ArticleHero,
  AsidePanel,
  Block,
  Button,
  CallToAction,
  Grid,
  Heading,
  LinkList,
  Media,
  MetaList,
  PageShell,
  PostCard,
  RichText,
  Stack,
  Text,
} from '@/components/ds'
import { MOCK_BLOG_POSTS } from '@/lib/blog-data'

type PageProps = { params: Promise<{ id: string }> }

const SITE_URL = 'https://www.sunshinemaplebear.edu.vn'
const FALLBACK_IMAGE = '/images/render/LOP_HOC_DIEN_HINH_1_.jpg'

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const post = MOCK_BLOG_POSTS.find((p) => p.id === id || p.slug === id)
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
      images: [{ url: post.featured_image || '/logo.png', alt: post.title }],
    },
  }
}

const tocItems = [
  { href: '#sec-1', label: '1. Đặt An Toàn Lên Hàng Đầu' },
  { href: '#sec-2', label: '2. Môi Trường Thẩm Thấu Anh Ngữ' },
  { href: '#sec-3', label: '3. Phương Pháp Giáo Dục Tích Cực' },
  { href: '#sec-4', label: '4. Kết Luận & Lộ Trình Cho Bé' },
]

/** News article: content and data only — every element comes from the design system. */
export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params
  const post = MOCK_BLOG_POSTS.find((p) => p.id === id || p.slug === id) || MOCK_BLOG_POSTS[0]
  const relatedPosts = MOCK_BLOG_POSTS.filter((p) => p.id !== post.id && p.slug !== post.slug).slice(0, 3)

  const shareUrl = encodeURIComponent(`${SITE_URL}/blog/${post.slug || post.id}`)
  const shareLinks = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
  ]

  return (
    <PageShell
      hero={
        <ArticleHero
          title={post.title}
          image={post.featured_image || FALLBACK_IMAGE}
          crumbs={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Tin tức', href: '/blog' },
          ]}
        />
      }
    >
      <Article
        aside={
          <>
            <MetaList
              items={[
                { label: 'Chủ đề', value: post.category || 'TIN TỨC MẦM NON CANADA' },
                { label: 'Ngày đăng', value: new Date(post.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Tác giả', value: 'Sunshine Maple Bear' },
                { label: 'Thời gian đọc', value: '5 phút đọc' },
              ]}
            />
            <AsidePanel title="Mục Lục Bài Viết">
              <LinkList links={tocItems} />
            </AsidePanel>
            <AsidePanel title="Chia sẻ bài viết">
              <LinkList inline links={shareLinks} />
            </AsidePanel>
            <AsidePanel tone="sand" title="Đăng Ký Tham Quan 5 Sao">
              <Text variant="small">Trải nghiệm trực tiếp môi trường mầm non thẩm thấu tiếng Anh 100% bản quyền Canada tại Sunshine City.</Text>
              <Button variant="solid" block href="/tour-booking">
                Đặt Lịch Hẹn Ngay
              </Button>
            </AsidePanel>
          </>
        }
      >
        {post.featured_image && <Media src={post.featured_image} alt={post.title} ratio="landscape" eager />}

        {post.excerpt && <Text variant="lead">{`“${post.excerpt}”`}</Text>}

        <RichText>
          <h2 id="sec-1">1. Đặt An Toàn Lên Hàng Đầu Với Tiêu Chuẩn Quốc Tế</h2>
          <p>
            Khi lựa chọn trường mầm non quốc tế như Sunshine Maple Bear tại Sunshine City, Phụ huynh tìm kiếm nhiều hơn một không gian học tập thông thường. Đó là sự an toàn tuyệt đối từ thể chất, cảm xúc đến quy trình chăm sóc y tế khép kín.
          </p>
          <ul>
            <li>Hệ thống cơ sở vật chất bo tròn không góc nhọn, sàn trải thảm cao cấp chống va đập.</li>
            <li>Hệ thống camera giám sát CCTV 24/7 và kiểm soát an ninh nghiêm ngặt tại cổng trường.</li>
            <li>Đội ngũ điều dưỡng y tế học đường trực 100% thời gian hoạt động.</li>
          </ul>

          <h2 id="sec-2">2. Môi Trường Thẩm Thấu Anh Ngữ 100% Cùng GV Canada</h2>
          <p>
            Trẻ học ngôn ngữ không bằng cách học vẹt từ vựng, mà thông qua giao tiếp và trải nghiệm trực quan hàng ngày. Tại Sunshine Maple Bear, 100% các môn học đều được giảng dạy bằng Tiếng Anh.
          </p>
          <blockquote>
            Trẻ mầm non giai đoạn 1-5 tuổi có khả năng hấp thụ song ngữ tự nhiên như ngôn ngữ mẹ đẻ nếu được tiếp xúc trong môi trường thẩm thấu hoàn toàn.
          </blockquote>

          <h2 id="sec-3">3. Phương Pháp Kỷ Luật Tích Cực Không Đòn Roi</h2>
          <p>
            Môi trường an toàn cảm xúc giúp trẻ luôn tự tin bày tỏ ý kiến, không sợ mắc lỗi. Đội ngũ giáo viên áp dụng phương pháp Kỷ Luật Tích Cực (Positive Discipline) được tập huấn chuẩn hóa bởi Hội Đồng Giáo Dục Maple Bear Toàn Cầu.
          </p>

          <h2 id="sec-4">4. Kết Luận & Lộ Trình Dành Cho Bé</h2>
          <p>
            Sự kết hợp giữa chương trình mầm non bản quyền Canada và cơ sở vật chất 5 sao tại Sunshine City mang đến nền tảng vững chắc nhất cho sự phát triển toàn diện của trẻ. Kính mời Phụ huynh đăng ký tham quan thực tế để trải nghiệm không gian học tập tuyệt vời cho con.
          </p>
        </RichText>

        <MetaList items={[{ label: 'Sunshine Maple Bear', value: 'Ban Biên Tập Giáo Dục Mầm Non Canada' }]} />

        <Button variant="soft" href="/blog">
          Quay lại danh sách bài viết
        </Button>
      </Article>

      {relatedPosts.length > 0 && (
        <Block tone="sand">
          <Stack gap="lg">
            <Heading size="lg" tone="deep" caps={false}>
              Bài Viết Liên Quan
            </Heading>
            <Grid cols={3}>
              {relatedPosts.map((rel, i) => (
                <PostCard
                  key={rel.id}
                  href={`/blog/${rel.slug || rel.id}`}
                  image={{ src: rel.featured_image || FALLBACK_IMAGE, alt: rel.title }}
                  meta={rel.category}
                  title={rel.title}
                  text={rel.excerpt}
                  delay={i * 0.15}
                />
              ))}
            </Grid>
          </Stack>
        </Block>
      )}

      <CallToAction
        title="Đăng Ký Tham Quan 5 Sao"
        text="Trải nghiệm trực tiếp môi trường mầm non thẩm thấu tiếng Anh 100% bản quyền Canada tại Sunshine City."
        actions={[
          { label: 'Đặt Lịch Hẹn Ngay', href: '/tour-booking' },
          { label: 'Quay lại danh sách bài viết', href: '/blog' },
        ]}
      />
    </PageShell>
  )
}
