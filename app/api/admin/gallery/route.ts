import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const formData = await request.formData()
    const title = formData.get('title') as string
    const album = formData.get('album') as string

    const { data, error } = await supabase
      .from('gallery_items')
      .insert([
        {
          title,
          album,
          image_url: 'https://via.placeholder.com/400x400',
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error uploading to gallery:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
