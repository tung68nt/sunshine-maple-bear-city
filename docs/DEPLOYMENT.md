# Deployment Guide - Sunshine Maple Bear School Website

Complete guide to deploy your website to production.

## Prerequisites

1. GitHub account
2. Vercel account (free or paid)
3. Supabase project created and configured
4. Domain name (optional but recommended)

## Part 1: Prepare Your Code

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name: `sunshine-maple-bear-school`
3. Make it public (optional for Vercel integration)
4. Initialize with README (not needed, we have one)

### Step 2: Push Code to GitHub

```bash
# Navigate to your project directory
cd /path/to/sunshine-maple-bear-school

# Initialize git
git init

# Add remote repository
git remote add origin https://github.com/yourusername/sunshine-maple-bear-school.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Production-ready Maple Bear website"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify Production Build

```bash
# Make sure build is clean
pnpm run build

# Check for any warnings
pnpm run lint  # If linter is configured
```

## Part 2: Deploy to Vercel

### Step 1: Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click **Dashboard** (or create account if new)
3. Click **New Project**
4. Click **Import Git Repository**
5. Paste your GitHub repository URL
6. Click **Import**

### Step 2: Configure Environment Variables

1. In the Vercel import dialog, find **Environment Variables**
2. Add each variable from your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
```

3. Vercel will auto-detect Next.js project settings
4. Click **Deploy**

### Step 3: Wait for Deployment

- Vercel will build and deploy automatically
- Takes 2-5 minutes
- You'll get a URL like `sunshine-maple-bear-school.vercel.app`
- Monitor the build progress in Vercel dashboard

## Part 3: Setup Custom Domain

### Option A: Using Vercel Domains (Recommended)

1. In Vercel dashboard, go to your project
2. Click **Settings > Domains**
3. Enter your domain: `sunshinemaplebear.edu.vn`
4. Click **Add Domain**
5. Vercel shows DNS records to add

### Option B: Using Custom DNS

If your domain is hosted elsewhere (GoDaddy, Namecheap, etc):

1. Get your Vercel deployment URL
2. Log in to your domain registrar
3. Add CNAME record:
   - Name: (leave blank for root, or use www)
   - Value: `cname.vercel-dns.com.`
4. Or add A record:
   - Name: @
   - Value: `76.76.19.165`

### Option C: Using Vercel DNS (Full Control)

1. In Vercel, click **Settings > Domains > Nameservers**
2. Get Vercel's nameservers
3. Update nameservers in your domain registrar
4. Wait 24-48 hours for DNS to propagate

## Part 4: Verify Deployment

### Test Live Website

1. Open your custom domain in browser
2. Check all pages load:
   - / (Landing)
   - /about
   - /curriculum
   - /admission
   - /tour-booking
   - /gallery
   - /blog
   - /events
   - /contact

### Test Forms

1. Submit test admission application
2. Check Supabase database for entry
3. Submit test tour booking
4. Verify data appears in database

### Test Admin Dashboard

1. Navigate to `/admin`
2. Check dashboard loads
3. Verify you can create blog post
4. Try uploading gallery image

### Test SEO

1. Use Google Search Console
2. Submit sitemap
3. Check Google can crawl pages
4. Monitor for any errors

## Part 5: Setup Auto-Deploy

Vercel automatically redeploys when you push to GitHub:

```bash
# Make a change to your code
echo "# Updated" >> README.md

# Commit and push
git add README.md
git commit -m "Update README"
git push origin main

# Vercel automatically redeploys in 2-5 minutes
```

Monitor deployments at your Vercel dashboard.

## Part 6: Continuous Improvement

### Enable Analytics (Optional)

1. In Vercel, go to **Analytics**
2. Follow setup instructions
3. Vercel collects Web Vitals automatically

### Setup Email Notifications

1. In Vercel, go to **Notifications**
2. Enable deployment notifications
3. Get alerts on build success/failure

### Configure Error Tracking (Optional)

1. Setup Sentry.io
2. Add error tracking to your site
3. Get notified of production issues

### Setup Monitoring

1. Use Uptime Robot (uptimerobot.com)
2. Monitor your domain is always up
3. Get alerts if site goes down

## Part 7: Post-Deployment Checklist

- [ ] Domain is live and accessible
- [ ] HTTPS/SSL certificate is active
- [ ] All pages load correctly
- [ ] Navigation works on mobile
- [ ] Forms submit successfully
- [ ] Database submissions appear in Supabase
- [ ] Admin dashboard loads
- [ ] No console errors
- [ ] Google can crawl site
- [ ] Email redirects work (if configured)
- [ ] Images load quickly
- [ ] Mobile responsive works
- [ ] Dark mode works (if enabled)
- [ ] Performance is good (Lighthouse score)
- [ ] Accessibility is good (WCAG A)

## Part 8: Maintenance

### Weekly Tasks
- Monitor form submissions
- Check admin dashboard
- Respond to inquiries

### Monthly Tasks
- Update blog with news
- Review analytics
- Check for errors in console
- Database backup

### Quarterly Tasks
- Security audit
- Performance optimization
- Update dependencies
- Review site analytics

### Annual Tasks
- SSL certificate renewal (auto in Vercel)
- Major feature updates
- Technology stack review
- Accessibility audit

## Troubleshooting

### Domain Not Working

**Problem**: Domain shows 404 or doesn't resolve
- **Solution**: 
  1. Check DNS records are correct
  2. Wait 24-48 hours for propagation
  3. Clear browser cache
  4. Use different browser or device
  5. Check in Vercel that domain is verified

### Build Failures

**Problem**: Vercel build fails
- **Solution**:
  1. Check Vercel build logs
  2. Run `pnpm run build` locally
  3. Fix errors locally
  4. Push fix to GitHub
  5. Vercel redeploys automatically

### Database Connection Error

**Problem**: Forms show database connection error
- **Solution**:
  1. Check Supabase is online
  2. Verify env variables are correct
  3. Check RLS policies are enabled
  4. Ensure tables exist in database
  5. Check API route logs

### Images Not Loading

**Problem**: Images appear broken
- **Solution**:
  1. Check image URLs are correct
  2. Verify images exist in storage
  3. Check image file permissions
  4. Clear CDN cache if applicable
  5. Use Next.js Image component

### Slow Performance

**Problem**: Site loads slowly
- **Solution**:
  1. Run Lighthouse audit
  2. Optimize images
  3. Enable caching
  4. Check database queries
  5. Review Vercel analytics

## Rollback to Previous Version

If you need to rollback to a previous version:

1. In Vercel dashboard, go to **Deployments**
2. Find the previous working deployment
3. Click **...** and select **Promote to Production**
4. The previous version is now live

## Getting Help

### Resources
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)

### Support
- Vercel Support: Chat in Vercel dashboard
- GitHub Issues: Create issue in your repository
- Stack Overflow: Tag with `next.js`, `vercel`, `supabase`

## Performance Tips

### For Faster Load Times
1. Enable image optimization
2. Use Next.js Image component
3. Minify CSS and JavaScript
4. Reduce bundle size
5. Enable compression

### For Better Caching
1. Set proper cache headers
2. Use SWR for data fetching
3. Cache static pages
4. Use CDN effectively

### For Lower Costs
1. Use Vercel free tier (up to 100GB bandwidth)
2. Optimize database queries
3. Limit API calls
4. Use caching effectively

## Security Checklist

- [ ] HTTPS/SSL enabled
- [ ] Environment variables are secret
- [ ] No API keys in code
- [ ] Input validation enabled
- [ ] Database RLS policies active
- [ ] Admin routes protected
- [ ] Backups configured
- [ ] Error logs reviewed
- [ ] Rate limiting considered
- [ ] CORS properly configured

## Congratulations!

Your Sunshine Maple Bear School website is now live! 

Monitor it regularly, keep content updated, and engage with parents through your new platform.

For any issues or questions, refer to the main README.md or the QUICK_START.md guide.

Good luck with your website!
