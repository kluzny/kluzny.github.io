import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import routes from '../../app/utils/routes.js'

// vitest runs from the project root
const pagesDir = join(process.cwd(), 'app/pages/posts')
const contentDir = join(process.cwd(), 'content')

function slugOf(path) {
  return path.replace('/posts/', '')
}

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

  it('has exactly one route per post page', () => {
    const pageSlugs = readdirSync(pagesDir)
      .filter((file) => file.endsWith('.vue'))
      .map((file) => file.replace('.vue', ''))
    const routeSlugs = Object.values(routes).map(slugOf)
    expect(routeSlugs.sort()).toEqual(pageSlugs.sort())
  })

  // RecentPosts.vue links with routes[post.title], so every title needs a route
  it('has a route for every content title', () => {
    const titles = readdirSync(contentDir)
      .filter((file) => file.endsWith('.md'))
      .map(
        (file) =>
          readFileSync(join(contentDir, file), 'utf8').match(/^title:\s*['"]?(.+?)['"]?\s*$/m)?.[1]
      )
    const missing = titles.filter((title) => !(title in routes))
    expect(missing).toEqual([])
  })
})
