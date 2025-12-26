# Security Check Script for Environment Files (PowerShell)
# This script verifies that real environment files are not being committed

Write-Host "🔒 Checking environment file security..." -ForegroundColor Cyan

# Check if real env files are tracked by git
$envFiles = @(
    "src/environments/environment.ts",
    "src/environments/environment.prod.ts",
    "src/environments/environment.staging.ts",
    "src/environments/environment.prod.staging.ts"
)

$errors = 0

foreach ($file in $envFiles) {
    $result = git ls-files --error-unmatch $file 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "❌ ERROR: $file is tracked by git!" -ForegroundColor Red
        Write-Host "   This file contains secrets and should NOT be committed." -ForegroundColor Yellow
        Write-Host "   Run: git rm --cached $file" -ForegroundColor Yellow
        $errors++
    } else {
        Write-Host "✓ $file is properly ignored" -ForegroundColor Green
    }
}

# Check if example files exist
if ((Test-Path "src/environments/environment.example.ts") -and (Test-Path "src/environments/environment.prod.example.ts")) {
    Write-Host "✓ Example/template files are present" -ForegroundColor Green
} else {
    Write-Host "⚠ Warning: Example files may be missing" -ForegroundColor Yellow
}

if ($errors -eq 0) {
    Write-Host "`n✅ All environment files are properly secured!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n❌ Security check failed! Please fix the issues above." -ForegroundColor Red
    exit 1
}







