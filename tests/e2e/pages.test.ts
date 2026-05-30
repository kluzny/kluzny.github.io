import { test, expect } from '@playwright/test'
import routes from '../../helpers/routes.js'

const pages = [
  { path: '/', title: 'kyle.luzny.dev' },
  ...Object.entries(routes).map(([title, path]) => ({ path, title })),
]

for (const { path, title } of pages) {
  test(`${path} has title "${title}"`, async ({ page }) => {
    await page.goto(path)
    await expect(page).toHaveTitle(title)
  })
}
