# Production operations

## Before every production release

1. CI is green and no high production dependency vulnerability exists.
2. Migration was tested on Supabase preview and a current DB/Storage backup exists.
3. Confirm `SUPABASE_SERVICE_ROLE_KEY` is only in Vercel server environment; never `NEXT_PUBLIC_*`.
4. Test `/admin`, the role matrix, PII anon denial, Turnstile rejection and one valid lead in preview.
5. Deploy from protected `main`; retain the prior Vercel deployment for rollback.

## Daily backup

Run `scripts/backup-database.sh` from an operator machine or secured runner with `pg_dump`, `DATABASE_URL` and an encrypted `BACKUP_DIR`. Export Supabase Storage separately; a database dump does not include objects.

## Monthly restore drill

Restore the latest checksum-verified backup to an isolated project via `scripts/restore-drill.sh`. Record elapsed recovery time, data cutoff, policy checks, Storage sample verification and release owner approval.

## Incident response

Disable public forms if PII exposure is suspected, rotate Supabase/Resend credentials, preserve Vercel/Supabase logs, assess affected subjects, and restore only after policy/auth checks pass.
