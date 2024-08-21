/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundImage: {
      "custom-gradient": "linear-gradient(#211C24 100%, #211C24 100%)",
      "line-gradient":
        "linear-gradient(to right, transparent, black 50%, transparent)",
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontWeight: {
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
    },
    fontSize: {
      "14px": "12px",
      "15px": "15px",
      "16px": "16px",
      "33px": "33px",
      "24px": "24px",
      "29px": "25px",
      "49px": "44px",
      "72px": "72px",
      "96px": "86px",
      "64px": "48px",
    },
    lineHeight: {
      "18px": "18px",
      "24px": "22px",
      "32px": "32px",
      "40px": "36px",
      "48px": "48px",
      "72px": "70px",
      "56px": "50px",
    },
    letterSpacing: {
      "-1": "-1%",
      3: "3%",
    },
    extend: {
      screens: {
        xs: "400px",
        fs: "500px",
        xmd: "676px",
      },
      colors:{

      }
    },
  },
  plugins: [],
};
