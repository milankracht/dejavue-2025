<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

const emit = defineEmits(['handleChange']);

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

const inputValue = ref(props.value);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const debouncedEmit = (event: Event) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;

  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    emit('handleChange', inputValue.value);
  }, 300);
};

watch(
  () => props.value,
  (newVal) => {
    inputValue.value = newVal;
  },
  { immediate: true },
);
</script>

<template>
  <input type="text" class="text-input" v-model="inputValue" @input="debouncedEmit" />
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.text-input {
  width: 100%;
  height: 2.75rem;
  padding: 0.5rem 1rem;
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-text);
  border: 1px solid var(--mirage-superlight);
  border-radius: 1.375rem;
  background-color: var(--mirage-light);

  &:focus {
    outline: none;
    box-shadow: var(--focus-shadow);
    background-color: var(--mirage-medium);
  }

  @include mixins.bp-md {
    height: 3rem;
    font-size: 1.25rem;
  }
}
</style>
