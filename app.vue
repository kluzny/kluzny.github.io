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
    <section class='rounded-sm p-4'>
      <NuxtPage />
    </section>
  </div>
  <footer class="flex justify-center items-center mt-8">
    <ThemePicker />
  </footer>
</template>