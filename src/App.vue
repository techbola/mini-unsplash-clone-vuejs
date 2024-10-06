<template>
  <div id="app">
    <div class="search-section">
      <div class="search-section-container">
        <input
          v-if="!searched"
          v-model="query"
          placeholder="Search Unsplash"
          @keyup.enter="searchImages"
          class="search-input"
        />
        <div v-else class="search-result">
          <h2>
            Search results for
            <span class="search-result-query">"{{ query }}"</span>
          </h2>
        </div>
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

    <transition name="modal-fade">
      <ImageModal
        v-if="showModal"
        :image="selectedImage"
        :show="showModal"
        @close="closeModal"
      />
    </transition>
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
.search-section-container {
  max-width: 1224px;
  width: 90%;
  margin: 0 auto;
}
.search-section {
  background-color: var(--grey);
  height: 250px;
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-input {
  min-width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid var(--light-grey);
  border-radius: 6px;
}

.search-result-query {
  color: var(--text-blue2);
}

.no-results {
  text-align: center;
  font-size: 18px;
  color: var(--text-blue);
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

@media screen and (max-width: 768px) {
  .search-section {
    height: 200px;
  }
}
</style>
