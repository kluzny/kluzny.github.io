<script setup>
import {
  COUNTDOWN_SECONDS,
  ROUND_SECONDS,
  COOLDOWN_MS,
  HIGH_SCORES_KEY,
  PHRASES,
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
  calcUsd,
} from '../../utils/tabtest.js'
import { createTabSound } from '../../utils/tab_sound.js'

function loadScores() {
  try {
    const scores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY))
    return Array.isArray(scores) ? scores : []
  } catch {
    return []
  }
}

const phase = ref('idle') // idle | countdown | playing | done
const countdown = ref(COUNTDOWN_SECONDS)
const tabs = ref(0)
const elapsed = ref(0)
const highScores = ref(loadScores())
const isNewHighScore = ref(false)

const tps = computed(() => calcTps(tabs.value, elapsed.value))
const timeLeft = computed(() => Math.max(0, ROUND_SECONDS - elapsed.value).toFixed(1))
const phrases = ref(PHRASES)
const text = computed(() => revealText(phrases.value, tabs.value))
const verdict = computed(() => verdictFor(tps.value))

// intensity follows the tab rate over the last second, so it flares and cools in real time
const tabTimes = ref([])
const level = computed(() => glowLevel(recentRate(tabTimes.value, elapsed.value)))
const glow = computed(() => glowShadow(level.value))
// the shake keeps going for a few seconds after the round, easing down to nothing
const settle = ref(1)
const shakePx = computed(() => Math.round(shakeAmplitude(level.value) * settle.value * 10) / 10)
const isShaking = computed(() => shakePx.value >= 0.3)
const speedLines = computed(() => speedLineCount(level.value))
const usd = computed(() => calcUsd(tabs.value))
const shakeStyle = computed(() => ({
  '--shake-px': `${shakePx.value}px`,
  '--shake-duration': `${(0.2 - level.value * 0.1).toFixed(2)}s`,
}))

const sound = createTabSound('/audio/ka-ching.mp3')
const isSoundReady = ref(false)

let timer = null
let cooldownTimer = null
let settleTimer = null
const isCoolingDown = ref(false)

function stopTimer() {
  clearInterval(timer)
  timer = null
}

function begin() {
  // Begin is a click, so the browser lets the audio context start here
  sound
    .load()
    .then(() => (isSoundReady.value = true))
    .catch(() => {}) // the game works fine without sound
  stopTimer()
  clearTimeout(cooldownTimer)
  clearInterval(settleTimer)
  settle.value = 1
  isCoolingDown.value = false
  phrases.value = shuffle(PHRASES)
  tabs.value = 0
  tabTimes.value = []
  elapsed.value = 0
  isNewHighScore.value = false
  countdown.value = COUNTDOWN_SECONDS
  phase.value = 'countdown'

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      startRound()
    }
  }, 1000)
}

function startRound() {
  stopTimer()
  phase.value = 'playing'
  const startedAt = performance.now()

  timer = setInterval(() => {
    elapsed.value = Math.min(ROUND_SECONDS, (performance.now() - startedAt) / 1000)
    if (elapsed.value >= ROUND_SECONDS) {
      finishRound()
    }
  }, 50)
}

function finishRound() {
  stopTimer()
  phase.value = 'done'
  elapsed.value = ROUND_SECONDS

  const endedAt = performance.now()
  settleTimer = setInterval(() => {
    settle.value = settleFactor(performance.now() - endedAt)
    if (settle.value === 0) {
      clearInterval(settleTimer)
    }
  }, 50)

  // keep swallowing Tab so the final smashes don't tab focus around the page
  isCoolingDown.value = true
  cooldownTimer = setTimeout(() => (isCoolingDown.value = false), COOLDOWN_MS)

  const best = highScores.value[0]?.tps ?? 0
  isNewHighScore.value = tabs.value > 0 && tps.value > best
  if (tabs.value > 0) {
    highScores.value = addHighScore(highScores.value, tps.value, tabs.value)
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores.value))
  }
}

function clearScores() {
  highScores.value = []
  localStorage.removeItem(HIGH_SCORES_KEY)
}

function registerTab() {
  tabs.value++
  tabTimes.value.push(elapsed.value)
  sound.play()
}

function onKeydown(event) {
  const isPlaying = phase.value === 'playing'
  if (event.key !== 'Tab' || !(isPlaying || isCoolingDown.value)) {
    return
  }
  event.preventDefault()
  if (isPlaying && !event.repeat) {
    registerTab()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  stopTimer()
  clearTimeout(cooldownTimer)
  clearInterval(settleTimer)
  sound.dispose()
})
</script>

<template>
  <div>
    <Post content="/ai-typing-test" />

    <section class="space-y-4" :data-sound="isSoundReady ? 'ready' : 'loading'" data-testid="game">
      <p class="text-sm text-stone-600 dark:text-stone-400">
        TPS stands for <strong>Tabs Per Second</strong>, not Tokens Per Second, bestie.
      </p>

      <!-- tall enough for the results phase so starting a round doesn't shift the page -->
      <div class="flex flex-col space-y-4 min-h-100" data-testid="stage">
        <div v-if="phase === 'idle'" class="text-center space-y-2 my-auto">
          <p>
            No typing. No thinking. The agent is <em>agentic</em>, the vibes are
            <em>load-bearing</em>, and your only job is to mash <kbd>Tab</kbd> for
            {{ ROUND_SECONDS }} seconds while the swarm cooks.
          </p>
          <button class="button text-xl px-6 py-2" @click="begin">Begin (let him cook)</button>
        </div>

        <h2
          v-else-if="phase === 'countdown'"
          class="pulse text-2xl font-bold text-center text-red-500 my-auto"
          data-testid="countdown"
        >
          Lock in. Agent spins up in <code>{{ countdown }}</code
          >...
        </h2>

        <template v-else>
          <div
            class="flex justify-around text-center border rounded-sm py-2 border-stone-700 dark:border-lime-500"
            :class="{ shake: isShaking }"
            :style="shakeStyle"
            data-testid="hud"
          >
            <p>
              <span class="block text-xs uppercase">Time</span>
              <span class="text-2xl font-bold">{{ timeLeft }}s</span>
            </p>
            <p>
              <span class="block text-xs uppercase">Tabs</span>
              <span class="text-2xl font-bold" data-testid="tabs">{{ tabs }}</span>
            </p>
            <p>
              <span class="block text-xs uppercase">TPS</span>
              <span class="text-2xl font-bold text-lime-700 dark:text-yellow-300" data-testid="tps">
                {{ tps.toFixed(2) }}
              </span>
            </p>
            <p>
              <span class="block text-xs uppercase">USD</span>
              <span class="text-2xl font-bold text-red-500" data-testid="usd">
                ${{ usd.toFixed(2) }}
              </span>
            </p>
          </div>

          <p
            class="text-xl leading-relaxed min-h-32 p-4 border rounded-sm font-mono border-stone-700 dark:border-lime-500"
            :class="{ shake: isShaking }"
            :style="shakeStyle"
            data-testid="autocomplete"
          >
            <span
              v-for="(word, i) in text.done"
              :key="`${tabs}-${i}`"
              :class="{ 'tab-pop': i === text.done.length - 1 }"
              >{{ `${word} ` }}</span
            >
            <span v-if="phase === 'playing'" class="text-stone-400 dark:text-stone-600">{{
              text.next
            }}</span>
            <span v-if="phase === 'playing'" class="tab-cursor-wrap">
              <span
                class="tab-cursor"
                :class="{ blink: level === 0 }"
                :style="{ boxShadow: glow }"
                :data-glow="level"
                aria-hidden="true"
                data-testid="cursor"
              />
              <i
                v-for="n in speedLines"
                :key="n"
                class="speed-line"
                :style="{
                  top: `${((n - 0.5) / speedLines) * 100}%`,
                  animationDelay: `${n * -0.07}s`,
                  '--speed-distance': `${20 + level * 40}px`,
                }"
                data-testid="speed-line"
              />
            </span>
          </p>

          <p v-if="phase === 'playing'" class="text-center font-bold pulse">
            HIT <kbd>TAB</kbd> HIT <kbd>TAB</kbd> HIT <kbd>TAB</kbd>
          </p>

          <button
            v-if="phase === 'playing'"
            type="button"
            class="tab-key mx-auto"
            aria-label="Tab"
            data-testid="tab-button"
            @click="registerTab"
          >
            <span aria-hidden="true">⇤</span>
            <span class="tab-key-label">Tab</span>
            <span aria-hidden="true">⇥</span>
          </button>
        </template>

        <div v-if="phase === 'done'" class="text-center space-y-2" data-testid="results">
          <h2 class="text-2xl font-bold">
            {{ tps.toFixed(2) }} TPS ({{ tabs }} tabs in {{ ROUND_SECONDS }}s)
          </h2>
          <p v-if="isNewHighScore" class="pulse text-lime-700 dark:text-yellow-300 font-bold">
            NEW HIGH SCORE. W. Absolute W.
          </p>
          <p>{{ verdict }}</p>
          <button class="button text-xl px-6 py-2" @click="begin">Run it back</button>
        </div>
      </div>

      <div class="flex flex-col items-center" data-testid="high-scores">
        <h2 class="text-2xl font-bold">Leaderboard (local, no cap)</h2>
        <table v-if="highScores.length" class="my-2 text-left">
          <thead class="text-xs uppercase text-stone-600 dark:text-stone-400">
            <tr>
              <th class="pr-4 font-normal">#</th>
              <th class="px-4 text-right font-normal">TPS</th>
              <th class="px-4 text-right font-normal">USD</th>
              <th class="px-4 font-normal">Tabs</th>
              <th class="pl-4 font-normal">When</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, i) in highScores" :key="i">
              <td class="pr-4">{{ i + 1 }}</td>
              <td class="px-4 text-right font-bold tabular-nums">{{ score.tps.toFixed(2) }}</td>
              <td class="px-4 text-right tabular-nums text-red-500">
                ${{ (score.usd ?? calcUsd(score.tabs)).toFixed(2) }}
              </td>
              <td class="px-4 tabular-nums">{{ score.tabs }}</td>
              <td class="pl-4 text-sm text-stone-600 dark:text-stone-400">{{ score.date }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No scores yet. The leaderboard is cooked, empty, ngmi. Be the first.</p>
        <button v-if="highScores.length" class="button text-sm mt-2" @click="clearScores">
          Clear scores
        </button>
      </div>
    </section>
  </div>
</template>

<style>
.tab-key {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 10rem;
  padding: 1rem 1.25rem;
  font-family: ui-monospace, monospace;
  font-size: 1.5rem;
  line-height: 1;
  border: 2px solid currentColor;
  border-radius: 0.5rem;
  background: rgba(128, 128, 128, 0.15);
  /* inset bevel plus a hard bottom edge makes it read as a raised keycap */
  box-shadow:
    inset 0 0 0 3px rgba(128, 128, 128, 0.35),
    inset 0 -4px 0 rgba(0, 0, 0, 0.25),
    0 4px 0 currentColor;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.tab-key:active {
  transform: translateY(4px);
  box-shadow:
    inset 0 0 0 3px rgba(128, 128, 128, 0.35),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25),
    0 0 0 currentColor;
}

.tab-key-label {
  font-size: 1.125rem;
  font-weight: bold;
  text-transform: uppercase;
}

.tab-cursor-wrap {
  position: relative;
  display: inline-block;
  vertical-align: -0.2em; /* sit the block on the text baseline, dipping a little like a real cursor */
}

.tab-cursor {
  display: block;
  width: 0.6em;
  height: 1.1em;
  background: currentColor;
  transition: box-shadow 120ms ease-out;
}

.speed-line {
  position: absolute;
  right: 100%;
  width: 1.5em;
  height: 2px;
  background: linear-gradient(to left, hsl(50, 100%, 75%), transparent);
  pointer-events: none;
}
</style>
