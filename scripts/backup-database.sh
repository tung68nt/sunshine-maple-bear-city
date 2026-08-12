#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?Set the production DATABASE_URL in the secure operator environment}"
: "${BACKUP_DIR:?Set an encrypted or access-controlled backup destination}"

timestamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p "$BACKUP_DIR"
backup_path="$BACKUP_DIR/smb-$timestamp.dump"

pg_dump --format=custom --no-owner --no-privileges "$DATABASE_URL" > "$backup_path"
sha256sum "$backup_path" > "$backup_path.sha256"
echo "Created $backup_path"
