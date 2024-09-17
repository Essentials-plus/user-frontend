import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["var(--open-sans)", "sans-serif"],
        oswald: ["var(--oswald)", "sans-serif"],
        montserrat: ["var(--montserrat)", "sans-serif"],
        "roboto-serif": ["var(--roboto-serif)", "sans-serif"],
        // "open-sans": ["Open Sans", "sans-serif"],
        // oswald: ["Oswald", "sans-serif"],
        // montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        app: {
          yellow: "#FFBE34",
          green: "#41AA3F",
          orange: "#FF7D34",
          black: "#343232",
          grey: "#F5F5F5",
          "dark-green": "#39A137",
          "darker-green": "#317773",
          primary: "#317773",
          "dark-grey": "#C4C4C4",
          "dark-blue": "#2E294E",
          text: "#6B6B6B",
          danger: "#EE4E34",
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
      },
      screens: {
        lg: "1348px",
      },
    },
    keyframes: {
      "accordion-slideDown": {
        from: { height: "0px" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-slideUp": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0px" },
      },
      "collapsible-slideDown": {
        from: { height: "0px" },
        to: { height: "var(--radix-collapsible-content-height)" },
      },
      "collapsible-slideUp": {
        from: { height: "var(--radix-collapsible-content-height)" },
        to: { height: "0px" },
      },
    },
    animation: {
      "accordion-slideDown":
        "accordion-slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      "accordion-slideUp":
        "accordion-slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      "collapsible-slideDown":
        "collapsible-slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      "collapsible-slideUp":
        "collapsible-slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
