<script setup lang="ts">
import { onMounted, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchShows } from '@/services/shows';
import type { SearchResult } from '@/types';

import Button from '@/components/atoms/BaseButton.vue';
import Slide from '@/components/molecules/ShowSlide.vue';

const route = useRoute();
const $router = useRouter();

const state = reactive<{
  results: SearchResult[];
}>({
  results: [],
});

const toPreviousView = () => {
  route.query.q = '';
  $router.push({ name: 'home' });
};

const executeSearch = (query: string) => {
  if (query && typeof query === 'string' && query.length > 1) {
    searchShows(query)
      .then((response) => {
        state.results = response;
      })
      .catch((error) => {
        console.error(`Something went wrong when searching for ${query}: ${error}`);
      });
  } else {
    state.results = [];
  }
};

const warningMessage = computed(() => {
  let message = '';
  if (state.results.length === 0 && route.query.q && route.query.q.length) {
    message = `No results found for "${route.query.q}". `;
  }
  if (state.results.length === 0 && route.query.q && route.query.q.length < 2) {
    message += `Enter at least two characters.`;
  }
  if (!route.query.q) {
    message = `No results found, enter at least two characters.`;
  }
  return message;
});

watch(
  () => route.query.q,
  (newQuery) => {
    executeSearch(newQuery as string);
  },
);

onMounted(() => {
  executeSearch(route.query.q as string);
});
</script>

<template>
  <main>
    <div class="search">
      <div class="search__header">
        <Button
          type="secondary"
          icon="chevron-round-left"
          icon-position="left"
          @click="toPreviousView"
          >Back to home</Button
        >
      </div>

      <div class="search__results">
        <p v-if="warningMessage">
          {{ warningMessage }}
        </p>
        <Slide v-for="result in state.results" :key="result.show.id" :show="result.show" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.search {
  position: relative;
  width: 100%;
  max-width: 53rem;
  margin: 0 auto;

  &__header {
    display: block;
    padding: 0 0.5rem 2rem;
  }

  &__results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
}
</style>
