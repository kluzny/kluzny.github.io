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
  <section class="post">
    <ContentRenderer v-if="post" :value="post" />
    <div v-else class="flex items-center">
      <NuxtImg src="/tux_head_sad.png"
              class="inline"
              alt="emoji sized pixelated bust of tux the linux penguin, portrayed sadly with a single tear." />
      <h2>no really, post not found</h2>
    </div>
  </section>
</template>

<style>
@reference "../assets/css/main.css";

.post {
  h1 {
    @apply text-4xl;
  }

  h2 {
    @apply text-2xl;
  }

  h1, h2, h3 {
    @apply font-bold;
  }

  h1, h2, h3,
  p, pre, blockquote {
    @apply mb-2;
  }

  h2 {
    @apply mt-4;
  }

  a {
    @apply underline underline-offset-2;
  }

  h3 a {
    @apply no-underline;
  }

  ul, ol {
    @apply list-inside pl-4;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  blockquote {
    @apply py-4 px-8 border-l-4;
    @apply bg-stone-100 dark:bg-stone-800;
    @apply border-stone-500 dark:border-stone-500;
  }

  blockquote ul {
    @apply list-none;
  }

  blockquote ul li {
    @apply text-right font-bold italic;
  }

  pre {
    @apply p-4;
    @apply bg-stone-800 text-stone-100;
    @apply border-2 border-stone-500 rounded-sm;
  }
}
</style>