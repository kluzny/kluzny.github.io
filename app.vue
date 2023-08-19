<script setup lang="ts">
useHead({
  title: "Luzny.dev",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "description",
      content: "Comprehensive documentation for life's little peculiarities.",
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
