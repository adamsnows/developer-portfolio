import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
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
  "todos os projetos",
  ...Array.from(new Set(workData.map((item) => item.category))),
];

const Projects = () => {
  const [categories] = useState(uniqueCategories);
  const [category, setCategory] = useState("todos os projetos");
  const [activeTab, setActiveTab] = useState("todos os projetos");
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
    return category === "todos os projetos"
      ? project
      : project.category === category;
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

  // Efeito para animar os cards de projeto com scroll
  useEffect(() => {
    if (gridRef.current && typeof window !== "undefined") {
      const projectCards = gridRef.current.querySelectorAll(
        ".project-card-container"
      );

      projectCards.forEach((card, index) => {
        gsap.fromTo(
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
      });
    }
  }, [category, filteredProjects]);

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === category) return;

    setIsChanging(true);

    // Após um breve intervalo, mude a categoria e desative o estado de mudança
    setTimeout(() => {
      setCategory(newCategory);
      setActiveTab(newCategory);
      setIsChanging(false);
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
            text="Uma seleção dos meus trabalhos mais recentes e significativos, demonstrando minhas habilidades e paixão pelo desenvolvimento web moderno."
            animationStyle="fade"
            once={true}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          />
        </motion.div>

        <Tabs
          defaultValue={category}
          className="mb-24 xl:mb-48"
          value={activeTab}
        >
          <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
            <TabsList
              className="w-full grid h-full md:grid-cols-4
              lg:max-w-[640px] mb-12 mx-auto md:border border-none
              backdrop-blur-sm bg-white/5 rounded-xl p-1.5"
            >
              {categories.map((categoryName: string, index: number) => (
                <TabsTrigger
                  onClick={() => handleCategoryChange(categoryName)}
                  value={categoryName}
                  key={index}
                  className="capitalize w-[162px] md:w-auto relative overflow-hidden group"
                >
                  {/* Efeito de hover no botão da categoria */}
                  <motion.span
                    className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="tabBackground"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                  />
                  {categoryName}
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
            {filteredProjects.map((project, index) => (
              <TabsContent
                value={category}
                key={index}
                className="project-card-container"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    id={index}
                    project={project}
                    specialStyle={true}
                  />
                </motion.div>
              </TabsContent>
            ))}
          </motion.div>
        </Tabs>
      </motion.div>

      {/* Botão de voltar ao topo */}
      <ScrollToTop showBelow={300} />
    </SmoothScrollSection>
  );
};

export default Projects;
