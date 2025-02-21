<template>
  <div class="indicators">
    <button 
      v-for="(_, index) in total" 
      :key="index"
      class="indicator"
      :class="{ active: index === currentIndex }"
      @click.stop="$emit('select', index)"
    ></button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  total: number;
  currentIndex: number;
}>();
</script>

<style scoped lang="scss">
.indicators {
  display: none;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  gap: 8px;
  
  @media (max-width: 600px) {
    display: flex;
  }
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(#fff, 0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &.active {
    background: #fff;
  }
}
</style> 