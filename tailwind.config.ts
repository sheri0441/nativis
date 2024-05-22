import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#283618",
      secondary: "#606C38",
      neutral: "#FEFAE0",
      accent: "#BC6C25",
    },
    extend: {
      gridTemplateRows: {
        "custom-layout":
          "min-content minmax(0px, 40%) min-content min-content min-content min-content",
      },
    },
  },
  plugins: [],
};
export default config;
