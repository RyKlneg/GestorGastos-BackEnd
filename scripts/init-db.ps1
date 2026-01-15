# Script PowerShell para inicializar la base de datos
# Uso: .\scripts\init-db.ps1

Write-Host "🚀 Inicializando base de datos..." -ForegroundColor Cyan

# Crear base de datos si no existe
Write-Host "📦 Creando base de datos si no existe..." -ForegroundColor Yellow
psql -U postgres -c "CREATE DATABASE expenses_db;" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Base de datos ya existe o error al crearla" -ForegroundColor Yellow
}

# Ejecutar seeds
Write-Host "🌱 Ejecutando seeds..." -ForegroundColor Yellow
npm run seed:run

Write-Host "✅ Base de datos inicializada correctamente!" -ForegroundColor Green
