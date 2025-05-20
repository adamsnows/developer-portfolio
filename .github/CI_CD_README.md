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

## Soluções de Problemas

### Conflitos de Dependências React

O workflow está configurado para lidar com conflitos de dependências entre o React 18 e bibliotecas que possam requerer versões diferentes (como o `@react-three/fiber` que pode exigir React 19).

As seguintes soluções foram implementadas:
1. Uso da flag `--legacy-peer-deps` durante a instalação
2. Aplicação de overrides no package.json para garantir compatibilidade com React 18
3. Configuração otimizada para garantir builds consistentes em ambiente CI/CD

### Pacote Critters e Otimização CSS

Para resolver erros relacionados ao módulo "critters" durante o build, foram implementadas as seguintes soluções:

1. O pacote `critters` foi adicionado como dependência de desenvolvimento
2. A otimização CSS foi desativada no `next.config.mjs` para evitar problemas durante o build
3. O arquivo `vercel.json` foi configurado para instalar explicitamente o pacote durante o deploy

### Otimização de Memória

Para resolver problemas de memória durante o build, foi implementada a seguinte solução:

1. Configuração `NODE_OPTIONS='--max_old_space_size=4096'` adicionada ao comando de build

### Arquivos de Configuração Adicionais

Foram adicionados vários arquivos para garantir um deploy consistente:

1. `.nvmrc`: Especifica a versão exata do Node.js (18.18.0)
2. `.npmrc`: Configurações do npm para garantir instalação consistente de dependências
3. `vercel.json`: Configurações personalizadas para o deploy na Vercel
