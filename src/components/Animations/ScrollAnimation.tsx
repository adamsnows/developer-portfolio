import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

// Make sure ScrollTrigger is included
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationProps {
  children?: React.ReactNode;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "rotate";
  duration?: number;
  delay?: number;
  threshold?: number; // When to start the animation (0-1)
  className?: string;
  once?: boolean; // Whether to play the animation only once
}

const ScrollAnimation = ({
  children,
  animation = "fadeIn",
  duration = 0.8,
  delay = 0,
  threshold = 0.2,
  className = "",
  once = true,
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Initial state based on animation type
    let initialProps = {};
    switch (animation) {
      case "fadeIn":
        initialProps = { opacity: 0 };
        break;
      case "slideUp":
        initialProps = { opacity: 0, y: 50 };
        break;
      case "slideLeft":
        initialProps = { opacity: 0, x: -50 };
        break;
      case "slideRight":
        initialProps = { opacity: 0, x: 50 };
        break;
      case "scale":
        initialProps = { opacity: 0, scale: 0.9 };
        break;
      case "rotate":
        initialProps = { opacity: 0, rotation: -5 };
        break;
      default:
        initialProps = { opacity: 0 };
        break;
    }

    // Set initial state
    gsap.set(element, initialProps);

    // Animation properties
    let animationProps = {};
    switch (animation) {
      case "fadeIn":
        animationProps = { opacity: 1 };
        break;
      case "slideUp":
        animationProps = { opacity: 1, y: 0 };
        break;
      case "slideLeft":
        animationProps = { opacity: 1, x: 0 };
        break;
      case "slideRight":
        animationProps = { opacity: 1, x: 0 };
        break;
      case "scale":
        animationProps = { opacity: 1, scale: 1 };
        break;
      case "rotate":
        animationProps = { opacity: 1, rotation: 0 };
        break;
      default:
        animationProps = { opacity: 1 };
        break;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`, // e.g. "top 80%"
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    });

    tl.to(element, {
      ...animationProps,
      duration,
      delay,
      ease: "power2.out",
    });

    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [animation, duration, delay, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
