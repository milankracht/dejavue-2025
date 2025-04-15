<script setup lang="ts">
import Logo from '@/components/atoms/Logo.vue';
import SearchBar from '@/components/molecules/SearchBar.vue';
import Btn from '../atoms/Btn.vue';
</script>

<template>
  <header>
    <Logo />
    <SearchBar>
      <span>Test</span>
    </SearchBar>
    <div class="header-right"><Btn type="tertiary" icon="search" /></div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

header {
  position: fixed;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0.25rem 1rem;
  background-color: var(--mirage-medium);
  box-shadow: var(--drop-shadow);

  @include mixins.bp-md {
    height: 5rem;
    padding: 0.5rem 1rem;
    grid-template-columns: 2fr 3fr 2fr;
  }

  .header-right {
    text-align: right;

    > * {
      @include mixins.bp-md {
        display: none;
      }
    }
  }
}
</style>
