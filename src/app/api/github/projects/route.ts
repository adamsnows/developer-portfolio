import { NextRequest, NextResponse } from "next/server";

// Configure this route as dynamic
export const dynamic = "force-dynamic";

// Type definitions
interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  open_graph_image_url?: string;
}

// In-memory cache for GitHub API responses
interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds

// Helper function to get cached data
function getCachedData(key: string): any | null {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiresAt) {
    return entry.data;
  }
  if (entry) {
    cache.delete(key); // Remove expired entry
  }
  return null;
}

// Helper function to set cached data
function setCachedData(key: string, data: any): void {
  const now = Date.now();
  cache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + CACHE_TTL,
  });
}

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

    // Check cache first
    const cacheKey = `projects-${username}-${portfolioTag}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Buscar todos os repositórios do usuário
    const repos = await fetchUserRepos(username);

    // Filtrar apenas os que têm a tag específica
    const portfolioProjects = repos.filter(
      (repo: GitHubRepo) => repo.topics && repo.topics.includes(portfolioTag)
    );

    // Formatar os projetos
    const formattedProjects = await Promise.all(
      portfolioProjects.map(async (repo: GitHubRepo) => {
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

        // Buscar dados completos do repositório para obter a social preview image
        let socialPreviewImage = "/project-bg.webp"; // Imagem padrão como fallback

        try {
          const repoResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}`,
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

          if (repoResponse.ok) {
            const repoData = await repoResponse.json();
            // Usar a social preview image se disponível
            if (repoData.open_graph_image_url) {
              socialPreviewImage = repoData.open_graph_image_url;
            } else {
              // Construir URL da social preview do GitHub como fallback
              socialPreviewImage = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
            }
          }
        } catch (error) {
          console.warn(
            `Erro ao buscar social preview para ${repo.name}:`,
            error
          );
          // Manter a imagem padrão em caso de erro
        }

        return {
          image: socialPreviewImage || "/project-bg.webp",
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

    // Cache the successful response
    setCachedData(cacheKey, formattedProjects);

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);

    // Check if we have cached data to fall back to when rate limited
    if (error instanceof Error && error.message.includes("403")) {
      const { searchParams } = new URL(request.url);
      const username = searchParams.get("username");
      const portfolioTag =
        searchParams.get("portfolioTag") || "portfolio-project";

      if (username) {
        const cacheKey = `projects-${username}-${portfolioTag}`;
        // Try to get stale cached data as a fallback
        const staleData = cache.get(cacheKey);
        if (staleData) {
          return NextResponse.json(staleData.data);
        }
      }

      return NextResponse.json(
        {
          error: "GitHub API rate limit exceeded. Please try again later.",
          details:
            "The GitHub API has a rate limit of 5000 requests per hour. Please wait for the limit to reset.",
          fallback: [],
        },
        { status: 429 }
      );
    }

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
  // Check cache for user repos
  const cacheKey = `repos-${username}`;
  const cachedRepos = getCachedData(cacheKey);
  if (cachedRepos) {
    return cachedRepos;
  }

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
    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
    const rateLimitReset = response.headers.get("x-ratelimit-reset");
    const resetTime = rateLimitReset
      ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
      : "unknown";

    console.error(`GitHub API Error: ${response.status}`);
    console.error(`Rate limit remaining: ${rateLimitRemaining}`);
    console.error(`Rate limit reset: ${resetTime}`);

    if (response.status === 403) {
      throw new Error(
        `GitHub API rate limit exceeded. Remaining: ${rateLimitRemaining}, Reset: ${resetTime}`
      );
    }

    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const repos = await response.json();

  // Para cada repositório, buscar os tópicos (tags)
  const reposWithTopics = await Promise.all(
    repos.map(async (repo: any) => {
      // Check cache for topics
      const topicsCacheKey = `topics-${username}-${repo.name}`;
      const cachedTopics = getCachedData(topicsCacheKey);

      if (cachedTopics) {
        repo.topics = cachedTopics;
        return repo;
      }

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
        // Cache the topics
        setCachedData(topicsCacheKey, names);
      } else {
        repo.topics = [];
      }

      return repo;
    })
  );

  // Cache the repos with topics
  setCachedData(cacheKey, reposWithTopics);

  return reposWithTopics;
}
