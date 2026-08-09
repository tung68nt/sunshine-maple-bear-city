-- ====================================================================
-- SUNSHINE MAPLE BEAR INTERNATIONAL KINDERGARTEN
-- Master Database Schema Migration (PostgreSQL / Supabase DB)
-- Migration File: 20260808_master_schema.sql
-- Description: Full DDL & Idempotent column migrations for Pages, Blog,
--              Staff, Gallery, Tour Bookings, Admissions, Events, Forms, 
--              2-Way Multi-Page Form Bindings, UTM Links, Navigation & Settings.
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. TABLE: pages (CMS Visual Static Pages & Section Stacks)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pages (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_vi TEXT NOT NULL,
    title_en TEXT NOT NULL,
    meta_description_vi TEXT,
    meta_description_en TEXT,
    sections_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.pages ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS sections_stack JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published';
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);

-- --------------------------------------------------------------------
-- 2. TABLE: blog_posts (Blog & News Articles)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_vi TEXT NOT NULL,
    title_en TEXT NOT NULL,
    summary_vi TEXT,
    summary_en TEXT,
    content_vi TEXT,
    content_en TEXT,
    cover_image_url TEXT,
    category VARCHAR(50) DEFAULT 'Chương trình học',
    author VARCHAR(100) DEFAULT 'Sunshine Maple Bear',
    status VARCHAR(20) DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.blog_posts ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Chương trình học';
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- --------------------------------------------------------------------
-- 3. TABLE: gallery_items (Thư viện Hình ảnh & Video 5 Sao)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'Cơ sở vật chất',
    media_type VARCHAR(20) DEFAULT 'image',
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.gallery_items ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON public.gallery_items(category);

-- --------------------------------------------------------------------
-- 4. TABLE: staff (Đội ngũ Giáo viên & Ban Giám Hiệu)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.staff (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    role_title_vi TEXT NOT NULL,
    role_title_en TEXT NOT NULL,
    department VARCHAR(50) DEFAULT 'Giáo viên Bản ngữ',
    avatar_url TEXT NOT NULL,
    bio_vi TEXT,
    bio_en TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.staff ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
CREATE INDEX IF NOT EXISTS idx_staff_department ON public.staff(department);

-- --------------------------------------------------------------------
-- 5. TABLE: admissions (Hồ sơ Đăng ký Tuyển sinh & Lời nhắn Lead)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admissions (
    id VARCHAR(100) PRIMARY KEY,
    parent_name TEXT NOT NULL,
    parent_phone VARCHAR(50) NOT NULL,
    parent_email VARCHAR(100) NOT NULL,
    child_name TEXT NOT NULL,
    child_dob VARCHAR(50),
    grade_level VARCHAR(100),
    notes TEXT,
    status VARCHAR(20) DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.admissions ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'New';
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS parent_phone VARCHAR(50);
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS parent_email VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions(status);

-- --------------------------------------------------------------------
-- 6. TABLE: tour_bookings (Đặt lịch Tham quan Trường 5 Sao)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tour_bookings (
    id VARCHAR(100) PRIMARY KEY,
    visitor_name TEXT NOT NULL,
    visitor_phone VARCHAR(50) NOT NULL,
    visitor_email VARCHAR(100) NOT NULL,
    preferred_date VARCHAR(50) NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    child_age VARCHAR(50),
    notes TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.tour_bookings ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.tour_bookings ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'Pending';
ALTER TABLE public.tour_bookings ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.tour_bookings ADD COLUMN IF NOT EXISTS visitor_phone VARCHAR(50);
ALTER TABLE public.tour_bookings ADD COLUMN IF NOT EXISTS visitor_email VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_status ON public.tour_bookings(status);

-- --------------------------------------------------------------------
-- 7. TABLE: events (Sự kiện Trường & Landing Page Đăng ký)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'Open Day',
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    location TEXT DEFAULT 'Sunshine City Campus',
    cover_image_url TEXT,
    description TEXT,
    agenda JSONB DEFAULT '[]'::jsonb,
    highlights JSONB DEFAULT '[]'::jsonb,
    is_public BOOLEAN DEFAULT true,
    is_registration_open BOOLEAN DEFAULT true,
    max_attendees INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.events ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Open Day';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS agenda JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS is_registration_open BOOLEAN DEFAULT true;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS max_attendees INT DEFAULT 100;
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);

-- --------------------------------------------------------------------
-- 8. TABLE: custom_forms (Mẫu Form Động & Liên Kết 2 Chiều Đa Trang)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.custom_forms (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'Event Registration',
    fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    assigned_pages JSONB DEFAULT '[]'::jsonb,
    assigned_locations JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.custom_forms ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS fields JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS assigned_pages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS assigned_locations JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- --------------------------------------------------------------------
-- 9. TABLE: form_responses (Dữ liệu Lead & Phân tích Marketing Intelligence)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.form_responses (
    id VARCHAR(100) PRIMARY KEY,
    form_id VARCHAR(100) NOT NULL,
    form_title TEXT,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    utm_params JSONB NOT NULL DEFAULT '{}'::jsonb,
    client_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.form_responses ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
ALTER TABLE public.form_responses ADD COLUMN IF NOT EXISTS answers JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.form_responses ADD COLUMN IF NOT EXISTS utm_params JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.form_responses ADD COLUMN IF NOT EXISTS client_metadata JSONB DEFAULT '{}'::jsonb;
CREATE INDEX IF NOT EXISTS idx_form_responses_form_id ON public.form_responses(form_id);

-- --------------------------------------------------------------------
-- 10. TABLE: utm_links (Quản lý Danh sách Link UTM Campaign & Số Lead)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.utm_links (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    full_url TEXT NOT NULL,
    base_url TEXT NOT NULL,
    utm_source VARCHAR(100) NOT NULL,
    utm_medium VARCHAR(100) NOT NULL,
    utm_campaign VARCHAR(100) NOT NULL,
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    lead_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.utm_links ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
CREATE INDEX IF NOT EXISTS idx_utm_links_source ON public.utm_links(utm_source);

-- --------------------------------------------------------------------
-- 11. TABLE: navigation_items (Quản lý Menu Đa Cấp Header & Footer)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id VARCHAR(100) PRIMARY KEY,
    label_vi TEXT NOT NULL,
    label_en TEXT NOT NULL,
    href TEXT NOT NULL,
    parent_id VARCHAR(100),
    order_index INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.navigation_items ALTER COLUMN id TYPE VARCHAR(100) USING id::text;
CREATE INDEX IF NOT EXISTS idx_navigation_order ON public.navigation_items(order_index);

-- --------------------------------------------------------------------
-- 12. TABLE: announcements (Thành Tích, Ưu Đãi & Thông Báo Nổi Bật)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id VARCHAR(100) PRIMARY KEY,
    title_vi TEXT NOT NULL,
    title_en TEXT NOT NULL,
    content_vi TEXT,
    content_en TEXT,
    badge_vi TEXT,
    badge_en TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.announcements ALTER COLUMN id TYPE VARCHAR(100) USING id::text;

-- --------------------------------------------------------------------
-- 13. TABLE: system_settings (Cấu hình Vận hành & Mail Server SMTP)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (SAFE DROP & RE-CREATE)
-- ====================================================================

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utm_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Public Read Pages" ON public.pages;
    DROP POLICY IF EXISTS "Public Read Blog" ON public.blog_posts;
    DROP POLICY IF EXISTS "Public Read Gallery" ON public.gallery_items;
    DROP POLICY IF EXISTS "Public Read Staff" ON public.staff;
    DROP POLICY IF EXISTS "Public Read Events" ON public.events;
    DROP POLICY IF EXISTS "Public Read Custom Forms" ON public.custom_forms;
    DROP POLICY IF EXISTS "Public Read UTM Links" ON public.utm_links;
    DROP POLICY IF EXISTS "Public Read Navigation" ON public.navigation_items;
    DROP POLICY IF EXISTS "Public Read Announcements" ON public.announcements;

    DROP POLICY IF EXISTS "Public Submit Admissions" ON public.admissions;
    DROP POLICY IF EXISTS "Public Submit Tour Bookings" ON public.tour_bookings;
    DROP POLICY IF EXISTS "Public Submit Form Responses" ON public.form_responses;
END $$;

CREATE POLICY "Public Read Pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Public Read Blog" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public Read Staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Custom Forms" ON public.custom_forms FOR SELECT USING (true);
CREATE POLICY "Public Read UTM Links" ON public.utm_links FOR SELECT USING (true);
CREATE POLICY "Public Read Navigation" ON public.navigation_items FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON public.announcements FOR SELECT USING (true);

CREATE POLICY "Public Submit Admissions" ON public.admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Tour Bookings" ON public.tour_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Form Responses" ON public.form_responses FOR INSERT WITH CHECK (true);
