<script setup lang="ts">
const route = useRoute();
const { id } = route.params;


import { v5 as uuidv5 } from 'uuid';
const NAMESPACE = '716c2014-8839-49bc-bffe-f3c2ebc38824';

const uuid = uuidv5(id, NAMESPACE);
const path = `/tarpit/${uuid}`;
</script>

<template>
<p>
  {{id}}
  <NuxtLink :to="path" class='link'>
    {{uuid}}
  </NuxtLink>
</p>
</template>