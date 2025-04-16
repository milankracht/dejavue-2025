<script setup lang="ts">
import { defineProps } from 'vue';

import Icon from '../atoms/BaseIcon.vue';
import { GLOBAL } from '@/utils/constants';

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="rating">
    <Icon icon="star" :size="16" :color="GLOBAL.COLORS.YELLOW" />
    <span
      ><strong>{{ props.rating }}</strong
      >/10</span
    >
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.rating {
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
