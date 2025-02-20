import { ref } from 'vue';
import unsplashApi from '../api/unsplash';
import type { Photo } from '../types/unsplash';

export const usePhotoStore = () => {
  const photos = ref<Photo[]>([]);
  const selectedPhoto = ref<Photo | null>(null);
  const isModalVisible = ref(false);
  const currentSearchQuery = ref('');
  const isLoading = ref(false);

  const fetchPhotos = async (query = '') => {
    isLoading.value = true;
    try {
      const response = query
        ? await unsplashApi.get('/search/photos', {
            params: { query, per_page: 8 },
          })
        : await unsplashApi.get('/photos', {
            params: { per_page: 8 },
          });

      photos.value = query ? response.data.results : response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const searchPhotos = (query: string) => {
    currentSearchQuery.value = query;
    fetchPhotos(query);
  };

  const openModal = (photo: Photo) => {
    selectedPhoto.value = photo;
    isModalVisible.value = true;
  };

  const changeModalPhoto = (photo: Photo) => {
    selectedPhoto.value = photo;
  };

  const closeModal = () => {
    isModalVisible.value = false;
    setTimeout(() => {
      selectedPhoto.value = null;
    }, 300); 
  };

  return {
    photos,
    selectedPhoto,
    isModalVisible,
    currentSearchQuery,
    isLoading,
    fetchPhotos,
    searchPhotos,
    openModal,
    closeModal,
    changeModalPhoto,
  };
}; 