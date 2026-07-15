import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        panel: "var(--color-panel-bg)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-subtle": "var(--color-text-subtle)",
        accent: "var(--color-accent)",
        card: "var(--color-card-bg)",
        "input-border": "var(--color-input-border)",
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', "serif"],
        sans: ['"Noto Sans SC"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
