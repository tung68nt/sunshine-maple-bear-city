import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function for server-side operations
export async function getServerSupabase() {
  return supabase
}

// Type definitions
export interface Admission {
  id: string
  parent_full_name: string
  parent_email: string
  parent_phone: string
  parent_address?: string
  child_full_name: string
  child_date_of_birth: string
  child_gender?: string
  nationality?: string
  passport_number?: string
  desired_grade: 'infant' | 'playgroup' | 'nursery' | 'k1' | 'k2' | 'k3'
  desired_start_date?: string
  current_language?: string
  special_needs?: string
  allergies?: string
  medical_conditions?: string
  vaccination_status?: string
  status: 'new' | 'reviewing' | 'approved' | 'rejected' | 'enrolled'
  application_score?: number
  admin_notes?: string
  rejection_reason?: string
  documents?: any[]
  source?: string
  created_at: string
  updated_at: string
}

export interface TourBooking {
  id: string
  visitor_name: string
  visitor_email: string
  visitor_phone: string
  tour_date: string
  tour_time: string
  num_adults: number
  num_children: number
  visitor_age_group?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category: 'school-news' | 'child-development' | 'parenting-tips' | 'curriculum' | 'events' | 'other'
  author_id: string
  featured_image_url?: string
  is_published: boolean
  published_at?: string
  scheduled_at?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  view_count: number
  created_at: string
  updated_at: string
}

export interface GalleryAlbum {
  id: string
  title: string
  description?: string
  slug?: string
  cover_image_url?: string
  created_by: string
  is_public: boolean
  image_count: number
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  album_id: string
  image_url: string
  caption?: string
  alt_text?: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  target_audience: string
  created_by: string
  status: 'draft' | 'scheduled' | 'sent'
  published_at?: string
  scheduled_at?: string
  email_template_id?: string
  total_sent: number
  open_count: number
  click_count: number
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  slug: string
  title: string
  content: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  is_published: boolean
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  slug?: string
  description?: string
  start_date: string
  end_date: string
  location?: string
  cover_image_url?: string
  is_public: boolean
  is_registration_open: boolean
  registration_link?: string
  max_attendees?: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'editor' | 'staff' | 'parent'
  phone?: string
  avatar_url?: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}
