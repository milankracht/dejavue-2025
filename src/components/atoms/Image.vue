<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  class?: string;
}>();
const { src, alt } = props;
</script>

<template>
  <img :src="src" :alt="alt" :width="width ? width : `100%`" :height="height ? height : `100%`" />
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

img {
  object-fit: cover;
}
</style>
