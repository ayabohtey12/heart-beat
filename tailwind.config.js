/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F2D52",
        "medical-cyan": "#20B7D8",
        emerald: "#22C55E",
        "ecg-red": "#EF4444",
        purple: "#8B5CF6",
        "soft-orange": "#F59E0B",
        "light-bg": "#F8FAFC",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
