# Quick Start Guide - Sunshine Maple Bear School Website

This guide will get you up and running in 10 minutes.

## Step 1: Setup Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project:
   - Name: "Sunshine Maple Bear"
   - Region: Asia (Singapore recommended for Vietnam)
   - Database Password: Keep it safe
3. Wait for the project to initialize
4. Go to **Settings > API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Setup Database (3 minutes)

1. In Supabase, go to **SQL Editor**
2. Click **New query**
3. Copy everything from `docs/SETUP_DATABASE.sql`
4. Paste into the editor and click **Run**
5. Wait for the tables to be created

## Step 3: Setup Environment Variables (1 minute)

1. In your project folder, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (from Settings > API > service_role)
```

## Step 4: Run Development Server (1 minute)

```bash
# Install dependencies (if not done yet)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your First Tour

### Home Page (/)
- Landing page with school introduction
- Click "Tìm hiểu thêm" to explore

### Curriculum Page (/curriculum)
- View Maple Bear 8 Key Areas of Development
- See the 6 Pillars of Learning framework
- Grade levels and teaching methods

### Admission Form (/admission)
- Fill out student application
- Submit to add to admin panel
- Uses `/api/submissions/admission`

### Tour Booking (/tour-booking)
- Schedule a school tour
- Select preferred date and time
- Submit booking

### Admin Dashboard (/admin)
- View submitted admissions
- Manage tour bookings
- Create blog posts
- Upload photos to gallery
- Send announcements

## Common Tasks

### Add a Blog Post

1. Go to `/admin/blog`
2. Click "Bài viết mới"
3. Fill in:
   - Title: "My Blog Post"
   - Slug: "my-blog-post"
   - Excerpt: Short summary
   - Content: Full content
   - Category: news/education/events
4. Select status: draft or published
5. Click "Tạo bài viết"

### Add Gallery Photos

1. Go to `/admin/gallery`
2. Click "Tải lên ảnh mới"
3. Add title and select album
4. Photos will appear in `/gallery`

### Send Announcement

1. Go to `/admin/announcements`
2. Click "Thông báo mới"
3. Write message
4. Select priority and target audience
5. Click "Tạo thông báo"

## Customization

### Change School Name
Edit `lib/constants.ts`:
```typescript
export const SCHOOL = {
  name: 'Sunshine Maple Bear School',
  // ... other settings
}
```

### Change Colors
Edit `app/globals.css`:
```css
--maple-red: #FF0000;
--maple-gold: #D4AF37;
--maple-black: #1A1A1A;
```

### Update Contact Info
Edit `lib/constants.ts`:
```typescript
export const CONTACT = {
  phone: '+84 (0) 123 456 7890',
  email: 'info@sunshinemaplebear.edu.vn',
  address: 'Sunshine City, Ciputra Nam Thăng Long',
}
```

## Deployment to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click Deploy

5. Custom domain:
   - Go to **Settings > Domains**
   - Add your domain (e.g., sunshinemaplebear.edu.vn)
   - Follow DNS instructions

## Testing Checklist

- [ ] Home page loads correctly
- [ ] All menu links work
- [ ] Admission form submits successfully
- [ ] Tour booking form submits successfully
- [ ] Contact form submits successfully
- [ ] Admin dashboard loads
- [ ] Can create blog post
- [ ] Can upload photo
- [ ] Can send announcement
- [ ] Mobile responsive on all pages

## Troubleshooting

**"Missing Supabase environment variables"**
- Check `.env.local` has correct values
- Restart dev server after changing env vars

**"Error: supabaseUrl is required"**
- Make sure `NEXT_PUBLIC_SUPABASE_URL` is set
- Check for typos in env variable name

**"Forms not submitting"**
- Check Supabase RLS policies are correct
- Verify database tables exist
- Check browser console for errors

**"Photos not uploading"**
- Ensure gallery table exists in database
- Check Supabase Storage bucket is created
- Verify API route is working

## Next Steps

1. **Setup Authentication** (optional):
   - Enable Supabase Auth
   - Add login/register for admin users
   - Implement admin route protection

2. **Email Notifications**:
   - Setup SendGrid or similar
   - Send confirmation emails on admission
   - Send tour booking confirmations

3. **Payment Integration** (optional):
   - Add tuition payment system
   - Integrate Stripe or local payment gateway

4. **Advanced Features**:
   - Parent portal with student progress
   - Real-time chat with staff
   - Event registration system
   - Photo download for parents

## Documentation

For more details, see:
- `docs/PRD.md` - Full product requirements
- `docs/DESIGN_SYSTEM.md` - Design guidelines
- `docs/SITEMAP.md` - Site structure
- `docs/DATABASE_SCHEMA.md` - Database details

## Support

Need help?
- Check the main `README.md`
- Review documentation in `/docs`
- Check browser console for errors
- Review Supabase logs
