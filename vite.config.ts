import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dns from "dns";
import path from "path";

dns.setDefaultResultOrder("verbatim");

// https://vite.dev/config/
export default defineConfig({
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.hdr"],
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [react(), svgr()],
});
