<template>
  <XModal :isOpen="isOpen" :backdropCloseable="false" className="modal-loading">
    <div class="loading">
      <XIcon name="loading" size="60px" />
    </div>
  </XModal>
</template>

<script setup lang="ts">
import XModal from '../modal-base/modal-base.vue';
withDefaults(
  defineProps<{
    isOpen: boolean;
  }>(),
  {}
);
</script>

<style scoped lang="scss">
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  svg {
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
