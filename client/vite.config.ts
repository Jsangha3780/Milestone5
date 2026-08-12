import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        // Forward frontend API requests to Express
        target: "http://localhost:3000",

        // Changes the origin of the request
        changeOrigin: true,
      },
    },
  },
});