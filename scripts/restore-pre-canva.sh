#!/usr/bin/env bash
set -e

echo "⚠️  Đang tiến hành khôi phục giao diện về phiên bản trước khi áp dụng Canva UI..."

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="$REPO_ROOT/_backups/pre-canva-ui"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ Không tìm thấy thư mục backup tại $BACKUP_DIR!"
  exit 1
fi

echo "📦 Khôi phục từ $BACKUP_DIR..."
cp -Rf "$BACKUP_DIR/app" "$REPO_ROOT/"
cp -Rf "$BACKUP_DIR/components" "$REPO_ROOT/"
cp -Rf "$BACKUP_DIR/styles" "$REPO_ROOT/"
cp -Rf "$BACKUP_DIR/lib" "$REPO_ROOT/"

echo "✅ Đã khôi phục hoàn tất! Hệ thống đã trở về phiên bản ban đầu."
