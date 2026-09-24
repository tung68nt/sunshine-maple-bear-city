# Canva-exact pages for Next.js

Pixel-exact rendering of `design.pdf` (Canva). Every element sits at its exact PDF coordinate and
the whole page scales with the viewport width (CSS container units, no JS, works with SSR).

## Install (copy into the project root)

    components/canva-exact/      renderer + page data (JSON)
    public/canva-exact/          background slices (WebP 2x) + fonts (WOFF2)
    app/canva-exact/             preview routes: /canva-exact, /canva-exact/about, ...

Nothing existing is modified. Open `/canva-exact` to compare with the current site.

## Replace a real page

    // app/about/page.tsx
    import { CanvaPage, canvaPages } from '@/components/canva-exact'
    export default function Page() { return <CanvaPage page={canvaPages.about} /> }

Without `basePath`, internal links go to `/`, `/about`, `/academics`, `/admissions`,
`/admissions/founding-families`.

## Editing content

- Text: `components/canva-exact/data/<page>.json` -> `text[]` (`t` = string, `x`/`y` = PDF points,
  `s` = font size, `c` = colour, `ls` = letter-spacing, `o` = opacity).
  Keep new text roughly the same length, since each line is positioned absolutely like in Canva.
- Links / buttons: `links[]` (`href` = route, `#contact`, `tel:`, `mailto:`, `menu`, `submit`).
- Contact form: set `NEXT_PUBLIC_CANVA_CONTACT_ENDPOINT` to POST form JSON
  (fields: name, phone, email, childName, childDob, currentSchool, message).
- Images: background slices in `public/canva-exact/bg` are the design with text removed. To swap a photo,
  regenerate from a new Canva export (see the build scripts) rather than editing slices by hand.

## Fonts

`TheSeasons` and `Gordita` are commercial fonts embedded by Canva as subsets (only the glyphs used in
the design). Buy web licences before production and replace the WOFF2 files; new characters
(e.g. Vietnamese diacritics) need the full font files.

## Regenerating after the Canva design changes

    pip install pymupdf fonttools brotli pillow numpy
    CANVA_PDF=design.pdf bash scripts/canva-exact/run.sh

Outputs `build-canva/out` (static HTML) and `build-canva/next` (this module). Copy its
`components/`, `public/`, `app/` folders over the existing ones. Page mapping, link targets and
form field offsets live in `scripts/canva-exact/build.py`.

Accuracy check used during the build: each page rendered in Chromium at 2x vs. the PDF rendered at 2x —
mean pixel difference ≈ 3/255, with differences limited to glyph anti-aliasing.
