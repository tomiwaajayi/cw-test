<template>
  <Transition name="fade">
    <div class="modal" 
      v-if="isVisible" 
      @click.self="closeModal"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <ModalNavButton direction="prev" @click="showPrevious" />
      <ModalNavButton direction="next" @click="showNext" />
      
      <div class="image-container">
        <Transition name="slide" mode="out-in">
          <div :key="photo.id">
            <ModalImage 
              :photo="photo"
              @load="handleImageLoad"
            />
            <ModalCaption 
              v-if="!isLoading"
              :photo="photo"
            />
          </div>
        </Transition>
        
        <ModalIndicators
          :total="photos.length"
          :current-index="currentIndex"
          @select="goToSlide"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { Photo } from '../types/unsplash';
import ModalNavButton from './modal/ModalNavButton.vue';
import ModalImage from './modal/ModalImage.vue';
import ModalCaption from './modal/ModalCaption.vue';
import ModalIndicators from './modal/ModalIndicators.vue';

const props = defineProps<{
  photo: Photo;
  photos: Photo[];
  isVisible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'change', photo: Photo): void;
}>();

const currentIndex = computed(() => 
  props.photos.findIndex(p => p.id === props.photo.id)
);

const hasPrevious = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < props.photos.length - 1);


const touchStart = ref(0);
const touchEnd = ref(0);
const minSwipeDistance = 50;

const isLoading = ref(true);
const slideDirection = ref('right');

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = e.touches[0].clientX;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEnd.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeDistance = touchEnd.value - touchStart.value;
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      slideDirection.value = 'left';
      showPrevious();
    } else {
      slideDirection.value = 'right';
      showNext();
    }
  }
};

const showPrevious = () => {
  if (hasPrevious.value) {
    slideDirection.value = 'left';
    emit('change', props.photos[currentIndex.value - 1]);
  } else {
    slideDirection.value = 'left';
    emit('change', props.photos[props.photos.length - 1]);
  }
};

const showNext = () => {
  if (hasNext.value) {
    slideDirection.value = 'right';
    emit('change', props.photos[currentIndex.value + 1]);
  } else {
    slideDirection.value = 'right';
    emit('change', props.photos[0]);
  }
};

const closeModal = () => {
  emit('close');
};

const handleImageLoad = () => {
  isLoading.value = false;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isVisible) return;
  
  if (e.key === 'ArrowLeft') {
    showPrevious();
  } else if (e.key === 'ArrowRight') {
    showNext();
  } else if (e.key === 'Escape') {
    closeModal();
  }
};

const goToSlide = (index: number) => {
  slideDirection.value = index > currentIndex.value ? 'right' : 'left';
  emit('change', props.photos[index]);
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

watch(() => props.photo, () => {
  isLoading.value = true;
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
}

.image-container {
  position: relative;
  max-width: 70vw;
  max-height: 70vh;
  
  @media (max-width: 600px) {
    max-width: 85vw;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(v-bind('slideDirection === "right" ? "50px" : "-50px"'));
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(v-bind('slideDirection === "right" ? "-50px" : "50px"'));
}
</style>