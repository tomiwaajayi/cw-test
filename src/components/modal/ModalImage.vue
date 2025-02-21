<template>
  <div class="image-wrapper">
    <img 
      class="modal-content" 
      :src="photo.urls.regular" 
      :alt="photo.alt_description || 'Unsplash Image'"
      loading="lazy"
      @load="$emit('load')"
      @touchstart.prevent="$emit('touchstart', $event)"
      @touchmove.prevent="$emit('touchmove', $event)"
      @touchend.prevent="$emit('touchend')"
    />
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '../../types/unsplash';

defineProps<{
  photo: Photo;
}>();
</script>

<style scoped lang="scss">
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.modal-content {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
}
</style> 