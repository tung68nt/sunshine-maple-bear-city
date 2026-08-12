import { NextRequest, NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { sanitizeRichHtml } from '@/lib/sanitize'
import { z } from 'zod'

const blogWriteSchema = z.object({
  id: z.string().min(1).max(100).optional(), title: z.string().trim().min(1).max(250), title_vi: z.string().trim().min(1).max(250), title_en: z.string().trim().min(1).max(250),
  slug: z.string().trim().min(1).max(250), excerpt: z.string().max(2000).optional().default(''), excerpt_vi: z.string().max(2000).optional().default(''), excerpt_en: z.string().max(2000).optional().default(''),
  content: z.string().max(100000).optional().default(''), content_vi: z.string().max(100000).optional().default(''), content_en: z.string().max(100000).optional().default(''),
  categoryId: z.string().trim().min(1).max(100), author: z.string().trim().max(120).optional().default('Sunshine Maple Bear'), status: z.enum(['published', 'draft']), cover_image_url: z.string().max(2000).nullable().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const parsed = blogWriteSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) return NextResponse.json({ error: 'Invalid blog post.' }, { status: 400 })
    const body = parsed.data

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          id: body.id || crypto.randomUUID(),
          title: body.title,
          title_vi: body.title_vi,
          title_en: body.title_en,
          slug: body.slug,
          excerpt: body.excerpt,
          content: typeof body.content === 'string' ? sanitizeRichHtml(body.content) : '',
          content_vi: sanitizeRichHtml(body.content_vi),
          content_en: sanitizeRichHtml(body.content_en),
          category: body.categoryId,
          status: body.status,
          published_at: body.status === 'published' ? new Date().toISOString() : null,
          cover_image_url: body.cover_image_url || null,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
