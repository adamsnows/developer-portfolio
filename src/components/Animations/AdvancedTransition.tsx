import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AdvancedTransitionProps {
  children: ReactNode;
  className?: string;
}

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  initial: {
    y: 120,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInDown = {
  initial: {
    y: -120,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInRight = {
  initial: {
    x: -120,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInLeft = {
  initial: {
    x: 120,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleUp = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const professionalBadgeVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    rotateX: -15,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const shimmerEffect = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: "100%",
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
      delay: 1,
    },
  },
};

export const floatingParticles = {
  animate: {
    y: [-10, -20, -10],
    opacity: [0, 0.8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const AdvancedTransition = ({
  children,
  className = "",
}: AdvancedTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvancedTransition;
