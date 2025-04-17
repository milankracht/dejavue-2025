<script setup lang="ts">
import { defineProps, computed } from 'vue';

import Icon from '../atoms/BaseIcon.vue';
import { GLOBAL } from '@/utils/constants';

const ICON_SIZE = 20;

const props = defineProps({
  rating: {
    type: [Number, null],
    required: true,
  },
});

const rating = computed(() => {
  return Math.round(props.rating ?? 0) / 2;
});
const int = computed(() => Math.floor(rating.value));
const fract = computed(() => rating.value - int.value);
const rest = computed(() => GLOBAL.STAR_RATING_MAX - int.value - (fract.value ? 1 : 0));
</script>

<template>
  <div v-if="props.rating" class="star-rating">
    <Icon
      v-for="i in int"
      :key="i"
      icon="star-solid"
      :size="ICON_SIZE"
      :color="GLOBAL.COLORS.YELLOW"
    />
    <Icon v-if="fract > 0" icon="star-semi" :size="ICON_SIZE" :color="GLOBAL.COLORS.YELLOW" />
    <Icon v-for="i in rest" :key="i" icon="star" :size="ICON_SIZE" :color="GLOBAL.COLORS.YELLOW" />
    <span>
      <strong>{{ props.rating }}</strong
      >/{{ GLOBAL.RATING_MAX }}</span
    >
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.star-rating {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;

  span {
    margin: 0.25rem 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1;

    strong {
      font-weight: 700;
    }
  }
}
</style>
