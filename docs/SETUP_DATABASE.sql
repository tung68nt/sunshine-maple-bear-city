-- Sunshine Maple Bear School Database Setup
-- Run this SQL in Supabase SQL Editor to create all tables and policies

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  full_name varchar(255),
  role varchar(50) DEFAULT 'parent', -- admin, editor, staff, parent
  phone varchar(20),
  avatar_url text,
  is_active boolean DEFAULT true,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Admissions table
CREATE TABLE IF NOT EXISTS admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_name varchar(255) NOT NULL,
  child_dob date NOT NULL,
  grade_level varchar(50) NOT NULL, -- infant, playgroup, nursery, k1, k2, k3
  parent_name varchar(255) NOT NULL,
  parent_email varchar(255) NOT NULL,
  parent_phone varchar(20) NOT NULL,
  address text,
  notes text,
  status varchar(50) DEFAULT 'submitted', -- submitted, reviewing, approved, rejected, enrolled
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. Tour Bookings table
CREATE TABLE IF NOT EXISTS tour_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name varchar(255) NOT NULL,
  visitor_email varchar(255) NOT NULL,
  visitor_phone varchar(20) NOT NULL,
  preferred_date date NOT NULL,
  preferred_time time,
  number_of_visitors integer DEFAULT 1,
  child_age integer,
  notes text,
  status varchar(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 4. Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  slug varchar(255) UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  category varchar(100), -- news, education, events, parenting, other
  featured_image text,
  status varchar(50) DEFAULT 'draft', -- draft, published
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 5. Gallery Items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  image_url text NOT NULL,
  album varchar(100), -- activities, classroom, events, facilities
  caption text,
  alt_text text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 6. Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  content text NOT NULL,
  priority varchar(50) DEFAULT 'normal', -- high, normal, low
  status varchar(50) DEFAULT 'active', -- active, inactive
  target_audience varchar(100), -- all, parents, staff
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 7. Pages table (for CMS)
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug varchar(255) UNIQUE NOT NULL,
  title varchar(255) NOT NULL,
  content text,
  meta_title varchar(255),
  meta_description text,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 8. Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  slug varchar(255) UNIQUE,
  description text,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone,
  location varchar(255),
  cover_image text,
  is_public boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_admissions_email ON admissions(parent_email);
CREATE INDEX idx_admissions_status ON admissions(status);
CREATE INDEX idx_admissions_created_at ON admissions(created_at);
CREATE INDEX idx_tour_bookings_email ON tour_bookings(visitor_email);
CREATE INDEX idx_tour_bookings_date ON tour_bookings(preferred_date);
CREATE INDEX idx_tour_bookings_status ON tour_bookings(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_gallery_album ON gallery_items(album);
CREATE INDEX idx_events_date ON events(start_date);

-- RLS Policies - Allow public read access to published content
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view gallery items" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public can view active announcements" ON announcements
  FOR SELECT USING (status = 'active');

-- Allow anyone to submit forms
CREATE POLICY "Anyone can insert admissions" ON admissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert tour bookings" ON tour_bookings
  FOR INSERT WITH CHECK (true);

-- Admin policies (you'll need to create auth users first)
-- These are examples - adjust based on your auth setup
CREATE POLICY "Admins can view all admissions" ON admissions
  FOR SELECT USING (true);

CREATE POLICY "Admins can update admissions" ON admissions
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete admissions" ON admissions
  FOR DELETE USING (true);

-- Sample data (optional)
INSERT INTO blog_posts (title, slug, excerpt, content, category, status)
VALUES (
  'Chào mừng đến với Sunshine Maple Bear',
  'welcome-to-sunshine-maple-bear',
  'Khám phá phương pháp giáo dục Maple Bear tại Sunshine City',
  'Chúng tôi rất vui được đón tiếp bạn và gia đình. Sunshine Maple Bear School cung cấp giáo dục quốc tế chuẩn Canadian cho trẻ em từ 2-6 tuổi...',
  'news',
  'published'
);

INSERT INTO pages (slug, title, content, is_published)
VALUES (
  'privacy-policy',
  'Chính sách bảo mật',
  'Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn...',
  true
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_admissions_updated_at BEFORE UPDATE ON admissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tour_bookings_updated_at BEFORE UPDATE ON tour_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
