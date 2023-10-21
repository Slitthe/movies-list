import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        glass: "rgba( 255, 255, 255, 0.95 )",
        starred: "rgba(255, 255, 190, 0.95)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      },
      backdropBlur: {
        glass: " blur(9px)",
      },
      borderRadius: {
        glass: "10px",
      },
      borderColor: {
        glass: "rgba( 255, 255, 255, 0.48 )",
      },
      fill: {
        starred: "rgb(78, 64, 13)",
      },
    },
  },
  plugins: [],
};
export default config;
