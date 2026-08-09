import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('custom_forms')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase forms fetch notice:', error.message)
    }

    return NextResponse.json({ success: true, data: data || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch custom forms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.title) {
      return NextResponse.json({ error: 'Form title is required' }, { status: 400 })
    }

    const newForm = {
      id: body.id || `form-${Date.now()}`,
      title: body.title,
      description: body.description || '',
      category: body.category || 'General Survey',
      fields: body.fields || [],
      is_active: body.is_active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('custom_forms')
      .insert([newForm])
      .select()

    if (error) {
      console.warn('Supabase custom_forms insert notice:', error.message)
    }

    return NextResponse.json({ success: true, data: data?.[0] || newForm }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create form template' }, { status: 500 })
  }
}
