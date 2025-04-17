<script setup lang="ts">
import { defineProps, computed } from 'vue';
import DOMPurify from 'dompurify';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const htmlSafeValue = computed(() => {
  return DOMPurify.sanitize(props.item.value);
});
</script>

<template>
  <dt>{{ props.item.label }}</dt>
  <dd v-html="htmlSafeValue" />
</template>

<style scoped lang="scss">
dt,
dd {
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

dd {
  font-weight: 700;
}
</style>
