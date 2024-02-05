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
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
        },
        {
          src: "https://apis.google.com/js/platform.js",
          async: true,
          defer: true,
        },
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&callback=Function.prototype&libraries=drawing`,
        },
        {
          src: "https://ajax.googleapis.com/ajax/libs/earthengine/0.1.343/earthengine-api.min.js",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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

  ssr:false

 
})