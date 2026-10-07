<script setup>
const errorMessage = ref('')
const hasPermission = ref(false)
const hasBegun = ref(false)
const showCountdown = ref(false)
const sendInTheClowns = ref(false)

const player = useTemplateRef('player')

function requestPermission() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      hasPermission.value = true
      errorMessage.value = ''
      nextTick(() => {
        player.value.srcObject = stream
      })
    })
    .catch((error) => {
      hasPermission.value = false
      errorMessage.value = `Webcam Issue Detected: ${error.message}`
    })
}

const countDown = ref(6)
function startCountdown() {
  hasBegun.value = true
  showCountdown.value = true
  nextTick(() => {
    decrement()
  })
}

function decrement() {
  countDown.value--

  if (countDown.value <= 0) {
    showCountdown.value = false
    startTest()
    return
  }

  setTimeout(() => {
    decrement()
  }, 1000)
}

function startTest() {
  sendInTheClowns.value = true
}
</script>

<template>
  <div>
    <Post content="/webcam" />

    <section v-if="errorMessage" class="p-4 mb-2 bg-red-100 border border-red-400 rounded">
      <p class="text-red-500">{{ errorMessage }}</p>
    </section>

    <section v-if="!hasPermission" class="space-y-2">
      <p>To proceed with the webcam tests, please grant permission to use your device's camera.</p>
      <button class="button" @click="requestPermission">Grant Webcam Permission</button>
    </section>

    <section v-else class="flex flex-col justify-center items-center space-y-2">
      <p>Webcam permission granted. You may now proceed with the tests.</p>
      <p>Center yourself in the image and press 'Begin'</p>
      <button v-if="!hasBegun" class="button" @click="startCountdown">Begin</button>
      <h2 v-if="showCountdown" class="text-xl text-red-500">{{ countDown }}</h2>

      <div class="w-full mx-2 md:w-1/3 md:mx-auto h-auto relative">
        <template v-if="sendInTheClowns">
          <p class="clown">🤡</p>
          <audio src="/audio/clown.wav" autoplay />
        </template>
        <video ref="player" autoplay class="w-full" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.clown {
  font-size: 6rem;
  position: absolute;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
}
</style>
