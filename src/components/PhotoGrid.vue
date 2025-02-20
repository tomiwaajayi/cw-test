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
.photo-grid {
  max-width: 800px;
  margin: -60px auto 0;
  padding: 20px;
  columns: 3;
  column-gap: 20px;

  @media (max-width: 768px) {
    columns: 2;
  }

  @media (max-width: 480px) {
    columns: 1;
  }
}
</style> 