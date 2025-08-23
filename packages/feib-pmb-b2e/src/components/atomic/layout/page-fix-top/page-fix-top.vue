<template>
  <div class="fixed-top-block-space" :style="{ height: height + 'px' }"></div>
  <div class="page-fixed-top-block" ref="pageFixTopEl">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const pageFixTopEl = ref<HTMLElement | null>(null);
const height = ref(0);
onMounted(() => {
  height.value = pageFixTopEl.value?.clientHeight || 0;
});
</script>

<style scoped lang="scss">
@import 'page-fix-top.scss';
</style>
