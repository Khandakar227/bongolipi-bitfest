import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        balooda: ["'Baloo Da 2'", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "primary": "#140F2D",
        "secondary": "#002964"

      }
    },
  },
  plugins: [],
} satisfies Config;
