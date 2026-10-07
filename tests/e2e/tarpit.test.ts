import { test, expect } from '@playwright/test'

// Next/Previous links come from uuid v5 hashes of the id, and the page text from a seeded RNG.
// Pinned so dependency upgrades (uuid, seedrandom, random-words) can't silently change the pits.
const pits = [
  {
    id: 'abc',
    title: 'Power Rubbed Pleasure Has Everybody',
    next: '/tarpit/cfe74c19-878b-5dcd-95e4-90984800b8b4',
    prev: '/tarpit/6eea33d6-485a-55cd-9837-010a8e40b34f',
    headings: [
      'Cannot Closer Does Gently Muscle Drew Thirty Brought Shall',
      'Other Stock Writing Sun Can Community Automobile Throat Club Electricity Earth',
      'Instant Voyage If Pet Realize',
    ],
  },
  {
    id: 'hello-world',
    title: 'Free Ring Loud Wood Sets',
    next: '/tarpit/13e8fd26-2ae2-59ac-b9f2-5cfd2069f014',
    prev: '/tarpit/7cfcda21-75df-55ee-b7cf-9a93aa18fd09',
    headings: [
      'Discussion Adult Disease Shadow Pie Uncle Beat',
      'Thy Particularly Lovely Upward Involved Graph',
      'Women Same Daughter Unit Practice Angry Sit Affect Burst Circle Concerned',
    ],
  },
  {
    id: '12345',
    title: 'Production Mainly Then',
    next: '/tarpit/606ba634-a99e-5313-87e2-0bc48b58833a',
    prev: '/tarpit/2efc0da3-0ba6-5f44-89b4-c86059a53cd8',
    headings: ['Folks Quickly Flies Lovely Triangle Off Spell Measure Kind'],
  },
  {
    id: 'a-b_c d',
    title: 'Myself Note Growth Dot',
    next: '/tarpit/803cd0aa-7530-5ee5-8a65-5e8337dfd5a8',
    prev: '/tarpit/14f54511-b716-55c9-8582-089a069d7cf2',
    headings: [
      'Success Yourself Finger Short Cat Three Office Rice',
      'However Kind Electric When Traffic Basis Combine Particular Sink Port Forest Hat',
    ],
  },
]

for (const pit of pits) {
  test(`tarpit "${pit.id}" is stable`, async ({ page }) => {
    await page.goto(`/tarpit/${encodeURIComponent(pit.id)}`)
    await expect(page.locator('h1')).toHaveText(pit.title)
    await expect(page.getByRole('link', { name: 'Next Pit' })).toHaveAttribute('href', pit.next)
    await expect(page.getByRole('link', { name: /Previous Pit/ })).toHaveAttribute('href', pit.prev)
    await expect(page.locator('h2.post-heading')).toHaveText(pit.headings)
  })
}

test('tarpit next link is a stable function of the id', async ({ page }) => {
  await page.goto('/tarpit/abc')
  const first = await page.getByRole('link', { name: 'Next Pit' }).getAttribute('href')
  await page.goto('/tarpit/abc')
  await expect(page.getByRole('link', { name: 'Next Pit' })).toHaveAttribute('href', first!)
})
