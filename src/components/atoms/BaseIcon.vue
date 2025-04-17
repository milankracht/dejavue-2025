<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

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
    default: '#ffffff',
  },
});

const icons = import.meta.glob('@/assets/icons/*.svg');

const iconComponent = computed(() => {
  const path = `/src/assets/icons/${props.icon}.svg`;
  if (icons[path]) {
    return defineAsyncComponent(icons[path]);
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
