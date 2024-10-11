import Material from "@primevue/themes/material";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  modules: ["@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: Material,
      },
    },
  },
  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "./assets/main.css",
  ],
});
