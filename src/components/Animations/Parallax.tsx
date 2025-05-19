import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

// Inicialize o ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  className?: string;
  speed?: number;
  children: React.ReactNode;
}

const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = "",
  speed = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        y: 0,
      },
      {
        y: () => element.offsetHeight * speed * -1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={ref} className={`parallax-container ${className}`}>
      {children}
    </div>
  );
};

export default Parallax;
