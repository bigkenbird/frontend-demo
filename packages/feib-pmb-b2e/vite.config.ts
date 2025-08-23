import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/pmbb2e",
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json", ".scss"],
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@views": resolve(__dirname, "./src/views"),
      "@style": resolve(__dirname, "./src/style"),
      "@app-vue": resolve(__dirname, "./src/vue"),
      "@mock": resolve(__dirname, "./src/mockdata"),
      // 消除警告用 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/b2e-mkt": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path,
      },
      "/b2e": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/var/var.scss";`,
      },
    },
  },
  build: {
    outDir: "pmbb2e",
    sourcemap: false,
    minify: false,
  },
});
