<script setup lang='ts'>
let uuid = self.crypto.randomUUID()
let path = `/tarpit/${uuid}`
</script>

<template>
  <Post content='/pit' />

  <section class="mt-8">
    <a :href="path"
      class="link text-2xl">
      Enter the
      {{ path }}
    </a>
  </section>
</template>

<style>
@reference "../../assets/css/main.css";

.post img {
  @apply w-1/2 h-1/2 mx-auto xl:mx-0;
}
</style>