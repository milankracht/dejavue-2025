<script setup lang="ts">
import Logo from '@/components/molecules/DvLogo.vue';
import SearchBar from '@/components/molecules/SearchBar.vue';
</script>

<template>
  <header>
    <div class="header-left">
      <Logo />
    </div>
    <div class="header-center">
      <SearchBar />
    </div>
    <div class="header-right"></div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

header {
  position: fixed;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 2fr 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0.25rem 1rem;
  background-color: var(--mirage-medium);
  box-shadow: var(--drop-shadow);
  transition: var(--transition-out);

  .header-left {
    padding: 0.5rem 0;

    @include mixins.bp-md {
      padding: 0.25rem 0;
    }
  }

  .header-center {
    text-align: right;
  }

  @include mixins.bp-md {
    height: 5rem;
    padding: 0.5rem 1rem;
    grid-template-columns: 2fr 3fr 2fr;
  }

  @include mixins.bp-lg {
    grid-template-columns: 1fr 52rem 1fr;
  }
}
</style>
