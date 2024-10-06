<template>
  <div class="skeleton-loader">
    <div class="image-placeholder"></div>
    <div class="text-placeholder"></div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-loader {
  .image-placeholder {
    width: 100%;
    height: 200px;
    background-color: var(--light-grey);
    margin-bottom: 10px;
  }
  .text-placeholder {
    width: 60%;
    height: 20px;
    background-color: var(--light-grey2);
  }
}
</style>
