<script setup lang="ts">
const count = ref(0)
const increment = () => count.value++
const double = computed(() => count.value * 2)
</script>

<template>
  <h2 class="underline">Hello World</h2>
  <p>Count: {{count}}</p>
  <p>Double: {{double}}</p>
  <button @click="increment">
    Increment
  </button>
</template>