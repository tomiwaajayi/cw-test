<template>
  <div class="caption">
    <p class="md-text blue-text">{{ photo.user.name ?? 'Unknown' }}</p>
    <p class="sm-text gray-text">{{ photo.user.location ?? 'Unknown' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '../../types/unsplash';

defineProps<{
  photo: Photo;
}>();
</script>

<style scoped lang="scss">
.caption {
  position: absolute;
  inset: auto 0 0 0; 
  padding: 20px;
  background: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  text-align: left;

  @media (max-width: 600px) {
    padding: 10px 20px;
  }
}
</style> 