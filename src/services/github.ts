interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  owner: {
    login: string;
  };
}

interface FormattedGithubRepo {
  image: string;
  category: string;
  name: string;
  description: string;
  link: string;
  github: string;
}

interface GithubContributions {
  username: string;
  totalContributions: number;
  contributions: Record<string, number>;
  startDate: string;
  endDate: string;
}

export const fetchGithubProjects = async (
  username: string,
  portfolioTag: string = "portfolio-project"
): Promise<FormattedGithubRepo[]> => {
  try {
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    const response = await fetch(
      `/api/github/projects?username=${username}&portfolioTag=${portfolioTag}&_=${timestamp}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store", // Using Next.js fetch cache control
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub projects");
    }

    const projects: FormattedGithubRepo[] = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
};

// Função para buscar dados de contribuições do GitHub
export const fetchGithubContributions = async (
  username: string
): Promise<GithubContributions | null> => {
  try {
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    const response = await fetch(
      `/api/github/contributions?username=${username}&_=${timestamp}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub contributions");
    }

    const data: GithubContributions = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return null;
  }
};

// Determina a categoria do projeto com base nas tags
const determineCategory = (topics: string[]): string => {
  if (topics.includes("backend") || topics.includes("back-end")) {
    return "Back end";
  } else if (topics.includes("frontend") || topics.includes("front-end")) {
    return "Front end";
  } else if (topics.includes("fullstack") || topics.includes("full-stack")) {
    return "Full stack";
  } else if (topics.includes("mobile")) {
    return "Mobile";
  } else if (topics.includes("devops")) {
    return "DevOps";
  } else {
    return "Outros";
  }
};

// Formata um repositório do GitHub para o formato do projeto
export const formatGithubRepo = (repo: GithubRepo): FormattedGithubRepo => {
  return {
    image: "/project-bg.webp", // Imagem padrão
    category: determineCategory(repo.topics),
    name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
    description: repo.description || "Projeto no GitHub",
    link: repo.homepage || "",
    github: repo.html_url,
  };
};
