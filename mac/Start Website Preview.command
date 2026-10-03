#!/bin/bash
# Fence Wizards website preview for macOS: runs the site at http://localhost:8788
# Double-click in Finder (see "Mac preview instructions.md" if macOS blocks it),
# or in Terminal type:  bash   then drag this file into the window and press Return.
# To stop: close this Terminal window, or press Control+C.

cd "$(dirname "$0")/.." || exit 1
SITE="$(pwd)/site"
pause_exit() { echo; read -r -p "  Press Return to close." _; exit "${1:-1}"; }

if [ ! -d "$SITE" ]; then
  echo "  Can't find the 'site' folder. Keep this 'mac' folder inside the project folder."
  pause_exit 1
fi

# Terminal windows opened from Finder can have a short PATH, so check the usual Node install spots too
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
if ! command -v node >/dev/null 2>&1; then
  echo
  echo "  Node.js isn't installed on this Mac."
  echo "  Install the LTS version from https://nodejs.org (normal Mac installer), then run this again."
  open "https://nodejs.org/"
  pause_exit 1
fi

cd "$SITE" || exit 1
echo
echo "  Getting the website ready... (the first run can take a few minutes)"
echo

# Install the Mac versions of the site's tools. A copy of the folder made on Windows contains
# Windows-only versions, so if the Mac ones aren't there, do a clean install (this Mac's copy only).
if [ ! -d node_modules/@cloudflare/workerd-darwin-arm64 ] && [ ! -d node_modules/@cloudflare/workerd-darwin-64 ]; then
  npm ci --no-fund --no-audit || { echo; echo "  Installing failed. Check the internet connection and try again."; pause_exit 1; }
fi

# Local settings (lets the Quote Inbox open without a login on this computer)
[ -f .dev.vars ] || cp .dev.vars.example .dev.vars

node build/build.mjs || { echo; echo "  The site build failed (see the message above)."; pause_exit 1; }

export CI=true WRANGLER_SEND_METRICS=false
npx wrangler d1 migrations apply fencewizards-quotes --local >/dev/null 2>&1

echo
echo "  ============================================================"
echo "   Website:      http://localhost:8788"
echo "   Quote Inbox:  http://localhost:8788/staff/"
echo "   Keep this window open while showing the site."
echo "   To stop: close this window or press Control+C."
echo "  ============================================================"
echo

( sleep 8; open "http://localhost:8788" ) &
npx wrangler pages dev --port 8788 --ip 127.0.0.1
