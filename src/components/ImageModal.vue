<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="image-container">
        <img :src="image.urls.full" :alt="image.alt_description" />
      </div>
      <div class="info-section">
        <span class="author-name">{{ image.user.name }}</span>
        <span class="location">{{
          image.user.location || "Unknown Location"
        }}</span>
      </div>
    </div>
    <button class="close-button" @click="closeModal">X</button>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
  // Restore body overflow
  document.body.style.overflow = "auto";
};

onMounted(() => {
  // Prevent scrolling when modal is open
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  // Restore scrolling when modal is closed
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 600px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.info-section {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--white);
  margin-top: -6px;
}

.author-name {
  font-size: 14px;
  font-weight: bold;
  color: var(--dark-grey);
}

.location {
  font-size: 12px;
  color: var(--light-grey3);
}

.close-button {
  position: absolute;
  top: 50px;
  right: 50px;
  background: transparent;
  border: none;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .modal-content {
    width: calc(100% - 40px);
  }

  .image-container {
    height: auto;
  }

  .image-container img {
    min-height: 150px;
  }
}
</style>
