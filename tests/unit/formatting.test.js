import { describe, it, expect } from 'vitest'
import { simpleDate } from '../../helpers/formatting.js'

describe('simpleDate', () => {
  it('formats a date as yyyy-MM-dd', () => {
    expect(simpleDate(new Date(2025, 0, 15))).toBe('2025-01-15')
  })

  it('formats the epoch boundary date', () => {
    expect(simpleDate(new Date(1970, 0, 1))).toBe('1970-01-01')
  })

  it('zero-pads single-digit months and days', () => {
    expect(simpleDate(new Date(2024, 2, 5))).toBe('2024-03-05')
  })
})
