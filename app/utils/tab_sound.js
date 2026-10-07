export const TAB_SOUND_VOLUME = 0.375
const FADE_SECONDS = 0.02

// Web Audio rather than <audio>: the file is decoded once, so every Tab starts with no latency,
// and a voice can be faded out cleanly instead of clicking when it is cut off.
export function createTabSound(
  url,
  {
    volume = TAB_SOUND_VOLUME,
    AudioContextClass = globalThis.AudioContext ?? globalThis.webkitAudioContext,
  } = {}
) {
  let context = null
  let buffer = null
  let voice = null

  async function load() {
    if (buffer) {
      return
    }
    context ??= new AudioContextClass()
    if (context.state === 'suspended') {
      await context.resume()
    }
    const response = await fetch(url)
    buffer = await context.decodeAudioData(await response.arrayBuffer())
  }

  // restart-on-press: fade out whatever is still ringing so a long tail never piles up
  function cut() {
    if (!voice) {
      return
    }
    const { source, gain } = voice
    const now = context.currentTime
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(gain.gain.value, now)
    gain.gain.linearRampToValueAtTime(0, now + FADE_SECONDS)
    source.stop(now + FADE_SECONDS)
    voice = null
  }

  function play() {
    if (!buffer) {
      return
    }
    cut()
    const source = context.createBufferSource()
    source.buffer = buffer
    const gain = context.createGain()
    gain.gain.value = volume
    source.connect(gain)
    gain.connect(context.destination)
    source.start()
    voice = { source, gain }
  }

  function dispose() {
    cut()
    context?.close()
    context = null
    buffer = null
  }

  return { load, play, dispose }
}
