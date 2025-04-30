<script setup lang="ts">
import { onMounted, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchShows } from '@/services/shows';
import type { SearchResult } from '@/types';
import navigationHistory from '@/store/navigationHistory';

import Heading from '@/components/atoms/BaseHeading.vue';
import Button from '@/components/atoms/BaseButton.vue';
import Slide from '@/components/molecules/ShowSlide.vue';

const route = useRoute();
const router = useRouter();

const state = reactive<{
  results: SearchResult[];
}>({
  results: [],
});

const toPreviousView = () => {
  const last = navigationHistory.lastRoute()?.path?.toString() || '/';
  router.push(last);
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
        <Heading size="xxl"
          >Results for <span>{{ route.query.q }}</span></Heading
        >
        <Button
          type="tertiary"
          icon="chevron-round-left"
          icon-position="left"
          @click="toPreviousView"
          >Back</Button
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
@use '@/assets/styles/mixins' as mixins;

.search {
  position: relative;
  width: 100%;
  max-width: 55rem;
  margin: 0 auto;
  padding: 0 1rem;

  &__header {
    display: flex;
    flex-direction: column;

    @include mixins.bp-md {
      padding-bottom: 1rem;
    }
  }

  &__results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 0;
  }
}
</style>
