import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md', // implicit `content/` directory
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
      }),
    })
  }
})
