import { describe, it, expect } from 'vitest'
import {
  PHRASES,
  MAX_HIGH_SCORES,
  calcTps,
  revealText,
  addHighScore,
  verdictFor,
  shuffle,
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
    expect(addHighScore([], 3, 45, now)).toEqual([{ tps: 3, tabs: 45, date: '2026-10-06' }])
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
      '2026-10-06',
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
