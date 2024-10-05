<template>
  <div id="app">
    <div class="search-section">
      <input
        v-model="query"
        placeholder="Search Unsplash"
        @keyup.enter="searchImages"
        class="search-input"
      />
      <div v-if="searched" class="search-result">
        <h2>Search results for "{{ searchedQuery }}"</h2>
      </div>
    </div>

    <div class="image-grid">
      <p v-if="images.length === 0 && searched" class="no-results">
        No results found
      </p>

      <SkeletonLoader v-if="loading" v-for="n in 9" :key="n" />

      <div
        v-for="(images, i) in chunkArray(images, 3)"
        :key="i"
        class="image-grid-row"
      >
        <ImageCard
          v-for="image in images"
          :key="image.id"
          :image="image"
          @click="openModal(image)"
        />
      </div>
    </div>

    <ImageModal
      v-if="showModal"
      :image="selectedImage"
      :show="showModal"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import unsplashService from "./services/unsplashService";
import ImageCard from "./components/ImageCard.vue";
import ImageModal from "./components/ImageModal.vue";
import SkeletonLoader from "./components/SkeletonLoader.vue";

const images = ref([]);
const query = ref("");
const searchedQuery = ref("");
const loading = ref(false);
const searched = ref(false);
const showModal = ref(false);
const selectedImage = ref(null);

const fetchAfricanImages = async (query_param) => {
  loading.value = true;
  try {
    const response = await unsplashService.searchPhotos(query_param, 1, 8);
    images.value = response.data.results;
  } finally {
    loading.value = false;
    query.value = "";
  }
};

const searchImages = async () => {
  if (query.value.trim() === "") {
    // If search input is empty, fetch African images
    searched.value = false;
    fetchAfricanImages("Africa");
    return;
  }

  loading.value = true;
  searched.value = true;
  searchedQuery.value = query.value;
  fetchAfricanImages(query.value);
};

const openModal = (image) => {
  selectedImage.value = image;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedImage.value = null;
};
const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

onMounted(() => {
  fetchAfricanImages("Africa");
});
</script>

<style scoped>
.search-section {
  background-color: #f5f5f5;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-input {
  min-width: 70%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.search-result {
  text-align: center;
}

.no-results {
  text-align: center;
  font-size: 18px;
  color: #777;
}

.image-grid {
  max-width: 1224px;
  width: 90%;
  margin: 0 auto;
  margin-top: -40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.image-grid-row {
  display: flex;
  flex-flow: wrap;
}

.image-grid-row .image-card:last-child {
  margin-bottom: 0;
}
</style>
