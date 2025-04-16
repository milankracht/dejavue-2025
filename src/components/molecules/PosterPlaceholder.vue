<template>
  <div class="poster-placeholder"></div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.poster-placeholder {
  width: 10rem;
  height: 15rem;
  background-color: var(--mirage-medium);
  border-radius: 0.5rem;
  animation: pulse 1.5s infinite ease-in-out;

  @include mixins.bp-md {
    width: 12.5rem;
    height: 18.75rem;
  }

  @keyframes pulse {
    0% {
      background-color: var(--mirage-medium);
    }
    50% {
      background-color: var(--mirage-light);
    }
    100% {
      background-color: var(--mirage-medium);
    }
  }
}
</style>
