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
  modules: ['@pinia/nuxt', 'nuxt-mapbox', 'dayjs-nuxt'],
  mapbox:{
    accessToken:process.env.API_KEY
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
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  ssr:false

 
})