# CareerBridge AI - One-Click PowerShell Runner
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting CareerBridge AI Landing Page...              " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[Info] Dependencies missing. Installing npm packages..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[Error] npm install failed." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

Write-Host "[Info] Launching Vite development server at http://localhost:5173/ ..." -ForegroundColor Green
Write-Host "[Info] Opening default web browser..." -ForegroundColor Green
npm start
