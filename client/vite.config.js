import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets" : path.resolve("src/assets"),
      "@components": path.resolve("src/components"),
      // "@hooks": path.resolve("src/hooks"),      
      "@services" : path.resolve("src/services"), 
      "@utils" : path.resolve("src/utils"), 
      "@pages": path.resolve("src/pages"),
      "@store" : path.resolve("src/store"),
    }
  }
})
