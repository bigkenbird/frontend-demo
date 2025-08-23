<template>
  <footer v-show="isShow"></footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// =================================
// props and emits
// =================================

interface Props {
  isShow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  isLogin: true,
});

let isShow = ref(props.isShow);

function toggleVisible() {
  isShow.value = !isShow.value;
}

function isVisible(): boolean {
  return isShow.value;
}

function setVisible(isVisible: boolean) {
  isShow.value = isVisible;
}

defineExpose({
  toggleVisible,
  isVisible,
  setVisible,
});
</script>

<style scoped lang="scss">
@import 'footer.scss';
</style>
