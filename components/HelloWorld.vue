<script setup lang="ts">
const count = ref(0)
const increment = () => count.value++
const double = computed(() => count.value * 2)
</script>

<template>
  <p>Count: {{count}}</p>
  <p>Double: {{double}}</p>
  <button class="button"
    @click="increment">
    Increment
  </button>
</template>