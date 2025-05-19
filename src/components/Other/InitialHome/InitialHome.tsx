import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  RiArrowDownSLine,
  RiBriefcase4Fill,
  RiDownloadFill,
  RiMailSendFill,
  RiTeamFill,
  RiTodoFill,
} from "react-icons/ri";

import {
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";
import FloatingElement from "@/components/Animations/FloatingElement";
import Badge from "@/components/Other/Bagde/Badge";
import DevImg from "@/components/Other/DevImg/DevImg";
import Socials from "@/components/Other/Socials/Socials";
import { Button } from "@/components/Other/UI/button";

const InitialHome = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const codeBlockRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.textContent?.split("") || [];
      titleRef.current.innerHTML = "";

      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        titleRef.current?.appendChild(span);
      });

      gsap.to(titleRef.current.children, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        y: 0,
        ease: "power2.out",
        delay: 0.5,
      });
    }

    // Simular digitação de código
    if (codeBlockRef.current) {
      const codeText = `// Skilled developer in both front and back
const developer = {
  name: "Adam Neves",
  skills: {
    frontend: ["React", "NextJS", "CSS", "Animation"],
    backend: ["Node.js", "Express", "API Design", "Database"],
    architecture: ["Microservices", "AWS", "DevOps"]
  },
  createSolution: (problem) => {
    return highQualitySolution
  }
};`;

      const codeParts = codeText.split("");
      codeBlockRef.current.textContent = "";

      gsap.to(codeBlockRef.current, {
        duration: 2,
        onUpdate: function () {
          const progress = Math.floor(this.progress() * codeParts.length);
          codeBlockRef.current!.textContent = codeParts
            .slice(0, progress)
            .join("");
        },
        delay: 1,
      });
    }
  }, []);

  return (
    <section className="py-12 md:pt-24 xl:py-24 xl:pt-0 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-16 left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col xl:flex-row justify-between gap-x-8 items-center"
        >
          <motion.div
            variants={fadeInUp}
            className="flex max-w-[600px] flex-col justify-center
            mx-auto xl:mx-0 text-center xl:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="text-sm uppercase font-semibold
              mb-4 text-primary tracking-[4px]"
            >
              <Badge text="Desenvolvedor Full Stack" />
            </motion.div>

            <h1
              ref={titleRef}
              className="h1 mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              ADAM NEVES
            </h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-[490px] mx-auto xl:mx-0 text-sm mb-5 leading-relaxed"
            >
              Desenvolvimento{" "}
              <span className="text-primary font-semibold">FullStack</span> com
              um foco pronunciado e entusiasmo pela criação de soluções
              poderosas e inovadoras. Minha experiência abrange tanto o{" "}
              <span className="text-secondary font-semibold">front-end</span>{" "}
              quanto o{" "}
              <span className="text-primary font-semibold">back-end</span>,
              permitindo-me construir aplicações completas e integradas. Estou
              constantemente em busca de novos desafios que me permitam aprender
              e aplicar as mais recentes tecnologias, garantindo a entrega de
              produtos robustos, escaláveis e seguros.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-y-3 md:flex-row gap-x-3
              mx-auto xl:mx-0 mb-8"
            >
              <Link href="/contact" aria-label="contact">
                <Button className="gap-x-2 group">
                  Contate-me{" "}
                  <RiMailSendFill
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link
                target="_blank"
                href="https://drive.google.com/file/d/1mAfxZcABsd4ZD7wVR7l9AlLXLpHi0wfx/view?usp=drive_link"
                aria-label="cv"
              >
                <Button variant="secondary" className="gap-x-2 group">
                  Download CV
                  <RiDownloadFill
                    size={18}
                    className="transition-transform group-hover:translate-y-1"
                  />
                </Button>
              </Link>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              variants={fadeInUp}
              className="hidden md:flex gap-x-3 gap-y-2 flex-wrap mb-8"
            >
              <div className="font-semibold text-xs uppercase tracking-wider mb-2 w-full">
                Tech Stack:
              </div>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                React
              </span>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                Next.js
              </span>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                TypeScript
              </span>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                Node.js
              </span>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                MongoDB
              </span>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                GraphQL
              </span>
              <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                AWS
              </span>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeInUp}>
              <Socials
                containerStyles="flex gap-x-6 mx-auto xl:mx-0"
                iconsStyles="text-foreground text-[22px] hover:text-primary transition-all"
              />
            </motion.div>
          </motion.div>

          {/* Image container with badges and code editor */}
          <motion.div
            variants={fadeInRight}
            className="hidden xl:flex relative"
          >
            <FloatingElement className="w-full" duration={3} distance={10}>
              <DevImg
                alt="initial image"
                priority
                containerStyles="w-[510px] h-[510px] relative flex items-center"
                imgSrc="/people/adam-face.png"
              />
            </FloatingElement>

            {/* Badges with animations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-[24%] -left-[5rem]"
            >
              <Badge
                containerStyles="animate-up-down-3"
                icon={<RiBriefcase4Fill />}
                endCountNum={new Date().getFullYear() - 2022}
                badgeText="Anos de experiência"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute top-[80%] -left-[1rem]"
            >
              <Badge
                containerStyles="animate-up-down-2"
                icon={<RiTodoFill />}
                endCountNum={32}
                badgeText="Projetos finalizados"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute top-[55%] -right-8"
            >
              <Badge
                containerStyles="animate-up-down-1"
                icon={<RiTeamFill />}
                endCountNum={12}
                badgeText="Clientes satisfeitos"
              />
            </motion.div>

            {/* Code block */}
            <div className="absolute -left-20 bottom-4 z-30 max-w-[280px]">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl">
                <div className="flex items-center gap-x-4 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre
                  ref={codeBlockRef}
                  className="text-xs text-white font-mono"
                ></pre>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll down button */}
        <motion.div
          variants={fadeInUp}
          className="hidden xl:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce"
        >
          <RiArrowDownSLine
            className="text-3xl text-primary cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InitialHome;
