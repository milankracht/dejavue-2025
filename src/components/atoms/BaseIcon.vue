<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

import { GLOBAL } from '@/utils/constants';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: GLOBAL.COLORS.WHITE,
  },
});

const icons = import.meta.glob('@/assets/icons/*.svg');

const iconComponent = computed(() => {
  const path = `/src/assets/icons/${props.icon}.svg`;
  if (icons[path]) {
    return defineAsyncComponent(
      () => icons[path]() as Promise<{ default: import('vue').Component }>,
    );
  } else {
    console.warn(`Icon not found: ${props.icon}`);
    return null;
  }
});
</script>

<template>
  <div class="icon" :style="`width: ${props.size}px; height: ${props.size}px`">
    <component :is="iconComponent" :name="props.icon" :style="`fill: ${props.color}`" />
  </div>
</template>

<style scoped>
.icon {
  display: inline-block;
}
</style>
