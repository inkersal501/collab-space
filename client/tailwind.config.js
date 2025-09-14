/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",   // Indigo 500
          dark: "#4338CA",      // Indigo 700
          light: "#A5B4FC",     // Indigo 300
        },
        secondary: {
          DEFAULT: "#EC4899",   // Pink 500
          dark: "#BE185D",      // Pink 700
        },
        accent: {
          DEFAULT: "#FBBF24",   // Amber 400
        },
        success: "#10B981",     // Emerald 500
        warning: "#F59E0B",     // Amber 500
        error: "#EF4444",       // Red 500

        bg: {
          light: "#F9FAFB",     // Gray 50
          dark: "#111827",      // Gray 900
          surface: "#FFFFFF",   // White cards
        },
        border: "#E5E7EB",      // Gray 200
        text: {
          title: "#1F2937",     // Gray 800
          body: "#374151",      // Gray 700
          muted: "#6B7280",     // Gray 500
        },
      },
    },
  },
  plugins: [],
};
