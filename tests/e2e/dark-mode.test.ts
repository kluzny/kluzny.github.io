import { test, expect } from '@playwright/test'

test.describe('color mode', () => {
  test.describe('with a dark system preference', () => {
    test.use({ colorScheme: 'dark' })

    test('applies the dark class and a dark background', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('html')).toHaveClass(/(^|\s)dark(\s|$)/)
      await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(0, 0, 0)')
    })
  })

  test.describe('with a light system preference', () => {
    test.use({ colorScheme: 'light' })

    test('applies the light class and a light background', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('html')).toHaveClass(/(^|\s)light(\s|$)/)
      await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    })
  })
})
