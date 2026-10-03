#!/bin/bash
# BACKUP preview for macOS: needs only Node.js, nothing else to install.
# All pages, the video and the estimator's map + pricing work. Sending forms and the Quote Inbox don't.
# Run it the same way as the main start file (Terminal: type  bash  then drag this file in, press Return).

cd "$(dirname "$0")" || exit 1
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
if ! command -v node >/dev/null 2>&1; then
  echo
  echo "  Node.js isn't installed on this Mac. Install the LTS version from https://nodejs.org, then run this again."
  open "https://nodejs.org/"
  read -r -p "  Press Return to close." _
  exit 1
fi

( sleep 2; open "http://localhost:8788" ) &
node "simple-preview-server.mjs"
read -r -p "  Press Return to close." _
