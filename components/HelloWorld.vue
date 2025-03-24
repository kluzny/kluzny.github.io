<script setup lang="ts">
  const count = ref(1)
  const double = computed(() => count.value * 2)
</script>

<template>
  <h1 class="underline">Hello World {{double}}</h1>
</template>