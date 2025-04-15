<script setup lang="ts">
import { defineProps } from 'vue';

import Heading from '@/components/atoms/Heading.vue';
import Image from '@/components/atoms/Image.vue';
import Rating from '../molecules/Rating.vue';
</script>

<template>
  <div class="slide">
    <div class="slide__poster">
      <Image
        src="https://static.tvmaze.com/uploads/images/original_untouched/120/302148.jpg"
        alt="Placeholder image"
      />
    </div>
    <div class="slide__heading">
      <Heading size="md">Heading</Heading>
      <Rating :rating="4.5" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.slide {
  display: flex;
  flex-direction: column;

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
    padding: 0.5rem;
  }
}
</style>
