<script setup>
</script>

<template>
  <section>
    <Post content="/pals" />
    <Pal />
  </section>
</template>

<style>
@reference "../../assets/css/main.css";

section {
  position: relative;
}

section .post {
  position: absolute;
  top: 2rem;
  left: 1rem;
  z-index: 1;
  @apply text-slate-100 dark:text-current;
  pointer-events: none;
}

section .post a {
  pointer-events: auto !important;
}

section iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh !important;
  z-index: 0;

  @apply border-2 border-slate-200
}
</style>