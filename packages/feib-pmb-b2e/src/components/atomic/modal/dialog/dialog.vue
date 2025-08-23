<template>
  <div v-show="isOpen" class="dialog-modal dialog-fade-in">
    <div
      :class="[
        'dialog-center-area',
        {
          'extra-large': extraLarge,
          large: large,
          middle: middle,
          small: small,
        },
      ]"
    >
      <div
        :class="[
          'dialog',
          {
            scroll: scroll,
            'scroll-auto': scrollAuto,
            'bg-transparent': bgTransparent,
            'dialog-overflow-visible': overflowVisible,
          },
        ]"
      >
        <div class="flex shrink-0 justify-between p-4">
          <div class="text-heading-02">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="dialog-close-btn w-6 h-6 text-secondary">
            <XIcon name="close" size="24px" v-bind-click="close"></XIcon>
          </div>
        </div>
        <div class="dialog-body" v-if="hasBody">
          <slot name="body"></slot>
        </div>
        <div class="dialog-footer" v-if="btnCancel || btnConfirm || hasFooter">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAction } from "@twix/ix-lib-base";
import { useSlots } from "vue";

// 判斷各slot區塊是否有東西
const slots = useSlots();
const hasFooter = slots.footer;
const hasBody = slots.body;

const props = withDefaults(
  defineProps<{
    isOpen: boolean; // 顯示與否
    title?: string; //標題
    btnCancel?: string; // 取消按鈕標題
    btnConfirm?: string; // 確定按鈕標題
    extraLarge?: boolean; // 視窗大小-加大
    large?: boolean; // 視窗大小-大
    middle?: boolean; // 視窗大小-中
    small?: boolean; // 視窗大小-小
    scroll?: boolean; // 顯示捲軸
    scrollAuto?: boolean; // 顯示捲軸(自動)
    bgTransparent?: boolean; // 純圖示使用的透明背景
    overflowVisible?: boolean; // 溢出範圍可視
  }>(),
  {}
);

const emit = defineEmits<{
  (event: "close", action: IAction): void;
  (event: "cancel", action: IAction): void;
  (event: "confirm", action: IAction): void;
}>();

// =================================
// functions
// =================================
function close(action: IAction): void {
  emit("close", action);
  action.done();
}
function cancel(action: IAction) {
  emit("cancel", action);
}
function confirm(action: IAction) {
  emit("confirm", action);
}
</script>

<style scoped lang="scss">
@import "./dialog.scss";
</style>
