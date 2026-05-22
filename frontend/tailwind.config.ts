import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cloud: "#F6F4EF",
        ink: "#1D2522",
        mist: "#E8E3D8",
        oat: "#DDD3C2",
        sage: "#7E9B88",
        spruce: "#204238",
        lingon: "#B95D54",
        butter: "#EACF88",
        fjord: "#6F98A8"
      },
      boxShadow: {
        card: "0 24px 70px rgba(46, 55, 50, 0.14)",
        soft: "0 14px 40px rgba(46, 55, 50, 0.1)"
      },
      borderRadius: {
        card: "2rem"
      },
      fontFamily: {
        sans: [
          "Avenir Next",
          "Nunito Sans",
          "ui-rounded",
          "system-ui",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;

