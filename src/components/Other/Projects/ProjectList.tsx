"use client";

import { getAllProjects, getCombinedProjects } from "@/data/github-projects";
import { ProjectCardInterface } from "@/interfaces/ProjectInterface";
import { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";

interface ProjectListProps {
  useSpecialStyle?: boolean;
}

export default function ProjectList({
  useSpecialStyle = false,
}: ProjectListProps) {
  const [projects, setProjects] = useState<ProjectCardInterface["project"][]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Usar os valores do .env ou valores padrão
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "adamsnows";
        const portfolioTag =
          process.env.NEXT_PUBLIC_PORTFOLIO_TAG || "portfolio-project";

        // Buscar projetos combinados
        const combinedProjects = await getCombinedProjects(
          username,
          portfolioTag
        );
        setProjects(combinedProjects);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        // Fallback para os projetos existentes
        setProjects(getAllProjects());
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Carregando projetos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          specialStyle={useSpecialStyle}
        />
      ))}
    </div>
  );
}
