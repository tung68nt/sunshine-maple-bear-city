# Sitemap: Sunshine Maple Bear School Website

## Overview

Complete hierarchical sitemap showing all pages, routes, and navigation structure for the website.

---

## Public Pages (Guest Access)

### 1. Homepage / Trang Chủ
- **Path:** `/`
- **Components:**
  - Header with navigation
  - Hero section (school name, tagline, CTA buttons)
  - Quick highlights (3-4 boxes: About, Curriculum, Admissions, Tours)
  - Featured blog posts (3 latest)
  - Testimonials carousel
  - Upcoming events section
  - Call-to-action section
  - Footer
- **SEO:** Homepage meta, structured data (Organization schema)
- **Meta Title:** "Sunshine Maple Bear School - Trường Mầm Non Chuẩn Quốc Tế | Hà Nội"
- **Meta Description:** "Trường mầm non Sunshine Maple Bear sử dụng chương trình Canadian, cấp độ Infant đến Kindergarten, Ciputra Nam Thăng Long"

---

### 2. About / Giới Thiệu
- **Path:** `/about`
- **Sections:**
  - School introduction & history
  - Mission & vision
  - Leadership team (photos + bios)
  - International standards & certifications
  - Facilities overview (with images)
  - Why choose Sunshine Maple Bear (advantages)
  - Numbers/Statistics (years operating, number of students, teachers)
- **CTA Buttons:** "Enrollment Now", "Schedule Tour", "Contact Us"
- **Meta Title:** "Giới Thiệu - Sunshine Maple Bear School"

---

### 3. Curriculum / Chương Trình Giáo Dục
- **Path:** `/curriculum`
- **Main Sections:**
  
  #### 3.1 Overview
  - Introduction to Maple Bear Canadian method
  - 8 Key Areas of Development (with icons & descriptions)
    - Fine Motor Development
    - Gross Motor Development
    - Social & Emotional Development
    - Language Development (Bilingual)
    - Cognitive Development
    - Arts & Creativity Development
    - Dramatic Play Development
    - Music & Movement Development
  
  #### 3.2 6 Pillars of Learning
  - Literacy & Language Arts (Bilingual - English & Vietnamese)
  - Numeracy & Mathematics (CPA approach)
  - Science & Discovery (Inquiry-based STEM)
  - Character & Values (Empathy, responsibility)
  - Creative Arts (Process-oriented)
  - Social-Emotional Learning
  
  #### 3.3 Grade Levels
  - Sub-page: `/curriculum/infant-care` (2-18 months)
  - Sub-page: `/curriculum/playgroup` (18 months - 3 years)
  - Sub-page: `/curriculum/nursery` (3-4 years)
  - Sub-page: `/curriculum/kindergarten` (4-6 years)
    - Daily schedule samples
    - Learning activities
    - Teacher qualifications
    - Parent involvement opportunities
  
  #### 3.4 Comparison with Other Methods
  - Maple Bear vs. Montessori
  - Maple Bear vs. Reggio Emilia
  - Maple Bear vs. Waldorf
  
  #### 3.5 Resources
  - Downloadable curriculum overview (PDF)
  - Parent handbook link
  - FAQ section

- **Meta Title:** "Chương Trình Giáo Dục - Maple Bear Canadian Standard | Sunshine Maple Bear"

---

### 4. Admission / Tuyển Sinh
- **Path:** `/admission`
- **Sections:**

  #### 4.1 Admission Overview
  - Welcome message
  - Admission benefits
  - Timeline (when admissions open)
  
  #### 4.2 Admission Requirements
  - Age requirements by grade
  - Required documents checklist
  - Health requirements
  - Assessment process
  
  #### 4.3 Admission Form
  - Online form (embedded or linked)
  - Form fields:
    - Parent information (name, email, phone, address)
    - Child information (name, DOB, passport, medical info)
    - Current language spoken
    - Special needs/allergies
    - Desired grade level
    - Attachment uploads (documents)
  - Form validation & error handling
  - Success message with next steps
  
  #### 4.4 Pricing & Payment
  - Tuition fees by grade
  - Additional fees breakdown (uniforms, activities, lunch)
  - Payment schedule options
  - Refund policy
  - Discount programs (siblings, early enrollment)
  
  #### 4.5 FAQ
  - Common admission questions
  - How long until decision?
  - Can we defer enrollment?
  - Can we visit before enrolling?
  - What if child has allergies?
  
  #### 4.6 Application Status Tracking
  - Link to parent portal login
  - Instructions on how to check status

- **Form Integration:** Supabase form submissions, email confirmations
- **Meta Title:** "Tuyển Sinh - Đơn Xin Học | Sunshine Maple Bear School"

---

### 5. Tour Booking / Đặt Lịch Tham Quan
- **Path:** `/tour-booking`
- **Sections:**

  #### 5.1 Tour Information
  - What to expect during a tour
  - Duration (30-45 min)
  - Facilities you'll see
  - Who conducts the tour
  
  #### 5.2 Available Tours
  - Calendar showing available dates
  - Time slots (morning, afternoon)
  - Number of spots available
  - Tour type selection (individual, group)
  
  #### 5.3 Booking Form
  - Parent name, email, phone
  - Number of adults & children
  - Preferred date & time
  - Special requests (wheelchair accessibility, language preference)
  - Form submission
  
  #### 5.4 Confirmation & Directions
  - Booking confirmation message
  - Email confirmation sent
  - Directions to school (Google Maps embedded)
  - Parking instructions
  - What to bring/prepare
  - Contact info if need to reschedule
  
  #### 5.5 Photo Gallery (Tour Preview)
  - Images of classrooms
  - Outdoor play areas
  - Cafeteria/kitchen
  - Library/learning centers

- **Form Integration:** Supabase calendar + availability management
- **Meta Title:** "Đặt Lịch Tham Quan - Sunshine Maple Bear School"

---

### 6. Gallery / Thư Viện Ảnh & Video
- **Path:** `/gallery`
- **Structure:**
  
  #### 6.1 Gallery Overview
  - Introduction & photo gallery grid (all images)
  - Search/filter by category
  
  #### 6.2 Gallery Categories (Sub-pages)
  - `/gallery/daily-activities` - Daily activities & learning moments
  - `/gallery/classrooms` - Classroom tours
  - `/gallery/outdoor-play` - Outdoor play & sports
  - `/gallery/events` - School events (Tết, Anniversary, Sports Day)
  - `/gallery/summer-camp` - Summer camp activities
  - `/gallery/special-occasions` - Special occasions & celebrations
  
  #### 6.3 Image Gallery Layout
  - Masonry/grid layout (3-4 columns responsive)
  - Lightbox modal for full-size viewing
  - Image captions
  - Image metadata (date, activity description)
  - Share options (social media)
  - Download option for parents
  
  #### 6.4 Video Gallery (Optional)
  - Embedded YouTube videos
  - School promotional videos
  - Classroom tour videos
  - Parent testimonial videos
  - Maple Bear curriculum explanation videos

- **Admin Panel:** Upload, organize, delete images
- **Meta Title:** "Thư Viện Ảnh & Video - Hoạt Động Trường | Sunshine Maple Bear"

---

### 7. Blog / Tin Tức & Bài Viết
- **Path:** `/blog`
- **Structure:**

  #### 7.1 Blog Homepage
  - Featured post (large card)
  - Recent posts (6-9 per page)
  - Pagination
  - Category filter sidebar
  - Search box
  - Newsletter signup
  
  #### 7.2 Blog Categories (Sub-pages)
  - `/blog/category/school-news` - School news & announcements
  - `/blog/category/child-development` - Child development tips
  - `/blog/category/parenting-tips` - Parenting advice
  - `/blog/category/maple-bear-curriculum` - Curriculum articles
  - `/blog/category/events` - Event recaps & announcements
  
  #### 7.3 Individual Blog Post
  - `/blog/[slug]` (e.g., `/blog/importance-of-play-based-learning`)
  - Post layout:
    - Featured image (full-width or sidebar)
    - Post title & meta (date, author, category)
    - Post content (formatted text, images, quotes)
    - Author bio (small card)
    - Related posts (3-4 suggestions)
    - Comment section (Disqus or custom)
    - Social sharing buttons
  
  #### 7.4 Blog Features
  - Author profiles (teacher/staff author photos)
  - Reading time estimate
  - Table of contents (for long articles)
  - "Share this post" buttons
  - Newsletter CTA at end

- **Admin Panel:** Create, edit, delete posts; schedule publishing; SEO fields
- **Meta Title:** "/blog - Blog | Sunshine Maple Bear School"
- **Canonical URLs:** Proper URL structure with slugs

---

### 8. Events / Sự Kiện
- **Path:** `/events`
- **Structure:**

  #### 8.1 Events Overview
  - Upcoming events calendar (grid or list view)
  - Past events archive
  - Filter by date, type
  - Featured events
  
  #### 8.2 Event Types
  - Annual celebrations (Tết, Anniversary Day, Sports Day)
  - Parent-student events
  - Open houses
  - Special workshops
  - Community activities
  
  #### 8.3 Individual Event Page
  - `/events/[slug]` (e.g., `/events/tung-bung-tet-celebration`)
  - Event layout:
    - Event banner image
    - Event title & date/time/location
    - Event description & details
    - Registration button/form
    - Gallery of past similar events
    - Comments/testimonials
  
  #### 8.4 Event Management
  - Event registration form
  - Capacity management
  - Attendee list (for admins)
  - Email reminders
  - Event ticketing (optional)

- **Meta Title:** "Sự Kiện - Sunshine Maple Bear School"

---

### 9. Contact / Liên Hệ
- **Path:** `/contact`
- **Sections:**

  #### 9.1 Contact Information
  - School name & logo
  - Phone number (clickable tel: link)
  - Email address
  - Physical address (Ciputra, Nam Thăng Long, Hà Nội)
  - Business hours
  - Emergency contact number
  
  #### 9.2 Map & Directions
  - Google Maps embedded (showing school location)
  - Direction from Ciputra/Sunshine City
  - Parking information
  - Public transportation directions
  
  #### 9.3 Contact Form
  - Name
  - Email
  - Phone
  - Subject (dropdown: General inquiry, Tour request, Admission question, Other)
  - Message
  - Attachment upload (optional)
  - reCAPTCHA protection
  - Submit button
  
  #### 9.4 Social Media Links
  - Facebook (school page)
  - Instagram (school activities)
  - YouTube (school videos)
  - WhatsApp (business account)
  
  #### 9.5 FAQ Section
  - Quick answers to common questions

- **Form Integration:** Supabase submissions, email notification to admin
- **Meta Title:** "Liên Hệ - Sunshine Maple Bear School"

---

### 10. Policies & Legal Pages
- **Path:** `/policies`
- **Sub-pages:**

  #### 10.1 Privacy Policy
  - `/policies/privacy`
  - GDPR compliance
  - Data collection & usage
  - Data protection & security
  
  #### 10.2 Terms of Service
  - `/policies/terms`
  - School policies & rules
  - Parental agreement
  - Liability disclaimer
  
  #### 10.3 Refund Policy
  - `/policies/refund`
  - Enrollment refund terms
  - Activity refund policy
  
  #### 10.4 Parent Handbook
  - `/policies/parent-handbook`
  - School rules & policies
  - Drop-off/pick-up procedures
  - Health & safety policies
  - Dress code
  - Communication policy
  - Behavioral expectations
  - Emergency procedures
  
  #### 10.5 Health & Safety
  - `/policies/health-safety`
  - Vaccination requirements
  - Allergy management
  - Illness policies
  - Emergency procedures

- **Meta Title:** "Chính Sách & Tài Liệu - Sunshine Maple Bear School"

---

### 11. Dedicated Event Landing Pages (Dynamic)
- **Path:** `/events/[slug]` or `/page/[slug]`
- **Examples:**
  - `/events/tung-bung-tet` - Tết celebration details
  - `/events/anniversary-celebration` - Anniversary day details
  - `/page/summer-camp` - Summer camp promotional page
  - `/page/holiday-program` - Holiday program details

---

## Parent Portal Pages (Authenticated - `/parent`)

### 1. Parent Dashboard
- **Path:** `/parent`
- **Access:** Email/password login (parents of enrolled students)
- **Components:**
  - Welcome message
  - Quick stats (child's grade, teacher, attendance)
  - Recent announcements
  - Upcoming events
  - Quick links to child's info
  - Payment status
  
---

### 2. My Application / Đơn Xin Học
- **Path:** `/parent/my-application`
- **Features:**
  - View application status (New, Reviewing, Approved, Rejected, Enrolled)
  - Application timeline
  - Document submission status
  - Messages from admin
  - Next steps
  - Conditional rendering based on status

---

### 3. Announcements
- **Path:** `/parent/announcements`
- **Features:**
  - List of all announcements
  - Filter by category/date
  - Mark as read/unread
  - Archive options
  - Search functionality

---

### 4. Documents & Resources
- **Path:** `/parent/documents`
- **Features:**
  - Parent handbook download
  - Curriculum overview
  - School policies
  - Health forms
  - Emergency contact forms
  - Fee schedules

---

### 5. Account Settings
- **Path:** `/parent/settings`
- **Features:**
  - Update profile information
  - Change password
  - Notification preferences
  - Language preference
  - Delete account

---

## Admin Dashboard Pages (Authenticated - `/admin`)

### 1. Admin Overview / Dashboard
- **Path:** `/admin`
- **Components:**
  - Welcome message
  - Key metrics (pending admissions, tours today, new blog posts)
  - Recent activity log
  - Quick action buttons
  - Chart dashboard (admissions trends, visitor analytics)

---

### 2. Admissions Management
- **Path:** `/admin/admissions`
- **Features:**
  - List of all applications (table view)
  - Status filter (New, Reviewing, Approved, Rejected, Enrolled)
  - Search & filtering
  - Bulk actions (export, mass email)
  - Individual application view:
    - Application form data
    - Documents uploaded
    - Admin notes (editable)
    - Status update dropdown
    - Email templates to send
    - Delete application option

---

### 3. Tour Bookings
- **Path:** `/admin/tour-bookings`
- **Features:**
  - Calendar view of all tour bookings
  - List view of bookings
  - Status: Pending, Confirmed, Completed, Cancelled
  - Send reminder emails
  - Mark as completed
  - Capacity management (max tours per time slot)
  - Export bookings to CSV

---

### 4. Content Management
- **Path:** `/admin/content`
- **Sub-sections:**

  #### 4.1 Pages Management
  - `/admin/content/pages`
  - List of all pages (About, Curriculum, Policies, Contact)
  - Edit button for each page
  - Preview before publishing
  - Publish/unpublish toggle
  - SEO fields (meta title, description, keywords)
  - Schedule publish date/time
  
  #### 4.2 Blog Management
  - `/admin/content/blog`
  - List of all blog posts
  - Create new post button
  - Edit existing posts
  - Delete posts
  - Category management
  - Author assignment
  - Publish/schedule controls
  - SEO optimization fields
  - Featured image upload
  - Preview before publishing
  
  #### 4.3 Gallery Management
  - `/admin/content/gallery`
  - Album management (create, edit, delete)
  - Image upload interface (bulk upload)
  - Image organization (drag-to-reorder)
  - Image captions & metadata
  - Album cover selection
  - Delete images
  - Organize into albums/categories

---

### 5. Announcements & Notifications
- **Path:** `/admin/announcements`
- **Features:**
  - Create new announcement button
  - List of all announcements
  - Draft, Scheduled, Sent filters
  - Edit announcements
  - Delete announcements
  - Schedule announcement for future date
  - Preview email template
  - Select target audience (all parents, specific grade)
  - Send history & statistics (open rate, click rate)
  - Unsubscribe management

---

### 6. Staff Management
- **Path:** `/admin/staff`
- **Features:**
  - List of all staff members
  - Add new staff button
  - Edit staff profile:
    - Name, email, phone
    - Position/role
    - Qualifications
    - Profile photo
    - Bio
  - Delete staff
  - Assign roles & permissions
  - Activity log

---

### 7. Settings
- **Path:** `/admin/settings`
- **Sub-sections:**

  #### 7.1 General Settings
  - School name, address, phone, email
  - Logo upload
  - Business hours
  - Website URL
  
  #### 7.2 Email Configuration
  - Email service selection (Resend, SendGrid)
  - Email templates (admission confirmation, tour reminder, announcement)
  - From address & name
  - Email signature
  
  #### 7.3 User Roles & Permissions
  - Manage admin accounts
  - Assign roles (admin, editor, staff)
  - Permission matrix (what each role can do)
  
  #### 7.4 Integrations
  - Google Analytics setup
  - Social media accounts
  - reCAPTCHA setup
  - Email service configuration

---

### 8. Analytics & Reports
- **Path:** `/admin/analytics`
- **Features:**
  - Google Analytics dashboard (embedded)
  - Key metrics:
    - Total visitors (month/year)
    - Page views
    - Bounce rate
    - Avg. session duration
    - Top pages
    - Top referral sources
    - Device breakdown (mobile/desktop)
  - Admission metrics:
    - Total applications received
    - Applications by month (chart)
    - Conversion rate (tour bookings → admissions)
    - Average time to enrollment
  - Tour booking metrics:
    - Total bookings by month
    - Busiest times
  - Reports export (PDF, CSV)

---

### 9. Login / Authentication
- **Path:** `/admin/login`
- **Features:**
  - Email field
  - Password field
  - "Forgot password?" link
  - Login button
  - 2FA optional (future)
  - Admin registration (if allowed)

---

### 10. Logout
- **Path:** `/admin/logout`
- **Behavior:**
  - Clear session
  - Redirect to login page
  - Confirmation message

---

## API Routes

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/register` - New parent registration (if enabled)
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/reset-password` - Confirm password reset

### Admissions
- `GET /api/admissions` - Get all applications (admin only)
- `GET /api/admissions/[id]` - Get single application
- `POST /api/admissions` - Submit new application
- `PATCH /api/admissions/[id]` - Update application status (admin only)
- `DELETE /api/admissions/[id]` - Delete application (admin only)

### Tour Bookings
- `GET /api/tour-bookings` - Get all bookings (admin only)
- `GET /api/tour-bookings/available` - Get available tour times
- `POST /api/tour-bookings` - Create new booking
- `PATCH /api/tour-bookings/[id]` - Update booking status
- `DELETE /api/tour-bookings/[id]` - Cancel booking

### Blog
- `GET /api/blog` - Get all posts
- `GET /api/blog/[slug]` - Get single post
- `POST /api/blog` - Create post (admin only)
- `PATCH /api/blog/[slug]` - Update post (admin only)
- `DELETE /api/blog/[slug]` - Delete post (admin only)

### Gallery
- `GET /api/gallery` - Get all albums
- `GET /api/gallery/[albumId]` - Get album with images
- `POST /api/gallery` - Create album (admin only)
- `POST /api/gallery/[albumId]/upload` - Upload image (admin only)
- `DELETE /api/gallery/[imageId]` - Delete image (admin only)

### Announcements
- `GET /api/announcements` - Get announcements
- `POST /api/announcements` - Create announcement (admin only)
- `PATCH /api/announcements/[id]` - Update announcement (admin only)
- `DELETE /api/announcements/[id]` - Delete announcement (admin only)
- `POST /api/announcements/send` - Send announcement (admin only)

### Contact & Forms
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Newsletter signup

### Content Pages
- `GET /api/pages/[slug]` - Get page content
- `PATCH /api/pages/[slug]` - Update page (admin only)

---

## Error Pages

- **404 Not Found** - `/404` or custom page for missing pages
- **500 Server Error** - `/500` for server errors
- **403 Forbidden** - Custom page for unauthorized access
- **401 Unauthorized** - Redirect to login for protected routes

---

## Redirect Rules

- `/index` → `/` (homepage)
- `/about.php` → `/about` (old URL redirect)
- `/admission-form` → `/admission` (consistent naming)
- `/photos` → `/gallery` (old URL redirect)
- `/news` → `/blog` (old URL redirect)

---

## Navigation Structure

### Header Navigation (Top)
1. Logo (links to home)
2. Menu Items:
   - About
   - Curriculum
   - Admission
   - Tour Booking
   - Gallery
   - Blog
   - Events
   - Contact
3. Actions:
   - Enrollment CTA button (red/gold)
   - Language selector (EN/VI) - optional
   - Parent Login link
   - Admin Login link

### Footer Navigation
- Quick Links (About, Curriculum, Contact)
- Resources (Blog, Gallery, Events)
- Legal (Privacy, Terms, Policies)
- Contact Info
- Social Media Links
- Newsletter Signup
- Copyright

### Mobile Navigation
- Hamburger menu icon (only on mobile)
- Same menu items as desktop
- Smooth slide-in animation
- Close button

---

## SEO Optimization

### Sitemap XML
- `/sitemap.xml` - Auto-generated list of all public pages
- Includes last modified dates & change frequency

### Robots.txt
- `/robots.txt` - Directions for search engine crawlers
- Allow indexing of public pages
- Disallow `/admin`, `/parent`, API routes

### Canonical URLs
- Every page includes `<link rel="canonical" href="...">`
- Prevents duplicate content issues

### Meta Tags
- Every page has unique:
  - `<title>` (50-60 chars)
  - `<meta name="description">` (150-160 chars)
  - `<meta name="keywords">` (if applicable)
  - `<meta property="og:*">` (social sharing)

---

## Accessibility Navigation

- Skip to main content link (hidden, visible on focus)
- Keyboard navigation support (Tab, Enter, Escape)
- ARIA labels for interactive elements
- Form validation with error messages
- Proper heading hierarchy (H1 → H2 → H3)

---

## Summary

**Total Pages:**
- Public pages: 15+
- Parent portal pages: 5
- Admin pages: 10+
- API routes: 20+
- Error/special pages: 5

**Key Navigation Patterns:**
- Clear, hierarchical structure
- Consistent header/footer across all pages
- Mobile-friendly hamburger menu
- Proper back-button functionality
- Breadcrumbs for nested pages (optional)
