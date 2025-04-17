<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchShowById } from '@/services/shows';
import type { Show } from '@/types';
import { readableDate, hyperlink } from '@/utils/helper';
import DOMPurify from 'dompurify';
import { useNavigationHistory } from '@/composables/useNavigationHistory';

import Heading from '@/components/atoms/BaseHeading.vue';
import Button from '@/components/atoms/BaseButton.vue';
import Image from '@/components/atoms/BaseImage.vue';
import Rating from '@/components/molecules/StarRatingWide.vue';
import Tag from '@/components/atoms/BaseTag.vue';
import DataList from '@/components/organisms/DataList.vue';

const route = useRoute();
const router = useRouter();
const nav = useNavigationHistory();
const showId = route.params.id as string;

const showDetails = ref<Show | null>(null);

const htmlSafeSummary = computed(() => {
  const safeString = showDetails.value?.summary
    ? DOMPurify.sanitize(showDetails.value.summary)
    : `No description available`;
  return DOMPurify.sanitize(safeString);
});

const listData = computed(() => {
  return [
    {
      label: 'Language',
      value: showDetails.value?.language || 'Unknown',
    },
    {
      label: 'Premiered',
      value: readableDate(showDetails.value?.premiered),
    },
    {
      label: 'Ended',
      value: readableDate(showDetails.value?.ended),
    },
    {
      label: 'Official site',
      value: hyperlink(showDetails.value?.officialSite ?? '') || '-',
    },
  ];
});

const toPreviousView = () => {
  const last = nav.last()?.path?.toString() || '/';
  router.push(last);
};

onMounted(async () => {
  showDetails.value = await fetchShowById(showId);
});
</script>

<template>
  <main>
    <div class="show">
      <div class="show__header">
        <Heading size="xxl">{{ showDetails?.name || `Show could not be loaded` }}</Heading>
        <Button
          type="tertiary"
          icon="chevron-round-left"
          icon-position="left"
          @click="toPreviousView"
          >Back</Button
        >
      </div>
      <div class="show__content">
        <div class="show__image">
          <div class="show__image-container">
            <Image
              v-if="showDetails?.image?.original"
              :src="showDetails.image.original"
              :alt="`${showDetails.name} Poster`"
            />
          </div>
        </div>
        <div class="show__description" v-html="htmlSafeSummary" />
        <div class="show__rating">
          <Rating :rating="showDetails?.rating?.average || null" />
        </div>
        <div class="show__tags">
          <Tag v-for="(genre, index) in showDetails?.genres" :key="index" :label="genre" />
        </div>
        <div class="show__specs">
          <DataList :items="listData" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as mixins;

.show {
  position: relative;
  width: 100%;
  max-width: 55rem;
  margin: 0 auto 2rem;
  padding: 0 1rem;

  &__header {
    display: flex;
    flex-direction: column;

    @include mixins.bp-md {
      padding-bottom: 1rem;
    }
  }

  &__content {
    display: grid;
    grid-template-rows: repeat(5, auto);
    gap: 1rem;
    padding: 1rem 0;

    @include mixins.bp-md {
      gap: 2rem;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: repeat(4, auto);
    }
  }

  &__image {
    width: 100%;

    @include mixins.bp-md {
      grid-row: 1 / span 4;
    }
  }

  &__image-container {
    width: 100%;
    aspect-ratio: 2 / 3;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  &__description {
    font-size: 1.25rem;
  }

  &__rating {
    align-items: start;
    padding: 0.5rem 0;
  }

  &__tags {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  &__specs {
    padding: 0.5rem 0;
  }
}
</style>
