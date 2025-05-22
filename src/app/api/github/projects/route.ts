import { NextRequest, NextResponse } from "next/server";

// Configure this route as dynamic
export const dynamic = "force-dynamic";

// Função principal para lidar com a requisição GET
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const portfolioTag =
      searchParams.get("portfolioTag") || "portfolio-project";

    if (!username) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    // Buscar todos os repositórios do usuário
    const repos = await fetchUserRepos(username);

    // Filtrar apenas os que têm a tag específica
    const portfolioProjects = repos.filter(
      (repo) => repo.topics && repo.topics.includes(portfolioTag)
    );

    // Formatar os projetos
    const formattedProjects = portfolioProjects.map((repo) => ({
      image: "/project-bg.webp", // Imagem padrão
      category: determineCategory(repo.topics),
      name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
      description: repo.description || "Projeto no GitHub",
      link: repo.homepage || "",
      github: repo.html_url,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub projects" },
      { status: 500 }
    );
  }
}

// Função para determinar a categoria do projeto com base nas tags
function determineCategory(topics: string[]): string {
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
}

// Função para buscar todos os repositórios de um usuário do GitHub
async function fetchUserRepos(username: string) {
  console.log("Fetching repos for user:", username);
  console.log("Using GitHub token:", process.env.GITHUB_TOKEN ? "Yes" : "No");

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&timestamp=${Date.now()}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }
          : {}),
      },
      cache: "no-store", // Apenas esta opção para controle de cache
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const repos = await response.json();

  // Para cada repositório, buscar os tópicos (tags)
  const reposWithTopics = await Promise.all(
    repos.map(async (repo: any) => {
      const topicsResponse = await fetch(
        `https://api.github.com/repos/${username}/${
          repo.name
        }/topics?timestamp=${Date.now()}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.GITHUB_TOKEN
              ? {
                  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                }
              : {}),
          },
          cache: "no-store", // Apenas esta opção para controle de cache
        }
      );

      if (topicsResponse.ok) {
        const { names } = await topicsResponse.json();
        repo.topics = names;
      } else {
        repo.topics = [];
      }

      return repo;
    })
  );

  return reposWithTopics;
}
