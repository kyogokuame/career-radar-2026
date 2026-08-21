import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/career-radar-2026/",
  plugins: [react()],
  root: "github-pages",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
