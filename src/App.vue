<template>
  <div id="app">
    <div class="header">
      <SearchBar @search="searchPhotos" />
      <p v-if="isLoading && currentSearchQuery.trim()" class="search-status blue-text">
        Searching for <span class="gray-text">"{{ currentSearchQuery }}"</span>
      </p>
      <p v-else-if="currentSearchQuery && photos.length > 0" class="search-status blue-text">
        Search results for <span class="gray-text">"{{ currentSearchQuery }}"</span>
      </p>
      <p v-else-if="currentSearchQuery && photos.length === 0" class="search-status blue-text">
        No results found for <span class="gray-text">"{{ currentSearchQuery }}"</span>
      </p>
    </div>
    
    <PhotoGrid 
      :photos="photos"
      :isLoading="isLoading"
      @show-modal="openModal"
    />
    
    <ImageModal
  v-if="selectedPhoto"
  :photo="selectedPhoto"
  :photos="photos"
  :isVisible="isModalVisible"
  @close="closeModal"
  @change="changeModalPhoto"
/>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import PhotoGrid from './components/PhotoGrid.vue';
import ImageModal from './components/ImageModal.vue';
import { usePhotoStore } from './store/photoStore';

const photoStore = usePhotoStore();
const { fetchPhotos, photos, isLoading, currentSearchQuery, openModal, searchPhotos, selectedPhoto, isModalVisible, closeModal, changeModalPhoto } = photoStore;

onMounted(() => {
  fetchPhotos();
});
</script>

<style lang="scss">
@import './styles/_variables.scss';

.header {
  background-color: #DCE3EB;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-status {
  max-width: 800px;
  margin: 20px auto 0;
  padding: 0 20px;
  font-size: 32px;
  font-weight: 500;
  text-align: center;

  @include responsive(tablet) {
    font-size: 20px;
  }

  @include responsive(mobile) {
    font-size: 16px;
  }
}
</style>
