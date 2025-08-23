<template>
  <div
    :class="['page-fixed-bottom-block', { 'has-footer': hasFooter }]"
    ref="pageFixBottomEl"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, render, onUnmounted } from 'vue';
import { useSharedDataService } from '@twix/ix-lib-vue';

const pageFixBottomEl = ref<HTMLElement | null>(null);
const height = ref(0);
withDefaults(
  defineProps<{
    hasFooter?: boolean;
  }>(),
  {
    bg: 'neutral-50',
    hasFooter: false,
  }
);
onMounted(() => {
  // 獲取page-fix-bottom高度（無padding)
  let paddingBottom = Number(
    window
      .getComputedStyle(pageFixBottomEl.value as HTMLElement, null)
      .getPropertyValue('padding-bottom')
      .replace('px', '')
  );
  height.value = pageFixBottomEl.value?.offsetHeight - paddingBottom || 0;

  // 在page-wrapper最下方加入佔位空間，避免頁面底部內容被遮住。
  const container = document.createElement('div');
  container.classList.add('fixed-bottom-block-space');
  const vnode = h('div', {
    style: { height: height.value + 'px' },
    // class: 'fixed-bottom-block-space',
  }); //生成虛擬DOM
  render(
    vnode,
    useSharedDataService()
      .getPageRootElement()
      .querySelector('.page-wrapper')
      ?.appendChild(container)
  ); //將虛擬DOM掛到真實DOM上面
});
onUnmounted(() => {
  // 移除該佔位空間
  useSharedDataService()
    .getPageRootElement()
    .querySelector('.page-wrapper')
    ?.removeChild(
      useSharedDataService()
        .getPageRootElement()
        .querySelector('.fixed-bottom-block-space')
    );
});
// =================================
// 舊寫法：直接加在template上
// =================================
//  <div
//     class="fixed-bottom-block-space"
//     :style="{ height: height + 'px' }"
//   ></div>
</script>

<style scoped lang="scss">
@import 'page-fix-bottom.scss';
</style>
