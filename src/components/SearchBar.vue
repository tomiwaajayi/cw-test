<template>
  <div class="search-bar">
    <div class="search-input-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-search"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
      <input 
        type="text" 
        v-model="query" 
        @input="debouncedSearch"
        @keyup.enter="handleEnterSearch" 
        placeholder="Search for photo"
        class="search-input" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import debounce from 'lodash/debounce';

const emit = defineEmits<{
  search: [query: string]
}>();
const query = ref('');

const searchPhotos = () => {
  emit('search', query.value);
};

const debouncedSearch = debounce(() => {
  searchPhotos();
}, 2000);

const handleEnterSearch = () => {
  debouncedSearch.cancel();
  searchPhotos();
};

onBeforeUnmount(() => {
  debouncedSearch.cancel();
});
</script>

<style scoped lang="scss">
.search-bar {
  width: 100%;
  max-width: 1200px;
  padding: 0 80px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
}

.search-input-container {
  position: relative;
  width: 100%;

  .icon-tabler-search {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #666;
  }

  input {
    width: 100%;
    padding: 10px 10px 10px 40px;
    border: 0;
    border-radius: 4px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    background-color: #f5f5f5;
    transition: all 0.2s ease;
    
    &:focus {
      background-color: #fff;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>

