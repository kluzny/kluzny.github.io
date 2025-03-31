<script setup lang="ts">
  import { mouseEffects } from './helpers/mouse_effects.js';

   mouseEffects();

  useSeoMeta({
    title: "kyle.luzny.dev",
    description: "A personal collection of technology musings",
  });
</script>

<template>
  <Body class="relative" /> <!-- relative for GradientOverlay -->
  <NuxtRouteAnnouncer />
  <MainNav vertical
           class="xl:hidden"/>
  <div class="min-h-screen flex justify-center items-start space-x-2 mx-auto w-full">
    <MainNav class="hidden xl:flex"/>
    <div class="xl:mt-6 rounded-sm p-4 w-full bg-white dark:bg-black">
      <NuxtPage />
    </div>
  </div>
  <footer class="flex justify-center items-center mt-8">
    <ThemePicker />
  </footer>
  <GradientOverlay />
</template>