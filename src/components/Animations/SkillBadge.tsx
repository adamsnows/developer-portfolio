import { motion } from "framer-motion";
import { useState } from "react";

interface SkillBadgeProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  level?: number; // 1-10
  delay?: number;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  icon,
  color,
  level = 7,
  delay = 0,
}) => {
  const [hovered, setHovered] = useState(false);

  // Normalize level to percentage
  const percentage = (level / 10) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.05 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-3 flex items-center gap-3 overflow-hidden">
        <div className="text-2xl" style={{ color }}>
          {icon}
        </div>

        <div className="flex-1">
          <div className="text-sm font-medium">{name}</div>

          <div className="w-full h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
            />
          </div>
        </div>
      </div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
        >
          {level}/10
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillBadge;
