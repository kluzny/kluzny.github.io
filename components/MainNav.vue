<script setup>
  import routes from '../helpers/routes.js';

  const { vertical } = defineProps({
    vertical: {
      type: Boolean,
      default: false,
    },
  });

  const isExpanded = ref(!vertical);
</script>

<template>
  <nav class="flex flex-col justify-start items-start border border-r-4 border-b-4 border-stone-700 dark:border-lime-500 py-2 px-4"
       :class="{'px-4': isExpanded, 'px-2': !isExpanded}">
    <div v-if='vertical' class='flex justify-between items-center w-full'>
      <NuxtLink to="/" class="w-full font-bold">
        kyle@localhost $ <span class="text-2xl blink">▮</span>
      </NuxtLink>
      <button @click="isExpanded = !isExpanded"
              :class="vertical ? 'self-end' : ''"
              aria-label="Minimize Navigation">
        <Icon name="heroicons:bars-3-solid"
              class='text-3xl hover:text-stone-400 dark:hover:text-lime-200' />
      </button>
    </div>
    <button v-else
            @click="isExpanded = !isExpanded"
            :class="vertical ? 'self-end' : ''"
            aria-label="Minimize Navigation">
      <Icon name="heroicons:bars-3-solid"
            class='text-3xl hover:text-stone-400 dark:hover:text-lime-200' />
    </button>

    <ul v-if='isExpanded' class="flex flex-col space-y-2 mb-2 w-full">
      <li v-if='!vertical' class="text-lg border-b-2 link">
        <NuxtLink to="/" class="block w-full font-bold">
          kyle@localhost $ <span class="text-2xl blink">▮</span>
        </NuxtLink>
      </li>
      <li v-for="(path, name) in routes" class="text-lg border-b-2 link">
        <NuxtLink :to="path" class="block w-full">
          {{ name }}
        </NuxtLink>
      </li>
      <li class='flex justify-center items-center mt-4'>
        <ThemePicker />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  @reference "../assets/css/main.css";

   nav .link {
    @apply md:whitespace-nowrap no-underline;
    @apply text-stone-900 hover:text-stone-500;
    @apply dark:text-lime-500 dark:hover:text-lime-200;
   }
</style>