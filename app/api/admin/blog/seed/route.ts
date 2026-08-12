import { NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { starterBlogPosts } from '@/lib/blog/starter-posts'

export async function POST() {
  const auth = await requireRole(['admin', 'editor'])
  if (isAuthFailure(auth)) return auth

  try {
    const supabase = createAdminSupabaseClient()
    const { data: existing, error: readError } = await supabase.from('blog_posts').select('id').limit(1)
    if (readError) throw readError
    if (existing?.length) return NextResponse.json({ seeded: false })

    const { error } = await supabase.from('blog_posts').insert(starterBlogPosts)
    if (error) throw error
    return NextResponse.json({ seeded: true }, { status: 201 })
  } catch (error) {
    console.error('Error seeding starter blog posts:', error)
    return NextResponse.json({ error: 'Unable to initialize starter posts.' }, { status: 500 })
  }
}
