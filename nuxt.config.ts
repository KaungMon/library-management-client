// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  modules: ["@primevue/nuxt-module"],
  // primevue: {
  /* Configuration */
  // },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".fake-dark-selector", // trying to also force a non-usage of the dark mode
          // cssLayer: {
          //   name: "primevue",
          //   // Enable PrimeVue CSS layer and configure the tailwind styles to have higher specificity with layering
          //   order: "tailwind-base, primevue, tailwind-utilities",
          // },
        },
        // unstyle: true,
      },
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
