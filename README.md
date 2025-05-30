<h1 align="center">
   Portfolio de Desenvolvedor - Adam Neves
</h1>


![Banner](/public/portfolio-blue.png)

<div align="center">
   <a href="#documentação-em-português">Leia em Português |</a>
   <a href="#documentation-in-english">Read in English</a>
</div>

---

# Documentação em português

Este é um portfólio profissional desenvolvido com tecnologias modernas para apresentar minhas habilidades, projetos e experiência como desenvolvedor full stack. O site apresenta uma interface interativa com animações fluidas, código dinâmico e design responsivo.

## Características Principais

- **Design Responsivo**: Adaptado para todos os dispositivos, de smartphones a desktops
- **Animações Interativas**: Utilizando GSAP e Framer Motion para transições e efeitos visuais
- **Código Dinâmico**: Visualização de código com sintaxe destacada e efeito de digitação
- **Tecnologias Destacadas**: Exibição das tecnologias dominadas com filtragem por categoria
- **Avaliações**: Seção mostrando feedback de clientes e colegas
- **Formulário de Contato**: Integração para contato direto

## Tecnologias Utilizadas

- **Next.js**: Framework React com renderização do lado do servidor
- **TypeScript**: Tipagem estática para código mais seguro e manutenível
- **GitHub Actions**: Automação de CI/CD para deploy contínuo
- **Vercel**: Plataforma de hospedagem com integração ao CI/CD
- **Tailwind CSS**: Estilização rápida e responsiva com classes utilitárias
- **GSAP**: Biblioteca de animação avançada para efeitos visuais
- **Framer Motion**: Animações de componentes React
- **React Icons**: Conjunto de ícones para interfaces modernas
- **ClientOnly**: Componente para renderização exclusiva no cliente (resolução de problemas de hidratação)

## Rotas Disponíveis

- **/** : Página inicial com apresentação e demonstração de habilidades
- **/projects**: Portfólio de projetos realizados
- **/contact**: Formulário de contato e informações para conexão

## Configuração das Integrações

### Configurando a integração com GitHub

Para exibir seus projetos e gráfico de contribuições do GitHub, configure as seguintes variáveis de ambiente:

1. **Criar um Token do GitHub (obrigatório para evitar rate limiting)**:
   - Acesse [GitHub Settings > Tokens](https://github.com/settings/tokens)
   - Clique em "Generate new token" → "Generate new token (classic)"
   - Dê um nome como "Portfolio Projects API"
   - Selecione apenas as permissões: `public_repo` e `read:user`
   - Clique em "Generate token" e copie o valor gerado

2. **Configurar variáveis de ambiente**:
   ```bash
   # Copie o arquivo de exemplo
   cp .env.example .env.local

   # Edite o arquivo .env.local com suas informações:
   GITHUB_TOKEN=seu_token_aqui
   NEXT_PUBLIC_GITHUB_USERNAME=seu_usuario_github
   NEXT_PUBLIC_PORTFOLIO_TAG=portfolio-project
   ```

3. **Marcar projetos para exibição no portfólio**:
   - Acesse os repositórios que deseja exibir no portfólio
   - Vá em "Settings" → "General" → "Topics"
   - Adicione a tag `portfolio-project` (ou a tag configurada em `NEXT_PUBLIC_PORTFOLIO_TAG`)

### Configurando a integração com Dev.to

Para exibir seus artigos do Dev.to, apenas configure o nome de usuário:

```bash
# No arquivo .env.local, adicione ou edite:
NEXT_PUBLIC_DEVTO_USERNAME=seu_usuario_devto
```

Se não configurar, o sistema usará "adamsnows" como padrão.

### Estrutura das Tags nos Projetos GitHub

O sistema categoriza automaticamente seus projetos baseado nas tags:
- `backend` ou `back-end` → **Back end**
- `frontend` ou `front-end` → **Front end**
- `fullstack` ou `full-stack` → **Full stack**
- `mobile` → **Mobile**
- `devops` → **DevOps**

### GitHub Charts e Contribuições

O gráfico de contribuições é carregado automaticamente usando o nome de usuário configurado em `NEXT_PUBLIC_GITHUB_USERNAME`. Ele mostra:
- Contribuições dos últimos 365 dias
- Estatísticas totais de commits
- Visualização interativa do calendário de contribuições

## Instalação

Para executar este projeto localmente, siga as instruções abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/yourusername/dev-portfolio.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd dev-portfolio
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env.local
   # Edite o arquivo .env.local com suas configurações
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. Acesse a aplicação no seu navegador:

   ```
   http://localhost:3000/
   ```

## Deploy e CI/CD

Este projeto está configurado com CI/CD automatizado usando GitHub Actions para deploy na Vercel:

1. Cada push para as branches `main` ou `master` aciona um deploy de produção
2. Cada pull request gera um deploy de preview

Para informações detalhadas sobre a configuração do CI/CD, consulte [README do CI/CD](./.github/CI_CD_README.md).

## Soluções Técnicas Implementadas

- **Prevenção de Erros de Hidratação**: Uso de componentes ClientOnly para garantir compatibilidade entre renderização no servidor e cliente
- **Animação de Código Dinâmico**: Sistema robusto para animação de código com retry e fallback
- **Componentes Reutilizáveis**: Estrutura modular para manutenção eficiente
- **Otimização de Imagens**: Uso do sistema de otimização de imagens do Next.js
- **CI/CD Automatizado**: Workflow GitHub Actions para deploy automatizado na Vercel
- **Gerenciamento de Dependências**: Configuração personalizada para lidar com dependências complexas
- **Integração GitHub API**: Sistema de cache para otimizar requisições à API do GitHub
- **Integração Dev.to API**: Carregamento automático de artigos publicados
- **Gráfico de Contribuições**: Visualização interativa das contribuições do GitHub

## Contribuição

Sugestões e contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou reportar problemas.

## Licença

Este projeto está sob a [Licença MIT](https://opensource.org/licenses/MIT).

---

# Documentation in English

This is a professional portfolio developed with modern technologies to showcase my skills, projects, and experience as a full stack developer. The website features an interactive interface with fluid animations, dynamic code display, and responsive design.

## Key Features

- **Responsive Design**: Adapted for all devices, from smartphones to desktops
- **Interactive Animations**: Using GSAP and Framer Motion for transitions and visual effects
- **Dynamic Code Display**: Code visualization with syntax highlighting and typing effect
- **Featured Technologies**: Display of mastered technologies with category filtering
- **Reviews**: Section showing feedback from clients and colleagues
- **Contact Form**: Integration for direct communication

## Technologies Used

- **Next.js**: React framework with server-side rendering
- **TypeScript**: Static typing for safer and more maintainable code
- **Tailwind CSS**: Rapid and responsive styling with utility classes
- **GSAP**: Advanced animation library for visual effects
- **Framer Motion**: React component animations
- **React Icons**: Icon set for modern interfaces
- **ClientOnly**: Component for exclusive client-side rendering (hydration issue resolution)

## Available Routes

- **/** : Home page with introduction and skills demonstration
- **/projects**: Portfolio of completed projects
- **/contact**: Contact form and connection information

## Setup and Configuration

### Configuring GitHub Integration

To display your GitHub projects and contribution charts, configure the following environment variables:

1. **Create a GitHub Token (required to avoid rate limiting)**:
   - Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Portfolio Projects API"
   - Select only these permissions: `public_repo` and `read:user`
   - Click "Generate token" and copy the generated value

2. **Configure environment variables**:
   ```bash
   # Copy the example file
   cp .env.example .env.local

   # Edit .env.local with your information:
   GITHUB_TOKEN=your_token_here
   NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
   NEXT_PUBLIC_PORTFOLIO_TAG=portfolio-project
   ```

3. **Tag projects for portfolio display**:
   - Go to the repositories you want to showcase
   - Go to "Settings" → "General" → "Topics"
   - Add the tag `portfolio-project` (or the tag configured in `NEXT_PUBLIC_PORTFOLIO_TAG`)

### Configuring Dev.to Integration

To display your Dev.to articles, just configure your username:

```bash
# In .env.local file, add or edit:
NEXT_PUBLIC_DEVTO_USERNAME=your_devto_username
```

If not configured, the system will use "adamsnows" as default.

### GitHub Project Tags Structure

The system automatically categorizes your projects based on tags:
- `backend` or `back-end` → **Back end**
- `frontend` or `front-end` → **Front end**
- `fullstack` or `full-stack` → **Full stack**
- `mobile` → **Mobile**
- `devops` → **DevOps**

### GitHub Charts and Contributions

The contribution chart is automatically loaded using the username configured in `NEXT_PUBLIC_GITHUB_USERNAME`. It shows:
- Contributions from the last 365 days
- Total commit statistics
- Interactive contribution calendar visualization

## Installation

To run this project locally, follow these instructions:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dev-portfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd dev-portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Configure environment variables:

   ```bash
   cp .env.example .env.local
   # Edit .env.local file with your configurations
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Access the application in your browser:

   ```
   http://localhost:3000/
   ```

## Deployment and CI/CD

This project is configured with automated CI/CD using GitHub Actions for deployment to Vercel:

1. Every push to the `main` or `master` branch triggers a production deployment
2. Every pull request generates a preview deployment

For detailed information on the CI/CD setup, see [CI/CD README](./.github/CI_CD_README.md).

## Technical Solutions Implemented

- **Hydration Error Prevention**: Use of ClientOnly components to ensure compatibility between server and client rendering
- **Dynamic Code Animation**: Robust system for code animation with retry and fallback mechanisms
- **Reusable Components**: Modular structure for efficient maintenance
- **Image Optimization**: Use of Next.js image optimization system
- **Automated CI/CD**: GitHub Actions workflow for automated deployment to Vercel
- **Dependency Management**: Custom configuration to handle complex library dependencies
- **GitHub API Integration**: Caching system to optimize GitHub API requests
- **Dev.to API Integration**: Automatic loading of published articles
- **Contribution Charts**: Interactive visualization of GitHub contributions

## Contribution

Suggestions and contributions are welcome! Feel free to open a PR or report issues.

## License

This project is under the [MIT License](https://opensource.org/licenses/MIT).

---

<div align="center">
   <span>Developed by </span><a href="https://github.com/adamsnows">Adam Neves</a><br/>
   <span>Based on the original template by </span><a href="https://github.com/vagnermengali/developer-blue-portfolio">Vagner Mengali</a>
</div>
