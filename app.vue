<template>
  <NuxtRouteAnnouncer />
  <div class="flex justify-center items-start space-x-2 mt-8">
    <MainNav />
    <section class='rounded-sm p-4'>
      <NuxtPage />
    </section>
  </div>
  <footer class="flex justify-center items-center mt-8">
    <ThemePicker />
  </footer>
</template>