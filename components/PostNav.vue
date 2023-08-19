<script setup lang="ts">
const posts = await queryContent('posts').only(['title', '_path']).find()
</script>

<template>
  <div class="post-nav max-w-md md:float-right md:text-right leading-loose tracking-tight md:sticky md:top-0 ">
    <NuxtLink to="/" class="block font-bold my-4 md:my-12">::1 Home</NuxtLink>

    <ul class="flex flex-wrap justify-between flex-col">
      <li v-for="post in posts">
        <a :href="post._path" class="nav">{{ post.title }}</a>
      </li>
    </ul>
    <a href="#" class="normal font-bold hover:font-bold">more...</a>
  </div>
</template>