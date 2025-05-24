<script setup>

let errorMessage = ref('');
let hasPermission = ref(false);
let hasBegun = ref(false);
let showCountdown = ref(false);
let sendInTheClowns = ref(false);

const player = useTemplateRef('player');

function requestPermission() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            hasPermission.value = true;
            errorMessage.value = '';
            nextTick(() => {
                player.value.srcObject = stream;
            });
        })
        .catch((error) => {
            hasPermission.value = false;
            errorMessage.value = `Webcam Issue Detected: ${error.message}`;
        });
}

let countDown = ref(6);
function startCountdown() {
    hasBegun.value = true;
    showCountdown.value = true;
    nextTick(() => {
        decrement();
    });
}

function decrement() {
  countDown.value--;

  if (countDown.value <= 0) {
    showCountdown.value = false;
    startTest();
    return;
  }

  setTimeout(() => {
    decrement();
  }, 1000);
}

function startTest() {
    sendInTheClowns.value = true;
}

</script>

<template>
    <Post content="/webcam" />

    <section v-if="errorMessage" class="p-4 mb-2 bg-red-100 border border-red-400 rounded">
        <p class="text-red-500">{{ errorMessage }}</p>
    </section>

    <section v-if="!hasPermission" class="space-y-2">
        <p>To proceed with the webcam tests, please grant permission to use your device's camera.</p>
        <button @click="requestPermission" class="button">
            Grant Webcam Permission
        </button>
    </section>

    <section v-else class="flex flex-col justify-center items-center space-y-2">
        <p>Webcam permission granted. You may now proceed with the tests.</p>
        <p>Center yourself in the image and press 'Begin'</p>
        <button v-if="!hasBegun" class='button' @click="startCountdown">
            Begin
        </button>
        <h2 v-if='showCountdown' class="text-xl text-red-500">{{ countDown }}</h2>
 
        <div class="w-1/3 mx-auto h-auto relative">
            <template v-if="sendInTheClowns">
                <p class="clown">🤡</p>
                <audio src="/audio/clown.wav" autoplay></audio>
            </template>
            <video ref='player' autoplay class="w-full"></video>
        </div>
    </section>
</template>

<style scoped>
.clown {
    font-size: 6rem;
    position: absolute;
    top: calc(50% - 3rem);
    left: calc(50% - 3rem);
}
</style>