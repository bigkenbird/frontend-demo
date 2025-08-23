<template>
  <div
    :class="[
      'button-block',
      { 'is-fixed': isFixed },
      `${bg}`,
      { 'fixed-with-footer': hasFooter },
      classStr,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    isFixed?: boolean;
    bg?: '' | 'bg-neutral-50' | 'bg-neutral-100' | 'bg-white';
    hasFooter?: boolean;
    classStr?: string;
  }>(),
  {
    isFixed: false,
    bg: '',
    hasFooter: false,
  }
);
</script>

<style scoped lang="scss">
@import 'button.scss';
</style>
