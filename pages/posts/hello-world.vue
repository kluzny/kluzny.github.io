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
      <ExtLink href="//nuxt.com">
        Nuxt
      </ExtLink>
      <ExtLink href="//www.tailwindtoolbox.com/templates/minimalist-blog">
        Minimalist Blog
      </ExtLink>.
    </p>
  </BlogPost>
</template>