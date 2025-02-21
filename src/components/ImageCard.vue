<template>
  <div class="image-card" @click="showModal">
    <div v-if="isLoading" class="loading-placeholder" />
    
    <div class="image-overlay" v-show="!isLoading">
      <p class="md-text">{{ photo.user.name ?? 'Unknown' }}</p>
      <p class="sm-text">{{ photo.user.location ?? 'Unknown' }}</p>
    </div>
    
    <img 
      :src="photo.urls.small" 
      :alt="photo.alt_description || 'Unsplash Image'"
      @load="isLoading = false"
      :class="{ hidden: isLoading }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Photo } from '../types/unsplash';

const props = defineProps<{
  photo: Photo;
}>();

const emit = defineEmits<{
  (e: 'show-modal', photo: Photo): void;
}>();

const isLoading = ref(true);

const showModal = () => {
  emit('show-modal', props.photo);
};
</script>

<style scoped lang="scss">
.image-card {
  position: relative;
  cursor: pointer;
  break-inside: avoid;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  color: white;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  transition: opacity 0.3s;

  p {
    margin: 0;
    text-align: left;
  }
}

.loading-placeholder {
  width: 100%;
  height: 300px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.hidden {
  display: none;
}
</style>
