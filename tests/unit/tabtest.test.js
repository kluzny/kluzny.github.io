import { describe, it, expect } from 'vitest'
import {
  PHRASES,
  MAX_HIGH_SCORES,
  calcTps,
  revealText,
  addHighScore,
  verdictFor,
  shuffle,
  recentRate,
  glowLevel,
  glowShadow,
  shakeAmplitude,
  speedLineCount,
  settleFactor,
  SETTLE_MS,
  calcUsd,
} from '../../app/utils/tabtest.js'

describe('calcTps', () => {
  it('divides tabs by seconds', () => {
    expect(calcTps(30, 15)).toBe(2)
  })

  it('rounds to two decimals', () => {
    expect(calcTps(10, 3)).toBe(3.33)
  })

  it('returns 0 when no time has elapsed', () => {
    expect(calcTps(5, 0)).toBe(0)
  })
})

describe('revealText', () => {
  const phrases = ['a b c', 'd e']

  it('reveals nothing at zero tabs', () => {
    expect(revealText(phrases, 0)).toEqual({ done: [], next: 'a' })
  })

  it('reveals one word per tab', () => {
    expect(revealText(phrases, 2)).toEqual({ done: ['a', 'b'], next: 'c' })
  })

  it('flows into the next phrase', () => {
    expect(revealText(phrases, 4)).toEqual({ done: ['a', 'b', 'c', 'd'], next: 'e' })
  })

  it('cycles back to the first phrase after the last', () => {
    expect(revealText(phrases, 5).next).toBe('a')
  })

  it('keeps only words from the current lap', () => {
    expect(revealText(phrases, 7)).toEqual({ done: ['a', 'b'], next: 'c' })
  })

  it('ships a big pool of agentic slang', () => {
    expect(PHRASES.length).toBeGreaterThanOrEqual(30)
    expect(new Set(PHRASES).size).toBe(PHRASES.length)
    expect(PHRASES.join(' ')).toMatch(/load-bearing/)
    expect(PHRASES.join(' ')).toMatch(/emergent/)
  })

  it('gets technical with the slop', () => {
    const pool = PHRASES.join(' ').toLowerCase()
    for (const term of ['kv cache', 'attention', 'quantiz', 'rlhf', 'logit', 'speculative']) {
      expect(pool).toContain(term)
    }
  })
})

describe('shuffle', () => {
  const items = ['a', 'b', 'c', 'd', 'e']

  it('keeps every item exactly once', () => {
    expect([...shuffle(items)].sort()).toEqual(items)
  })

  it('does not mutate the input', () => {
    shuffle(items, () => 0)
    expect(items).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('is the identity when the rng always returns just under 1', () => {
    expect(shuffle(items, () => 0.999999)).toEqual(items)
  })

  it('reorders when the rng says so', () => {
    expect(shuffle(items, () => 0)).not.toEqual(items)
  })
})

describe('addHighScore', () => {
  const now = new Date('2026-10-06T12:00:00Z')

  it('adds a score to an empty list', () => {
    expect(addHighScore([], 3, 45, now)).toEqual([
      { tps: 3, tabs: 45, usd: calcUsd(45), date: '2026-10-06T12:00:00.000Z' },
    ])
  })

  it('records what the round cost in USD', () => {
    expect(addHighScore([], 6, 90, now)[0].usd).toBe(calcUsd(90))
  })

  it('sorts descending by tps', () => {
    const scores = [{ tps: 2, tabs: 30, date: '2026-10-01' }]
    expect(addHighScore(scores, 5, 75, now).map((s) => s.tps)).toEqual([5, 2])
  })

  it('caps the list at the max', () => {
    const scores = Array.from({ length: MAX_HIGH_SCORES }, (_, i) => ({
      tps: 10 + i,
      tabs: 150,
      date: '2026-10-01',
    }))
    expect(addHighScore(scores, 1, 15, now)).toHaveLength(MAX_HIGH_SCORES)
    expect(addHighScore(scores, 1, 15, now).some((s) => s.tps === 1)).toBe(false)
  })

  it('keeps the earlier score first on ties', () => {
    const scores = [{ tps: 4, tabs: 60, date: '2026-10-01' }]
    expect(addHighScore(scores, 4, 60, now).map((s) => s.date)).toEqual([
      '2026-10-01',
      '2026-10-06T12:00:00.000Z',
    ])
  })

  it('does not mutate the input', () => {
    const scores = [{ tps: 2, tabs: 30, date: '2026-10-01' }]
    addHighScore(scores, 5, 75, now)
    expect(scores).toHaveLength(1)
  })
})

describe('verdictFor', () => {
  it('roasts zero tabs', () => {
    expect(verdictFor(0)).toMatch(/skill issue/i)
  })

  it('praises fast tabbers more than slow ones', () => {
    expect(verdictFor(9)).not.toBe(verdictFor(1))
  })
})

describe('recentRate', () => {
  it('counts only tabs inside the window', () => {
    expect(recentRate([0.1, 1.2, 1.5, 1.9], 2, 1)).toBe(3)
  })

  it('is zero when nothing was tabbed recently', () => {
    expect(recentRate([0.1], 5, 1)).toBe(0)
  })

  it('scales to tabs per second for other window sizes', () => {
    expect(recentRate([1, 1.5], 2, 2)).toBe(1)
  })
})

describe('glowLevel', () => {
  it('is zero at rest', () => {
    expect(glowLevel(0)).toBe(0)
  })

  it('is mild at a casual 1.0 tps', () => {
    expect(glowLevel(1)).toBeGreaterThan(0)
    expect(glowLevel(1)).toBeLessThan(0.25)
  })

  it('maxes out at an absolute mash of 6 tps and above', () => {
    expect(glowLevel(6)).toBe(1)
    expect(glowLevel(12)).toBe(1)
  })
})

describe('glowShadow', () => {
  const blurs = (shadow) => [...shadow.matchAll(/0 0 ([\d.]+)px/g)].map((m) => Number(m[1]))

  it('is none at level zero', () => {
    expect(glowShadow(0)).toBe('none')
  })

  it('stacks three layers: core, middle, outer', () => {
    expect(blurs(glowShadow(0.5))).toHaveLength(3)
  })

  it('grows every layer as the level rises', () => {
    const low = blurs(glowShadow(0.2))
    const high = blurs(glowShadow(1))
    high.forEach((blur, i) => expect(blur).toBeGreaterThan(low[i]))
  })

  it('gets hotter in colour as the level rises', () => {
    expect(glowShadow(0.2)).not.toBe(glowShadow(1))
    expect(glowShadow(1)).toMatch(/hsl\(/)
  })
})

describe('shakeAmplitude', () => {
  it('stays still below 1.5 tps', () => {
    expect(shakeAmplitude(0)).toBe(0)
    expect(shakeAmplitude(glowLevel(1.4))).toBe(0)
  })

  it('starts shaking at 1.5 tps and gets violent at the top', () => {
    expect(shakeAmplitude(glowLevel(1.5))).toBeGreaterThan(0)
    expect(shakeAmplitude(1)).toBeGreaterThan(shakeAmplitude(glowLevel(1.5)))
    expect(shakeAmplitude(1)).toBeLessThanOrEqual(8)
  })
})

describe('speedLineCount', () => {
  it('has no lines below 1.5 tps', () => {
    expect(speedLineCount(glowLevel(1))).toBe(0)
    expect(speedLineCount(glowLevel(1.4))).toBe(0)
  })

  it('starts at 1.5 tps and adds more lines as the level rises, up to four', () => {
    expect(speedLineCount(glowLevel(1.5))).toBe(2)
    expect(speedLineCount(0.4)).toBe(2)
    expect(speedLineCount(0.7)).toBe(3)
    expect(speedLineCount(1)).toBe(4)
  })
})

describe('settleFactor', () => {
  it('starts at full intensity the moment the round ends', () => {
    expect(settleFactor(0)).toBe(1)
  })

  it('eases down monotonically', () => {
    const samples = [0, 0.25, 0.5, 0.75].map((f) => settleFactor(f * SETTLE_MS))
    samples.forEach((value, i) => i && expect(value).toBeLessThan(samples[i - 1]))
    expect(settleFactor(SETTLE_MS / 2)).toBeGreaterThan(0)
  })

  it('is fully settled after the settle time, and for any time beyond it', () => {
    expect(settleFactor(SETTLE_MS)).toBe(0)
    expect(settleFactor(SETTLE_MS * 10)).toBe(0)
  })

  it('lasts a few seconds', () => {
    expect(SETTLE_MS).toBeGreaterThanOrEqual(2000)
    expect(SETTLE_MS).toBeLessThanOrEqual(5000)
  })
})

describe('calcUsd', () => {
  it('costs nothing before the first tab', () => {
    expect(calcUsd(0)).toBe(0)
  })

  it('gets pricier every single tab', () => {
    for (let n = 1; n <= 100; n++) {
      expect(calcUsd(n)).toBeGreaterThan(calcUsd(n - 1))
    }
  })

  it('compounds as the context window fills up', () => {
    expect(calcUsd(100)).toBe(12)
    expect(calcUsd(200) / calcUsd(100)).toBeGreaterThan(2)
  })

  it('rounds to cents', () => {
    expect(calcUsd(6)).toBe(0.16)
  })
})
