<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import TextInput from '../atoms/BaseTextInput.vue';
import Button from '../atoms/BaseButton.vue';

const router = useRouter();
const query = ref<string>('');

const handleStringInput = (value: string) => {
  query.value = value;
  router.push({ name: 'search', query: { q: value } });
};

const clearInput = () => {
  query.value = '';
  router.push({ name: 'search', query: { q: '' } });
};

watch(
  () => router.currentRoute.value.query.q,
  (newQuery) => {
    if (typeof newQuery === 'undefined') {
      query.value = '';
    }
  },
);
</script>

<template>
  <div class="search-bar">
    <TextInput :value="query" @handleChange="handleStringInput" />
    <div class="search-bar__icons">
      <Button v-if="query.length" type="tertiary" icon="close" @click="clearInput" />
      <Button v-else type="tertiary" icon="search" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.search-bar {
  position: relative;
  width: 100%;
  display: flex;
  justify-self: stretch;
  margin: 0;

  &__icons {
    position: absolute;
    right: 0;
    top: 0;
    width: 2.5;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--color-text);
    }
  }

  @include mixins.bp-md {
    margin: 0.5rem 0;

    &__icons {
      right: 0;
    }
  }
}
</style>
