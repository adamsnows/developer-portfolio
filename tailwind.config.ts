import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        border: "#384261",
        input: "#191f41",
        ring: "#7A90FF",
        background: "#090a1a",
        foreground: "#7d7c85",
        primary: {
          DEFAULT: "#7A90FF",
          foreground: "#edf0fc",
          rgb: "122, 144, 255",
        },
        secondary: {
          DEFAULT: "#1f2751",
          foreground: "#7A90FF",
          rgb: "31, 39, 81",
        },
        tertiary: {
          DEFAULT: "#090a1a",
        },
        quaternary: {
          DEFAULT: "#ffffff20",
        },
        quinary: {
          DEFAULT: "#9A9ABB",
        },
        senary: {
          DEFAULT: "#282937",
        },
        destructive: {
          DEFAULT: "#7A90FF",
          foreground: "#090a1a",
        },
        muted: {
          DEFAULT: "#9499CC",
          foreground: "#9499CC",
        },
        accent: {
          DEFAULT: "#2d334c",
          foreground: "#7A90FF",
        },
        popover: {
          DEFAULT: "#9499CC",
          foreground: "#9499CC",
        },
        card: {
          DEFAULT: "#090a1a",
          foreground: "#7A90FF",
        },
      },
      keyframes: {
        upDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(20px)" },
        },
        upDownLarge: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(50px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px 5px rgba(122, 144, 255, 0.3)" },
          "50%": { boxShadow: "0 0 25px 10px rgba(122, 144, 255, 0.5)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "rgba(122, 144, 255, 1)" },
        },
      },
      animation: {
        "up-down": "upDown 5s ease-in-out infinite",
        "up-down-3": "upDownLarge 7.8s ease-in-out infinite",
        "up-down-2": "upDownLarge 7.6s ease-in-out infinite",
        "up-down-1": "upDownLarge 7.4s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
        "blink-caret": "blink-caret .75s step-end infinite",
      },
      backgroundImage: {
        work_project_bg: "url(/project-bg.webp)",
        contact_illustration: "url(/project-bg-2.webp)",
        hero_shape: "url(/developer-1.webp)",
      },
      backgroundSize: {
        "300%": "300% 100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
export default config;
