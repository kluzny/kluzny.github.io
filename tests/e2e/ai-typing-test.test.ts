import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Math.random just under 1 makes the shuffle the identity, so the first phrase is pinned
  await page.addInitScript(() => {
    Math.random = () => 0.999999
  })
  await page.clock.install({ time: 0 })
  await page.goto('/posts/ai-typing-test')
  // freeze time so only runFor advances it, keeping TPS deterministic
  await page.clock.pauseAt(1000)
})

test('begins with a 5s countdown, then a 15s round', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await expect(page.getByTestId('countdown')).toContainText('5')

  await page.clock.runFor(5000)
  await expect(page.getByTestId('hud')).toBeVisible()
  await expect(page.getByTestId('countdown')).toHaveCount(0)

  await page.clock.runFor(15000)
  await expect(page.getByTestId('results')).toBeVisible()
})

test('tab autocompletes text and updates TPS', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)

  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
  }
  await page.clock.runFor(3000)

  await expect(page.getByTestId('tabs')).toHaveText('6')
  await expect(page.getByTestId('tps')).toHaveText('2.00')
  await expect(page.getByTestId('autocomplete')).toContainText('no cap, this load-bearing')
})

test('tab does nothing before the round starts', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.keyboard.press('Tab')
  await page.clock.runFor(5000)
  await expect(page.getByTestId('tabs')).toHaveText('0')
})

test('high scores persist in localStorage across reloads', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab')
  }
  await page.clock.runFor(15000)
  await expect(page.getByTestId('results')).toContainText('NEW HIGH SCORE')

  await page.reload()
  await expect(page.getByTestId('high-scores')).toContainText('2.00 TPS')

  await page.getByRole('button', { name: 'Clear scores' }).click()
  await expect(page.getByTestId('high-scores')).toContainText('No scores yet')
})

test('the leaderboard does not shift when a round starts or ends', async ({ page }) => {
  const top = async () => (await page.getByTestId('high-scores').boundingBox())!.y
  const idle = await top()

  await page.getByRole('button', { name: /Begin/ }).click()
  expect(await top()).toBe(idle)

  await page.clock.runFor(5000)
  await expect(page.getByTestId('hud')).toBeVisible()
  expect(await top()).toBe(idle)

  await page.clock.runFor(15000)
  await expect(page.getByTestId('results')).toBeVisible()
  expect(await top()).toBe(idle)
})

test('tab is swallowed for 1s after the round, then focus works again', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  await page.clock.runFor(15000)
  await expect(page.getByTestId('results')).toBeVisible()
  const focused = () => page.evaluate(() => document.activeElement?.tagName)

  await page.keyboard.press('Tab')
  await page.clock.runFor(500)
  await page.keyboard.press('Tab')
  expect(await focused()).toBe('BODY')

  await page.clock.runFor(600)
  await page.keyboard.press('Tab')
  expect(await focused()).not.toBe('BODY')
})
