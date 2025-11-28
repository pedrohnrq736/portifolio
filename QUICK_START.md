# 🚀 Guia Rápido: Publicar Portfólio no GitHub

Seu repositório: https://github.com/pedrohnrq736/portifolio

## Passo 1: Verificar se Git está instalado
```powershell
git --version
```

Se aparecer um erro, baixe em: https://git-scm.com/download/win

## Passo 2: Abrir PowerShell na Pasta do Projeto
```powershell
# Navegue até a pasta
cd c:\projetos\portifolio
```

## Passo 3: Executar o Script (Automático)
```powershell
# Permitir execução de scripts (execute uma vez)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Executar script
.\push.ps1
```

Ou **Manualmente** (passo a passo):
```powershell
# 1. Inicializar Git
git init

# 2. Configurar seu nome e email
git config user.name "Pedro Jorge"
git config user.email "seu.email@example.com"

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer primeiro commit
git commit -m "feat: Portfólio moderno com HTML, CSS e JavaScript"

# 5. Renomear branch para 'main'
git branch -M main

# 6. Adicionar repositório remoto (seu GitHub)
git remote add origin https://github.com/pedrohnrq736/portifolio.git

# 7. Fazer push (enviar para GitHub)
git push -u origin main
```

## Passo 4: Autenticação GitHub

Na primeira vez que fizer push, GitHub pedirá autenticação. Opções:

### Opção A: GitHub CLI (Recomendado)
```powershell
# Se já tem GitHub CLI instalado:
gh auth login
# Selecione: GitHub.com → HTTPS → Y → Autorize no navegador
```

### Opção B: Personal Access Token
1. Acesse: https://github.com/settings/tokens
2. Clique "Generate new token (classic)"
3. Marque: `repo` (acesso completo)
4. Copie o token
5. Use como senha quando Git pedir

## Passo 5: Ativar GitHub Pages (Publicar Online)

Após o push ter sucesso:

1. Acesse: https://github.com/pedrohnrq736/portifolio
2. Clique em **Settings** (engrenagem)
3. Vá em **Pages** (lado esquerdo)
4. Em "Source", selecione: **Deploy from a branch**
5. Branch: **main** | Folder: **/root**
6. Clique **Save**

Seu site estará em: **https://pedrohnrq736.github.io/portifolio**

(Pode levar 1-2 minutos para ficar online)

## Passo 6: Atualizar no Futuro

```powershell
# Após fazer mudanças:
git add .
git commit -m "Descrição das mudanças"
git push
```

## ✅ Checklist

- [ ] Git instalado
- [ ] Executou o script `push.ps1`
- [ ] Autenticou no GitHub
- [ ] Push foi bem-sucedido
- [ ] Ativou GitHub Pages
- [ ] Site disponível em: https://pedrohnrq736.github.io/portifolio

## 🎯 Próximas Etapas

1. **Customize seu portfólio** (informações pessoais, projetos reais)
2. **Compartilhe o link** com recrutadores e empresas
3. **Continue atualizando** com novos projetos
4. **Adicione mais seções** conforme necessário

## 📞 Problemas Comuns

**Erro: "remote origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/pedrohnrq736/portifolio.git
git push -u origin main
```

**Erro: "Permission denied"**
- Use GitHub CLI: `gh auth login`
- Ou gere um Personal Access Token

**GitHub Pages não aparece**
- Verifique Settings → Pages
- Espere 1-2 minutos
- Tente limpar cache do navegador (Ctrl+Shift+Delete)

Boa sorte! 🚀
