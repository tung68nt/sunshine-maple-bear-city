import { MetadataRoute } from 'next'
import { MOCK_BLOG_POSTS } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sunshinemaplebear.edu.vn'

  const staticRoutes = [
    '',
    '/about',
    '/about/story',
    '/about/why-maple-bear',
    '/about/leadership',
    '/about/teachers',
    '/academics',
    '/academics/age-groups',
    '/academics/daily-schedule',
    '/academics/nutrition',
    '/academics/calendar',
    '/admissions',
    '/admissions/process',
    '/admissions/tuition',
    '/admissions/founding-families',
    '/community/health',
    '/community/safeguarding',
    '/blog',
    '/contact',
    '/events',
    '/gallery',
    '/faq',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = MOCK_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    lastModified: new Date(post.created_at || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const eventEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/events/open-day-aug-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events/workshop-parenting-2026`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]

  return [...staticEntries, ...blogEntries, ...eventEntries]
}
