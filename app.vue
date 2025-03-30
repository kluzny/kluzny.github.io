<script setup lang="ts">
  import { mouseEffects } from './helpers/mouse_effects.js';

  mouseEffects();

  useSeoMeta({
    title: "kyle.luzny.dev",
    description: "A personal collection of technology musings",
  });
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="min-h-screen w-full flex justify-center items-start space-x-2 mt-8">
    <MainNav />
    <div class="rounded-sm p-4 w-sm md:w-lg lg:w-xl xl:w-4xl 4xl:w-8xl">
      <NuxtPage />
    </div>
  </div>
  <footer class="flex justify-center items-center mt-8">
    <ThemePicker />
  </footer>
</template>