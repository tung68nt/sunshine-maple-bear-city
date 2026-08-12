#!/usr/bin/env bash
set -euo pipefail

: "${RESTORE_DATABASE_URL:?Set an isolated restore database URL}"
: "${BACKUP_FILE:?Set the verified .dump backup file path}"

sha256sum -c "$BACKUP_FILE.sha256"
pg_restore --clean --if-exists --no-owner --no-privileges --dbname="$RESTORE_DATABASE_URL" "$BACKUP_FILE"
echo "Restore completed. Run RLS, login, and public-form smoke tests before approving this drill."
