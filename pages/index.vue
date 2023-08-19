<script setup lang="ts">
// TODO: move to a findOne() and figure out why typescript is angry
const latestPosts = await queryContent('posts').only(['title', '_path']).limit(1).find()
</script>

<template>
  <ContentDoc :path="latestPosts[0]._path" />
</template>