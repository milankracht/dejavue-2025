<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  size: keyof typeof headingSizes;
}>();

const headingSizes = {
  xs: 'h6',
  sm: 'h5',
  md: 'h4',
  lg: 'h3',
  xl: 'h2',
  xxl: 'h1',
};
</script>

<template>
  <component :is="headingSizes[props.size]" class="heading">
    <slot />
  </component>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  color: var(--color-heading);
}

h1 {
  font-size: 2.5rem;
  line-height: 1.25;
  font-weight: 300;

  @include mixins.bp-md {
    font-size: 3rem;
  }
}

h2 {
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 700;
}

h4 {
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 700;
}

h5 {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 700;
}

h6 {
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}
</style>
