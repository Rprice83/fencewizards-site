@echo off
title Fence Wizards website preview
rem Double-click to run the Fence Wizards site on this computer (http://localhost:8788).
rem Close this window to stop it. Needs Node.js (https://nodejs.org, LTS) and an internet connection.
cd /d "%~dp0site"

rem Node may be installed but not on PATH yet (e.g. installed after this window's parent started)
where node >nul 2>nul || if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js isn't installed on this computer.
  echo  Install the "LTS" version from https://nodejs.org , then double-click this file again.
  echo.
  start "" https://nodejs.org/
  pause
  exit /b 1
)

echo.
echo  Getting the website ready... (the first run on a new computer can take a few minutes)
echo.
if not exist node_modules\wrangler\bin\wrangler.js (
  call npm install --no-fund --no-audit
)
if not exist .dev.vars copy .dev.vars.example .dev.vars >nul

call node build\build.mjs
if errorlevel 1 ( echo. & echo  The site build failed. See the message above. & pause & exit /b 1 )

set CI=true
set WRANGLER_SEND_METRICS=false
call npx wrangler d1 migrations apply fencewizards-quotes --local >nul 2>nul

echo.
echo  ============================================================
echo   Website:      http://localhost:8788
echo   Quote Inbox:  http://localhost:8788/staff/
echo   Keep this window open while showing the site. Close it to stop.
echo  ============================================================
echo.
if not defined NO_BROWSER start "" cmd /c "timeout /t 8 >nul & start http://localhost:8788"
call npx wrangler pages dev --port 8788 --ip 127.0.0.1
