import {
  RiGraduationCapFill,
  RiCalendarFill,
  RiMailFill,
  RiPhoneFill,
  RiHomeFill,
  RiUserFill,
} from "react-icons/ri";

export const infoData = [
  {
    icon: <RiUserFill size={20} />,
    text: "Adam Neves",
  },
  {
    icon: <RiMailFill size={20} />,
    text: "adaamangelow@gmail.com",
  },
  {
    icon: <RiGraduationCapFill size={20} />,
    text: "Desenvolvedor Full Stack",
  },
  {
    icon: <RiHomeFill size={20} />,
    text: "Natal, RN, Brasil",
  },
];

export const qualificationData = [
  {
    title: "education",
    data: [
      {
        school: "Kenzie Academy Brasil",
        qualification: "Desenvolvedor Full Stack",
        years: "mar de 2022 - mar de 2023",
      },
      {
        school: "Centro universitário União das Américas Descomplica",
        qualification: "Pós em Engenharia de Software",
        years: "jun de 2023 - dez de 2023",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "SUPER MEGAVENDAS",
        role: "Tech Leader",
        years: "jan de 2024 - ago de 2024",
        location: "Natal, Rio Grande do Norte, Brasil",
        description: [
          "Iniciei e configurei o ambiente de desenvolvimento da empresa, garantindo uma base sólida para o crescimento dos projetos.",
          "Implementei processos ágeis e eficientes, melhorando a colaboração e produtividade da equipe.",
          "Selecionei e integrei tecnologias-chave, como NextJS, TailwindCSS, Express e TypeORM.",
          "Configurei pipelines de CI/CD para automação de build, testes e deploy.",
          "Liderei o desenvolvimento de soluções inovadoras, como a plataforma SMV Flow e a extensão SMVZap para Chrome.",
          "Melhorei a experiência do usuário com otimização de sistemas de login e painéis personalizados.",
          "Criei e otimizei diversos recursos e sistemas, como painéis e dashboards dinâmicos.",
          "Forneci orientação técnica e suporte à equipe, promovendo um ambiente colaborativo.",
        ],
        technologies: [
          "NextJS 14",
          "TailwindCSS",
          "Prisma",
          "NestJS",
          "Docker",
          "PostgreSQL",
          "TypeORM",
          "Express",
          "Jest",
          "React",
          "React Native",
          "Figma",
          "ClickUp",
        ],
      },
      {
        company: "CoderTroop",
        role: "Frontend Developer",
        years: "jan de 2024 - jun de 2024",
        location: "Natal, Rio Grande do Norte, Brasil · Remoto",
        description: [
          "Criação de uma plataforma de entrega de comidas.",
          "Implementação e otimização de recursos como pagamentos, planos, login e sistema de perfil.",
          "Integração de pipeline de CI/CD, incluindo solicitações pull e revisões de código.",
          "Resolução de problemas de UX/UI, melhorando a visualização de lista e detalhes do produto.",
        ],
        technologies: ["NextJS 14", "TailwindCSS"],
      },
      {
        company: "Tootz",
        role: "Desenvolvedor Front End",
        years: "dez de 2022 - out de 2023",
        location: "Natal, Rio Grande do Norte, Brasil",
        description: [
          "Desenvolvimento de novas plataformas como Maestria, Migtech, JA Brasil e Vivalá.",
          "Manutenção da plataforma Brasil Junior, garantindo sua funcionalidade e otimização.",
          "Implementação e otimização de recursos como pagamentos, planos, login, e sistemas de perfil.",
          "Integração de pipeline de CI/CD e revisão de código.",
          "Resolução de problemas de UX/UI, inovando a visualização de lista.",
        ],
        technologies: ["NextJS", "Bootstrap"],
      },
      {
        company: "Prevlogic",
        role: "Desenvolvedor Front End NextJS/React Native",
        years: "abr de 2023 - mai de 2023",
        location: "Remoto",
        description: [
          "Trabalhei em projetos utilizando NextJS e React Native.",
        ],
        technologies: ["NextJS, TailwindCSS"],
      },
      {
        company: "Kenzie Academy Brasil",
        role: "Monitoria",
        years: "mai de 2022 - nov de 2022",
        description: [
          "Orientação prática de HTML, CSS, JavaScript, React e TypeScript.",
          "Auxílio a alunos em avaliações e projetos.",
          "Correção de avaliações e atividades dos alunos.",
        ],
        technologies: ["CSS", "Desenvolvimento Web"],
      },
      {
        company: "Free Lancer",
        role: "Desenvolvedor FullStack",
        years: "jan de 2020 - abr de 2022",
        description: [
          "Desenvolvimento de sites e sistemas web.",
          "Manutenção de sites e sistemas web.",
          "Implementação de recursos como pagamentos, planos, login e sistemas de perfil.",
          "Integração de pipeline de CI/CD e revisão de código.",
          "Resolução de problemas de UX/UI, inovando a visualização de lista.",
          "NextJS, Tailwind, Bootstrap, React, React Native, NodeJS, Express, Prisma, MongoDB, PostgreSQL, Docker, SQLite, Sass, Vtex.",
        ],
        technologies: ["CSS", "Desenvolvimento Web"],
      },
    ],
  },
];

export const skillsData = [
  {
    title: "skills",
    data: [
      {
        icons: ["HTML", "CSS", "Styled Components", "TailwindCSS"],
      },
      {
        icons: ["JavaScript", "TypeScript", "React", "NextJs"],
      },
      {
        icons: ["NodeJS", "NestJS", "Express", "PrismaJs"],
      },
      {
        icons: ["Jest", "Django", "Git", "Figma"],
      },
      {
        icons: ["MongoDB", "PostgreSQL"],
      },
      {
        icons: ["Docker", "SQLite"],
      },
      {
        icons: ["Sass", "Vtex"],
      },
    ],
  },
  {
    title: "tools",
    data: [
      {
        imgPath: "Windows",
      },
      {
        imgPath: "MacOS",
      },
      {
        imgPath: "Linux",
      },
      {
        imgPath: "Vscode",
      },
      {
        imgPath: "Insomnia",
      },
      {
        imgPath: "Jira",
      },
      {
        imgPath: "Notion",
      },
      {
        imgPath: "Trello",
      },
    ],
  },
];
