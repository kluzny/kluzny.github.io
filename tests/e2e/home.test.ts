import { test, expect } from '@playwright/test'

test('homepage shows Recent Posts heading', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Recent Posts' })).toBeVisible()
})

test('homepage lists at least one post link', async ({ page }) => {
  await page.goto('/')
  const links = page.locator('ul li a')
  await expect(links.first()).toBeVisible()
})
