<script setup lang="ts">
import TextInput from '../atoms/TextInput.vue';
import Icon from '../atoms/Icon.vue';
</script>

<template>
  <div class="search-bar">
    <TextInput placeholder="Search..." />
    <div class="search-bar__icons">
      <Icon icon="search" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.search-bar {
  position: relative;
  justify-self: stretch;
  margin: 0;

  &__icons {
    position: absolute;
    right: 0.75rem;
    top: 0.75rem;
    width: 100% svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--color-text);
    }
  }

  @include mixins.bp-md {
    margin: 0.5rem 0;

    &__icons {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
