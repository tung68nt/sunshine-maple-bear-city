-- ====================================================================
-- SUNSHINE MAPLE BEAR INTERNATIONAL KINDERGARTEN
-- Master Seed Data Script (PostgreSQL / Supabase DB)
-- File: supabase/seed.sql
-- Description: Idempotent seed data for Pages, Blog, Events, Forms, Staff, 
--              Gallery, UTM Links, Navigation & System Settings.
-- ====================================================================

-- --------------------------------------------------------------------
-- DEFENSIVE SCHEMA GUARDS (Ensures all tables & columns exist before inserting)
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
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Event Registration';
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS fields JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS assigned_pages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS assigned_locations JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_forms ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

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
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Open Day';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS agenda JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]'::jsonb;

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

CREATE TABLE IF NOT EXISTS public.system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 1. SEED: custom_forms (Mẫu Form Động & Liên Kết 2 Chiều Đa Trang)
-- --------------------------------------------------------------------
INSERT INTO public.custom_forms (id, title, description, category, fields, assigned_pages, assigned_locations, is_active)
VALUES
(
  'evt-form-evt-101',
  'Form Đăng Ký Open Day 2026: Hành Trình Khám Phá Mầm Non Canada',
  'Form thu thập thông tin phụ huynh đăng ký tham dự Open Day 22/08/2026 tại Sunshine City.',
  'Event Registration',
  '[
    {"id":"f-1","label":"Họ và tên Phụ huynh","type":"text","required":true,"placeholder":"VD: Nguyễn Văn A"},
    {"id":"f-2","label":"Số điện thoại Zalo liên hệ","type":"phone","required":true,"placeholder":"0912 xxx xxx"},
    {"id":"f-3","label":"Địa chỉ Email","type":"email","required":true,"placeholder":"email@example.com"},
    {"id":"f-4","label":"Khung giờ tham quan mong muốn","type":"select","required":true,"options":["09:00 AM - 10:30 AM","10:30 AM - 12:00 PM","02:00 PM - 03:30 PM"]},
    {"id":"f-5","label":"Ghi chú & Câu hỏi tư vấn","type":"textarea","required":false,"placeholder":"Nhập thắc mắc dành cho Ban Giám hiệu..."}
  ]'::jsonb,
  '["/events/open-day-2026-canada-sunshine-city", "/admissions/open-day", "/contact"]'::jsonb,
  '[
    {"pagePath": "/events/open-day-2026-canada-sunshine-city", "pageTitle": "Sự kiện: Open Day 2026 Canada", "sectionId": "sec-event-hero-form", "sectionType": "EVENT_LANDING"},
    {"pagePath": "/admissions/open-day", "pageTitle": "Trang Tuyển Sinh: Đăng Ký Tham Quan 5 Sao", "sectionId": "sec-admissions-countdown-form", "sectionType": "SECTION_BUILDER_BLOCK"},
    {"pagePath": "/contact", "pageTitle": "Trang Liên Hệ & Nhận Báo Phí Học Phí 2026", "sectionId": "sec-contact-main-form", "sectionType": "STATIC_PAGE"}
  ]'::jsonb,
  true
),
(
  'evt-form-evt-102',
  'Form Đăng Ký Workshop Phụ Huynh: Phương Pháp Kỷ Luật Tích Cực',
  'Form nhận đăng ký giữ chỗ tham dự Workshop tư vấn nuôi dạy con song ngữ 29/08/2026.',
  'Event Registration',
  '[
    {"id":"w-1","label":"Họ và tên Phụ huynh","type":"text","required":true},
    {"id":"w-2","label":"Số điện thoại Zalo","type":"phone","required":true},
    {"id":"w-3","label":"Địa chỉ Email","type":"email","required":true},
    {"id":"w-4","label":"Độ tuổi của bé hiện tại","type":"select","required":true,"options":["12 - 24 tháng","24 - 36 tháng","3 - 5 tuổi"]}
  ]'::jsonb,
  '["/events/workshop-phu-huynh-ky-luat-tich-cuc"]'::jsonb,
  '[
    {"pagePath": "/events/workshop-phu-huynh-ky-luat-tich-cuc", "pageTitle": "Sự kiện: Workshop Phụ huynh Kỷ luật Tích cực", "sectionId": "sec-workshop-form", "sectionType": "EVENT_LANDING"}
  ]'::jsonb,
  true
),
(
  'form-contact-enquiry-2026',
  'Form Đăng Ký Tư Vấn & Nhận Thông Tin Học Phí 2026',
  'Thu thập nhu cầu tìm hiểu chương trình học mầm non Canada và ưu đãi cư dân Sunshine City.',
  'Contact Enquiry',
  '[
    {"id":"c-1","label":"Họ và tên Phụ huynh","type":"text","required":true,"placeholder":"VD: Vũ Minh Hoàng"},
    {"id":"c-2","label":"Số điện thoại liên hệ","type":"phone","required":true,"placeholder":"0988 xxx xxx"},
    {"id":"c-3","label":"Email","type":"email","required":true,"placeholder":"email@example.com"},
    {"id":"c-4","label":"Độ tuổi của bé","type":"select","required":true,"options":["Lớp Mầm (12 - 24 tháng)","Lớp Chồi (24 - 36 tháng)","Lớp Lá (4 - 5 tuổi)"]},
    {"id":"c-5","label":"Nội dung cần tư vấn","type":"textarea","required":false,"placeholder":"Ghi rõ các thắc mắc về học phí, xe bus..."}
  ]'::jsonb,
  '["/contact"]'::jsonb,
  '[
    {"pagePath": "/contact", "pageTitle": "Trang Liên Hệ & Nhận Báo Phí Học Phí 2026", "sectionId": "sec-contact-main-form", "sectionType": "STATIC_PAGE"}
  ]'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  fields = EXCLUDED.fields,
  assigned_pages = EXCLUDED.assigned_pages,
  assigned_locations = EXCLUDED.assigned_locations;

-- --------------------------------------------------------------------
-- 2. SEED: events (Sự Kiện & Landing Page)
-- --------------------------------------------------------------------
INSERT INTO public.events (id, slug, title, category, start_date, end_date, location, cover_image_url, description, agenda, highlights, is_public, is_registration_open, max_attendees)
VALUES
(
  'evt-101',
  'open-day-2026-canada-sunshine-city',
  'Open Day 2026: Hành Trình Khám Phá Mầm Non Canada Tại Sunshine City',
  'Open Day',
  '2026-08-22 08:30:00+07',
  '2026-08-22 11:30:00+07',
  'Khuôn viên Trường Mầm Nông Sunshine Maple Bear, Tòa S4 Sunshine City',
  '/images/render/LOP_HOC_DIEN_HINH_1_.jpg',
  'Sự kiện trải nghiệm không gian học tập thẩm thấu tiếng Anh 100% cùng đội ngũ chuyên gia giáo dục Canada. Phụ huynh trực tiếp trao đổi cùng Ban Giám Hiệu và nhận ưu đãi học phí lên tới 30%.',
  '[
    {"time": "08:30 - 09:00", "activity": "Đón tiếp Phụ huynh & Bé, nhận thẻ quà tặng Welcome Kit 5 sao"},
    {"time": "09:00 - 10:00", "activity": "Tour tham quan 5 sao: Phòng Sensory, Xưởng nghệ thuật Atelier, Bể bơi bốn mùa"},
    {"time": "10:00 - 11:00", "activity": "Workshop tương tác Anh ngữ cùng Giáo viên bản ngữ Canada"},
    {"time": "11:00 - 11:30", "activity": "Q&A trực tiếp cùng Ban Giám Hiệu & Tư vấn chương trình Founding Families"}
  ]'::jsonb,
  '[
    "Trải nghiệm lớp học thẩm thấu Anh ngữ 100%",
    "Quà tặng Welcome Kit 5 sao dành cho bé",
    "Ưu đãi 30% học phí dành cho cư dân Sunshine City"
  ]'::jsonb,
  true,
  true,
  100
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  agenda = EXCLUDED.agenda,
  highlights = EXCLUDED.highlights;

-- --------------------------------------------------------------------
-- 3. SEED: utm_links (Mẫu URL Tracking Marketing)
-- --------------------------------------------------------------------
INSERT INTO public.utm_links (id, name, full_url, base_url, utm_source, utm_medium, utm_campaign, lead_count)
VALUES
(
  'utm-001',
  'Chiến dịch Facebook Ads - Open Day 2026 Cư Dân Ciputra',
  'https://sunshinemaplebear.edu.vn/admissions/open-day?utm_source=facebook_ads&utm_medium=cpc&utm_campaign=open_day_2026_ciputra',
  'https://sunshinemaplebear.edu.vn/admissions/open-day',
  'facebook_ads',
  'cpc',
  'open_day_2026_ciputra',
  42
),
(
  'utm-002',
  'Chiến dịch Google Search - Tư Vấn Học Phí Mầm Non Tây Hồ',
  'https://sunshinemaplebear.edu.vn/contact?utm_source=google_search&utm_medium=sem&utm_campaign=tuition_inquiry_tay_ho',
  'https://sunshinemaplebear.edu.vn/contact',
  'google_search',
  'sem',
  'tuition_inquiry_tay_ho',
  15
)
ON CONFLICT (id) DO NOTHING;

-- --------------------------------------------------------------------
-- 4. SEED: system_settings (Cấu hình Vận hành)
-- --------------------------------------------------------------------
INSERT INTO public.system_settings (key, value)
VALUES
(
  'school_info',
  '{
    "name": "SUNSHINE MAPLE BEAR INTERNATIONAL KINDERGARTEN",
    "address": "Sunshine City, Ciputra Urban Area, Nam Thang Long, Hanoi",
    "phone": "094 254 6655",
    "email": "admissions@sunshinemaplebear.edu.vn",
    "workingHours": "07:30 AM - 18:00 PM"
  }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value;