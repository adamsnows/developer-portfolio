import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiArrowUpLine } from "react-icons/ri";

interface ScrollToTopProps {
  showBelow?: number;
}

/**
 * ScrollToTop Component
 *
 * Um botão flutuante que aparece quando o usuário rola para baixo,
 * permitindo voltar ao topo da página com uma animação suave.
 */
const ScrollToTop = ({ showBelow = 400 }: ScrollToTopProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > showBelow) {
        if (!show) setShow(true);
      } else {
        if (show) setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [show, showBelow]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-primary/80 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-primary transition-all duration-300 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voltar ao topo"
        >
          <RiArrowUpLine className="text-xl" />

          {/* Efeito de pulse ao redor do botão */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
