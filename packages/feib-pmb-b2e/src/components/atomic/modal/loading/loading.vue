<template>
  <div v-show="isOpen" class="modal loading-fade-in">
    <div class="modal-backdrop">
      <div class="loading">
        <XIcon name="loading" size="60px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isOpen: boolean;
  }>(),
  {}
);
</script>

<style scoped lang="scss">
@import "./loading.scss";
</style>
