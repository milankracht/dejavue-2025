<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}>();
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :width="props.width || '100%'"
    :height="props.height || '100%'"
  />
</template>

<style scoped lang="scss">
img {
  object-fit: cover;
}
</style>
