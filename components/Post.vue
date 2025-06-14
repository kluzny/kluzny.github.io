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
  <section :class='{post: !!post, missing: !post}'>
    <ContentRenderer v-if="post" :value="post" />
    <div v-else class="flex items-center missing">
      <NuxtImg src="/tux_head_sad.png"
              class="inline w-12 pr-2"
              alt="emoji sized pixelated bust of tux the linux penguin, portrayed sadly with a single tear." />
      <h2 class="my-0 text-2xl">no really, post not found.</h2>
    </div>

    <slot />
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
  ul, ol,
  p, pre, blockquote {
    @apply mb-4;
  }

  h2 {
    @apply mt-8;
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

  blockquote,
  code,
  pre {
    @apply bg-stone-200 dark:bg-stone-800;
    @apply text-stone-800 dark:text-stone-200; /* overriden by shiki when supported */
  }

  blockquote {
    @apply p-4 border border-l-4  rounded-sm;
    @apply border-stone-600 dark:border-lime-600;
  }

  /* using block quote lists as the author */
  blockquote ul {
    @apply list-none;
  }

  blockquote ul li {
    @apply text-center font-bold italic text-xl mt-2;
  }

  /* inline code */
  code {
    @apply p-1 rounded-sm;
  }

  pre code {
    @apply p-0 rounded-none;
    @apply bg-inherit text-inherit;
  }

  pre {
    @apply p-4 border-2 rounded-sm;
    @apply border-stone-600 dark:border-lime-600;
    @apply overflow-x-auto;
  }

  [line]::before {
    content: attr(line);
    @apply mr-2;
    @apply inline-block min-w-6; /* only room for 2 digit line numbers */
    @apply text-stone-400 text-center;
    @apply border-r-1 border-stone-300;
  }
}
</style>