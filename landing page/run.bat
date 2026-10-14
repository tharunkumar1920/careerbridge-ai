@echo off
title CareerBridge AI - Dev Server
echo ========================================================
echo   Starting CareerBridge AI Landing Page...
echo ========================================================
echo.
cd /d "%~dp0"

if not exist "node_modules\" (
  echo [Info] Dependencies missing. Installing npm packages...
  call npm install
  if %ERRORLEVEL% neq 0 (
    echo [Error] npm install failed. Please check your internet connection or Node.js install.
    pause
    exit /b %ERRORLEVEL%
  )
)

echo [Info] Launching Vite development server at http://localhost:5173/ ...
echo [Info] Opening default web browser...
call npm start
pause
