import { describe, it, expect } from 'vitest'
import routes from '../../helpers/routes.js'

describe('routes', () => {
  it('maps JavaScript for LeetCode to the correct path', () => {
    expect(routes['JavaScript for LeetCode']).toBe('/posts/javascript-for-leetcode')
  })

  it('all values are /posts/ paths', () => {
    for (const path of Object.values(routes)) {
      expect(path).toMatch(/^\/posts\//)
    }
  })

  it('has no duplicate paths', () => {
    const paths = Object.values(routes)
    const unique = new Set(paths)
    expect(unique.size).toBe(paths.length)
  })
})
