# Backup & disaster recovery

**Vai trò: SRE/DBA.** No backup configuration, restore runbook, scheduled job, or CI workflow is present in the repository inventory. Supabase Free must be treated as **no verified PITR** until the owner proves otherwise.

## Target service levels

For a school marketing site: target **RPO 24h, RTO 8h** on free tier. This accepts losing at most one day of CMS content/leads; it is inadequate for a fully operational admissions system. An incident on form PII must additionally trigger privacy assessment and access-key rotation.

## Free-tier policy

- Daily encrypted `pg_dump` to an owner-controlled S3-compatible bucket (Cloudflare R2/S3) or, if absolutely no external storage, encrypted offline copy held by the school. Retain 7 daily, 4 weekly, 12 monthly.
- Daily export Supabase Storage bucket to the same target; database dumps do **not** contain gallery objects.
- Keep least-privileged backup credential only in CI secret/local secure keychain; never `NEXT_PUBLIC_*`.
- Record checksum, timestamp, restore result. Test a restore monthly to an isolated project.

## Backup script (proposed; do not run without credentials)

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${DATABASE_URL:?}" "${BACKUP_DIR:?}"
stamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p "$BACKUP_DIR"
pg_dump --format=custom --no-owner --no-privileges "$DATABASE_URL" \
  | gzip > "$BACKUP_DIR/smb-$stamp.dump.gz"
sha256sum "$BACKUP_DIR/smb-$stamp.dump.gz" > "$BACKUP_DIR/smb-$stamp.dump.gz.sha256"
```

Use an encrypted destination (e.g. `age` public key) before upload. `DATABASE_URL` is sensitive; do not echo it. Storage backup should use a separate least-privileged job and manifest each object/version.

## Restore drill runbook

1. Declare incident; stop public form writes and preserve logs.
2. Create isolated temporary Supabase project/database; do not restore first into production.
3. Verify backup checksum, decrypt locally in ephemeral workspace, restore: `pg_restore --clean --if-exists --no-owner -d "$RESTORE_DATABASE_URL" backup.dump`.
4. Apply only migrations newer than the backup; run RLS self-checks and smoke tests for public page/admin/access denial.
5. Restore Storage objects and verify sampled object hashes/URLs.
6. Owner validates latest CMS record and a non-PII test submission. Document elapsed RTO and data cutoff/RPO.
7. Schedule a maintenance window, restore production only with owner approval; rotate relevant secrets, re-enable forms, monitor errors.

## Cần người dùng xác nhận

Does the Supabase Free project offer backup export/PITR in its current dashboard? Which person owns the billing/backup destination? This cannot be inferred from code. Git remote exists (`origin`, `new-origin`, `personal`), but branch protection/tag/release backup policy needs GitHub configuration verification.
