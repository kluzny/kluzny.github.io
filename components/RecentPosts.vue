<script setup lang="ts">
import { format } from 'date-fns';
import routes from '../helpers/routes.js';

const { data: posts } = await useAsyncData(() => {
  return queryCollection('content')
         .select('path', 'title', 'description', 'date')
         .where('date', '>', '1970-01-02')
         .order('date', 'DESC')
         .limit(5)
         .all()
});

function simpleDate(date) {
  return format(date, 'yyyy-MM-dd');
}

function postPath(post) {
  return routes[post.title];
}
</script>

<template>
  <h1 class="post-title">Recent Posts</h1>
  <ul class="mt-4">
    <li v-for="post in posts">
      <p class='inline'>{{simpleDate(post.date)}}</p>
      <NuxtLink :to="postPath(post)">
        {{ post.data }}
        <span class='link'>{{ post.title }}</span>
        - {{post.description}}
      </NuxtLink>
    </li>
  </ul>
</template>