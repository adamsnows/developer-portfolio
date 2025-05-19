import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface SkillData {
  name: string;
  level: number;
  color: string;
  category: "frontend" | "backend" | "other";
}

interface AnimatedSkillBarsProps {
  skills: SkillData[];
  className?: string;
  showLabels?: boolean;
  activeCategory?: "frontend" | "backend" | "other" | "all";
}

/**
 * AnimatedSkillBars - A component that displays skills as animated bars
 *
 * This component visualizes skills with horizontal bars that animate on scroll
 * with filtering capabilities by category.
 */
const AnimatedSkillBars = ({
  skills,
  className = "",
  showLabels = true,
  activeCategory = "all",
}: AnimatedSkillBarsProps) => {
  const controls = useAnimation();
  const [filteredSkills, setFilteredSkills] = useState<SkillData[]>(skills);
  const [selectedCategory, setSelectedCategory] = useState<
    "frontend" | "backend" | "other" | "all"
  >(activeCategory);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(
        skills.filter((skill) => skill.category === selectedCategory)
      );
    }
  }, [selectedCategory, skills]);

  const handleCategoryChange = (
    category: "frontend" | "backend" | "other" | "all"
  ) => {
    setSelectedCategory(category);
  };

  return (
    <div ref={ref} className={`${className}`}>
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryChange("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/60 hover:text-white"
          }`}
        >
          Todas
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryChange("frontend")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "frontend"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/60 hover:text-white"
          }`}
        >
          Frontend
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryChange("backend")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "backend"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/60 hover:text-white"
          }`}
        >
          Backend
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryChange("other")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "other"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/60 hover:text-white"
          }`}
        >
          Outras
        </motion.button>
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate={controls}
        className="space-y-5"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">{skill.name}</span>
              {showLabels && (
                <span className="text-xs text-white/60">{skill.level}/10</span>
              )}
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                variants={{
                  hidden: { width: 0 },
                  visible: {
                    width: `${skill.level * 10}%`,
                    transition: {
                      duration: 0.8 + index * 0.1,
                      ease: "easeOut",
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedSkillBars;
