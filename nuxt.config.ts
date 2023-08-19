// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],
  nitro: {
    output: {
      publicDir: '../docs', // replaces the magic dist symlink with a real directory expected by github pages
    }
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    experimental: {
      clientDB: true, // https://github.com/nuxt/content/issues/2062
      stripQueryParameters: false,
    },
  },
})
