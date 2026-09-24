#!/usr/bin/env bash
# Regenerate the Canva-exact site from a new Canva PDF export.
# Usage: CANVA_PDF=design.pdf bash scripts/canva-exact/run.sh
# Needs: python3, pip install pymupdf fonttools brotli pillow numpy
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
export CANVA_PDF="${CANVA_PDF:-design.pdf}" CANVA_WORK="${CANVA_WORK:-build-canva}"
mkdir -p "$CANVA_WORK/bg"
for s in fonts extract layout build render gen_next; do echo "> $s"; python3 "$D/$s.py"; done
echo "Static HTML: $CANVA_WORK/out   Next.js module: $CANVA_WORK/next (copy components/, public/, app/ into the project)"
