<template>
  <Transition name="fade">
    <div class="modal" v-if="isVisible" @click.self="closeModal">
      <button class="nav-button prev" @click.stop="showPrevious">&lt;</button>
      <button class="nav-button next" @click.stop="showNext">&gt;</button>
      
      <div class="image-container">
        <Transition name="slide" mode="out-in">
          <div :key="photo.id" class="image-wrapper">
            <img 
              class="modal-content" 
              :src="photo.urls.regular" 
              :alt="photo.alt_description || 'Unsplash Image'"
              loading="lazy"
              @load="handleImageLoad"
              @touchstart.prevent="handleTouchStart"
              @touchmove.prevent="handleTouchMove"
              @touchend.prevent="handleTouchEnd"
            />
            <div class="caption" :key="photo.id" v-if="!isLoading">
              <p class="md-text blue-text">{{ photo.user.name ?? 'Unknown' }}</p>
              <p class="sm-text gray-text">{{ photo.user.location ?? 'Unknown' }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { Photo } from '../types/unsplash';

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

$modal-bg: rgba(0, 0, 0, 0.8);
$button-bg: #fff;
$mobile-breakpoint: 600px;
$transition-duration: 0.3s;
$border-radius: 12px;

.modal {
  position: fixed;
  z-index: 1000;
  inset: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: $modal-bg;
  cursor: pointer;
}

.image {
  &-container {
    position: relative;
    max-width: 70vw;
    max-height: 70vh;
    
    @media (max-width: $mobile-breakpoint) {
      max-width: 85vw;
    }
  }

  &-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.modal-content {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: $border-radius;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 50px;
  width: 50px;
  background: $button-bg;
  border: none;
  border-radius: 50%;
  color: #000;
  cursor: pointer;
  transition: background-color $transition-duration;
  
  @media (max-width: $mobile-breakpoint) {
    display: none;
  }
  
  &:hover {
    background: rgba($button-bg, 0.8);
  }
  
  &.prev { left: 20px; }
  &.next { right: 20px; }
}

.caption {
  position: absolute;
  inset: auto 0 0 0; 
  padding: 20px;
  background: $button-bg;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  text-align: left;

  @media (max-width: $mobile-breakpoint) {
    padding: 10px 20px;
  }
}

/* Transitions */
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity $transition-duration ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.slide {
  &-enter-active,
  &-leave-active {
    transition: transform $transition-duration ease, opacity $transition-duration ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(v-bind('slideDirection === "right" ? "50px" : "-50px"'));
  }

  &-leave-to {
    opacity: 0;
    transform: translateX(v-bind('slideDirection === "right" ? "-50px" : "50px"'));
  }
}
</style>