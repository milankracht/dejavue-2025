<script setup lang="ts">
import { defineProps } from 'vue';
import Icon from '@/components/atoms/BaseIcon.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'tertiary'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <button
    type="button"
    :class="['btn', `btn--${props.type}`, { 'btn--disabled': props.disabled }]"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <slot />
    <Icon v-if="props.icon" :icon="props.icon" size="24" color="#ffffff" />
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  border: 2px solid var(--white);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &--primary {
    background-color: var(--white);
    color: var(--mirage-dark);

    &:hover {
      background-color: var(--mirage-superlight);
    }
  }

  &--secondary {
    background-color: transparent;
    color: var(--white);

    &:hover {
      background-color: var(--mirage-light);
    }
  }

  &--tertiary {
    padding: 0.625rem;
    background-color: transparent;
    border-color: transparent;
    color: var(--white);

    &:hover {
      background-color: var(--mirage-light);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
