<script setup type="ts">
const meta = {
  title: 'Hello World',
  author: 'Kyle Luzny',
  publishedAt: '2023-19-08',
};
</script>

<template>
  <BlogPost :post-title="meta.title">
    <p>
      Decided to make a slightly over-engineered blog using
      <ExtLink href="https://nuxt.com">
        Nuxt
      </ExtLink>
      <ExtLink href="https://www.tailwindtoolbox.com/templates/minimalist-blog">
        Minimalist Blog
      </ExtLink>.
    </p>
  </BlogPost>
</template>