<script setup>
const posts = [
  { name: 'Hello World!', path: '/posts/hello-world' },
];
</script>

<template>
  <nav class="flex flex-col justify-start items-start border-r-4 dark:border-lime-500 p-4">
    <ul class="flex flex-col space-y-2 mb-2 w-full">
      <li class="text-lg border-b-2 link">
        <NuxtLink to="/" class="block w-full font-bold">
          kyle@localhost $ <span class="text-2xl blink">▮</span>
        </NuxtLink>
      </li>
      <li class="text-lg border-b-2 link">
        <NuxtLink to="/about" class="block w-full">
          About
        </NuxtLink>
      </li>
    </ul>
    <ul v-for="link in posts" class="flex flex-col space-y-2 w-full">
      <li class="text-lg border-b-2 link">
        <NuxtLink :to="link.path" class="block w-full">
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style>
  .blink {
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
</style>