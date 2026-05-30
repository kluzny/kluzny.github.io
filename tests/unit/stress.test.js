import { describe, it, expect } from 'vitest'
import { calcSpawn, updateHighScore } from '../../helpers/stress.js'

describe('calcSpawn', () => {
  it('returns 1 when spawnedCount is 1 (log10=0)', () => {
    expect(calcSpawn(1)).toBe(1)
  })

  it('returns 11 when spawnedCount is 10 (log10=1)', () => {
    expect(calcSpawn(10)).toBe(11)
  })

  it('returns 21 when spawnedCount is 100 (log10=2)', () => {
    expect(calcSpawn(100)).toBe(21)
  })

  it('returns 31 when spawnedCount is 1000 (log10=3)', () => {
    expect(calcSpawn(1000)).toBe(31)
  })
})

describe('updateHighScore', () => {
  it('returns the new score when it beats the current high score', () => {
    expect(updateHighScore(50, 30)).toBe(50)
  })

  it('returns the existing high score when new score is lower', () => {
    expect(updateHighScore(10, 30)).toBe(30)
  })

  it('returns the existing high score when scores are equal', () => {
    expect(updateHighScore(30, 30)).toBe(30)
  })
})
