import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#f5f5f7",
        accent: "#ef4444",
        "accent-light": "#dc2626",
        muted: "#86868b",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.03em",
      },
    },
  },
  plugins: [],
};
export default config;
