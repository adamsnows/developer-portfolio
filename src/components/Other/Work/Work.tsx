import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import ProjectCard from "@/components/Other/ProjectCard/ProjectCard";
import { Button } from "@/components/Other/UI/button";
import { workData } from "@/data/work";
import {
  RiArrowRightLine,
  RiCodeBoxLine,
  RiDatabase2Line,
} from "react-icons/ri";

interface GitHubProject {
  github: string;
  name: string;
  category: string;
  tags?: string[];
  language?: string;
  image?: string;
  description?: string;
  link?: string;
}

const Work = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [highlightedProjects, setHighlightedProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar projetos destacados (hardcoded + projetos com tag "highlight")
  const loadHighlightedProjects = async () => {
    try {
      setIsLoading(true);

      // Usar o nome de usuário GitHub das variáveis de ambiente ou valor padrão
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "adamsnows";

      // Fazer chamada à API para buscar projetos do GitHub com tag "highlight"
      const response = await fetch(
        `/api/github/projects?username=${username}&portfolioTag=highlight`
      );

      if (response.ok) {
        const githubProjects = await response.json();

        // Verificar se temos um array válido
        if (Array.isArray(githubProjects) && githubProjects.length > 0) {
          const highlightGithubProjects = githubProjects.map(
            (project: any) => ({
              ...project,
              language:
                project.language || inferLanguageFromTags(project.tags || []),
            })
          );

          // Combinar projetos hardcoded com os projetos destacados do GitHub
          const combined = [...workData, ...highlightGithubProjects];
          setHighlightedProjects(combined);
        } else {
          // Se não recebemos projetos ou array vazio, usar apenas hardcoded
          console.log(
            "No GitHub projects found with 'highlight' tag, using hardcoded projects only"
          );
          setHighlightedProjects(workData);
        }
      } else if (response.status === 429) {
        // Rate limit exceeded, check for fallback data
        try {
          const errorData = await response.json();
          if (errorData.fallback && Array.isArray(errorData.fallback)) {
            console.log("Using fallback data due to rate limit");
            setHighlightedProjects([...workData, ...errorData.fallback]);
          } else {
            console.log("Rate limit exceeded, using hardcoded projects only");
            setHighlightedProjects(workData);
          }
        } catch {
          console.log("Rate limit exceeded, using hardcoded projects only");
          setHighlightedProjects(workData);
        }
      } else {
        // Fallback para apenas os projetos hardcoded
        console.log("GitHub API error, using hardcoded projects only");
        setHighlightedProjects(workData);
      }
    } catch (error) {
      console.error("Error loading highlighted projects:", error);
      // Fallback para apenas os projetos hardcoded
      setHighlightedProjects(workData);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para inferir linguagem a partir das tags
  const inferLanguageFromTags = (tags: string[]): string | undefined => {
    if (tags.includes("typescript")) return "typescript";
    if (tags.includes("javascript")) return "javascript";
    if (tags.includes("python")) return "python";
    if (tags.includes("shopify")) return "shopify";
    return undefined;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add listener for size changes
    window.addEventListener("resize", checkMobile);

    // Clean up the listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Carregar projetos destacados na montagem do componente
  useEffect(() => {
    loadHighlightedProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          backgroundPositionX: "0%",
        },
        {
          backgroundPositionX: "100%",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "linear",
        }
      );
    }
  }, []);

  return (
    <section className="relative pt-[50px] xl:pt-[100px]  -mt-[150px] mb-10">
      <div className="absolute inset-0 pointer-events-none ">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        className="lg:container mx-auto xl:flex xl:justify-between relative z-10 px-4 md:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeInUp}
          className="pt-20 lg:pt-0 px-8 lg:px-0 max-w-[400px] mx-auto my-auto
          xl:mx-0 text-center xl:text-left xl:h-fit
          flex flex-col justify-center items-center xl:justify-center
          xl:items-start"
        >
          <h2
            ref={titleRef}
            className="section-title mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300%"
          >
            LATEST PROJECTS
          </h2>
          <p className="text-justify text-sm mb-8 leading-relaxed lg:mt-20 ">
            Each project reflects a commitment to{" "}
            <span className="text-primary font-medium">innovation</span>,{" "}
            <span className="text-primary font-medium">efficiency</span> and an
            exceptional user experience, demonstrating comprehensive skills and
            a deep understanding of modern development needs.
          </p>

          <div className="mb-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                variants={fadeInUp}
                className="flex items-start py-4 p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiCodeBoxLine className="text-primary text-xl mt-1 mr-1 w-20" />
                <div>
                  <h3 className="font-medium mb-1">Front-End Expertise</h3>
                  <p className="text-xs text-white/70">
                    Advanced interfaces with React, Next.js and sophisticated
                    animations
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-start p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <RiDatabase2Line className="text-primary text-xl mt-1 mr-1 w-20" />
                <div>
                  <h3 className="font-medium mb-1">Robust Back-End</h3>
                  <p className="text-xs text-white/70">
                    Efficient APIs, optimized databases and scalable
                    architecture
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <Link
            className="mt-auto group mx-auto"
            href="/projects"
            aria-label="projects"
          >
            <Button className="gap-x-2 text-white" variant="outline">
              EXPLORE ALL PROJECTS{" "}
              <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          className="xl:max-w-[780px] top-0 mt-10 xl:mt-0 overflow-visible relative z-10"
        >
          <div className="relative overflow-visible z-99">
            <Swiper
              className="h-fit rounded-xl relative z-10 p-6 pb-14 my-6 mx-auto w-full "
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              slidesPerGroup={1} // Adding slidesPerGroup to fix the loop warning
              coverflowEffect={{
                rotate: 20,
                stretch: 25,
                depth: 250,
                modifier: 1.5,
                slideShadows: true,
              }}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                horizontalClass: "swiper-pagination-horizontal",
              }}
              loop={highlightedProjects.length > 1}
              speed={800}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            >
              {isLoading ? (
                // Mostrar um loading simples durante o carregamento
                <SwiperSlide
                  className="rounded-lg  mx-auto flex items-center justify-center"
                  style={{
                    width: isMobile ? "280px" : "320px",
                    height: "400px",
                  }}
                >
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-white/70">Loading projects...</p>
                  </div>
                </SwiperSlide>
              ) : (
                highlightedProjects
                  .slice(0, 8)
                  .map((project: any, index: number) => {
                    // Detectar linguagem a partir das tags se não houver language definido
                    const inferredProject = { ...project };
                    if (!inferredProject.language && project.tags) {
                      if (project.tags.includes("typescript"))
                        inferredProject.language = "typescript";
                      else if (project.tags.includes("javascript"))
                        inferredProject.language = "javascript";
                      else if (project.tags.includes("python"))
                        inferredProject.language = "python";
                      else if (project.tags.includes("shopify"))
                        inferredProject.language = "shopify";
                    }

                    // Ensure language is a valid type or undefined
                    if (
                      inferredProject.language &&
                      ![
                        "typescript",
                        "javascript",
                        "python",
                        "shopify",
                      ].includes(inferredProject.language)
                    ) {
                      inferredProject.language = undefined;
                    }

                    return (
                      <SwiperSlide
                        key={`${project.name}-${index}`}
                        className="rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 mx-auto"
                        style={{
                          width: isMobile ? "280px" : "320px",
                          height: "auto",
                        }}
                      >
                        <motion.div transition={{ duration: 0.3 }}>
                          <ProjectCard
                            project={inferredProject}
                            id={index === 0 ? "1" : undefined}
                          />
                        </motion.div>
                      </SwiperSlide>
                    );
                  })
              )}
            </Swiper>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Work;
