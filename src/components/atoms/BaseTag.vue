<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="tag">
    {{ props.label }}
  </div>
</template>

<style scoped lang="scss">
.tag {
  display: inline-block;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem;
  border-radius: 1.5rem;
  color: var(--color-text);
  border: 1px solid var(--color-text);
}
</style>
