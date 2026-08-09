import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error && error.code !== 'PGRST116') {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 })
      }
      return NextResponse.json({ success: true, data })
    }

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, title, content, meta_title, meta_description, is_published } = body

    if (!slug || !title) {
      return NextResponse.json({ success: false, error: 'Slug and title are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('pages')
      .upsert(
        {
          slug,
          title,
          content: typeof content === 'object' ? JSON.stringify(content) : content,
          meta_title: meta_title || title,
          meta_description: meta_description || '',
          is_published: is_published !== undefined ? is_published : true,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'slug' }
      )
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
