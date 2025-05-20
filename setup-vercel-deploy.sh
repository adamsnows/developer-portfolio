#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Configuração de CI/CD para Deploy na Vercel ===${NC}"
echo -e "${BLUE}Este script ajudará você a obter as informações necessárias para configurar o CI/CD do seu projeto.${NC}"
echo ""

# Verificando se vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI não encontrado.${NC}"
    echo "Instalando Vercel CLI globalmente..."
    npm i -g vercel
fi

echo -e "${GREEN}Fazendo login na Vercel...${NC}"
vercel login

echo -e "${GREEN}Vinculando o projeto à Vercel...${NC}"
vercel link

# Verificando se o arquivo .vercel/project.json existe
if [ -f ".vercel/project.json" ]; then
    # Extraindo orgId e projectId
    ORG_ID=$(grep -o '"orgId": "[^"]*' .vercel/project.json | cut -d'"' -f4)
    PROJECT_ID=$(grep -o '"projectId": "[^"]*' .vercel/project.json | cut -d'"' -f4)

    echo -e "${GREEN}=== Informações Obtidas ===${NC}"
    echo -e "${BLUE}VERCEL_ORG_ID:${NC} $ORG_ID"
    echo -e "${BLUE}VERCEL_PROJECT_ID:${NC} $PROJECT_ID"
    echo ""
    echo -e "${GREEN}=== Próximos Passos ===${NC}"
    echo "1. Obtenha um token em: https://vercel.com/account/tokens"
    echo "2. Adicione as seguintes secrets ao seu repositório GitHub:"
    echo "   - VERCEL_TOKEN"
    echo "   - VERCEL_ORG_ID: $ORG_ID"
    echo "   - VERCEL_PROJECT_ID: $PROJECT_ID"
else
    echo -e "${RED}Arquivo project.json não encontrado. Algo deu errado no processo de vinculação.${NC}"
fi
