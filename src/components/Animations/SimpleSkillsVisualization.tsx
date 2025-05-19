import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiCss3,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { useInView } from "react-intersection-observer";
import SkillBadge from "./SkillBadge";

interface SkillIconProps {
  icon: React.ReactNode;
  name: string;
  color: string;
  size?: number;
  delay?: number;
}

const SkillIcon: React.FC<SkillIconProps> = ({
  icon,
  name,
  color,
  size = 56,
  delay = 0,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position for the 3D hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="flex flex-col items-center gap-2"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transform: isHovering
          ? `perspective(800px) rotateX(${mousePosition.y * 20}deg) rotateY(${
              mousePosition.x * -20
            }deg)`
          : "none",
        transition: "transform 0.2s ease",
      }}
    >
      <div
        className="p-4 rounded-full bg-white/10 backdrop-blur-sm shadow-lg relative overflow-hidden group"
        style={{ color }}
      >
        <div style={{ fontSize: size }}>{icon}</div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40"
          style={{ backgroundColor: color, filter: "blur(10px)" }}
          animate={isHovering ? { opacity: 0.4 } : { opacity: 0 }}
        />
      </div>

      <motion.span
        className="text-sm font-medium"
        animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

interface SimpleSkillsVisualizationProps {
  className?: string;
}

const SimpleSkillsVisualization: React.FC<SimpleSkillsVisualizationProps> = ({
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("frontend");
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  if (!mounted) return null;

  const frontendSkills = [
    { icon: <SiReact />, name: "React", color: "#61DAFB", delay: 0, level: 9 },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
      color: "#ffffff",
      delay: 0.1,
      level: 8,
    },
    {
      icon: <SiTypescript />,
      name: "TypeScript",
      color: "#3178C6",
      delay: 0.2,
      level: 9,
    },
    {
      icon: <SiJavascript />,
      name: "JavaScript",
      color: "#F7DF1E",
      delay: 0.3,
      level: 9,
    },
    {
      icon: <SiRedux />,
      name: "Redux",
      color: "#764ABC",
      delay: 0.4,
      level: 8,
    },
    {
      icon: <SiHtml5 />,
      name: "HTML5",
      color: "#E34F26",
      delay: 0.5,
      level: 9,
    },
    { icon: <SiCss3 />, name: "CSS3", color: "#1572B6", delay: 0.6, level: 9 },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind",
      color: "#06B6D4",
      delay: 0.7,
      level: 9,
    },
  ];

  const backendSkills = [
    {
      icon: <SiNodedotjs />,
      name: "Node.js",
      color: "#339933",
      delay: 0,
      level: 8,
    },
    {
      icon: <SiGraphql />,
      name: "GraphQL",
      color: "#E535AB",
      delay: 0.1,
      level: 7,
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
      color: "#47A248",
      delay: 0.2,
      level: 8,
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
      color: "#4169E1",
      delay: 0.3,
      level: 7,
    },
  ];

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div
      ref={ref}
      className={`${className} w-full h-auto min-h-[500px] relative rounded-xl overflow-hidden flex flex-col items-center justify-center py-12`}
    >
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-radial from-primary/10 to-transparent opacity-30"></div>

      {/* Tab Selector */}
      <div className="z-10 mb-8 flex space-x-4 bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "frontend"
              ? "bg-primary text-white"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => setActiveTab("frontend")}
        >
          Frontend
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "backend"
              ? "bg-primary text-white"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => setActiveTab("backend")}
        >
          Backend
        </motion.button>
      </div>

      {activeTab === "frontend" ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-6"
          variants={variants}
          initial="hidden"
          animate={controls}
        >
          {frontendSkills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <SkillBadge
                icon={skill.icon}
                name={skill.name}
                color={skill.color}
                level={skill.level}
                delay={skill.delay}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-6"
          variants={variants}
          initial="hidden"
          animate={controls}
          key="backend"
        >
          {backendSkills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <SkillBadge
                icon={skill.icon}
                name={skill.name}
                color={skill.color}
                level={skill.level}
                delay={skill.delay}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Background animations */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default SimpleSkillsVisualization;
