import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

// Inicialize o ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  staggerTime?: number;
  triggerPosition?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  staggerTime = 0.03,
  triggerPosition = "top 80%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const splitText = text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block opacity-0 translate-y-8"
        style={{
          display: char === " " ? "inline" : "inline-block",
          marginRight: char === " " ? "0.25em" : "0",
        }}
      >
        {char}
      </span>
    ));

    const container = containerRef.current;
    const chars = container.querySelectorAll("span");

    gsap.set(chars, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: container,
      start: triggerPosition,
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: staggerTime,
        });
      },
      onLeaveBack: () => {
        gsap.to(chars, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, staggerTime, triggerPosition]);

  return (
    <div
      ref={containerRef}
      className={`text-reveal-container ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block opacity-0 translate-y-8"
          style={{
            display: char === " " ? "inline" : "inline-block",
            marginRight: char === " " ? "0.25em" : "0",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
