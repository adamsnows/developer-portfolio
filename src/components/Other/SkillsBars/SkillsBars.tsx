import AdvancedTextAnimation from "@/components/Animations/AdvancedTextAnimation";
import AnimatedSkillBars from "@/components/Animations/AnimatedSkillBars";
import SmoothScrollSection from "@/components/Animations/SmoothScrollSection";
import { motion } from "framer-motion";

const skillsData = [
  {
    name: "React & Next.js",
    level: 9,
    color: "#61DAFB",
    category: "frontend" as const,
  },
  {
    name: "TypeScript",
    level: 9,
    color: "#3178C6",
    category: "frontend" as const,
  },
  {
    name: "Framer Motion",
    level: 8,
    color: "#ff5e5b",
    category: "frontend" as const,
  },
  {
    name: "CSS/Tailwind",
    level: 9,
    color: "#06B6D4",
    category: "frontend" as const,
  },
  {
    name: "JavaScript",
    level: 9,
    color: "#F7DF1E",
    category: "frontend" as const,
  },
  { name: "Node.js", level: 8, color: "#339933", category: "backend" as const },
  { name: "Express", level: 8, color: "#8352FD", category: "backend" as const },
  { name: "MongoDB", level: 7, color: "#47A248", category: "backend" as const },
  {
    name: "PostgreSQL",
    level: 7,
    color: "#336791",
    category: "backend" as const,
  },
  { name: "GraphQL", level: 7, color: "#E535AB", category: "backend" as const },
  { name: "AWS", level: 6, color: "#FF9900", category: "other" as const },
  { name: "Docker", level: 7, color: "#2496ED", category: "other" as const },
  {
    name: "Git & CI/CD",
    level: 8,
    color: "#F05032",
    category: "other" as const,
  },
];

/**
 * SkillsBars component showing animated progress bars for skills
 * This provides an alternative visualization to the 3D skills visualization
 */
const SkillsBars = () => {
  return (
    <SmoothScrollSection className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <AdvancedTextAnimation
            text="Minhas Habilidades"
            animationStyle="slide"
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg"
          >
            Uma visão detalhada das minhas competências técnicas
          </motion.p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl">
          <AnimatedSkillBars skills={skillsData} showLabels={true} />
        </div>
      </div>
    </SmoothScrollSection>
  );
};

export default SkillsBars;
