# Sunshine Maple Bear School Website

Professional international preschool website for Sunshine Maple Bear School at Sunshine City, Ciputra Nam Thăng Long, Hà Nội.

## Overview

This is a modern, full-featured website built with Next.js 16, Supabase, and Tailwind CSS. It includes:

- **Public Pages**: Landing page, About, Curriculum (Maple Bear standards), Contact, Blog, Gallery, Events
- **Admission System**: Online application form with Supabase integration
- **Tour Booking**: Calendar-based school tour scheduling
- **Admin Dashboard**: Complete management system for admissions, tours, blog, gallery, announcements, analytics
- **Responsive Design**: Mobile-first approach with brand colors (Red #FF0000, Gold #D4AF37, Black #1A1A1A)
- **SEO Optimized**: Proper metadata, open graph tags, structured data
- **Security**: Supabase authentication, API routes, RLS policies

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4, Shadcn/UI components
- **Data Fetching**: SWR for client-side caching
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- pnpm (or npm/yarn)
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sunshine-maple-bear-school
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (for admin operations)
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── admin/        # Admin API routes
│   │   └── submissions/  # Public form submissions
│   ├── admin/            # Admin dashboard pages
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Landing page
│   ├── about/            # About page
│   ├── curriculum/       # Curriculum page
│   ├── admission/        # Admission form page
│   ├── tour-booking/     # Tour booking page
│   ├── gallery/          # Gallery page
│   ├── blog/             # Blog page
│   ├── events/           # Events page
│   ├── contact/          # Contact page
│   └── globals.css       # Global styles with Maple Bear colors
├── components/
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Footer
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── constants.ts      # School information, colors, grades
│   └── utils.ts          # Utility functions
├── docs/
│   ├── PRD.md            # Product requirements document
│   ├── DESIGN_SYSTEM.md  # Design system guidelines
│   ├── SITEMAP.md        # Site structure
│   └── DATABASE_SCHEMA.md # Database schema
├── public/               # Static assets
├── package.json
└── tsconfig.json
```

## Database Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to initialize

2. **Run Database Migrations**:
   - Go to SQL Editor in Supabase console
   - Copy the SQL from `docs/DATABASE_SCHEMA.md`
   - Execute in the SQL editor

3. **Enable RLS (Row Level Security)**:
   - Set up policies as described in `docs/DATABASE_SCHEMA.md`

## Admin Dashboard

Access the admin dashboard at `/admin`:

- **Dashboard**: Overview with stats and recent activity
- **Admissions**: Manage student admission applications
- **Tour Bookings**: Manage school tour bookings
- **Blog**: Create, edit, publish blog posts
- **Gallery**: Upload and manage photo albums
- **Announcements**: Send announcements to parents/staff
- **Analytics**: View site statistics and activity

## Features

### Public Features

- **Landing Page**: Hero, highlights, grade levels, testimonials, CTA
- **Curriculum Page**: Maple Bear 8 Key Areas + 6 Pillars of Learning
- **Admission Form**: Online application with parent/child information
- **Tour Booking**: Schedule school tours with available dates
- **Gallery**: Photo albums organized by category
- **Blog**: News and educational articles
- **Events**: School events and activities
- **Contact**: Contact form and location map

### Admin Features

- **Complete CRUD** for all content types
- **Form validation** and error handling
- **Real-time updates** with SWR
- **Analytics dashboard** with key metrics
- **User-friendly interface** with intuitive navigation

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Custom Domain**:
   - Configure your domain (e.g., sunshinemaplebear.edu.vn)
   - Update DNS settings

### Environment Variables for Production

Set these in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)

## SEO & Analytics

- **Metadata**: Proper titles, descriptions, and OpenGraph tags
- **Structured Data**: Schema.org markup for schools
- **Sitemap**: Auto-generated with Next.js
- **Robots.txt**: Already configured
- **Analytics**: Ready for Google Analytics integration

## Security

- **Authentication**: Supabase Auth (setup required)
- **RLS Policies**: Protect sensitive data
- **API Routes**: Server-side operations only
- **Input Validation**: Zod schemas for all forms
- **CORS**: Properly configured for API access

## Brand Guidelines

- **Primary Color**: Red (#FF0000)
- **Secondary Color**: Gold (#D4AF37)
- **Neutral**: Black (#1A1A1A), White (#FFFFFF), Grays
- **Font**: Geist Sans (primary), Geist Mono (secondary)
- **Logo**: Maple Bear Canadian School logo on header
- **Tone**: Professional, warm, child-friendly, trust-building

## Documentation

Comprehensive documentation is available in the `/docs` folder:

- `PRD.md` - Product requirements with business goals
- `DESIGN_SYSTEM.md` - Complete design guidelines
- `SITEMAP.md` - Full site structure and navigation
- `DATABASE_SCHEMA.md` - Database tables, relationships, RLS policies

## Support & Maintenance

### Common Tasks

**Add a new blog post**:
1. Go to Admin > Blog
2. Click "Bài viết mới"
3. Fill in title, content, category
4. Publish or save as draft

**Add photos to gallery**:
1. Go to Admin > Gallery
2. Click "Tải lên ảnh mới"
3. Select album and upload image
4. Images appear immediately

**Send announcement**:
1. Go to Admin > Announcements
2. Click "Thông báo mới"
3. Write message and select target audience
4. Set priority and publish

## License

All rights reserved © 2024 Sunshine Maple Bear School

## Contact

For questions about the website:
- Email: info@sunshinemaplebear.edu.vn
- Phone: [School contact number]
- Address: Sunshine City, Ciputra Nam Thăng Long, Hà Nội
