// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-mapbox'],
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