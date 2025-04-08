<script setup lang='ts'>
let uuid = self.crypto.randomUUID()
let path = `/tarpit/${uuid}`
</script>

<template>
  <Post content='/pit' />

  <section class="mt-8">
    <div class="flex flex-col xl:flex-row justify-between items-center space-y-4 xl:space-y-0">
      <h3 class='text-4xl font-bold text-red-500 blink'>CAUTION!!!</h3>
      <a :href="path"
        class="link text-2xl">
        Enter the
        {{ path }}
      </a>
      <h3 class='text-4xl font-bold text-red-500 blink'>CAUTION!!!</h3>
    </div>
  </section>
</template>

<style>
@reference "../../assets/css/main.css";

.post img {
  @apply w-1/2 h-1/2 mx-auto xl:mx-0;
}
</style>