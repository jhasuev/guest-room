import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/01_shared/assets/styles/_mixins.scss" as *;`,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@shared": fileURLToPath(new URL("./src/01_shared", import.meta.url)),
      "@entities": fileURLToPath(new URL("./src/02_entities", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/03_features", import.meta.url)),
      "@widgets": fileURLToPath(new URL("./src/04_widgets", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/05_pages", import.meta.url)),
      "@app": fileURLToPath(new URL("./src/07_app", import.meta.url)),
      "@store": fileURLToPath(
        new URL("./src/01_shared/stores/", import.meta.url)
      ),
    },
  },
});
