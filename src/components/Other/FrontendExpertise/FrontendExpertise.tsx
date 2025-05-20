import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
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
import { setupCodeTypingAnimation } from "@/components/Other/InitialHome/syntax-highlighter";

type FrontendCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
};

const FrontendCard = ({
  icon,
  title,
  description,
  delay = 0,
}: FrontendCardProps) => {
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

  const animationRef = useRef<HTMLDivElement | null>(null);
  const codeRef = useRef<HTMLPreElement | null>(null);
  const animationInitializedRef = useRef(false);

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  // Código texto memoizado para prevenir recriação em re-renderizações
  const codeText = useMemo(() => {
    return `<span style="color:#569CD6">export default function</span> <span style="color:#DCDCAA">AnimatedComponent</span>() {
  <span style="color:#569CD6">const</span> [<span style="color:#4FC1FF">isVisible</span>, <span style="color:#DCDCAA">setIsVisible</span>] = <span style="color:#DCDCAA">useState</span>(<span style="color:#569CD6">false</span>);
  <span style="color:#569CD6">const</span> <span style="color:#4FC1FF">controls</span> = <span style="color:#DCDCAA">useAnimationControls</span>();
  <span style="color:#569CD6">const</span> <span style="color:#9CDCFE">variants</span> = {
    <span style="color:#9CDCFE">hidden</span>: { <span style="color:#9CDCFE">opacity</span>: 0, <span style="color:#9CDCFE">y</span>: 20 },
    <span style="color:#9CDCFE">visible</span>: {
      <span style="color:#9CDCFE">opacity</span>: 1,
      <span style="color:#9CDCFE">y</span>: 0,
      <span style="color:#9CDCFE">transition</span>: {
        <span style="color:#9CDCFE">duration</span>: 0.6,
        <span style="color:#9CDCFE">staggerChildren</span>: 0.1
      }
    }
  };

  <span style="color:#569CD6">const</span> <span style="color:#9CDCFE">itemVariants</span> = {
    <span style="color:#9CDCFE">hidden</span>: { <span style="color:#9CDCFE">opacity</span>: 0, <span style="color:#9CDCFE">y</span>: 20 },
    <span style="color:#9CDCFE">visible</span>: { <span style="color:#9CDCFE">opacity</span>: 1, <span style="color:#9CDCFE">y</span>: 0 }
  };

  <span style="color:#6A9955">// Custom hook for intersection observer</span>
  <span style="color:#569CD6">const</span> <span style="color:#DCDCAA">useInViewAnimation</span> = (<span style="color:#9CDCFE">threshold</span> = 0.1) => {
    <span style="color:#569CD6">const</span> [<span style="color:#4FC1FF">ref</span>, <span style="color:#4FC1FF">inView</span>] = <span style="color:#DCDCAA">useInView</span>({ <span style="color:#9CDCFE">threshold</span> });

    <span style="color:#DCDCAA">useEffect</span>(() => {
      <span style="color:#569CD6">if</span> (<span style="color:#4FC1FF">inView</span>) {
        <span style="color:#DCDCAA">controls.start</span>(<span style="color:#CE9178">'visible'</span>);
        <span style="color:#DCDCAA">setIsVisible</span>(<span style="color:#569CD6">true</span>);
      }
    }, [<span style="color:#4FC1FF">inView</span>, <span style="color:#4FC1FF">controls</span>]);

    <span style="color:#569CD6">return</span> <span style="color:#4FC1FF">ref</span>;
  };

  <span style="color:#569CD6">const</span> <span style="color:#4FC1FF">sectionRef</span> = <span style="color:#DCDCAA">useInViewAnimation</span>(0.25);

  <span style="color:#569CD6">return</span> (
    <motion.section
      <span style="color:#9CDCFE">ref</span>={<span style="color:#4FC1FF">sectionRef</span>}
      <span style="color:#9CDCFE">variants</span>={<span style="color:#9CDCFE">variants</span>}
      <span style="color:#9CDCFE">initial</span>="hidden"
      <span style="color:#9CDCFE">animate</span>={<span style="color:#4FC1FF">controls</span>}
      <span style="color:#9CDCFE">className</span>="<span style="color:#CE9178">animated-container</span>"
    >
      <motion.h1 <span style="color:#9CDCFE">variants</span>={<span style="color:#9CDCFE">itemVariants</span>}>
        Animações incríveis com React!
      </motion.h1>
      <motion.p <span style="color:#9CDCFE">variants</span>={<span style="color:#9CDCFE">itemVariants</span>}>
        Criando interfaces modernas e interativas
      </motion.p>
    </motion.section>
  );
}`;
  }, []);

  useEffect(() => {
    if (codeRef.current && inView && !animationInitializedRef.current) {
      const code = codeRef.current;

      // Usar a função de destaque de sintaxe para animação
      gsap.to(
        {},
        {
          ...setupCodeTypingAnimation(codeRef, codeText, 5, 1),
        }
      );

      // Marcar como inicializado para evitar renderização duplicada
      animationInitializedRef.current = true;
    }

    // Animação para o elemento de demonstração
    if (animationRef.current) {
      const element = animationRef.current;

      // Configurar animações GSAP mais avançadas
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(element, {
        boxShadow: "0 0 20px 5px rgba(122, 144, 255, 0.5)",
        duration: 1.2,
        ease: "power2.inOut",
      })
        .to(element, {
          boxShadow: "0 0 10px 2px rgba(122, 144, 255, 0.3)",
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to(element, {
          scale: 1.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
        .to(element, {
          scale: 1,
          duration: 0.6,
          ease: "power1.inOut",
        })
        .to(element, {
          rotate: 10,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(element, {
          rotate: -10,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(element, {
          rotate: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
    }
  }, [inView, codeText]);

  return (
    <section className="py-5 relative overflow-visible">
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
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
          </motion.div>

          <motion.div
            variants={fadeInRight}
            className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-6 shadow-2xl overflow-hidden order-1 lg:order-2"
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
              className="text-xs text-white font-mono overflow-x-auto whitespace-pre-wrap p-4 rounded-lg h-[350px] code-example bg-black/70"
            ></pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrontendExpertise;
