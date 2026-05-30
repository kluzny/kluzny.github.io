import { test, expect } from '@playwright/test'

test('clicking a post link navigates to a /posts/ URL', async ({ page }) => {
  await page.goto('/')
  const postLink = page.locator('ul li a[href^="/posts/"]').first()
  await postLink.click()
  await expect(page).toHaveURL(/\/posts\//)
})

test('navigating to a post renders content', async ({ page }) => {
  await page.goto('/posts/javascript-for-leetcode')
  await expect(page.locator('article, main, .prose, h1').first()).toBeVisible()
})
