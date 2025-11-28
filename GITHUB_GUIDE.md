# Guia: Subir Portfólio para GitHub

## Passo 1: Instalar Git
1. Acesse: https://git-scm.com/download/win
2. Baixe e instale a versão mais recente
3. Reinicie o PowerShell após instalar

## Passo 2: Configurar Git
```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

## Passo 3: Criar Repositório Local
```powershell
cd c:\projetos\portifolio
git init
git add .
git commit -m "Initial commit: Portfólio pessoal moderno com HTML, CSS e JavaScript"
```

## Passo 4: Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Preencha os dados:
   - **Repository name**: portifolio (ou seu-portifolio)
   - **Description**: Portfólio pessoal moderno - Pedro Jorge
   - **Public** (para visualizar online)
   - NÃO marque "Initialize this repository with a README"
3. Clique em "Create repository"

## Passo 5: Conectar com Repositório Remoto
Após criar no GitHub, você verá instruções. Execute:

```powershell
cd c:\projetos\portifolio
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portifolio.git
git push -u origin main
```

**Substitua SEU_USUARIO pelo seu usuário do GitHub**

## Passo 6: Autenticação (GitHub Token)
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Marque "repo" (acesso completo aos repositórios)
4. Gere o token e copie-o
5. Na primeira vez que fizer push, use esse token como senha

## Passo 7: Habilitar GitHub Pages (Opcional - para publicar online)
1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em "Source", selecione "Deploy from a branch"
4. Selecione: **main** branch, **/root** folder
5. Clique em "Save"
6. Seu site estará disponível em: https://seu-usuario.github.io/portifolio

## Comandos Úteis Futuros
```powershell
# Verificar status
git status

# Ver histórico de commits
git log

# Fazer push de alterações
git add .
git commit -m "Descrição das alterações"
git push

# Clonar o repositório em outro PC
git clone https://github.com/SEU_USUARIO/portifolio.git
```

## Estrutura do Projeto Enviada
```
portifolio/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos modernos
├── js/
│   └── script.js       # Interatividade e animações
├── img/
│   └── euPedro.png     # Sua foto de perfil
└── README.md           # Este arquivo
```

## Dicas
✅ Faça commits regulares com mensagens descritivas
✅ Use branches para novas features: `git checkout -b nova-feature`
✅ Atualize seu perfil do GitHub com link do portfólio
✅ Compartilhe o link com recrutadores e empresas

Boa sorte! 🚀
