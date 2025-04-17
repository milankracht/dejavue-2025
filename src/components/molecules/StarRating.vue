<script setup lang="ts">
import { defineProps } from 'vue';

import Icon from '../atoms/BaseIcon.vue';
import { GLOBAL } from '@/utils/constants';

const ICON_SIZE = 16;

const props = defineProps({
  rating: {
    type: [Number, null],
    required: true,
  },
});
</script>

<template>
  <div v-if="props.rating" class="star-rating">
    <Icon icon="star" :size="ICON_SIZE" :color="GLOBAL.COLORS.YELLOW" />
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
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.125rem 0;

  span {
    font-weight: 300;

    strong {
      font-weight: 700;
    }
  }
}
</style>
