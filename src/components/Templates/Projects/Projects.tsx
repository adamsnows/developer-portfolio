import { AnimatePresence, motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiLayoutGridLine,
  RiStackLine,
} from "react-icons/ri";
import { useInView } from "react-intersection-observer";

import AdvancedTextAnimation from "@/components/Animations/AdvancedTextAnimation";
import {
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import ScrollToTop from "@/components/Animations/ScrollToTop";
import SmoothScrollSection from "@/components/Animations/SmoothScrollSection";
import ProjectCard from "@/components/Other/ProjectCard/ProjectCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Other/UI/tabs";
import { workData } from "@/data/work";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const uniqueCategories: string[] = [
  "Todos",
  ...Array.from(new Set(workData.map((item) => item.category))),
];

const Projects = () => {
  const [categories] = useState(uniqueCategories);
  const [category, setCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("Todos");
  const [isChanging, setIsChanging] = useState(false);
  const controls = useAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Filtrar projetos com base na categoria selecionada
  const filteredProjects = workData.filter((project) => {
    return category === "Todos" ? project : project.category === category;
  });

  // Efeito para animar o título quando estiver visível
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  // Efeito para animar o título com gradiente em movimento
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

  // Efeito para animar os cards de projeto com scroll - apenas uma vez na montagem
  useEffect(() => {
    if (gridRef.current && typeof window !== "undefined") {
      // Armazena as animações criadas para depois limpá-las se necessário
      const animations: gsap.core.Tween[] = [];
      const projectCards = gridRef.current.querySelectorAll(
        ".project-card-container"
      );

      projectCards.forEach((card, index) => {
        const animation = gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
        animations.push(animation);
      });

      // Limpeza para evitar animações duplicadas
      return () => {
        animations.forEach((anim) => {
          if (anim.scrollTrigger) {
            anim.scrollTrigger.kill();
          }
          anim.kill();
        });
      };
    }
  }, []);

  // Estado para controlar a animação de pulso da categoria ativa
  const [pulseEffect, setPulseEffect] = useState(false);

  // Efeito para animar o pulso periodicamente na categoria selecionada
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true);
      const timeout = setTimeout(() => setPulseEffect(false), 1000);
      return () => clearTimeout(timeout);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === category) return;

    setIsChanging(true);
    setPulseEffect(true); // Ativar pulso ao mudar de categoria

    // Após um breve intervalo, mude a categoria e desative o estado de mudança
    setTimeout(() => {
      setCategory(newCategory);
      setActiveTab(newCategory);
      setIsChanging(false);

      // Desativar o pulso após um curto intervalo
      setTimeout(() => setPulseEffect(false), 800);
    }, 300);
  };

  return (
    <SmoothScrollSection className="min-h-screen pt-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2
            ref={titleRef}
            className="section-title mb-6 text-center mx-auto bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent bg-300%"
          >
            MEUS PROJETOS
          </h2>
          <AdvancedTextAnimation
            text="Um pouco da minha história como desenvolvedor, muitos projetos não estão mais no site antigo, ou com disponibilidade de acesso ao código fonte por ser um projeto privado."
            animationStyle="fade"
            once={true}
            className="text-md text-white/80 max-w-3xl mx-auto text-center"
          />
        </motion.div>

        <Tabs
          defaultValue={category}
          className="mb-24 xl:mb-48 "
          value={activeTab}
        >
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-xl blur-lg opacity-70"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <TabsList
              className="w-full gap-2 grid h-full md:grid-cols-4
              lg:max-w-[640px] mb-12 mx-auto
              relative z-10 backdrop-blur-md bg-white/10
              rounded-xl p-2 border border-white/20 shadow-lg"
            >
              {categories.map((categoryName: string, index: number) => (
                <TabsTrigger
                  onClick={() => handleCategoryChange(categoryName)}
                  value={categoryName}
                  key={index}
                  className="w-[162px] md:w-auto relative overflow-hidden group"
                >
                  {/* Fundo ativo do botão */}
                  {categoryName === activeTab && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-background/50 via-secondary to-background/50 rounded-md"
                      layoutId="activeTabBackground"
                      animate={
                        pulseEffect
                          ? {
                              boxShadow: [
                                "0 0 0px rgba(255,255,255,0.3)",
                                "0 0 15px rgba(255,255,255,0.7)",
                                "0 0 0px rgba(255,255,255,0.3)",
                              ],
                              scale: [1, 1.03, 1],
                            }
                          : {}
                      }
                      transition={{
                        type: "tween",
                        duration: 1,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                      }}
                    />
                  )}

                  {/* Efeito de hover no botão da categoria */}
                  <motion.span
                    className="absolute inset-0 bg-background/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                  />

                  {/* Texto com efeito quando ativo */}
                  <span
                    className={`relative z-10 font-medium ${
                      categoryName === activeTab
                        ? "text-white"
                        : "text-white/70"
                    } flex items-center gap-2 justify-center`}
                  >
                    <motion.span
                      transition={
                        categoryName === activeTab
                          ? {
                              duration: 1.5,
                              ease: "easeInOut",
                            }
                          : {}
                      }
                      className="text-lg"
                    >
                      {categoryName === "Todos" && <RiLayoutGridLine />}
                      {categoryName === "Full stack" && <RiStackLine />}
                      {categoryName === "Front end" && <RiCodeSSlashLine />}
                      {categoryName === "Back end" && <RiDatabase2Line />}
                    </motion.span>
                    {categoryName}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          <motion.div
            ref={gridRef}
            className="text-lg xl:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
            animate={{ opacity: isChanging ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <TabsContent
                  value={category}
                  key={`project-${project.name}-${project.category}`}
                  className="project-card-container"
                >
                  <motion.div
                    key={`motion-${project.name}-${project.category}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                    className="h-full"
                  >
                    <ProjectCard
                      id={project.name}
                      project={project}
                      specialStyle={true}
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </motion.div>
        </Tabs>
      </motion.div>

      {/* Botão de voltar ao topo */}
      <ScrollToTop showBelow={300} />
    </SmoothScrollSection>
  );
};

export default Projects;
