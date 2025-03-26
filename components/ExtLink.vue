<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  append: {
    type: Boolean,
    default: true,
  }
});

const external = computed(() => {
  if(props.href.match(/^https?:\/\//)) {
    return props.href;
  }
  return `//${props.href}`;
});
</script>

<template>
  <a rel='noopener noreferrer'
     class="link"
     :href='external'>
    <slot></slot>
    <Icon v-if="append" name="solar:global-outline" />
  </a>
</template>