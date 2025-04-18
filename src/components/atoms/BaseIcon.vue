<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { icons } from '@/utils/icons';

const props = defineProps({
  icon: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: '#ffffff' },
});

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
    <component
      v-if="iconComponent"
      :is="iconComponent"
      :style="`fill: ${props.color}`"
      data-testid="icon"
    />
  </div>
</template>

<style scoped>
.icon {
  display: inline-block;
}
</style>
