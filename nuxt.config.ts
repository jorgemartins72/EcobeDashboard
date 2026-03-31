// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: [
    '@/assets/css/tailwind.css',
  ],

  modules: ['@nuxtjs/google-fonts', '@nuxt/ui', '@nuxt/icon'],

  googleFonts: {
    display: 'swap',
    prefetch: true,
    preconnect: false,
    preload: true,
    useStylesheet: true,
    families: {
      Inter: [200, 300, 400, 700, 900],
      'Archivo Narrow': [400, 700],
      'Barlow Condensed': [200, 300, 400, 700],
      'Roboto Condensed': [200, 300, 400, 700],
    },
  },

})
