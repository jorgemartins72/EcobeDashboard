// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
      apiKey: '',
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: [
    '@/assets/css/tailwind.css',
  ],

  modules: ['@nuxtjs/google-fonts', '@nuxt/ui', '@nuxt/icon', '@formkit/nuxt'],

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
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Sistema Ecobé - Ciência com Vida',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },

})
