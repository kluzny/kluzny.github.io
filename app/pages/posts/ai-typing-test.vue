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
} from '../../utils/tabtest.js'

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

let timer = null
let cooldownTimer = null
const isCoolingDown = ref(false)

function stopTimer() {
  clearInterval(timer)
  timer = null
}

function begin() {
  stopTimer()
  clearTimeout(cooldownTimer)
  isCoolingDown.value = false
  phrases.value = shuffle(PHRASES)
  tabs.value = 0
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

function onKeydown(event) {
  const isPlaying = phase.value === 'playing'
  if (event.key !== 'Tab' || !(isPlaying || isCoolingDown.value)) {
    return
  }
  event.preventDefault()
  if (isPlaying && !event.repeat) {
    tabs.value++
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  stopTimer()
  clearTimeout(cooldownTimer)
})
</script>

<template>
  <div>
    <Post content="/ai-typing-test" />

    <section class="space-y-4" data-testid="game">
      <p class="text-sm text-stone-600 dark:text-stone-400">
        TPS stands for <strong>Tabs Per Second</strong>, not Tokens Per Second, bestie.
      </p>

      <!-- tall enough for the results phase so starting a round doesn't shift the page -->
      <div class="flex flex-col space-y-4 min-h-112" data-testid="stage">
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
          </div>

          <p
            class="text-xl leading-relaxed min-h-32 p-4 border rounded-sm font-mono border-stone-700 dark:border-lime-500"
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
            <span v-if="phase === 'playing'" class="blink">▮</span>
          </p>

          <p v-if="phase === 'playing'" class="text-center font-bold pulse">
            HIT <kbd>TAB</kbd> HIT <kbd>TAB</kbd> HIT <kbd>TAB</kbd>
          </p>
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

      <div data-testid="high-scores">
        <h2 class="text-2xl font-bold">Leaderboard (local, no cap)</h2>
        <ol v-if="highScores.length" class="list-decimal list-inside">
          <li v-for="(score, i) in highScores" :key="i">
            <strong>{{ score.tps.toFixed(2) }} TPS</strong>
            <span class="text-sm text-stone-600 dark:text-stone-400">
              ({{ score.tabs }} tabs, {{ score.date }})
            </span>
          </li>
        </ol>
        <p v-else>No scores yet. The leaderboard is cooked, empty, ngmi. Be the first.</p>
        <button v-if="highScores.length" class="button text-sm mt-2" @click="clearScores">
          Clear scores
        </button>
      </div>
    </section>
  </div>
</template>
