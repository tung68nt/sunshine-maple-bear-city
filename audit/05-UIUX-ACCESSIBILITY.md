# UI/UX & accessibility

**Vai trò: Design Director.** Brand tokens appear used (`maple-red`, `maple-gold`, `rounded-2xs`), but the static audit indicates an interaction-heavy, client-rendered site and an admin UI designed around dense developer-style fixtures rather than a 2–3 person marketing workflow.

## Findings

| Severity | Evidence | User impact | Required change |
|---|---|---|---|
| High | Login/admin labels use `text-[10px]` and `text-[11px]` (`app/login/page.tsx:81,151,162`) | Tiny text fails readability/likely AA depending contrast; not suitable for staff. | Minimum 14px body/control text; validate contrast with actual rendered colors. |
| High | Login inputs have visual labels but no `htmlFor`/`id` pairing (`app/login/page.tsx:98-109,115-126`) | Screen readers cannot reliably associate labels. | Add unique `id`, `htmlFor`, `aria-describedby`; announce errors `role=alert`. |
| High | Long admissions data flow sends child and parent information in one request (`app/api/submissions/admission/route.ts:25-58`) | Mobile abandonment and sensitive oversharing. | 3 short steps: guardian contact → child/program → optional needs; show review + consent. |
| Medium | CMS page builder is 1494 LOC (`app/admin/pages/page.tsx`) and relies on browser state | High cognitive load; risk of lost edits. | Draft/autosave status, explicit preview, unsaved-change guard, simple templates. |
| Medium | Client-heavy route files (`app/page.tsx:1`, `app/blog/page.tsx:1`, `app/events/page.tsx:1`) | Slower mobile start/interactions. | RSC shell; interactive islands only. |

## WCAG 2.2 AA release checks

- Test keyboard-only at 360, 390, 768, 1024, 1440, 1920px: skip link, visible focus, no keyboard trap, logical menu/modal order, target at least 24×24 CSS px.
- Every meaningful image has contextual alt; decorative images use empty alt. `app/login/page.tsx:71` labels an image “Background”, which should be `alt=""` if decorative.
- Form labels must be programmatic, required/error states announced, and errors not conveyed only by color.
- Respect `prefers-reduced-motion` for counters/carousels/exit popup; test 200% zoom and reflow at 320 CSS px.
- Use automated axe/Lighthouse only as a first pass; manual assistive-tech check is required.

## Conversion recommendations

One primary CTA throughout: “Đặt lịch tham quan”. Put it above fold, after proof (curriculum/safety/teacher) and at page end. Keep an alternate low-friction contact CTA. The lead form should ask only name, phone/email, child age and preferred contact at first conversion; request health/passport data only inside a secure authenticated admissions workflow after purpose/consent. Add success state with response time, real address/licensing evidence, and no fake analytics/testimonials.

## Bilingual/content governance

Static `title_vi/title_en` schema (`migration:19-20`) is promising, but hardcoded Vietnamese/English is spread across components. Choose a content ownership model before launch: either CMS bilingual fields with required publication validation or immutable localized content files. Do not mix both.
