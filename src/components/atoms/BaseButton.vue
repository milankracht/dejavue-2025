<script setup lang="ts">
import { defineProps, useSlots } from 'vue';
import { GLOBAL } from '@/utils/constants';
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
  iconPosition: {
    type: String,
    default: 'right',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
  handleClick: {
    type: Function,
    default: () => {},
  },
});

const slots = useSlots();
const hasSlotContent = !!slots.default;
</script>

<template>
  <button
    type="button"
    :class="['btn', `btn--${props.type}`, { 'btn--disabled': props.disabled }]"
    :disabled="props.disabled"
    @click="$emit('handleClick')"
  >
    <Icon
      v-if="props.icon && props.iconPosition === 'left'"
      :icon="props.icon"
      size="24"
      :color="GLOBAL.COLORS.WHITE"
    />
    <span v-if="hasSlotContent" class="btn__label">
      <slot />
    </span>
    <Icon
      v-if="props.icon && props.iconPosition === 'right'"
      :icon="props.icon"
      size="24"
      :color="GLOBAL.COLORS.WHITE"
    />
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.btn {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  width: auto;
  height: 3rem;
  padding: 0.625rem 0.75rem;
  font-family: var(--font-text);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  border-radius: 1.5rem;
  border: 2px solid var(--white);
  cursor: pointer;
  transition: var(--transition-out);

  &:hover {
    transition: var(--transition-in);
  }

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
    height: 2.5rem;
    padding: 0.5rem;
    margin: 2px;
    background-color: transparent;
    border: none;
    color: var(--white);

    &:hover {
      background-color: var(--mirage-light);
    }

    @include mixins.bp-md {
      height: 2.75rem;
      padding: 0.625rem;
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .btn__label {
    padding: 0 0.5rem;
    font-weight: 700;
  }
}
</style>
