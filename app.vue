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
  <MainNav vertical=true
           class="sm:hidden"/>
  <div class="min-h-screen flex justify-center items-start space-x-2 mx-auto w-full">
    <MainNav class="hidden"/>
    <div class="rounded-sm p-4 w-full">
      <NuxtPage />
    </div>
  </div>
  <footer class="flex justify-center items-center mt-8">
    <ThemePicker />
  </footer>
</template>