# Sunshine Maple Bear design system

Everything the public site is built from. Layout and colour follow `design.pdf`; motion follows Rugby School Hanoi (fixed parallax hero, line-by-line headings, fade-ins, counting figures, footer revealed under the page).

## Rules

1. **Pages contain content, not styling.** A page imports from `@/components/ds` and composes components with props. No `className` with Tailwind utilities, no `style`, no page- or feature-level `.css`.
2. **One stylesheet.** All CSS lives in `ds.css` (loaded once in `app/layout.tsx`). Every rule is scoped under `.ds` and every class starts with `ds-`.
3. **Missing something? Add it to the library**, not to the page: a component in this folder plus its rules in `ds.css` (new pattern rules go at the end, in a block titled with the pattern name), exported from `index.ts`. Build it from existing primitives and tokens.
4. **Tokens only.** Colours, fonts, easing come from the `--ds-*` custom properties. Sizes are written in design points: `calc(N * var(--u))` for layout, `calc(N * var(--t))` for type, where N is the number measured in the 1024pt-wide PDF. Below 768px `--u` is 1/430 of the viewport, so the same numbers stay sensible on phones; override per breakpoint only where the layout changes.
5. **Motion is declared, not scripted.** Wrap anything that should appear on scroll in `<Reveal>`; use `<Heading>` for titles. Do not add new observers or animation code in pages.

## Tokens (`ds.css`, section 1)

| Token | Value | Use |
| --- | --- | --- |
| `--ds-cream` | `#fff8ee` | page background, cards |
| `--ds-red` | `#9b1d22` | brand red, accents, bands |
| `--ds-red-deep` | `#7e0e12` | deep bands, strong text, utility bar |
| `--ds-gold` / `--ds-gold-deep` | `#ca9c57` / `#af8039` | accents, rules, panels |
| `--ds-maroon` | `#401010` | footer, tooltips |
| `--ds-ink` / `--ds-black` | `#3d3d3d` / `#1f1f1f` | body text / strong text |
| `--ds-font-display` | The Seasons → Cormorant Garamond | headings |
| `--ds-font-body` | Hanken Grotesk | everything else |
| `--ds-font-script` | Playfair Display italic 600 | script accents |
| `--ds-ease` | `cubic-bezier(.19,1,.22,1)` | reveals |

**Fonts.** The Seasons is bundled only as the subset embedded in the PDF (no `j k q x z`, almost no punctuation, no Vietnamese). `<Heading>` uses it only when the whole string is covered, and otherwise sets the heading entirely in Cormorant Garamond — never mix the two by hand. Body text is always Hanken Grotesk, which covers Vietnamese.

## Frame

```tsx
import { PageShell, PageHero, Section, Heading, Text } from '@/components/ds'

export default function Page() {
  return (
    <PageShell hero={<PageHero title="About us" image="/images/about/hero.jpg" crumbs={[{ label: 'Home', href: '/' }]} />}>
      <Section>…</Section>
    </PageShell>
  )
}
```

- `PageShell` — `.ds` scope, navigation, hero, `<main>`, revealed footer. `variant="home"` for the full-height fixed `<Hero>`; default for inner pages with `<PageHero>`.
- `Hero` — `title`, `subtitle`, `video`/`poster` or `image`, `cta`, `footer` (a row of `<Stat>`).
- `PageHero` — `title`, `image`, `crumbs`.
- `SiteNav`, `SiteFooter` — used by `PageShell`; `components/header.tsx` / `footer.tsx` wrap them for pages not yet migrated. Menu, contact lines and social links are in `site.ts`.

## Primitives

| Component | Props | Notes |
| --- | --- | --- |
| `Heading` | `as`, `size` (`mega` 88 · `hero` 52 · `xl` 37 · `lg` 26 · `md` 22 · `sm` 11), `tone`, `accent`, `accentTone`, `align`, `caps` (default true) | children must be a plain string; `accent` colours those words |
| `Text` | `variant` (`body` · `quote` · `lead` · `small`), `tone`, `align`, `delay` | string, or several `<p>` |
| `Kicker` | `ruled`, `tone` | small caps line above a heading |
| `Rule` | `tone` | thin bar |
| `Button` | `variant` (`outline` + `tone` `white`/`gold`/`ink` · `solid` · `gold` · `soft` · `glass` · `ghost`), `size`, `block`, `href` | `outline` is the thin square button from the PDF; `glass`/`ghost` only over footage |
| `Reveal` | `variant` (`fade` · `up`), `delay`, `as` | stagger siblings with `delay={i * 0.3}` |
| `Stat` | `value`, `label`, `tone` (`gold` · `deep`), `mode` (`odometer` · `count`) | `count` starts from 0 when fully on screen |
| `Section` | `tone` (`cream` · `white` · `red` · `deep` · `maroon` · `gold`), `flush`, `contained`, `id` | a band; `flush` for patterns with their own padding |
| `Stack` / `Grid` | `gap`, `center` / `cols` (2 · 3 · 4 · `aside`) | vertical rhythm / responsive columns |
| `Card` | `tone`, `plain`, `delay` | cream card with red base line |
| `Media` | `src`, `alt`, `ratio`, `frame` (`white` · `red`) | photograph in a fixed ratio |
| `List`, `Accordion`, `Table`, `Badge` | — | content helpers |
| `Icon` / `SocialIcon` | `name` | line icons on a 16px grid; add paths in `Icon.tsx` |

## Patterns (`patterns.tsx`)

| Pattern | What it is |
| --- | --- |
| `OverlayCard` | full-bleed photo with a cream card over its left edge |
| `Statement` | centred kicker, heading with an accent word, italic quote |
| `Split` + `Portrait` | red band, text left / picture right; `Portrait` can open a `VideoModal` |
| `Feature` | photo collage on a gold base + heading, rule, right-aligned copy |
| `Steps` | 01–04 list whose active item swaps the picture |
| `Showcase` | deep-red band: heading, overlapping photos, gold icon list |
| `MegaBand` + `Carousel` | oversized title with script word over a snap-scrolling photo strip |
| `Network` | Maple Bear world map (`WorldMap`) beside counting figures |
| `FormBand` + `ContactForm` | photo band with a translucent form card |

| `PanelSplit` / `PanelBand` | text left, tall photo standing on a gold side panel (deep-red or cream), optional logo tile |
| `TierCards` | row of shadowed cream cards closed by a gold hairline and centred heading |
| `PhotoBand` | full-bleed shallow photo strip |
| `Timeline` | ruled list of labelled entries beside a tall photo with a button |
| `ShowcaseList` | `Showcase` with a text-only gold panel (kicker, title, copy) |
| `OverlayLetter` | `OverlayCard` with a wide card for a letter-length text |
| `NumberedPanels` | numbered steps: red rule, gold number tile, pale panel, optional button |
| `QuoteCollage` | three photos on a deep-red block with a gold quotation card |
| `StatCollage` | ruled heading over four staggered photo + figure columns |
| `Highlights` | photo band with a translucent card holding three icon columns |
| `BigFigure` | lead-in lines, an oversized number with unit, title, optional button |
| `CutoutBand` | red band with a cut-out picture bottom-left and content on the right |

### Sub-pages: Rugby-style blocks (`patterns-rugby.tsx`)

Every inner page other than the four drawn in the PDF is composed from these, top to bottom, the way Rugby School Hanoi's inner pages are: `PageHero` → `Lead` → alternating `ImageText` (flip `reverse`, alternate `tone="sand"`) → `Divider` / `StickyStats` / `StickySteps` / `Rows` / grids → `QuoteBand` → `CallToAction`.

| Block | What it is |
| --- | --- |
| `Lead` | opening block: large heading, copy, buttons; photo pinned on the right behind a hairline |
| `ImageText` | text beside a square photo; `reverse`, `tone` (`cream` · `sand` · `white`), `kicker`, `actions` |
| `TextBlock` | text-only block (`narrow` centres it) for long-form copy |
| `Block` | bare block with Rugby spacing — wrap `Grid`, `Accordion`, `Table`, `Rows`, forms in it |
| `Divider` | hairline between blocks |
| `StickyStats` | pinned heading + pinned tall photo + scrolling column of `Stat`s |
| `StickySteps` | numbered steps that pin and stack over each other |
| `Rows` | ruled label / value / note rows (fees, dates, schedules) |
| `QuoteBand` | a few words very large over a full-bleed photo |
| `CallToAction` | closing band on deep red with buttons |
| `PostCard` · `PersonCard` · `Fact` | cards for `Grid`: news / events, people, short features |

### Forms (`forms.tsx`)

`Form` (grid) · `Field` (label, hint, error, `full`) · `Input` · `Textarea` · `Select` · `Checkbox` · `RadioGroup` · `CheckboxGroup` · `Rating` · `Captcha` (Turnstile) · `FormActions` · `FormMessage` (`success` · `error` · `info`) · `BlockHeader` (heading group for the top of a `Block`). `ContactForm` is the ready-made enquiry form (`source` tags where it was sent from).

### Gallery, news and events (`patterns-gallery.tsx`, `patterns-news.tsx`)

`Gallery` (filter tabs, grid, lightbox) · `MapEmbed` · `ArticleHero` · `Article` (reading column + pinned aside) · `RichText` · `AsidePanel` · `MetaList` · `LinkList` · `FilterBar` · `Pagination` · `EmptyState` · `LoadingState`.

`useSiteLanguage()` + `pickText(lang, vi, en)` (from `language.ts`) give the visitor's stored content language for pages that carry both Vietnamese and English copy.

Patterns live in `patterns.tsx` and `patterns-*.tsx`. `app/page.tsx` is the reference composition; `app/about`, `app/academics`, `app/admissions` and `app/admissions/founding-families` show the inner-page patterns.

## Adding a pattern

1. Measure it in the PDF (points, at 1024 wide).
2. Write the component here using `Heading`, `Text`, `Reveal`, `Button`, `Media`…; give its root a `ds-<name>` class and children `ds-<name>__part`.
3. Add the rules to the end of `ds.css` under `.ds`, mobile first, desktop inside `@media (min-width:768px)`.
4. Export it from `index.ts` and add a row to the table above.
