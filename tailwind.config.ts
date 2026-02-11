import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        border: "#e5e7eb",
        muted: "#f3f4f6"
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular"]
      }
    }
  },
  plugins: []
};

export default config;




