import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/robots', // load before @nuxt/content https://nuxtseo.com/docs/robots/guides/content
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'css',
            'gdscript',
            'html',
            'js',
            'js',
            'json',
            'md',
            'mdc',
            'ruby',
            'php',
            'rust',
            'shell',
            'ts',
            'vue',
            'yaml'
          ],
        },
      },
    },
  },
})