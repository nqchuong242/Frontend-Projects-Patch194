import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#d6d2c4",
        card: "#f7f6f3",
      },
      borderRadius: {
        xl: "18px",
      },
    },
  },
  plugins: [],
} satisfies Config;