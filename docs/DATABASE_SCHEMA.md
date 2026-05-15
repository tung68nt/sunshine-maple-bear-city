# Database Schema: Sunshine Maple Bear School

## Overview

Supabase PostgreSQL database schema for Sunshine Maple Bear website. All tables use UUID primary keys and include timestamp tracking (created_at, updated_at).

---

## Table Definitions

### 1. users (Authentication & Staff)

**Purpose:** Store admin/staff user accounts and parents

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'parent', -- 'admin', 'editor', 'staff', 'parent'
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT role_check CHECK (role IN ('admin', 'editor', 'staff', 'parent'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**Columns:**
- `id`: Unique identifier
- `email`: Login email (unique)
- `password_hash`: Hashed password (bcrypt)
- `full_name`: User's full name
- `role`: User role for authorization
- `phone`: Contact phone
- `avatar_url`: Profile picture URL (stored in Supabase Storage)
- `is_active`: Soft delete/deactivation
- `last_login`: Last login timestamp
- `created_at`, `updated_at`: Audit timestamps

---

### 2. admissions (Admission Applications)

**Purpose:** Store school admission/enrollment applications

```sql
CREATE TABLE admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Parent Information
  parent_full_name VARCHAR(255) NOT NULL,
  parent_email VARCHAR(255) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  parent_address TEXT,
  
  -- Child Information
  child_full_name VARCHAR(255) NOT NULL,
  child_date_of_birth DATE NOT NULL,
  child_gender VARCHAR(10),
  nationality VARCHAR(100),
  passport_number VARCHAR(50),
  
  -- Application Details
  desired_grade VARCHAR(50) NOT NULL, -- 'infant', 'playgroup', 'nursery', 'k1', 'k2', 'k3'
  desired_start_date DATE,
  current_language VARCHAR(100),
  special_needs TEXT,
  allergies TEXT,
  medical_conditions TEXT,
  vaccination_status VARCHAR(100),
  
  -- Application Status & Management
  status VARCHAR(50) NOT NULL DEFAULT 'new', -- 'new', 'reviewing', 'approved', 'rejected', 'enrolled'
  application_score DECIMAL(3,1), -- Optional: assessment score
  admin_notes TEXT,
  rejection_reason TEXT,
  
  -- Documents/Files (JSON array of file URLs)
  documents JSONB DEFAULT '[]',
  
  -- Metadata
  source VARCHAR(100), -- 'website', 'referral', 'walkin', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT grade_check CHECK (desired_grade IN ('infant', 'playgroup', 'nursery', 'k1', 'k2', 'k3')),
  CONSTRAINT status_check CHECK (status IN ('new', 'reviewing', 'approved', 'rejected', 'enrolled'))
);

CREATE INDEX idx_admissions_status ON admissions(status);
CREATE INDEX idx_admissions_email ON admissions(parent_email);
CREATE INDEX idx_admissions_created_at ON admissions(created_at DESC);
```

**Key Columns:**
- Parent & child personal information
- Desired grade & start date
- Health & special needs information
- Status tracking (new → enrolled)
- Document storage (JSON array of URLs)
- Audit timestamps

---

### 3. tour_bookings (Campus Tour Reservations)

**Purpose:** Store campus tour bookings & reservations

```sql
CREATE TABLE tour_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Visitor Information
  visitor_name VARCHAR(255) NOT NULL,
  visitor_email VARCHAR(255) NOT NULL,
  visitor_phone VARCHAR(20) NOT NULL,
  
  -- Tour Details
  tour_date DATE NOT NULL,
  tour_time TIME NOT NULL,
  num_adults INTEGER NOT NULL DEFAULT 1,
  num_children INTEGER NOT NULL DEFAULT 0,
  visitor_age_group VARCHAR(50), -- optional: 'infants', 'toddlers', 'preschool', etc.
  
  -- Status & Management
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT status_check CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

CREATE INDEX idx_tour_bookings_date ON tour_bookings(tour_date);
CREATE INDEX idx_tour_bookings_status ON tour_bookings(status);
CREATE INDEX idx_tour_bookings_email ON tour_bookings(visitor_email);
```

**Key Columns:**
- Visitor contact information
- Tour date & time
- Number of attendees
- Status tracking
- Audit timestamps

---

### 4. blog_posts (Blog Articles)

**Purpose:** Store blog articles, news, and educational content

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly slug
  excerpt VARCHAR(500),
  content TEXT NOT NULL,
  
  -- Metadata
  category VARCHAR(100) NOT NULL, -- 'school-news', 'child-development', 'parenting-tips', 'curriculum'
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  featured_image_url VARCHAR(500),
  
  -- Publishing
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(255),
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT category_check CHECK (category IN ('school-news', 'child-development', 'parenting-tips', 'curriculum', 'events', 'other'))
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
```

**Key Columns:**
- Post content (title, excerpt, body)
- URL slug for routing
- Category & author
- Publishing status & scheduled date
- SEO fields
- View count for analytics
- Timestamps

---

### 5. gallery_albums (Photo Albums)

**Purpose:** Store photo albums/collections (organized by event, category, etc.)

```sql
CREATE TABLE gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Album Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE,
  
  -- Metadata
  cover_image_url VARCHAR(500),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  
  -- Accessibility
  is_public BOOLEAN DEFAULT true,
  
  -- Image Count (denormalized for performance)
  image_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gallery_albums_slug ON gallery_albums(slug);
CREATE INDEX idx_gallery_albums_created_by ON gallery_albums(created_by);
```

---

### 6. gallery_images (Photos in Albums)

**Purpose:** Store individual photos with metadata

```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Image Info
  album_id UUID NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL, -- Supabase Storage URL
  caption VARCHAR(500),
  alt_text VARCHAR(500), -- Accessibility
  
  -- Organization
  display_order INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gallery_images_album_id ON gallery_images(album_id);
CREATE INDEX idx_gallery_images_display_order ON gallery_images(display_order);
```

**Key Columns:**
- Album relationship (foreign key)
- Image URL (Supabase Storage)
- Caption & alt text (accessibility)
- Display order for sorting
- Timestamps

---

### 7. announcements (Parent Notifications)

**Purpose:** Store announcements/notifications sent to parents

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Content
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  
  -- Target & Delivery
  target_audience VARCHAR(100) NOT NULL DEFAULT 'all', -- 'all', 'parents', 'staff', 'grade:k1', etc.
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  
  -- Publishing
  status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft', 'scheduled', 'sent'
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,
  
  -- Email Template
  email_template_id UUID, -- Reference to email template (optional)
  
  -- Analytics
  total_sent INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT status_check CHECK (status IN ('draft', 'scheduled', 'sent'))
);

CREATE INDEX idx_announcements_status ON announcements(status);
CREATE INDEX idx_announcements_created_by ON announcements(created_by);
CREATE INDEX idx_announcements_published_at ON announcements(published_at DESC);
```

---

### 8. announcement_recipients (Email Delivery Tracking)

**Purpose:** Track announcement delivery and engagement per recipient

```sql
CREATE TABLE announcement_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  recipient_email VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255),
  
  -- Delivery & Engagement
  is_delivered BOOLEAN DEFAULT false,
  delivered_at TIMESTAMP,
  is_opened BOOLEAN DEFAULT false,
  opened_at TIMESTAMP,
  is_clicked BOOLEAN DEFAULT false,
  clicked_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_announcement_recipients_announcement_id ON announcement_recipients(announcement_id);
CREATE INDEX idx_announcement_recipients_email ON announcement_recipients(recipient_email);
```

---

### 9. pages (CMS Pages)

**Purpose:** Store static pages (About, Curriculum, Policies, etc.)

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Page Info
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL slug (e.g., 'about', 'curriculum')
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL, -- Markdown or HTML
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(255),
  
  -- Publishing
  is_published BOOLEAN DEFAULT true,
  
  -- Metadata
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pages_slug ON pages(slug);
```

---

### 10. events (School Events)

**Purpose:** Store school events (Tết, Anniversary, Sports Day, etc.)

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event Info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  
  -- Date & Location
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  
  -- Metadata
  cover_image_url VARCHAR(500),
  is_public BOOLEAN DEFAULT true,
  
  -- Registration
  is_registration_open BOOLEAN DEFAULT false,
  registration_link VARCHAR(500),
  max_attendees INTEGER,
  
  -- Created by
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_slug ON events(slug);
```

---

### 11. event_registrations (Event Attendees)

**Purpose:** Track event registrations/attendance

```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event & Attendee
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  attendee_name VARCHAR(255) NOT NULL,
  attendee_email VARCHAR(255) NOT NULL,
  attendee_phone VARCHAR(20),
  
  -- Attendance
  num_attendees INTEGER DEFAULT 1,
  
  -- Registration Status
  status VARCHAR(50) DEFAULT 'registered', -- 'registered', 'attended', 'cancelled'
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_email ON event_registrations(attendee_email);
```

---

### 12. contact_messages (Contact Form Submissions)

**Purpose:** Store contact form submissions

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Sender Info
  sender_name VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(20),
  
  -- Message
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'read', 'responded'
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

---

### 13. newsletter_subscribers (Email List)

**Purpose:** Store newsletter subscribers

```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Subscriber Info
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  
  -- Subscription
  is_subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  
  -- Metadata
  source VARCHAR(100), -- 'homepage', 'blog', 'contact', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_subscribed ON newsletter_subscribers(is_subscribed);
```

---

### 14. email_templates (Email Template Library)

**Purpose:** Store reusable email templates

```sql
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Template Info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL, -- HTML email template
  
  -- Type
  template_type VARCHAR(100), -- 'admission-confirmation', 'tour-reminder', 'announcement', etc.
  
  -- Variables (JSON)
  -- Example: ["{{parent_name}}", "{{child_name}}", "{{tour_date}}"]
  variables JSONB DEFAULT '[]',
  
  -- Metadata
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email_templates_slug ON email_templates(slug);
```

---

## Relationships & Foreign Keys

```
users
├── blog_posts (author_id)
├── gallery_albums (created_by)
├── announcements (created_by)
├── pages (created_by)
├── events (created_by)
└── email_templates (created_by)

admissions (standalone)

tour_bookings (standalone)

gallery_albums
└── gallery_images (album_id)

announcements
└── announcement_recipients (announcement_id)

events
└── event_registrations (event_id)

contact_messages (standalone)

newsletter_subscribers (standalone)

pages (standalone)

email_templates (standalone)
```

---

## Row Level Security (RLS) Policies

### Public Access
- `blog_posts` - Read only (published posts)
- `gallery_images` - Read only
- `events` - Read only
- `pages` - Read only

### Parent/Authenticated Access
- `announcements` - Read (own announcements)
- `contact_messages` - Create (own messages)
- `newsletter_subscribers` - Create, Update (own subscription)

### Admin Access
- All tables - Full CRUD (Create, Read, Update, Delete)

### Example RLS Policies

```sql
-- Blog posts: Anyone can read published posts
CREATE POLICY "blog_posts_public_read"
ON blog_posts FOR SELECT
USING (is_published = true);

-- Admissions: Anyone can submit, only admin can view all
CREATE POLICY "admissions_anyone_create"
ON admissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "admissions_admin_read"
ON admissions FOR SELECT
USING (auth.role() = 'authenticated' AND 
       (SELECT role FROM users WHERE users.id = auth.uid()) = 'admin');

-- Contact messages: Anyone can submit
CREATE POLICY "contact_messages_anyone_create"
ON contact_messages FOR INSERT
WITH CHECK (true);
```

---

## Indexes Summary

Key indexes for performance:

- `users(email)` - User lookups
- `admissions(status, created_at)` - Admin list views
- `blog_posts(slug, published_at)` - Blog routing & listing
- `gallery_albums(slug)` - Album routing
- `announcements(status, published_at)` - Admin listing
- `events(start_date)` - Event listing
- `contact_messages(created_at)` - Message listing

---

## Migration Strategy

### Phase 1: Core Tables
1. users
2. admissions
3. tour_bookings
4. contact_messages
5. newsletter_subscribers

### Phase 2: Content Management
6. pages
7. blog_posts
8. gallery_albums & gallery_images

### Phase 3: Communication
9. announcements & announcement_recipients
10. email_templates

### Phase 4: Events
11. events & event_registrations

---

## Backup & Recovery

- Daily automated backups to Supabase
- Point-in-time recovery enabled
- Export strategy: Monthly CSV exports for admissions & tour bookings

---

## Monitoring & Maintenance

- Monitor table sizes and growth
- Quarterly index optimization
- Archive old records annually
- Monitor slow queries (Supabase dashboard)

---

## Sample Queries

### Get pending admissions
```sql
SELECT * FROM admissions 
WHERE status = 'new' 
ORDER BY created_at DESC;
```

### Get published blog posts by category
```sql
SELECT * FROM blog_posts 
WHERE is_published = true AND category = 'child-development'
ORDER BY published_at DESC
LIMIT 10;
```

### Get upcoming events
```sql
SELECT * FROM events 
WHERE start_date > NOW()
ORDER BY start_date ASC;
```

### Get tour bookings for a specific date
```sql
SELECT * FROM tour_bookings 
WHERE tour_date = '2024-06-15'
ORDER BY tour_time ASC;
```

---

## Data Retention Policy

- Admissions: Keep indefinitely (legal requirement)
- Tour bookings: Archive after 1 year
- Contact messages: Archive after 1 year
- Newsletter data: Keep per subscription preferences
- Blog posts: Keep indefinitely
- Gallery images: Keep indefinitely
