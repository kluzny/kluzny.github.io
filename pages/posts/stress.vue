<script setup>
const HIGH_SCORE = 'elementHighScore'

let highScore = localStorage.getItem(HIGH_SCORE) || 0

function setScore(score) {
  if (score > highScore) {
    localStorage.setItem(HIGH_SCORE, score)
    highScore = score
  }
}

const countDown = ref(10)
const isTestStarted = ref(false)

function decrement() {
  countDown.value--

  if (countDown.value <= 0) {
    startTest()
    return
  }

  setTimeout(() => {
    decrement()
  }, 1000)
}

decrement()

const spawnedCount = ref(1) // log10 is -Infinity at zero

function startTest() {
  isTestStarted.value = true

  addElement()
}

let elementsToAdd = 1
let elementTimer = 1000
let digits

function addElement() {
  if (halt.value) {
    return
  }

  digits = Math.floor(Math.log10(spawnedCount.value))
  elementsToAdd = 10 * digits + 1
  spawnedCount.value = spawnedCount.value + elementsToAdd
  elementTimer = Math.max(1, elementTimer * 0.9)

  setTimeout(() => {
    setScore(spawnedCount.value)
    addElement()
  }, elementTimer)
}

const isHoverEnabled = ref(true)
const halt = ref(false)

watch(halt, async (newValue, oldValue) => {
  if (!newValue) {
    addElement()
  }
})
</script>

<template>
  <Post content="/stress" />

  <h2 v-if="!isTestStarted" class="pulse text-2xl font-bold text-center text-red-500">
    Test will begin in <code>{{ countDown }}</code> seconds.
  </h2>

  <template v-else>
    <p>
      It works by adding DOM elements to the page until failure. The process starts off slowly, but
      ramps up in short order. There may still be time to navigate away.
    </p>

    <header class="flex flex-col justify-center items-center space-y-2 mt-4">
      <button v-if="halt" class="bg-green-500" @click="halt = !halt">Resume</button>
      <button v-else class="bg-red-500" @click="halt = !halt">Pause</button>
      <label>
        <input v-model="isHoverEnabled" type="checkbox" />
        Enable Hover Animations
      </label>
    </header>
    <div
      class="flex flex-col justify-center items-center xl:flex-row xl:justify-between xl:items-center mt-4"
    >
      <p class="text-xl">
        There are currently: <span>{{ spawnedCount }}</span> elements.
      </p>
      <p
        :class="
          spawnedCount >= highScore
            ? 'text-2xl text-lime-700 dark:text-yellow-300 pulse'
            : 'text-xl text-slate-600'
        "
      >
        High Score: {{ highScore }}
      </p>
    </div>

    <p class="elements mt-4" :class="isHoverEnabled ? 'hoverable' : ''">
      <span v-for="i in spawnedCount" :key="i" :title="`${i} of ${spawnedCount}`" />
    </p>
  </template>
</template>

<style>
@reference "../../assets/css/main.css";

header button {
  @apply text-black px-4 py-2 border rounded;
}

.elements span {
  display: inline-block;
  height: 1rem;
  width: 1rem;
  margin: 2px; /* avoid some rounding issues in grid uniformity */
  scale: 1;
  background-color: red;
}

.elements.hoverable span {
  --out-timer: 5s;
  transition:
    background-color var(--out-timer) linear,
    scale var(--out-timer) linear,
    border-radius var(--out-timer) linear;
}

.elements.hoverable span:hover {
  --out-timer: 0;
  background-color: green;
  scale: 1.25;
  border-radius: 50%;
}
</style>
