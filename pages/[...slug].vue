<script setup lang="ts">
  const route = useRoute();
  console.log("missing route", {slug: route.params.slug});

  await navigateTo("/posts/missing", {
    replace: false,
    redirectCode: 302,
  });
</script>

<template>
</template>