<script setup lang="ts">
  let excuse;

  try {
    const response = await fetch("https://bofh-api.bombeck.io/v1/excuses/random/")
    const excuses = await response.json();
    excuse = excuses[0];
  } catch(error) {
    console.log(error);
  }
</script>

<template>
  <blockquote v-if='excuse'>
    {{ excuse.quote }}
    <ul>
      <li>
        <p>
          BOFH -
          <ExtLink :href="excuse.source" :append="false">
            {{ excuse.source }}
          </ExtLink>
        </p>
      </li>
    </ul>
  </blockquote>
</template>