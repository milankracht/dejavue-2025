<script setup lang="ts">
import showStore from '@/store/show';
import { onMounted } from 'vue';

import Slider from '@/components/organisms/PosterSlider.vue';

onMounted(() => {
  showStore.loadShows();
});
</script>

<template>
  <main>
    <Slider v-for="genre in showStore.state.genres" :key="genre" :genre="genre" />
  </main>
</template>
