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
    const formattedProjects = await Promise.all(
      portfolioProjects.map(async (repo) => {
        // Buscar dados de idiomas para o repositório
        const languagesResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/languages`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
            },
            cache: "no-store",
          }
        );

        let language = undefined;
        if (languagesResponse.ok) {
          const languages = await languagesResponse.json();
          const primaryLanguage = Object.keys(languages)[0]?.toLowerCase();

          // Verificar se o repositório tem a tag ou tópico do Shopify
          const isShopify = repo.topics.some(
            (topic: string) =>
              topic.toLowerCase().includes("shopify") ||
              topic.toLowerCase().includes("liquid")
          );

          // Mapear os nomes das linguagens do GitHub para os nossos tipos suportados
          if (isShopify) {
            language = "shopify";
          } else if (
            ["typescript", "javascript", "python"].includes(primaryLanguage)
          ) {
            language = primaryLanguage as
              | "typescript"
              | "javascript"
              | "python"
              | "shopify";
          }
        }

        return {
          image: "/project-bg.webp", // Imagem padrão
          category: determineCategory(repo.topics),
          name: repo.name.replace(/-/g, " ").replace(/_/g, " "),
          description: repo.description || "Projeto no GitHub",
          link: repo.homepage || "",
          github: repo.html_url,
          language,
          tags: repo.topics.filter(
            (topic: string) =>
              !["backend", "frontend", "fullstack", "api"].includes(
                topic.toLowerCase()
              )
          ), // Incluir todas as tags exceto as usadas para categoria
        };
      })
    );

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
  if (topics.includes("backend") || topics.includes("api")) return "Back end";
  if (topics.includes("frontend")) return "Front end";
  if (topics.includes("fullstack")) return "Full stack";
  return "Front end"; // Categoria padrão
}

// Função para buscar todos os repositórios de um usuário do GitHub
async function fetchUserRepos(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&timestamp=${Date.now()}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      cache: "no-store",
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
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {}),
          },
          cache: "no-store",
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
