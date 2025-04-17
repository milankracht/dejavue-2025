<script setup lang="ts">
import { defineProps } from 'vue';

import DataListItem from '@/components/molecules/DataListItem.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <dl class="data-list">
    <DataListItem v-for="(item, index) in props.items" :key="index" :item="item" />
  </dl>
</template>

<style scoped lang="scss">
.data-list {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  padding: 0;
  border-top: 1px solid var(--color-border);
}
</style>
