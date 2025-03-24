<template>
  <div>
    <NuxtRouteAnnouncer />
  </div>
  <section>
    <NuxtLink to="/">Home</NuxtLink> |
    <NuxtLink to="/posts/hello-world">Hello World!</NuxtLink> |
    <NuxtLink to="/about">About</NuxtLink>
  </section>
  <section>
    <NuxtPage />
  </section>
</template>
