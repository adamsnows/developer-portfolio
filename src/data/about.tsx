import {
  RiGraduationCapFill,
  RiHomeFill,
  RiMailFill,
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
    text: "Full Stack Developer",
  },
  {
    icon: <RiHomeFill size={20} />,
    text: "Natal, RN, Brazil",
  },
];

export const qualificationData = [
  {
    title: "education",
    data: [
      {
        school: "Kenzie Academy Brasil",
        qualification: "Full Stack Developer",
        years: "Mar 2022 - Mar 2023",
      },
      {
        school: "Centro universitário União das Américas Descomplica",
        qualification: "Post-grad in Software Engineering",
        years: "Jun 2023 - Dec 2023",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "SUPER MEGAVENDAS",
        role: "FullStack Tech Leader",
        years: "Jan 2024 - Aug 2024",
        location: "Natal, Rio Grande do Norte, Brazil",
        description: [
          "Initiated and set up the company's development environment, ensuring a solid foundation for project growth.",
          "Implemented agile and efficient processes, improving team collaboration and productivity.",
          "Selected and integrated key technologies, such as NextJS, TailwindCSS, Express, and TypeORM.",
          "Configured CI/CD pipelines for build, test, and deployment automation.",
          "Led the development of innovative solutions, such as the SMV Flow platform and the SMVZap Chrome extension.",
          "Improved user experience with optimized login systems and customized dashboards.",
          "Created and optimized various resources and systems, such as dynamic panels and dashboards.",
          "Provided technical guidance and support to the team, promoting a collaborative environment.",
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
