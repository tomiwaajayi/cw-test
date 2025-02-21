<template>
  <div class="skeleton-grid">
    <div 
      v-for="n in count" 
      :key="n" 
      class="skeleton-card"
      :style="{ height: getRandomHeight() }"
    >
      <div class="skeleton-image "></div>
      <div class="skeleton-info">
        <div class="skeleton-text pulse"></div>
        <div class="skeleton-text-small pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    default: 8
  }
});

const CARD_HEIGHTS = ['250px', '300px', '350px', '400px'] as const;

const getRandomHeight = () => {
  return CARD_HEIGHTS[Math.floor(Math.random() * CARD_HEIGHTS.length)];
};
</script>

<style scoped lang="scss">
@import '../styles/_variables.scss';

.skeleton-grid {
  max-width: 800px;
  margin: -60px auto 0;
  columns: 3;
  column-gap: 20px;
  padding: 20px;

  @include responsive(tablet) {
    columns: 2;
  }

  @include responsive(mobile) {
    columns: 1;
  }
}

.skeleton-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

%skeleton-element {
  background-color: #f6f6f6;
  position: absolute;
}

.skeleton-image {
  @extend %skeleton-element;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.skeleton-info {
  @extend %skeleton-element;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(180deg, transparent 0%, #f6f6f6 100%);
}

%skeleton-text-base {
  background-color: #e7e7e7;
  border-radius: 4px;
}

.skeleton-text {
  @extend %skeleton-text-base;
  height: 20px;
  margin-bottom: 8px;
  width: 70%;
}

.skeleton-text-small {
  @extend %skeleton-text-base;
  height: 14px;
  width: 50%;
}

.pulse {
  @keyframes pulse {
    50% { opacity: 1; }
  }
  
  opacity: 0.6;
  animation: pulse 1.5s ease-in-out infinite;
}
</style> 