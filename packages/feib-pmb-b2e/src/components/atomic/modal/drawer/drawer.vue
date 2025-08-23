<template>
  <XModal
    v-model:isOpen="containerVisible"
    ref="XModalRef"
    :backdropCloseable="false"
    :className="className"
    :appendTo="appendTo"
    :isInline="isInline"
    :customZIndex="modalBaseZIndex"
  >
    <Transition
      :name="transitionName"
      @before-enter="onDrawerBeforeEnter"
      @enter="onDrawerEnter"
      @after-leave="onDrawerAfterLeave"
    >
      <div :class="'drawer-dialog'" v-show="isOpen">
        <div
          :class="[
            'drawer-header',
            { 'drawer-header-bottom-line': headerButtomLine },
          ]"
        >
          <div class="drawer-back-btn" v-if="isBackable">
            <XIcon name="chevron-left" size="20px" v-bind-click="back"></XIcon>
          </div>

          <slot
            name="drawerTitleBlock"
            :drawerTitle="drawerTitle"
            :drawerSubtitle="drawerSubtitle"
            :isCloseable="isCloseable"
          >
            <div class="drawer-title-block">
              <div
                :class="['drawer-title', { 'px-5 relative': isBackable }]"
                v-if="drawerTitle"
              >
                {{ drawerTitle }}
              </div>

              <div class="drawer-subtitle" v-if="drawerSubtitle">
                {{ drawerSubtitle }}
              </div>
            </div>
          </slot>
          <div class="drawer-close-btn" v-if="isCloseable">
            <XIcon name="close" size="20px" v-bind-click="close"></XIcon>
          </div>
        </div>
        <div class="drawer-body">
          <slot></slot>
        </div>
        <div class="drawer-footer" v-if="hasFooter">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </XModal>
</template>

<script setup lang="ts">
import { IAction } from '@twix/ix-lib-base';
import { ref, onUpdated, onMounted, useSlots } from 'vue';
import XModal  from '../modal-base/modal-base.vue';
import { useSharedDataService } from '@twix/ix-lib-vue';

// =================================
// props emits var
// =================================
interface Props {
  // for drawer dialog
  isOpen: boolean;
  isCloseable?: boolean;
  isBackable?: boolean;
  headerButtomLine?: boolean;
  drawerTitle?: string;
  drawerSubtitle?: string;
  isTransition?: boolean;

  // for modal base
  className?: string;
  appendTo?: string;
  isInline?: boolean;
  customZIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
  isCloseable: true,
  isBackable: false,
  isTransition: true,
  headerButtomLine: true,
});
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
  (event: 'close', action: IAction): void;
  (event: 'show'): void;
  (event: 'after-hide'): void;
  (event: 'back', action: IAction): void;
}>();
const XModalRef = ref<any>(null);
const containerVisible = ref(false);

const slots = useSlots();
const hasFooter = slots.footer;

const modalBaseZIndex = ref(props.customZIndex);
// =================================
// functions --返回上一層
// =================================
function back(action: IAction): void {
  // 在動畫結束後自動執行onDrawerAfterLeave()，關閉整個modal
  emit('update:isOpen', false);
  emit('back', action);
  action.done();
}
// =================================
// functions --打開
// =================================
function open() {
  if (props.isOpen) {
    // 同時打開toast與整個modal
    containerVisible.value = true;
  }
}

onMounted(() => {
  open();
});
onUpdated(() => {
  open();
});

const transitionName = ref(props.isTransition ? 'animate-drawer' : '');

// 動畫進來前，設定z-index
function onDrawerBeforeEnter(): void {
  // 確認是否已有其他drawer已開啟
  const openedModals = useSharedDataService()
    .getPageRootElement()
    .querySelectorAll(
      '.modal-in > .drawer-dialog:not(.invisible)'
    ) as NodeListOf<HTMLElement>;
  if (openedModals && openedModals.length > 0) {
    // 隱藏其他已開啟的drawer，確認本身 drawer 的 z-index 為最大
    let zIndex = modalBaseZIndex.value ? modalBaseZIndex.value : 1000;
    openedModals.forEach((drawer) => {
      const openedModal = drawer.parentElement;
      let openedModalZIndex = Number(openedModal.style.zIndex);
      if (zIndex <= openedModalZIndex) {
        zIndex = openedModalZIndex + 1;
      }
      openedModal.classList.add('invisible');
    });
    modalBaseZIndex.value = zIndex;
  }
  XModalRef.value.onModalBeforeEnter();
}

// 動畫進來,modal出現的時候，新增modal-in class,body class處理
function onDrawerEnter(): void {
  if (props.isOpen) {
    XModalRef.value.onModalEnter();
    emit('show');
  }
}
// =================================
// functions --關閉
// =================================
function close(action: IAction): void {
  // 在動畫結束後自動執行onDrawerAfterLeave()，關閉整個modal
  emit('update:isOpen', false);
  emit('close', action);
  action.done();
}

// 動畫結束後才可關閉整個modal：modal關閉、還原body class、modal-in
function onDrawerAfterLeave(): void {
  XModalRef.value.onModalAfterLeave();
  containerVisible.value = false;
  //找到上一層drawer並開啟
  const openedModals = useSharedDataService()
    .getPageRootElement()
    .querySelectorAll(
      '.modal-in.invisible > .drawer-dialog'
    ) as NodeListOf<HTMLElement>;
  let previousLayer: HTMLElement | null = null;
  let zIndex = 1000;
  if (openedModals && openedModals.length > 0) {
    openedModals.forEach((drawer) => {
      const openedModal = drawer.parentElement;
      let openedModalZIndex = Number(openedModal.style.zIndex);
      if (zIndex <= openedModalZIndex) {
        zIndex = openedModalZIndex;
        previousLayer = openedModal;
      }
    });
    previousLayer!.classList.remove('invisible');
  }
  emit('after-hide');
}
</script>

<style scoped lang="scss">
@import 'drawer.scss';
</style>
