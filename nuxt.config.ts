// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    output: {
      publicDir: '../dist', // replaces the magic dist symlink with a real directory
    }
  }
})
