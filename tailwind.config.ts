import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#12110F",
        surface: {
          DEFAULT: "#1A1D23",
          "2": "#22262F",
        },
        teal: {
          DEFAULT: "#4A9B8E",
          glow: "rgba(74, 155, 142, 0.25)",
        },
        amber: {
          DEFAULT: "#C4956A",
          glow: "rgba(196, 149, 106, 0.2)",
        },
        positive: "#5B9A6F",
        negative: "#B85C5C",
        text: {
          DEFAULT: "#E8E6E3",
          dim: "#9B9A97",
          faint: "#4A4846",
        },
        border: "rgba(232, 230, 227, 0.07)",
      },
      fontFamily: {
        sans: ["DM Sans", "Noto Sans KR", "system-ui", "sans-serif"],
        serif: ["DM Serif Display", "Gowun Batang", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
