import { fetchGithubProjects } from "../services/github";
import { projectData } from "./project";

/**
 * Função para combinar os projetos existentes com os projetos do GitHub
 * @param username Nome de usuário do GitHub para buscar os projetos
 * @param portfolioTag Tag utilizada para filtrar projetos no GitHub (opcional, padrão: 'portfolio-project')
 * @returns Uma Promise com o array combinado de projetos
 */
export async function getCombinedProjects(
  username: string,
  portfolioTag: string = "portfolio-project"
) {
  try {
    // Buscar projetos do GitHub
    const githubProjects = await fetchGithubProjects(username, portfolioTag);

    // Verificar se há algum projeto do GitHub que já existe nos projetos atuais
    // Comparando pelo link do GitHub para evitar duplicatas
    const existingGithubUrls = new Set(
      projectData.map((project) => project.github)
    );

    // Filtrar apenas os projetos do GitHub que não existem nos projetos atuais
    const newGithubProjects = githubProjects.filter(
      (project) => !existingGithubUrls.has(project.github)
    );

    // Combinar os projetos
    return [...projectData, ...newGithubProjects];
  } catch (error) {
    console.error("Erro ao buscar projetos do GitHub:", error);
    // Se houver erro, retornar apenas os projetos existentes
    return projectData;
  }
}

/**
 * Função para obter todos os projetos
 * Esta função é um wrapper para facilitar o uso em componentes
 * @returns Os projetos atuais como fallback caso a chamada de API falhe
 */
export function getAllProjects() {
  return projectData;
}
