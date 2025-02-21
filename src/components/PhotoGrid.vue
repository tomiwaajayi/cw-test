<template>
  <SkeletonGrid v-if="isLoading" />
  <div v-else class="photo-grid">
    <ImageCard
      v-for="photo in photos"
      :key="photo.id"
      :photo="photo"
      @show-modal="onShowModal"
    />
  </div>
</template>

<script setup lang="ts">
import ImageCard from './ImageCard.vue';
import SkeletonGrid from './SkeletonGrid.vue';
import type { Photo } from '../types/unsplash';

defineProps<{
  photos: Photo[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'show-modal', photo: Photo): void;
}>();

const onShowModal = (photo: Photo): void => {
  emit('show-modal', photo);
};
</script>

<style scoped lang="scss">
@import '../styles/_variables.scss';

.photo-grid {
  max-width: 800px;
  margin: -60px auto 0;
  padding: 20px;
  columns: 3;
  column-gap: 20px;

  @include responsive(tablet) {
    columns: 2;
  }

  @include responsive(mobile) {
    columns: 1;
  }
}
</style> 