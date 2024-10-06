<template>
  <div
    class="image-card"
    @click="$emit('click')"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="image-container">
      <img :src="image.urls.regular" :alt="image.alt_description" />

      <div class="info-section">
        <span class="author-name">{{ image.user.name }}</span>
        <span class="location">{{
          image.user.location || "Unknown Location"
        }}</span>
      </div>

      <div v-if="isHovered" class="overlay"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["image"]);
const isHovered = ref(false);
</script>

<style lang="scss" scoped>
.image-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  margin: 0;
  margin-bottom: 30px;
}

.image-container {
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .overlay:hover {
    opacity: 1;
  }
}

.info-section {
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
}

.author-name {
  font-size: 14px;
  font-weight: bold;
  color: var(--white);
}

.location {
  font-size: 12px;
  color: var(--light-grey);
}
</style>
