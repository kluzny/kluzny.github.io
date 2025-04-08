<script setup lang="ts">
import { generate, count } from "random-words";
import { v5 as uuidv5 } from 'uuid';

import seedrandom from 'seedrandom';
const route = useRoute();
const { id } = route.params;
const seed = id;
var rng = seedrandom(seed);

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
const randomUUID = self.crypto.randomUUID();
const randomPit = pitPath(randomUUID);

const titleTokens = generate({
  min: 3,
  max: 5,
  seed: seed,
});

function titleize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const title = titleTokens.map(titleize).join(" ");

let seedling = 0;
function words(count) {
  return generate({
    exactly: count,
    seed: seed + seedling++,
  });
}

function ish(lower, upper) {
  return Math.floor(rng() * upper) + lower;
}

function heading() {
  let count = ish(4, 9);
  let tokens = words(count);
  return tokens.map(titleize).join(" ");
}

function sentence() {
  let count = ish(3, 25);
  let tokens = words(count);
  let sentence = tokens.join(" ") + ".";
  return titleize(sentence);
}

function sentences(count) {
  let sentences = [];
  for(let i = 0; i < count; i++) {
    sentences.push(sentence())
  }
  return sentences;
}

function paragraph() {
  let count = ish(3, 5);
  return sentences(count).join(" ");
}

const paragraphCount = ish(1, 3);
const headings = [];
const paragraphs = [];
for (let i = 0; i < paragraphCount; i++) {
  headings.push(heading());
  paragraphs.push(paragraph());
}
</script>

<template>
<h1 :data-id="id" class='post-title mb-4'>{{title}}</h1>

<div v-for="(paragraph, index) in paragraphs" class='post-paragraph mb-4'>
  <h2 class='post-heading'>{{ headings[index] }}</h2>
  <p>{{ paragraph }}</p>
</div>

<nav class="flex justify-center space-x-2 mt-4">
  <NuxtLink :to="prevPath" class='link'>
    Previous Pit*<span class="text-xs align-top">1</span>
  </NuxtLink>
  <NuxtLink :to='randomPit' class='link'>
    Random
  </NuxtLink>
  <NuxtLink to="/posts/pitfalls" class='link'>
    Exit
  </NuxtLink>
  <NuxtLink :to="path" class='link'>
    Next Pit
  </NuxtLink>
</nav>
<footer class='mt-8 text-center'>
  <p class="text-xs">*1 is a placeholder, unless you can show me how to unhash a
    <ExtLink href="https://en.wikipedia.org/wiki/Universally_unique_identifier#Versions_3_and_5_(namespace_name-based)">
      uuid
    </ExtLink>
  </p>
</footer>
</template>