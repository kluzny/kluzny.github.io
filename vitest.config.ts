import { defineConfig } from 'vitest/config'
import { getVitestConfigFromNuxt } from '@nuxt/test-utils/config'

// Not defineVitestConfig: its default project split for the 'nuxt'
// environment runs every test twice, since we have no *.nuxt.test.* files.
export default defineConfig(async () => {
  const nuxtConfig = await getVitestConfigFromNuxt()
  return {
    ...nuxtConfig,
    test: {
      ...nuxtConfig.test,
      environment: 'happy-dom',
      include: ['tests/unit/**/*.test.*', 'tests/components/**/*.test.*'],
    },
  }
})
