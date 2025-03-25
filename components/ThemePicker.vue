<script setup>
const colorMode = useColorMode();

const setTheme = (theme) => {
  colorMode.preference = theme;
};
</script>

<template>
  <ul class="flex space-x-2">
    <li class=""
        :class="{'active': colorMode.preference === 'system'}"
        title="Toggle System Theme"
        @click="setTheme('system')">
      <Icon name="material-symbols:computer-outline-rounded"  class="text-2xl"/>
    </li>
    <li class=""
        :class="{'active': colorMode.preference === 'light'}"
        title="Toggle Light Theme"
        @click="setTheme('light')">
      <Icon name="material-symbols:light-mode"  class="text-2xl"/>
    </li>
    <li class=""
        :class="{'active': colorMode.preference === 'dark'}"
        title="Toggle Dark Theme"
        @click="setTheme('dark')">
      <Icon name="material-symbols:nightlight" class="text-2xl"/>
    </li>
  </ul>
</template>

<style>
.active {
  @apply border-b-2;
}
</style>