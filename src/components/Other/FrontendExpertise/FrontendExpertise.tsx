import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  RiCodeSSlashLine,
  RiLayout2Line,
  RiMagicLine,
  RiPaintBrushLine,
  RiSmartphoneLine,
  RiSpeedLine,
} from "react-icons/ri";
import { useInView } from "react-intersection-observer";

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/components/Animations/AdvancedTransition";

// Componente de Card com Animação
const FrontendCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:bg-white/10 transition-all hover:scale-105"
    >
      <div className="text-secondary text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </motion.div>
  );
};

const FrontendExpertise = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const animationRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (codeRef.current) {
      const code = codeRef.current;
      const text = `import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.6 }}
      className="animated-container"
    >
      <h1>Animações incríveis com React!</h1>
      <p>Criando interfaces modernas e interativas</p>
    </motion.div>
  );
}`;

      const lines = text.split("\n");
      let lineIndex = 0;

      code.innerHTML = "";

      const typeNextLine = () => {
        if (lineIndex < lines.length) {
          const line = lines[lineIndex];
          const lineElement = document.createElement("div");
          code.appendChild(lineElement);

          let charIndex = 0;
          const typeChar = () => {
            if (charIndex < line.length) {
              lineElement.textContent += line[charIndex];
              charIndex++;
              setTimeout(typeChar, Math.random() * 30 + 5);
            } else {
              lineIndex++;
              setTimeout(typeNextLine, 100);
            }
          };

          typeChar();
        }
      };

      setTimeout(typeNextLine, 1000);
    }

    // Animação para o elemento de demonstração
    if (animationRef.current) {
      const element = animationRef.current;

      // Configurar animações GSAP
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(element, {
        y: -20,
        duration: 1,
        ease: "power2.inOut",
      })
        .to(element, {
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(element, {
          rotate: 360,
          duration: 1.5,
          ease: "power1.inOut",
        })
        .to(element, {
          scale: 1.1,
          duration: 0.7,
          ease: "back.out(1.7)",
        })
        .to(element, {
          scale: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });
    }
  }, [inView]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={controls}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
          >
            Expertise em Front-End
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg">
            Interfaces modernas, responsivas e animações cativantes para uma
            experiência de usuário excepcional
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FrontendCard
            icon={<RiLayout2Line />}
            title="UI/UX Design"
            description="Criação de interfaces elegantes com foco na experiência do usuário, seguindo os princípios de design e acessibilidade."
            delay={0.1}
          />

          <FrontendCard
            icon={<RiCodeSSlashLine />}
            title="React & Next.js"
            description="Desenvolvimento de aplicações com React e Next.js, utilizando as melhores práticas e padrões modernos."
            delay={0.2}
          />

          <FrontendCard
            icon={<RiMagicLine />}
            title="Animações Avançadas"
            description="Implementação de animações fluidas e interativas que elevam a experiência do usuário a um novo patamar."
            delay={0.3}
          />

          <FrontendCard
            icon={<RiSmartphoneLine />}
            title="Design Responsivo"
            description="Interfaces que se adaptam perfeitamente a qualquer dispositivo, garantindo uma experiência consistente."
            delay={0.4}
          />

          <FrontendCard
            icon={<RiSpeedLine />}
            title="Performance"
            description="Otimização de carregamento, renderização e interatividade para sites rápidos e eficientes."
            delay={0.5}
          />

          <FrontendCard
            icon={<RiPaintBrushLine />}
            title="CSS Avançado"
            description="Domínio de Tailwind CSS, Styled Components, CSS Modules, animações e transições personalizadas."
            delay={0.6}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={fadeInLeft}
            className="space-y-6 order-2 lg:order-1"
          >
            <h3 className="text-2xl font-bold">
              Experiência visual impactante
            </h3>
            <p className="text-white/80">
              Meu foco é criar interfaces que não apenas funcionem
              perfeitamente, mas que também encantem os usuários com animações
              fluidas, design responsivo e alta performance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Interfaces interativas e responsivas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Animações e micro-interações avançadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Arquitetura de componentes escalável</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Aplicações web progressivas (PWA)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Otimização para SEO e acessibilidade</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <div
                ref={animationRef}
                className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center text-white text-2xl shadow-lg"
              >
                <RiMagicLine />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            className="bg-black/30 rounded-lg border border-white/10 p-6 shadow-2xl overflow-hidden order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-xs text-white/60">
                AnimatedComponent.tsx
              </div>
            </div>
            <pre
              ref={codeRef}
              className="font-mono text-xs text-blue-400 bg-black/50 p-4 rounded h-[350px] overflow-y-auto"
            ></pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrontendExpertise;
