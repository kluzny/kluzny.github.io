import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // count sounds started, since headless Chromium can't be listened to
  await page.addInitScript(() => {
    const w = window as unknown as { __sounds: number }
    w.__sounds = 0
    const start = AudioBufferSourceNode.prototype.start
    AudioBufferSourceNode.prototype.start = function (...args) {
      w.__sounds++
      return start.apply(this, args)
    }
  })
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

test('the on-screen Tab button advances the prompt, centred below the board', async ({ page }) => {
  await expect(page.getByTestId('tab-button')).toHaveCount(0)
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)

  const button = page.getByTestId('tab-button')
  for (let i = 0; i < 3; i++) {
    await button.click()
  }
  await expect(page.getByTestId('tabs')).toHaveText('3')
  await expect(page.getByTestId('autocomplete')).toContainText('no cap, this')

  const box = async (id: string) => (await page.getByTestId(id).boundingBox())!
  const [key, board] = [await box('tab-button'), await box('autocomplete')]
  expect(key.y).toBeGreaterThan(board.y + board.height)
  expect(Math.abs(key.x + key.width / 2 - (board.x + board.width / 2))).toBeLessThan(2)

  await page.clock.runFor(15000)
  await expect(page.getByTestId('tab-button')).toHaveCount(0)
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
  const scores = page.getByTestId('high-scores')
  await expect(scores.getByRole('columnheader')).toHaveText(['#', 'TPS', 'USD', 'Tabs', 'When'])
  const row = scores.getByRole('row').nth(1)
  await expect(row.getByRole('cell').nth(1)).toHaveText('2.00')
  await expect(row.getByRole('cell').nth(2)).toHaveText('$1.50')
  await expect(row.getByRole('cell').nth(1)).toHaveCSS('text-align', 'right')
  await expect(row.getByRole('cell').nth(2)).toHaveCSS('text-align', 'right')
  await expect(scores.locator('table')).toHaveCSS('border-top-width', '0px')

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

test('the cursor flares with recent tab rate and cools when you stop', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  const cursor = page.getByTestId('cursor')
  await expect(cursor).toHaveAttribute('data-glow', '0')

  await page.keyboard.press('Tab')
  await expect(cursor).toHaveAttribute('data-glow', '0.17')
  await expect(page.getByTestId('autocomplete')).not.toHaveClass(/shake/)
  await expect(page.getByTestId('speed-line')).toHaveCount(0)

  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab')
  }
  await expect(cursor).toHaveAttribute('data-glow', '1')
  await expect(cursor).toHaveCSS('box-shadow', /rgb/)
  await expect(page.getByTestId('autocomplete')).toHaveClass(/shake/)
  await expect(page.getByTestId('hud')).toHaveClass(/shake/)
  await expect(page.getByTestId('speed-line')).toHaveCount(4)

  await page.clock.runFor(1500)
  await expect(cursor).toHaveAttribute('data-glow', '0')
  await expect(page.getByTestId('autocomplete')).not.toHaveClass(/shake/)
  await expect(page.getByTestId('speed-line')).toHaveCount(0)
})

test('speed lines trail behind (left of) the cursor', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
  }
  const cursor = (await page.getByTestId('cursor').boundingBox())!
  const lines = page.getByTestId('speed-line')
  await expect(lines).toHaveCount(4)
  for (const line of await lines.all()) {
    const box = (await line.boundingBox())!
    expect(box.x + box.width).toBeLessThanOrEqual(cursor.x + 1)
  }
})

test('the shake carries on after the round ends, then settles', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  await page.clock.runFor(14500)
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
  }
  await page.clock.runFor(500)
  await expect(page.getByTestId('results')).toBeVisible()
  await expect(page.getByTestId('autocomplete')).toHaveClass(/shake/)

  await page.clock.runFor(1500)
  await expect(page.getByTestId('autocomplete')).toHaveClass(/shake/)

  await page.clock.runFor(2500)
  await expect(page.getByTestId('autocomplete')).not.toHaveClass(/shake/)
  await expect(page.getByTestId('hud')).not.toHaveClass(/shake/)
})

test('speed effects start at 1.5 tps', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)

  await page.keyboard.press('Tab')
  await expect(page.getByTestId('speed-line')).toHaveCount(0)
  await expect(page.getByTestId('autocomplete')).not.toHaveClass(/shake/)

  await page.keyboard.press('Tab')
  await expect(page.getByTestId('speed-line')).toHaveCount(2)
  await expect(page.getByTestId('autocomplete')).toHaveClass(/shake/)
})

test('the USD counter grows with every tab', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  await expect(page.getByTestId('usd')).toHaveText('$0.00')

  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
  }
  await expect(page.getByTestId('usd')).toHaveText('$0.16')
})

test('each tab during play makes the ka-ching, and nothing else does', async ({ page }) => {
  const sounds = () => page.evaluate(() => (window as unknown as { __sounds: number }).__sounds)

  await page.getByRole('button', { name: /Begin/ }).click()
  await expect(page.getByTestId('game')).toHaveAttribute('data-sound', 'ready')
  await page.keyboard.press('Tab')
  expect(await sounds()).toBe(0)

  await page.clock.runFor(5000)
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Tab')
  }
  expect(await sounds()).toBe(3)

  await page.clock.runFor(15000)
  await expect(page.getByTestId('results')).toBeVisible()
  await page.keyboard.press('Tab')
  expect(await sounds()).toBe(3)
})

test('the leaderboard is centred in the bottom area', async ({ page }) => {
  await page.getByRole('button', { name: /Begin/ }).click()
  await page.clock.runFor(5000)
  await page.keyboard.press('Tab')
  await page.clock.runFor(15000)
  await expect(page.getByTestId('results')).toBeVisible()

  const scores = page.getByTestId('high-scores')
  await expect(scores).toHaveCSS('display', 'flex')
  const centre = async (locator: ReturnType<typeof page.locator>) => {
    const box = (await locator.boundingBox())!
    return box.x + box.width / 2
  }
  const area = await centre(page.getByTestId('game'))
  expect(Math.abs((await centre(scores.locator('table'))) - area)).toBeLessThan(2)
  expect(Math.abs((await centre(scores.locator('h2'))) - area)).toBeLessThan(2)
})
