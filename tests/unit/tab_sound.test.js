import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTabSound, TAB_SOUND_VOLUME } from '../../app/utils/tab_sound.js'

function makeFakeContext(initialState = 'running') {
  const sources = []
  const gains = []
  const contexts = []
  class FakeAudioContext {
    state = initialState
    currentTime = 10
    destination = {}
    closed = false
    constructor() {
      contexts.push(this)
    }
    resume = vi.fn(async () => {})
    close = vi.fn(async () => {
      this.closed = true
    })
    decodeAudioData = vi.fn(async () => ({ duration: 3 }))
    createBufferSource() {
      const source = { buffer: null, connect: vi.fn(), start: vi.fn(), stop: vi.fn() }
      sources.push(source)
      return source
    }
    createGain() {
      const gain = {
        gain: {
          value: 1,
          cancelScheduledValues: vi.fn(),
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
      }
      gains.push(gain)
      return gain
    }
  }
  return { FakeAudioContext, sources, gains, contexts }
}

describe('createTabSound', () => {
  let fake
  beforeEach(() => {
    fake = makeFakeContext()
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ arrayBuffer: async () => new ArrayBuffer(8) }))
    )
  })

  const make = (options = {}) =>
    createTabSound('/audio/ka-ching.mp3', { AudioContextClass: fake.FakeAudioContext, ...options })

  it('plays nothing until it has been loaded', () => {
    make().play()
    expect(fake.sources).toHaveLength(0)
  })

  it('fetches and decodes the file once, however many times load is called', async () => {
    const sound = make()
    await sound.load()
    await sound.load()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('/audio/ka-ching.mp3')
  })

  it('plays at 37.5% volume by default (half, then another 25% off)', async () => {
    expect(TAB_SOUND_VOLUME).toBe(0.375)
    const sound = make()
    await sound.load()
    sound.play()
    expect(fake.sources).toHaveLength(1)
    expect(fake.sources[0].start).toHaveBeenCalledTimes(1)
    expect(fake.gains[0].gain.value).toBe(0.375)
  })

  it('respects a custom volume', async () => {
    const sound = make({ volume: 0.2 })
    await sound.load()
    sound.play()
    expect(fake.gains[0].gain.value).toBe(0.2)
  })

  it('cuts the previous voice with a short fade when played again', async () => {
    const sound = make()
    await sound.load()
    sound.play()
    sound.play()
    expect(fake.sources).toHaveLength(2)
    const [first, second] = fake.sources
    expect(first.stop).toHaveBeenCalledTimes(1)
    expect(first.stop.mock.calls[0][0]).toBeGreaterThan(10)
    expect(first.stop.mock.calls[0][0]).toBeLessThan(10.1)
    expect(fake.gains[0].gain.linearRampToValueAtTime).toHaveBeenCalledWith(0, expect.any(Number))
    expect(second.stop).not.toHaveBeenCalled()
  })

  it('resumes a suspended context so the browser lets it play', async () => {
    const suspended = makeFakeContext('suspended')
    const sound = make({ AudioContextClass: suspended.FakeAudioContext })
    await sound.load()
    sound.play()
    expect(suspended.sources).toHaveLength(1)
    expect(suspended.contexts[0].resume).toHaveBeenCalledTimes(1)
  })

  it('does nothing after dispose', async () => {
    const sound = make()
    await sound.load()
    sound.play()
    sound.dispose()
    sound.play()
    expect(fake.sources).toHaveLength(1)
  })
})
