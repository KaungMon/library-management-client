import Material from "@primevue/themes/material";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL,

      PUSHER_APP_ID : process.env.NUXT_PUBLIC_PUSHER_APP_ID,
      PUSHER_APP_KEY : process.env.NUXT_PUBLIC_PUSHER_APP_KEY,
      PUSHER_APP_SECRET : process.env.NUXT_PUBLIC_PUSHER_APP_SECRET,
      PUSHER_HOST : process.env.NUXT_PUBLIC_PUSHER_HOST,
      PUSHER_PORT : process.env.NUXT_PUBLIC_PUSHER_PORT,
      PUSHER_SCHEME : process.env.NUXT_PUBLIC_PUSHER_SCHEME,
      PUSHER_APP_CLUSTER : process.env.NUXT_PUBLIC_PUSHER_APP_CLUSTER,
    },
  },
  alias: {
    assets: "/<rootDir>/assets",
  },
  modules: ["@primevue/nuxt-module",],
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
