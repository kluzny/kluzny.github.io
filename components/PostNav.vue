<template>
  <div class="post-nav max-w-md md:float-right md:text-right leading-loose tracking-tight md:sticky md:top-0 ">
    <NuxtLink to="/" class="block font-bold my-4 md:my-12">::1 Home</NuxtLink>

    <ul class="flex flex-wrap justify-between flex-col">
      <li>
        <NuxtLink to="/posts/hello-world" class="nav block font-bold">Hello World</NuxtLink>
      </li>
    </ul>
    <a href="#" class="normal font-bold hover:font-bold">more...</a>
  </div>
</template>