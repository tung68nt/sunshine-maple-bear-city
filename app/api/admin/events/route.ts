import { NextRequest, NextResponse } from 'next/server'
import { isAuthFailure, requireRole } from '@/lib/auth/require-role'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const auth = await requireRole(['admin', 'editor', 'viewer']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })

    if (error) {
      console.warn('Supabase events fetch notice:', error.message)
    }

    return NextResponse.json({ success: true, data: data || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    if (!body.title) {
      return NextResponse.json({ error: 'Event title is required' }, { status: 400 })
    }

    const newEvent = {
      id: body.id || crypto.randomUUID(),
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: body.category || 'Open Day',
      description: body.description || '',
      start_date: body.start_date || body.startDate || new Date().toISOString(),
      end_date: body.end_date || body.endDate || new Date().toISOString(),
      location: body.location || 'Sunshine City Campus',
      cover_image_url: body.cover_image_url || body.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      is_public: body.is_public ?? true,
      is_registration_open: body.is_registration_open ?? true,
      max_attendees: Number(body.max_attendees || body.maxAttendees) || 100,
      highlights: body.highlights || [],
      agenda: body.agenda || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('events')
      .insert([newEvent])
      .select()

    if (error) {
      console.warn('Supabase event insert notice:', error.message)
    }

    return NextResponse.json({ success: true, data: data?.[0] || newEvent }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireRole(['admin', 'editor']); if (isAuthFailure(auth)) return auth
    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    if (!body.id || !body.title) {
      return NextResponse.json({ error: 'Event ID and title are required' }, { status: 400 })
    }

    const updatedEvent = {
      id: body.id,
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: body.category || 'Open Day',
      description: body.description || '',
      start_date: body.start_date || body.startDate || new Date().toISOString(),
      end_date: body.end_date || body.endDate || new Date().toISOString(),
      location: body.location || 'Sunshine City Campus',
      cover_image_url: body.cover_image_url || body.coverImage || '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
      is_public: body.is_public ?? true,
      is_registration_open: body.is_registration_open ?? true,
      max_attendees: Number(body.max_attendees || body.maxAttendees) || 100,
      highlights: body.highlights || [],
      agenda: body.agenda || [],
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('events')
      .upsert(updatedEvent, { onConflict: 'id' })
      .select()

    if (error) {
      console.warn('Supabase event update notice:', error.message)
    }

    return NextResponse.json({ success: true, data: data?.[0] || updatedEvent })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}
