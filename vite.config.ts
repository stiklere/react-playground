import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-playground/",
  plugins: [react()],
  server: {
    proxy: {
      "/fruits": {
        target: "https://www.fruityvice.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fruits/, "/api/fruit"),
      },
    },
  },
});
