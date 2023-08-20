// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
    },
    output: {
      publicDir: '../docs', // replaces the magic dist symlink with a real directory expected by github pages
    },
  },
  experimental: {
    payloadExtraction: false, // create fewer artifacts
  },
})
