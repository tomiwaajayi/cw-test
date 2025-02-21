<template>
  <button class="nav-button" :class="direction" @click.stop="$emit('click')">
    <svg v-if="direction === 'prev'" class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  direction: 'prev' | 'next'
}>();
</script>

<style scoped lang="scss">
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 50px;
  width: 50px;
  background: #fff;
  border: none;
  border-radius: 50%;
  color: #0c254e; ;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 600px) {
    display: none;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: rgba(#fff, 0.8);
  }
  
  &.prev { left: 20px; }
  &.next { right: 20px; }
}
</style> 