<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:300,700&display=swap',
    },
  ],
});
</script>

<template>
  <div class="default-layout bg-gray-100 text-gray-700 font-sans roboto">
    <div class="p-6 sm:p-10 md:p-16 flex flex-wrap">
      <div class="w-full md:w-1/2 md:pr-32 order-3 md:order-1">
        <PostNav />
      </div>
      <div class="w-full md:w-1/2 order-1 md:order-2">
        <div class="max-w-md leading-loose tracking-tight">
          <slot />
        </div>
      </div>

      <ContactLinks />
      <AboutMe />
    </div>

    <!-- Pin to top right corner -->
    <div class="absolute top-0 right-0 h-12 w-18 p-4">
      <button class="js-change-theme focus:outline-none">🌙</button>
    </div>
  </div>
</template>

<style>
.roboto {
  font-family: 'Roboto', sans-serif;
}

.default-layout {
  height: 100vh;
}

::selection {
  background: #E9D8FD;
  color:#202684;
    /* WebKit/Blink Browsers */
}

::-moz-selection {
  background: #E9D8FD;
  color:#202684;
  /* Gecko Browsers */
}

a:not(.nav) {
  font-weight: bold;
  text-decoration: none;
  padding: 2px;
  background: linear-gradient(to right, #5A67D8, #5A67D8);
  background-repeat: repeat-x;
  background-size: 100% 2px;
  background-position: 0 95%;
  -webkit-transition: all 150ms ease-in-out;
  -moz-transition: all 150ms ease-in-out;
  -ms-transition: all 150ms ease-in-out;
  -o-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
}

a:hover {
  color: #B794F4;
  font-weight: bold;
  text-decoration: none;
  background: linear-gradient(to right, #9F7AEA, #E9D8FD);
  background-repeat: repeat-x;
  background-size: 100% 2px;
  background-position: 50% 95%;
  -webkit-transition: color 150ms ease-in-out;
  -moz-transition: color 150ms ease-in-out;
  -ms-transition: color 150ms ease-in-out;
  -o-transition: color 150ms ease-in-out;
  transition: color 150ms ease-in-out;
}

a:focus {
  outline: none;
  background: #E9D8FD;
}
</style>