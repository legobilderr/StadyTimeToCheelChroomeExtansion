export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./options.html"],
  theme: {
    extend: {},
    container: {
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
      },
      padding: "2rem",
    },
  },
  plugins: [require("daisyui")],
};
