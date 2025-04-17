<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink to="/" class="logo">DéjaVue</RouterLink>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.logo,
.logo:visited {
  font-family: var(--font-logo);
  font-size: 1.5rem;
  color: var(--color-logo);
  text-decoration: none;
  line-height: 1.125;

  @include mixins.bp-md {
    font-size: 3rem;
  }
}

.logo:hover {
  color: var(--color-logo-hover);
}
</style>
