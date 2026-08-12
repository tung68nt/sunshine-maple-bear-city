import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { starterBlogPosts } from '@/lib/blog/starter-posts'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  let { data, error } = await supabase.from('blog_posts').select('*').eq('status', 'published').order('published_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Unable to load blog posts.' }, { status: 500 })
  if (data?.length === 0) {
    const adminSupabase = createAdminSupabaseClient()
    const { error: seedError } = await adminSupabase.from('blog_posts').upsert(starterBlogPosts, { onConflict: 'slug', ignoreDuplicates: true })
    if (seedError) return NextResponse.json({ error: 'Unable to initialize blog posts.' }, { status: 500 })
    const retry = await supabase.from('blog_posts').select('*').eq('status', 'published').order('published_at', { ascending: false })
    data = retry.data
    error = retry.error
  }
  if (error) return NextResponse.json({ error: 'Unable to load blog posts.' }, { status: 500 })
  return NextResponse.json({ data })
}
