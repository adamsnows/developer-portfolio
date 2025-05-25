import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProfessionalBadgeProps {
  text: string;
  icon?: ReactNode;
  className?: string;
  gradient?: boolean;
  animated?: boolean;
}

const ProfessionalBadge = ({
  text,
  icon,
  className = "",
  gradient = true,
  animated = true,
}: ProfessionalBadgeProps) => {
  const badgeVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    initial: {
      backgroundPosition: "0%",
    },
    animate: {
      backgroundPosition: ["0%", "100%", "0%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  if (!animated) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full
          ${
            gradient
              ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
              : "bg-primary/10 border border-primary/20"
          }
          backdrop-blur-sm text-secondary ${className}`}
      >
        {icon && <span className="text-sm">{icon}</span>}
        <span>{text}</span>
      </div>
    );
  }

  return (
    <motion.div
      variants={badgeVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative inline-flex items-center gap-3 px-6 py-3 text-sm font-bold rounded-full
        cursor-default select-none overflow-hidden ${className}`}
    >
      {/* Glow background */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/10 to-secondary/100 blur-md"
      />

      {/* Main background with better gradient */}

      {/* Inner highlight */}
      <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent" />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        {icon && (
          <motion.span
            className="text-primary drop-shadow-sm"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            {icon}
          </motion.span>
        )}
        <motion.span
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-white/50 via-gray-700 to-white bg-clip-text text-transparent font-bold tracking-wider text-shadow-sm"
          style={{
            backgroundSize: "200% 100%",
          }}
        >
          {text}
        </motion.span>
      </div>

      {/* Enhanced floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-sm"
          animate={{
            y: [-8, -16, -8],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
          style={{
            left: `${15 + i * 25}%`,
            top: "-8px",
          }}
        />
      ))}

      {/* Corner sparkles */}
      <motion.div
        className="absolute top-1 right-2 w-1 h-1 bg-secondary rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-1 left-2 w-1 h-1 bg-primary rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />
    </motion.div>
  );
};

export default ProfessionalBadge;
