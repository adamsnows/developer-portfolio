# Configuração de CI/CD para Deploy na Vercel

Este repositório está configurado para fazer deploy automático na Vercel sempre que houver um push para as branches `main` ou `master`.

## Como funciona

O workflow do GitHub Actions executará as seguintes etapas:

1. Checkout do código
2. Configuração do Node.js
3. Instalação de dependências
4. Execução do linting
5. Build do projeto
6. Deploy na Vercel (produção para branch main/master, preview para outras branches)

## Requisitos

Para que o CI/CD funcione corretamente, você precisa adicionar as seguintes secrets no seu repositório do GitHub:

### Secrets necessárias

1. `VERCEL_TOKEN`: Token de acesso da API da Vercel
2. `VERCEL_ORG_ID`: ID da sua organização na Vercel
3. `VERCEL_PROJECT_ID`: ID do seu projeto na Vercel

## Como obter as secrets da Vercel

1. **VERCEL_TOKEN**:
   - Acesse [Vercel Tokens](https://vercel.com/account/tokens)
   - Clique em "Create" para gerar um novo token
   - Copie o token gerado (ele só será exibido uma vez)

2. **VERCEL_ORG_ID** e **VERCEL_PROJECT_ID**:
   - Instale a CLI da Vercel: `npm i -g vercel`
   - Execute `vercel login` e faça login na sua conta
   - Navegue até o diretório do seu projeto
   - Execute `vercel link` para vincular seu projeto local ao projeto da Vercel
   - Abra o arquivo `.vercel/project.json` criado no seu projeto
   - Você encontrará os valores de `orgId` e `projectId` nesse arquivo

## Adicionando secrets ao GitHub

1. Acesse seu repositório no GitHub
2. Vá para "Settings" > "Secrets and variables" > "Actions"
3. Clique em "New repository secret"
4. Adicione cada uma das secrets mencionadas acima com seus respectivos valores

## Comportamento do Workflow

- Pushes para `main` ou `master`: Deploy de produção
- Pull Requests: Deploy de preview
