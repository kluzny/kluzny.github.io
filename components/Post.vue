<script setup lang="ts">
import { content } from '../helpers/content.js';

const props = defineProps(
  {
    content: {
      type: String,
      required: true,
    },
  },
)

const post = await content(props.content);
</script>

<template>
  <ContentRenderer v-if="post" :value="post" />
  <div v-else class="flex items-center">
    <NuxtImg src="/tux_head_sad.png"
            class="inline"
            alt="emoji sized pixelated bust of tux the linux penguin, portrayed sadly with a single tear." />
    <h2>no really, post not found</h2>
  </div>
</template>