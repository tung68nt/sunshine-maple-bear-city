# Repository cleanup

**Vai trò: CTO/Senior Engineer.** This is a proposed, reviewable cleanup; no files were deleted by the audit.

## Targets

| Target | Evidence | Action |
|---|---|---|
| `components/sections_backup_rounded/`, `components/FloatingCTA_backup_rounded.tsx` | Parallel tracked component copies in inventory | Delete after `rg` finds no imports and visual comparison. |
| `ANH REN/` (33 MB) | Raw source photo directory; includes `Thumbs.db` | Move to approved external source archive; retain optimized public derivatives only. |
| `app/.DS_Store`, `app/admin/.DS_Store`, `app/api/.DS_Store`, `ANH REN/Thumbs.db` | Git tracked by `git ls-files` | Delete and add ignore rules. |
| `app/test-page/page.tsx` | Test route tracked | Remove or protect from production build; it imports static fixture (`:5`). |
| `public/images` (32 MB) | Nineteen+ >1MB JPGs | Optimize and keep image manifest/attribution. |
| Overlapping docs/root docs | `docs/SETUP_DATABASE.sql`, `docs/UPDATE_DATABASE.sql`, master migration and root markdown docs | Consolidate into `docs/{architecture,operations,product}/`; mark legacy SQL read-only then delete after migration verified. |

## Safe commands (run only after review)

```bash
git ls-files -- app/.DS_Store app/admin/.DS_Store app/api/.DS_Store 'ANH REN/Thumbs.db'
git rm -- app/.DS_Store app/admin/.DS_Store app/api/.DS_Store 'ANH REN/Thumbs.db'
git rm -r -- components/sections_backup_rounded
git rm -- components/FloatingCTA_backup_rounded.tsx app/test-page/page.tsx
```

Do not run the latter two commands before import/visual verification. `.gitignore` should include `.DS_Store`, `Thumbs.db`, `*.tsbuildinfo`, `.env*` (keep `.env.example`), `.next/`, coverage, Playwright output, and image-processing cache. Verify generated/large history with `git rev-list --objects --all | git cat-file --batch-check` before history rewriting; rewriting requires owner coordination.

## Dependency findings

`recharts` is used via `components/ui/chart.tsx:4`. `@supabase/ssr` is used in middleware (`middleware.ts:1`). This static pass did not find an import of deprecated `@supabase/auth-helpers-nextjs`; remove it from `package.json` only after inspecting manifest/lock. Run `pnpm audit --prod` (not npm) in a clean install; the current `npm audit` failure is lockfile-tool mismatch, not a clean vulnerability result.
