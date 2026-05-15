# Design System: Sunshine Maple Bear School

## 1. Brand Identity

### 1.1 Logo & Brand
- **Logo Name:** Maple Bear with Canadian Flag
- **Primary Colors:** Red (#FF0000), Gold (#D4AF37), Black (#1a1a1a), White (#FFFFFF)
- **Brand Values:** Professional, Educational, Safe, Bilingual, International Standard
- **Tone:** Warm, Welcoming, Professional, Trustworthy

### 1.2 Mission Statement
Cung cấp giáo dục toàn diện theo chuẩn Maple Bear Canadian, phát triển trẻ em thông qua chơi và khám phá, với tôn trọng đa dạng văn hóa.

---

## 2. Color System

### 2.1 Primary Palette

| Color | Hex | RGB | Usage | Contrast |
|-------|-----|-----|-------|----------|
| Maple Red | #FF0000 | 255, 0, 0 | CTAs, highlights, danger | AAA on white |
| Maple Gold | #D4AF37 | 212, 175, 55 | Accents, premium feel, badges | AAA on white |
| Maple Black | #1A1A1A | 26, 26, 26 | Text, headings, strong elements | AAA on white |
| White | #FFFFFF | 255, 255, 255 | Primary background | AAA on black |

### 2.2 Secondary Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Light Gray | #F5F5F5 | Card backgrounds, dividers |
| Medium Gray | #D0D0D0 | Borders, disabled states |
| Dark Gray | #666666 | Secondary text, metadata |
| Success Green | #22C55E | Success messages, confirms |
| Warning Orange | #F59E0B | Warnings, alerts |
| Error Red | #EF4444 | Errors, destructive actions |
| Info Blue | #3B82F6 | Information, links |

### 2.3 Usage Guidelines

**Accessibility (WCAG AA+):**
- All text on colored backgrounds must have contrast ratio ≥ 4.5:1
- Large text (18px+) can use 3:1 minimum ratio
- Never use color alone to convey information

**Brand Application:**
- Maple Red for CTAs: buttons, links, badges
- Maple Gold for accents: highlights, hover states
- Black for primary text
- Grays for secondary content and structure

---

## 3. Typography

### 3.1 Font Family

```css
/* Headings & Body */
--font-sans: "Inter", "Geist", system-ui, sans-serif;

/* Monospace (code) */
--font-mono: "Geist Mono", "Monaco", monospace;
```

**Font Loading:**
- Use Google Fonts or Vercel's font optimization
- Load only used weights: 400 (regular), 600 (semibold), 700 (bold)
- System fallback for performance

### 3.2 Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|------------|-----------------|
| **Heading 1** | 48px | 700 | 1.2 (58px) | -0.02em |
| **Heading 2** | 36px | 700 | 1.25 (45px) | -0.01em |
| **Heading 3** | 28px | 700 | 1.35 (38px) | 0 |
| **Heading 4** | 24px | 700 | 1.4 (34px) | 0 |
| **Heading 5** | 20px | 600 | 1.5 (30px) | 0 |
| **Body Large** | 18px | 400 | 1.6 (29px) | 0 |
| **Body Regular** | 16px | 400 | 1.6 (26px) | 0 |
| **Body Small** | 14px | 400 | 1.5 (21px) | 0.25px |
| **Label** | 12px | 600 | 1.4 (17px) | 0.5px |
| **Overline** | 11px | 700 | 1.4 (15px) | 1px |

### 3.3 Text Styles

```css
/* Heading usage */
h1 { font: 700 48px/1.2 var(--font-sans); }
h2 { font: 700 36px/1.25 var(--font-sans); }
h3 { font: 700 28px/1.35 var(--font-sans); }
h4 { font: 700 24px/1.4 var(--font-sans); }

/* Body text (default) */
p { font: 400 16px/1.6 var(--font-sans); color: var(--color-text-primary); }

/* Emphasis */
strong { font-weight: 700; }
em { font-style: italic; }
```

---

## 4. Spacing System

### 4.1 Spacing Scale (4px Grid)

```css
--space-0: 0px
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px    /* Most common */
--space-5: 20px
--space-6: 24px    /* Section spacing */
--space-7: 28px
--space-8: 32px    /* Large sections */
--space-9: 36px
--space-10: 40px
--space-12: 48px   /* Hero sections */
--space-16: 64px   /* Large sections */
--space-20: 80px
--space-24: 96px
```

### 4.2 Padding & Margin Guidelines

- **Buttons:** 12px 16px (vertical × horizontal)
- **Cards:** 24px padding
- **Page sections:** 48px-96px vertical margin
- **Containers:** max-width 1200px, padding 16px mobile / 40px desktop

---

## 5. Components

### 5.1 Button Styles

**Primary Button (CTA)**
```css
background-color: #FF0000;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
border: none;
cursor: pointer;
transition: all 0.3s ease;
```
- Hover: `background-color: #CC0000;`
- Active: `background-color: #990000;`
- Disabled: `opacity: 0.5; cursor: not-allowed;`

**Secondary Button**
```css
background-color: transparent;
color: #FF0000;
border: 2px solid #FF0000;
padding: 10px 22px;
border-radius: 8px;
font-weight: 600;
```

**Ghost Button (Links)**
```css
background-color: transparent;
color: #FF0000;
text-decoration: underline;
padding: 0;
border: none;
```

### 5.2 Card Component

```css
background-color: #FFFFFF;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
padding: 24px;
border: 1px solid #E8E8E8;
```
- Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.15);`

### 5.3 Input & Form Elements

**Text Input**
```css
border: 1px solid #D0D0D0;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
font-family: var(--font-sans);
```
- Focus: `border-color: #FF0000; outline: none; box-shadow: 0 0 0 3px rgba(255,0,0,0.1);`

**Placeholder**
```css
color: #999999;
font-style: italic;
```

**Label**
```css
font-weight: 600;
font-size: 14px;
color: #1A1A1A;
margin-bottom: 8px;
display: block;
```

### 5.4 Navigation

**Header Navigation**
- Background: #FFFFFF
- Text color: #1A1A1A
- Active link: color #FF0000, border-bottom 3px solid #FF0000
- Responsive: Hamburger menu on mobile (< 768px)

### 5.5 Alert & Message Boxes

**Success Alert**
```css
background-color: #F0FDF4;
border-left: 4px solid #22C55E;
padding: 16px;
border-radius: 8px;
color: #166534;
```

**Error Alert**
```css
background-color: #FEF2F2;
border-left: 4px solid #EF4444;
padding: 16px;
border-radius: 8px;
color: #991B1B;
```

### 5.6 Badges

**Primary Badge**
```css
background-color: #FF0000;
color: #FFFFFF;
padding: 4px 8px;
border-radius: 4px;
font-size: 12px;
font-weight: 600;
display: inline-block;
```

**Secondary Badge (Maple Gold)**
```css
background-color: #D4AF37;
color: #1A1A1A;
padding: 4px 8px;
border-radius: 4px;
font-size: 12px;
font-weight: 600;
```

---

## 6. Layout & Grid

### 6.1 Container Sizes

| Breakpoint | Width | Max Width |
|------------|-------|-----------|
| Mobile | 100% | 100% - 16px padding |
| Tablet | 100% | 100% - 32px padding |
| Desktop | 1200px | 1200px |
| Large Desktop | 1440px | 1440px |

### 6.2 Responsive Breakpoints (Tailwind)

```css
--breakpoint-sm: 640px   /* Small phones */
--breakpoint-md: 768px   /* Tablets */
--breakpoint-lg: 1024px  /* Desktops */
--breakpoint-xl: 1280px  /* Large desktops */
--breakpoint-2xl: 1536px /* Extra large */
```

### 6.3 Grid System

**Column Layout:**
- 2 columns on mobile (gap: 16px)
- 3 columns on tablet (gap: 20px)
- 4-6 columns on desktop (gap: 24px)

**Example:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  <!-- Cards -->
</div>
```

---

## 7. Imagery & Icons

### 7.1 Photography Style

- **Tone:** Warm, inclusive, child-friendly
- **Subjects:** Real children playing/learning, diverse ethnicity, happy expressions
- **Colors:** Bright, saturated, warm tones (avoid desaturated/cold images)
- **Composition:** Close-ups of activities, authentic moments (not staged)
- **Resolution:** 1200px+ width for web optimization

### 7.2 Icons

- **Library:** Heroicons, Feather icons, or custom SVG
- **Size:** 16px (small), 20px (medium), 24px (large), 32px (XL)
- **Style:** Line icons, 2px stroke weight, rounded corners
- **Color:** Match text color or use Maple Red for CTAs

### 7.3 Logo Usage

- **Minimum size:** 48px height
- **Clear space:** Minimum 20px around logo
- **Backgrounds:** On white or light gray only
- **Variations:** Full logo (Maple Bear + text), mark only (bear icon)

---

## 8. Shadows & Depth

### 8.1 Shadow System

| Level | CSS | Usage |
|-------|-----|-------|
| None | none | Flat design elements |
| Elevation 1 | 0 2px 8px rgba(0,0,0,0.1) | Cards, buttons on hover |
| Elevation 2 | 0 4px 16px rgba(0,0,0,0.15) | Modals, dropdowns |
| Elevation 3 | 0 8px 24px rgba(0,0,0,0.2) | Overlays, floating elements |

---

## 9. Motion & Animations

### 9.1 Transition Guidelines

```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

**Common Transitions:**
- Hover effects: 150ms (button color, opacity)
- Page transitions: 300ms (fade, slide)
- Loading states: 500ms (spinner)

### 9.2 Easing Functions

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 10. Accessibility (WCAG 2.1 AA)

### 10.1 Contrast Ratios
- Text on background: minimum 4.5:1 (normal text), 3:1 (large text)
- Interactive elements: 3:1 minimum
- Graphical elements: 3:1 minimum

### 10.2 Focus States
```css
/* Keyboard focus */
:focus-visible {
  outline: 2px solid #FF0000;
  outline-offset: 2px;
}
```

### 10.3 ARIA Labels
- Buttons: `aria-label="Action description"`
- Icons: `aria-hidden="true"` (if no text) or provide label
- Form fields: associated `<label>` or `aria-label`
- Live regions: `aria-live="polite"` for announcements

### 10.4 Color Independence
- Never use color alone to convey status (use icons, text, patterns)
- Success: ✓ icon + green color
- Error: ✗ icon + red color

---

## 11. Mobile-First Design

### 11.1 Mobile Considerations

**Typography:**
- Minimum font size: 16px (prevents zoom on iOS)
- Line height: 1.5+ for readability on small screens

**Touch targets:**
- Minimum 44x44px for touch buttons
- Spacing: 8px minimum between interactive elements

**Layout:**
- Single column on mobile
- Stack cards vertically
- Full-width forms
- Responsive images (srcset, max-width: 100%)

### 11.2 Performance on Mobile

- Image optimization: WebP with PNG fallback
- Lazy loading: images below fold
- CSS/JS minification and tree-shaking
- Critical CSS inline in head

---

## 12. Dark Mode (Optional Future)

If dark mode is implemented in future:

```css
/* Light theme (default) */
--color-background: #FFFFFF;
--color-text: #1A1A1A;

/* Dark theme */
@media (prefers-color-scheme: dark) {
  --color-background: #1A1A1A;
  --color-text: #FFFFFF;
  /* Adjust shadows for dark backgrounds */
}
```

---

## 13. Component Library

### 13.1 Core Components (to be built)
- [ ] Header / Navigation
- [ ] Footer
- [ ] Button (primary, secondary, ghost)
- [ ] Card
- [ ] Form inputs (text, email, phone, select, checkbox, radio)
- [ ] Modal / Dialog
- [ ] Toast / Alert
- [ ] Dropdown menu
- [ ] Pagination
- [ ] Breadcrumbs
- [ ] Loading spinner
- [ ] Image gallery
- [ ] Blog post card
- [ ] Event card
- [ ] Testimonial card
- [ ] CTA section

### 13.2 Page Templates
- [ ] Landing page
- [ ] Article/Blog post
- [ ] Form page
- [ ] Error page
- [ ] Admin dashboard layout

---

## 14. SEO & Metadata

### 14.1 Meta Tags

```html
<!-- Every page should have -->
<meta name="description" content="50-160 characters">
<meta name="keywords" content="...">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
<link rel="canonical" href="...">
```

### 14.2 Structured Data (Schema.org)

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Sunshine Maple Bear School",
  "url": "https://www.sunshinemaplebear.edu.vn",
  "logo": "...",
  "description": "...",
  "address": "...",
  "telephone": "...",
  "email": "..."
}
```

---

## 15. Implementation Checklist

- [ ] CSS variables defined in globals.css
- [ ] Tailwind config updated with brand colors
- [ ] Component library created (Shadcn/UI)
- [ ] Responsive design tested (320px to 2560px)
- [ ] Accessibility audit (axe, WAVE)
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Dark mode support (optional)
- [ ] Mobile testing on real devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

---

## References

- [Maple Bear Logo](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20MB-01-c5FuaRyTSklr41OwYXLGTJiSplY6ka.png)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
