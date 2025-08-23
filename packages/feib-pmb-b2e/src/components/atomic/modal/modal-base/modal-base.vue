<template>
  <Teleport :to="appendToEle" :disabled="isInline">
    <div
      v-show="isOpen"
      :class="['modal', className]"
      :style="{ zIndex: modalZIndex }"
      ref="modalContainerEl"
    >
      <div
        v-if="hasBackDrop"
        :class="[
          'modal-backdrop',
          { 'modal-backdrop-transparent': backdropTransparent },
        ]"
        v-bind-click="backdrop"
      ></div>
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { IAction } from '@twix/ix-lib-base';
import { useSharedDataService } from '@twix/ix-lib-vue';

interface Props {
  isOpen: boolean;
  hasBackDrop?: boolean;
  backdropCloseable?: boolean;
  backdropTransparent?: boolean;
  className?: string;
  appendTo?: string;
  isInline?: boolean;
  customZIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
  backdropCloseable: false,
  backdropTransparent: false,
  appendTo: 'body',
  isInline: false,
  hasBackDrop: true,
});

const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
  (event: 'backdrop', value: IAction): void;
  (event: 'show'): void;
  (event: 'after-hide'): void;
}>();

const appendToEle =
  props.appendTo == 'body'
    ? useSharedDataService().getPageRootElement()
    : props.appendTo;

const modalContainerEl = ref<HTMLElement | null>(null);

function backdrop(action: IAction) {
  if (props.backdropCloseable == true) {
    emit('backdrop', action);
    emit('update:isOpen', false);
  }
  action.done();
}
const modalZIndex = ref<number | undefined>(undefined);

function setModalZIndex(zindex: number) {
  modalZIndex.value = zindex || 1000;
}

watch(
  () => props.customZIndex,
  (newVal) => {
    setModalZIndex(newVal);
  }
);

// expose給其它component使用：動畫進來前，設定z-index
function onModalBeforeEnter(): void {
  setModalZIndex(props.customZIndex);
}

// expose給其它component使用：動畫進來,modal出現的時候，新增modal-in class,body class處理
function onModalEnter(): void {
  // console.log('onModalEnter');
  modalContainerEl.value?.classList.add('modal-in');
  document.body.classList.add('overflow-hidden');

  emit('show');
}
// expose給其它component使用：動畫結束後才可關閉整個modal：還原body class、modal-in
function onModalAfterLeave(): void {
  // console.log('onModalAfterLeave');
  modalContainerEl.value?.classList.remove('modal-in');
  // 清除zIndex
  modalZIndex.value = undefined;

  // 若沒有modal了，清除body class
  document.body.classList.remove('overflow-hidden');

  emit('after-hide');
}

// 開放給dialog、drawer、toast...等使用
defineExpose({
  onModalBeforeEnter,
  onModalEnter,
  onModalAfterLeave,
});
</script>

<style scoped lang="scss">
@import './modal-base.scss';
</style>
