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

const iconComponent = computed(() => {
  try {
    return defineAsyncComponent(() => import(`@/assets/icons/${props.icon}.svg`));
  } catch (err) {
    console.warn(`Icon not found: ${props.icon}: ${err}`);
    return null;
  }
});
</script>

<template>
  <div class="icon" :style="`width: ${props.size}px; height: ${props.size}px`">
    <component :is="iconComponent" :style="`fill: ${props.color}`" />
  </div>
</template>

<style scoped>
.icon {
  display: inline-block;
}
</style>
