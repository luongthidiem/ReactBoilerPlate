import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(), // plugin React
    tailwindcss(), // plugin Tailwind
    tsconfigPaths(), // plugin đọc alias từ tsconfig
  ],
});
