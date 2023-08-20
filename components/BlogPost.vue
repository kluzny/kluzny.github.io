<script setup type="ts">
const props = defineProps({
  postTitle: {
    type: String,
    required: true
  },
});
</script>

<template>
  <div class="blog-post">
    <h1 class="font-bold my-12">{{ postTitle }}</h1>

    <slot />
  </div>
</template>