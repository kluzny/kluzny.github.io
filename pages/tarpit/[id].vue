<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

const uuid = self.crypto.randomUUID();
const path = `/tarpit/${uuid}`;
</script>

<template>
<p>
  {{id}}
  <NuxtLink :to="path" class='link'>
    {{uuid}}
  </NuxtLink>
</p>
</template>