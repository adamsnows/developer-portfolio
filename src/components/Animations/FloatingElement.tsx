import { motion, useAnimation } from "framer-motion";
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
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  const floatingVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: [0, -distance, 0],
      transition: {
        delay,
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`floating-element ${className}`}
      initial="initial"
      animate={controls}
      variants={floatingVariants}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
