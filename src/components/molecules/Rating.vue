<script setup lang="ts">
import { defineProps } from 'vue';

import Icon from '../atoms/Icon.vue';
import { GLOBAL } from '@/utils/constants';
</script>

<template>
  <div class="rating">
    <Icon icon="star" :size="16" :color="GLOBAL.COLORS.YELLOW" />
    <span><strong>9.4</strong>/10</span>
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
