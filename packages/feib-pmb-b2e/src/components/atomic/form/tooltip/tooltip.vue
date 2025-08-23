<template>
  <div class="tooltip" @mouseover="mouseover">
    <div ref="tooltipTextEl" class="tooltiptext" v-html="tipText" :style="{ top: `-${top}px`, marginLeft: `-${marginLeft}px`}"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tooltipTextEl = ref();
const top = ref(0);
const marginLeft = ref(0);

withDefaults(
  defineProps<{
    tipText?: string;
  }>(),
  {
    tipText: 'tip',
  }
);

const mouseover = () => {
  top.value = tooltipTextEl.value.clientHeight;
  marginLeft.value = tooltipTextEl.value.offsetWidth / 2;
}
</script>

<style scoped lang="scss">
@import 'tooltip.scss';
</style>
