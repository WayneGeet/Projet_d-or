// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: process.env.APP_COMPANY_NAME,
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },  
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-mapbox', 'dayjs-nuxt'],
  mapbox:{
    accessToken:"pk.eyJ1Ijoid2F5bmUtZ2VldCIsImEiOiJjbGtjZWlnOXQwMmRiM2twZG05b2VldmcyIn0.93DilXpZMzPqgn_C7Y7L3w"
  },
  runtimeConfig:{
    "public": {},
    "app": {
      "baseURL": "/",
      "buildAssetsDir": "/_nuxt/",
      "cdnURL": "",
    }
  },
  components: {
      global: true,
      dirs: ['~/components']
        },
  plugins: [
    "~/plugins/mitt.client.js"
  ],

  ssr:false

 
})