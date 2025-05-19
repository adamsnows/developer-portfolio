import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface AdvancedTextAnimationProps {
  text: string;
  className?: string;
  animationStyle?: "slide" | "fade" | "typewriter" | "glitch";
  once?: boolean;
  delay?: number;
  speed?: number;
  threshold?: number;
}

/**
 * AdvancedTextAnimation - A component with multiple text animation styles
 *
 * This component provides several animation options for text:
 * - slide: letters slide in from bottom
 * - fade: letters fade in
 * - typewriter: text is typed out character by character
 * - glitch: text appears with a glitch effect
 */
const AdvancedTextAnimation = ({
  text,
  className = "",
  animationStyle = "slide",
  once = false,
  delay = 0,
  speed = 0.05,
  threshold = 0.1,
}: AdvancedTextAnimationProps) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  const [displayText, setDisplayText] = useState("");
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (inView && animationStyle === "typewriter" && !isAnimationComplete) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsAnimationComplete(true);
        }
      }, speed * 1000);

      return () => clearInterval(interval);
    }
  }, [inView, text, animationStyle, speed, isAnimationComplete]);

  // For glitch effect
  useEffect(() => {
    if (
      inView &&
      animationStyle === "glitch" &&
      textRef.current &&
      !isAnimationComplete
    ) {
      const letters = text.split("");
      let html = "";

      letters.forEach((letter) => {
        html += `<span class="inline-block">${letter}</span>`;
      });

      if (textRef.current) {
        textRef.current.innerHTML = html;

        const spans = textRef.current.querySelectorAll("span");

        spans.forEach((span, index) => {
          setTimeout(() => {
            // Add glitch class
            span.classList.add("glitch-animate");

            // Remove glitch class after animation
            setTimeout(() => {
              span.classList.remove("glitch-animate");
            }, 500);
          }, delay * 1000 + index * speed * 1000);
        });

        setTimeout(() => {
          setIsAnimationComplete(true);
        }, delay * 1000 + letters.length * speed * 1000 + 500);
      }
    }
  }, [inView, text, animationStyle, delay, speed, isAnimationComplete]);

  // For slide and fade animations
  const getVariants = () => {
    switch (animationStyle) {
      case "slide":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * speed,
              duration: 0.5,
            },
          }),
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({
            opacity: 1,
            transition: {
              delay: delay + i * speed,
              duration: 0.5,
            },
          }),
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  // Style for glitch animation
  const glitchStyle = `
    @keyframes glitch {
      0% {
        transform: translate(0);
        opacity: 1;
      }
      20% {
        transform: translate(-2px, 2px);
        opacity: 0.8;
        color: #FF5E5B;
      }
      40% {
        transform: translate(2px, -2px);
        opacity: 0.9;
        color: #8352FD;
      }
      60% {
        transform: translate(-1px, 1px);
        opacity: 1;
      }
      80% {
        transform: translate(1px, -1px);
        color: inherit;
      }
      100% {
        transform: translate(0);
        opacity: 1;
      }
    }
    .glitch-animate {
      animation: glitch 0.3s ease forwards;
    }
  `;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {(animationStyle === "slide" || animationStyle === "fade") && (
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={getVariants()}
              style={{
                display: char === " " ? "inline-block" : "inline-block",
                marginRight: char === " " ? "0.25em" : "0",
                width: char === " " ? "0.25em" : "auto",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      )}

      {animationStyle === "typewriter" && (
        <div className="inline-block">
          {displayText}
          {inView && !isAnimationComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block h-full w-[2px] ml-[2px] bg-current"
            />
          )}
        </div>
      )}

      {animationStyle === "glitch" && (
        <>
          <style>{glitchStyle}</style>
          <div ref={textRef} className="inline-block">
            {text}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedTextAnimation;
