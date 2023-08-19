// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],
  nitro: {
    preset: 'service-worker',
    output: {
      publicDir: '../docs', // replaces the magic dist symlink with a real directory expected by github pages
    },
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    experimental: {
      clientDB: true, // https://github.com/nuxt/content/issues/2062
      stripQueryParameters: false,
    },
  },
  experimental: {
    payloadExtraction: false, // create fewer artifacts
  },
})
