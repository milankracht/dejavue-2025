<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Show } from '@/types';
import { useLazyImage } from '@/composables/useLazyImage';

const { isVisible, el } = useLazyImage();

import Heading from '@/components/atoms/BaseHeading.vue';
import Image from '@/components/atoms/BaseImage.vue';
import PosterPlaceholder from './PosterPlaceholder.vue';
import Rating from './StarRating.vue';

const props = defineProps({
  show: {
    type: Object as () => Show,
    required: true,
  },
});

const imageUrl = computed(() => props.show.image?.medium || '/poster-placeholder.png');
</script>

<template>
  <div class="show-slide">
    <div class="show-slide__poster" ref="el">
      <Image v-if="isVisible" :src="imageUrl" :alt="`${props.show.name} Poster`" />
      <PosterPlaceholder v-else />
    </div>
    <div class="show-slide__heading">
      <Heading size="md">{{ props.show.name }}</Heading>
      <Rating :rating="props.show.rating.average" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.show-slide {
  display: flex;
  flex-direction: column;
  width: 10rem;
  scroll-snap-align: start;

  @include mixins.bp-md {
    width: 12.5rem;
  }

  &__poster {
    width: 10rem;
    height: 15rem;
    border-radius: 0.5rem;
    overflow: hidden;

    @include mixins.bp-md {
      width: 12.5rem;
      height: 18.75rem;
    }
  }

  &__heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 0.5rem 1rem;

    > :first-child {
      max-width: calc(100% - 2.5rem);
      @include mixins.ellipsis;
    }
  }
}
</style>
