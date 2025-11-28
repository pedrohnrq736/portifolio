# Script para fazer push do portfólio para GitHub
# Execute no PowerShell com: .\push.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Inicializando repositorio Git" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Inicializar repositório
Write-Host "`n[1/5] Inicializando Git..." -ForegroundColor Yellow
git init

# Configurar usuário (se necessário)
Write-Host "[2/5] Configurando usuário..." -ForegroundColor Yellow
git config user.name "Pedro Jorge"
git config user.email "pedro@example.com"

# Adicionar todos os arquivos
Write-Host "[3/5] Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Primeiro commit
Write-Host "[4/5] Criando commit inicial..." -ForegroundColor Yellow
git commit -m "feat: Portfólio moderno com HTML, CSS e JavaScript"

# Configurar branch main
git branch -M main

# Adicionar repositório remoto
Write-Host "[5/5] Conectando com repositório remoto..." -ForegroundColor Yellow
git remote add origin https://github.com/pedrohnrq736/portifolio.git

# Fazer push
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " Fazendo push para GitHub..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

git push -u origin main

Write-Host "`n========================================" -ForegroundColor Green
Write-Host " ✅ Sucesso! Seu portfólio foi enviado!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`nRepositório: https://github.com/pedrohnrq736/portifolio" -ForegroundColor Green
Write-Host "Acesse para ativar GitHub Pages e publicar!" -ForegroundColor Yellow
Write-Host "`n"
