<template>
  <div
    :class="['result-animation', type === 'success' ? 'is-success' : 'is-fail']"
  >
    <svg
      version="1.1"
      baseProfile="full"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      class="result-animation-bg"
    >
      <circle cx="50%" cy="50%" r="10" />
    </svg>
    <div class="result-animation-mark"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'success' | 'fail';
  }>(),
  {
    type: 'success',
  }
);
</script>

<style scoped lang="scss">
@import 'result-animation.scss';
</style>
