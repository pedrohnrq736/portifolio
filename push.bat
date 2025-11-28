@echo off
REM Script para inicializar e fazer push para GitHub
REM Use este script no PowerShell: .\push.ps1

echo ========================================
echo  Inicializando repositorio Git
echo ========================================

REM Inicializar repositório
git init

REM Configurar usuário (se necessário)
git config user.name "Pedro Jorge"
git config user.email "seu.email@example.com"

REM Adicionar todos os arquivos
git add .

REM Primeiro commit
git commit -m "feat: Portfólio moderno com HTML, CSS e JavaScript"

REM Configurar branch main
git branch -M main

REM Adicionar repositório remoto
git remote add origin https://github.com/pedrohnrq736/portifolio.git

REM Fazer push
echo ========================================
echo  Fazendo push para GitHub...
echo ========================================
git push -u origin main

echo ========================================
echo  Sucesso! Acesse seu portfólio em:
echo  https://github.com/pedrohnrq736/portifolio
echo ========================================
pause
