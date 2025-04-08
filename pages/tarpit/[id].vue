<script setup lang="ts">
import { generate, count } from "random-words";
import { v5 as uuidv5 } from 'uuid';


const route = useRoute();
const { id } = route.params;
const seed = id;

const NAMESPACE = '716c2014-8839-49bc-bffe-f3c2ebc38824';
const PREV_NAMESPACE = "4312989c-1c36-5c73-9eb7-35e66933b745"

const uuid = uuidv5(id, NAMESPACE);
// inverting the hash isn't possible
// so just use a different namespace and fake it
const prevUuid = uuidv5(id, PREV_NAMESPACE);

function pitPath(uuid) {
  return `/tarpit/${uuid}`;
}

const path = pitPath(uuid);
const prevPath = pitPath(prevUuid);

const titleTokens = generate({
  min: 3,
  max: 5,
  seed: seed,
});

const title = titleTokens.map(token => token.charAt(0).toUpperCase() + token.slice(1)).join(" ");
</script>

<template>
<h1 :data-id="id" class='post-title'>{{title}}</h1>
<nav class="flex space-x-2 mt-4">
  <NuxtLink :to="prevPath" class='link'>
    Previous Pit*<span class="text-xs align-top">1</span>
  </NuxtLink>
  <NuxtLink :to="path" class='link'>
    Next Pit
  </NuxtLink>
</nav>
<footer class='mt-8'>
  <p class="text-xs">*1 is a placeholder, unless you can show me how to unhash a
    <ExtLink href="https://en.wikipedia.org/wiki/Universally_unique_identifier#Versions_3_and_5_(namespace_name-based)">
      uuid
    </ExtLink>
  </p>
</footer>
</template>