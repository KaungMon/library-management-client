import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL,

      PUSHER_APP_ID: process.env.NUXT_PUBLIC_PUSHER_APP_ID,
      PUSHER_APP_KEY: process.env.NUXT_PUBLIC_PUSHER_APP_KEY,
      PUSHER_APP_SECRET: process.env.NUXT_PUBLIC_PUSHER_APP_SECRET,
      PUSHER_HOST: process.env.NUXT_PUBLIC_PUSHER_HOST,
      PUSHER_PORT: process.env.NUXT_PUBLIC_PUSHER_PORT,
      PUSHER_SCHEME: process.env.NUXT_PUBLIC_PUSHER_SCHEME,
      PUSHER_APP_CLUSTER: process.env.NUXT_PUBLIC_PUSHER_APP_CLUSTER,

      /* REVERB_APP_ID : process.env.NUXT_PUBLIC_REVERB_APP_ID,
      REVERB_APP_KEY : process.env.NUXT_PUBLIC_REVERB_APP_KEY,
      REVERB_APP_SECRET : process.env.NUXT_PUBLIC_REVERB_APP_SECRET,
      REVERB_HOST : process.env.NUXT_PUBLIC_REVERB_HOST,
      REVERB_PORT : process.env.NUXT_PUBLIC_REVERB_PORT,
      REVERB_SCHEME : process.env.NUXT_PUBLIC_REVERB_SCHEME, */
    },
  },
  alias: {
    assets: "/<rootDir>/assets",
  },
  modules: ["@primevue/nuxt-module"],

  primevue: {
    importTheme: { from: "@/themes/mytheme.js" },
    options : {
      ripple : true,
    }
  },
  css: [
    "primeicons/primeicons.css",
    "./assets/main.css",
  ],
});
