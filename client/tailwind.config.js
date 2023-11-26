/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        primary: "#1677FF",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
