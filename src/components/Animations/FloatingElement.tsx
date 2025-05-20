import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  duration = 4,
  distance = 15,
  className = "",
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  const floatingVariants: Variants = {
    initial: {
      y: 0,
    },
    animate: {
      y: [0, -distance, 0],
      transition: {
        delay,
        duration,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
        repeatDelay: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`floating-element overflow-hidden ${className}`}
      initial="initial"
      animate={controls}
      variants={floatingVariants}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
