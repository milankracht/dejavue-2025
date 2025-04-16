<script setup lang="ts">
import { defineProps, computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import showStore from '@/store/show';

import { GLOBAL } from '@/utils/constants';

import Heading from '@/components/atoms/BaseHeading.vue';
import Slide from '@/components/molecules/PosterSlide.vue';
import Icon from '../atoms/BaseIcon.vue';

const props = defineProps({
  genre: {
    type: String,
    required: true,
  },
});

const scrollLeft = ref(0);
const scrollableWidth = ref(0);
const clientWidth = ref(0);

const showsByGenre = computed(() => {
  return showStore.getShowsByGenre(props.genre);
});

const scrollable = computed(() => {
  return document.getElementById(`${props.genre}__scrollable`);
});

const sliderButtonLeftIsVisible = computed(() => {
  return scrollLeft.value > 0;
});

const sliderButtonRightIsVisible = computed(() => {
  return scrollLeft.value < scrollableWidth.value - clientWidth.value;
});

const updateScrollSpecs = () => {
  if (scrollable.value) {
    scrollLeft.value = scrollable.value.scrollLeft;
    scrollableWidth.value = scrollable.value.scrollWidth;
    clientWidth.value = scrollable.value.clientWidth;
  }
};

watch(showsByGenre, async () => {
  await nextTick();
  updateScrollSpecs();
});

const scrollHandler = (direction: 'left' | 'right') => {
  if (!scrollable.value) return;

  const scrollAmount = direction === 'left' ? -clientWidth.value : clientWidth.value;
  scrollable.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth',
  });

  setTimeout(updateScrollSpecs, 300);
};

onMounted(() => {
  if (scrollable.value) {
    scrollable.value.addEventListener('scroll', updateScrollSpecs);
    updateScrollSpecs();
  }
});

onUnmounted(() => {
  if (scrollable.value) {
    scrollable.value.removeEventListener('scroll', updateScrollSpecs);
  }
});
</script>

<template>
  <div class="slider">
    <div class="slider__heading">
      <Heading size="xl">{{ props.genre }}</Heading>
    </div>
    <div :id="`${props.genre}__scrollable`" class="slider__scrollable">
      <Slide v-for="show in showsByGenre" :key="show.id" :show="show" />
    </div>
    <button
      v-if="sliderButtonLeftIsVisible"
      class="slider__button-left"
      @click="() => scrollHandler('left')"
    >
      <Icon icon="chevron-round-left" size="64" :color="GLOBAL.COLORS.WHITE" />
    </button>
    <button
      v-if="sliderButtonRightIsVisible"
      class="slider__button-right"
      @click="() => scrollHandler('right')"
    >
      <Icon icon="chevron-round-right" size="64" :color="GLOBAL.COLORS.WHITE" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.slider {
  position: relative;
  width: 100vw;

  @include mixins.bp-md {
    margin-bottom: 1rem;
  }
}

.slider__heading {
  padding: 0.5rem 1.25rem;
}

.slider__scrollable {
  width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  padding: 0 0.75rem;
  white-space: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 0.75rem;
}

.slider__button-left,
.slider__button-right {
  position: absolute;
  display: none;
  top: calc(50% - 2rem);
  width: 4rem;
  height: 4rem;
  background: transparent;
  border: none;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.15s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.75;
    transition: all 0.3s ease;
  }

  @include mixins.bp-md {
    display: block;
  }
}
.slider__button-left {
  left: 0;
}
.slider__button-right {
  right: 0.5rem;
}
</style>
