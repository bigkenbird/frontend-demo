<template>
  <XModal
    v-model:isOpen="containerVisible"
    :backdropCloseable="false"
    :className="className"
    :appendTo="appendTo"
    :isInline="isInline"
    :customZIndex="customZIndex"
    ref="XModalRef"
  >
    <Transition
      name="animate-dialog"
      @before-enter="onDialogBeforeEnter"
      @enter="onDialogEnter"
      @after-leave="onDialogAfterLeave"
    >
      <div :class="['dialog-center-area', { 'extra-large': extraLarge, 'large': large, 'middle': middle, 'small': small }]" v-show="isOpen">
        <div :class="['dialog', { 'scroll': scroll, 'bg-transparent': bgTransparent, 'dialog-overflow-visible': overflowVisible }]">
          <div class="flex shrink-0 justify-between p-4">
            <div class="text-heading-02">
              <slot name="title" :title="title"> {{ title }} </slot>
            </div>
            <div
              class="dialog-close-btn w-6 h-6 text-secondary"
              v-if="isCloseable"
            >
              <XIcon name="close" size="24px" v-bind-click="close"></XIcon>
            </div>
          </div>
          <div class="dialog-body" v-if="hasBody">
            <slot name="body"></slot>
          </div>
          <div
            class="dialog-footer"
            v-if="btnCancel || btnConfirm || hasFooter"
          >
            <slot name="footer">
              <XButtonBlock classStr="flex justify-center gap-2">
                <XButton
                  type="secondary"
                  v-bind-click="cancel"
                  v-if="btnCancel"
                  size="l"
                >
                  {{ btnCancel }}
                </XButton>
                <XButton v-bind-click="confirm" v-if="btnConfirm" size="l">
                  {{ btnConfirm }}
                </XButton>
              </XButtonBlock>
            </slot>
          </div>
        </div>

        <div class="dialog-not-show-again" v-if="isShowAgainCheckBox">
          <label class="checkbox-box">
            <input
              type="checkbox"
              @change="onToggleShowAgain"
              v-model="pickDontShowAgain"
            />
            <span class="checkbox-widget"></span>
            <span class="checkbox-text">
              {{ t('uicomponent.dialog.noDisplay') }}
            </span>
          </label>
        </div>
      </div>
    </Transition>
  </XModal>
</template>

<script setup lang="ts">
import { IAction } from '@twix/ix-lib-base';
import { ref, onUpdated, onMounted, useSlots } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from './dialog.messages';

// i18n
const { t } = useI18n({
  messages,
});

// =================================
// props emits var
// =================================
interface Props {
  // for dialog
  isOpen: boolean;
  isCloseable?: boolean; //顯示x
  title?: string; //標題
  btnCancel?: string; //secondary btn title
  btnConfirm?: string; //primary btn title
  scroll?: boolean;
  extraLarge?: boolean;
  large?: boolean;
  middle?: boolean;
  small?: boolean;

  isShowAgainCheckBox?: boolean; //是否出現「不再顯示」checkbox
  isShowAgain?: boolean; //回傳「不再顯示」checkbox的值
  bgTransparent?: boolean; // 純圖示使用的透明背景
  overflowVisible?: boolean;

  // for modal-base
  className?: string;
  appendTo?: string;
  isInline?: boolean;
  customZIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
  isShowAgainCheckBox: false,
  isShowAgain: false,
  isCloseable: true,
});
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
  (event: 'update:isShowAgain', value: boolean): void;
  (event: 'close', action: IAction): void;
  (event: 'cancel', action: IAction): void;
  (event: 'confirm', action: IAction): void;

  (event: 'show'): void;
  (event: 'after-hide'): void;
}>();
const pickDontShowAgain = ref(false);
const XModalRef = ref<any>(null);
const containerVisible = ref(false);

// 判斷各slot區塊是否有東西
const slots = useSlots();
const hasFooter = slots.footer;
const hasBody = slots.body;
// =================================
// functions --打開
// =================================
function open() {
  if (props.isOpen) {
    // 同時打開dialog與整個modal
    containerVisible.value = true;
  }
}
onMounted(() => {
  open();
});
onUpdated(() => {
  open();
});
// 動畫進來前，設定z-index
function onDialogBeforeEnter(): void {
  if (props.isOpen) {
    XModalRef.value.onModalBeforeEnter();
  }
}

// 動畫進來,modal出現的時候，新增modal-in class,body class處理
function onDialogEnter(): void {
  if (props.isOpen) {
    XModalRef.value.onModalEnter();
    emit('show');
  }
}

// =================================
// functions --關閉
// =================================
function close(action: IAction): void {
  // 在動畫結束後自動執行onDialogAfterLeave()，關閉整個modal
  emit('update:isOpen', false);
  emit('close', action);
  action.done();
}

function confirm(action: IAction) {
  emit('confirm', action);
}
function cancel(action: IAction) {
  emit('cancel', action);
}
// 動畫結束後才可關閉整個modal：modal關閉、還原body class、modal-in
function onDialogAfterLeave(): void {
  XModalRef.value.onModalAfterLeave();
  containerVisible.value = false;
  emit('after-hide');
}

function onToggleShowAgain() {
  emit('update:isShowAgain', pickDontShowAgain.value);
}
</script>

<style scoped lang="scss">
@import 'dialog.scss';
</style>
