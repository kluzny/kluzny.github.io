<script setup lang="ts">
  import routes from '../helpers/routes.js';

  const nonMissingRoutes = Object.keys(routes).filter(route => route !== 'Missing Post?');

  const randomRoute = nonMissingRoutes[Math.floor(Math.random() * nonMissingRoutes.length)];
  const randomPath = routes[randomRoute];
</script>

<template>
  <Post content="/missing" />

  <p>
    Perhaps I could interest you in this random post?
    <NuxtLink :to="randomPath" class='link'>
      {{ randomRoute }}
    </NuxtLink>
  </p>
</template>