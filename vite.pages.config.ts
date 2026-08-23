import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "/career-radar-2026/",
  plugins: [react()],
  root: "github-pages",
  publicDir: "../public",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        dashboard: fileURLToPath(new URL("./github-pages/index.html", import.meta.url)),
        research: fileURLToPath(new URL("./github-pages/research/index.html", import.meta.url)),
        scan: fileURLToPath(new URL("./github-pages/scan/index.html", import.meta.url)),
      },
    },
  },
});
