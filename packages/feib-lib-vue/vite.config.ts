import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: (format) => `feib-lib-vue-ts.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "vue-router",
        "vue-i18n",
        "@vuepic/vue-datepicker",
        "@twix/ix-lib-base",
        "@twix/ix-lib-vue",
        "@ibmix/hostapp-core",
        "@ibmix/hostapp-manager",
        "@twix/impsdk",
      ],
    },
    outDir: "common",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json", ".scss"],
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components/atomic"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@views": resolve(__dirname, "./src/views"),
      "@style": resolve(__dirname, "./src/style"),
      "@app-vue": resolve(__dirname, "./src/vue"),
    },
  },
  plugins: [
    // vue({
    //   template: {
    //     compilerOptions: {
    //       // treat all components starting with `my-lit` as custom elements
    //       // isCustomElement: (tag) => tag.includes('ui-'),
    //     },
    //   },
    // }),
    dts({
      insertTypesEntry: true,
    }),
  ],
});
