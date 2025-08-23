<template>
  <div
    v-show="hasContent || hasSlots"
    :class="['notice-block', { 'is-open': isOpen }]"
  >
    <div class="notice-block-toggle" v-show="isBtnShow && !isOpen">
      <div class="more-buttom" v-bind-click="onClick">...查看更多</div>
    </div>
    <div class="notice-block-content richtext-content">
      <div class="mb-1">{{ noticeTitleRef }}</div>
      <div
        ref="contentEl"
        :style="[
          {
            height: isOpen
              ? 'auto'
              : isBtnShow
                ? noticeBlockContentHeight + 'px'
                : 'auto',
          },
          { overflow: isOpen ? 'auto' : 'hidden' },
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAction } from "@twix/ix-lib-base";
import { nextTick, onMounted, ref, useSlots, watch } from "vue";
import { useI18n } from "vue-i18n";
import messages from "./notice-block.messages";

// i18n
const { t } = useI18n({
  messages,
});

const props = withDefaults(
  defineProps<{
    withFixedButtonBlock?: boolean;
    content?: { content: string; title: string };
    isShow?: boolean; // 在 drawer 的時候，開啟 drawer 才抓得到高度
  }>(),
  {
    isShow: true,
    //contentId: 'DEFAULT_TYPE2', // 注意事項文案 預設Id (contentType="2" 提醒您HTML）
    withFixedButtonBlock: false,
  }
);

const isOpen = ref(false); // 是否展開貼心提醒內容
const isBtnShow = ref(false); // 是否直接展開貼心提醒 內容小於2行直接顯示
const hasContent = ref(false); // 是否有內容const
const hasSlots = useSlots().default;

watch(
  () => hasContent.value && props.isShow,
  (newVal) => {
    nextTick(() => {
      // 如果是在 drawer 中，開啟 drawer 才抓得到高度
      if (props.isShow) {
        checkHeight();
      }
    });
  }
);

// 顯示更多內容
function onClick(action: IAction) {
  isOpen.value = !isOpen.value;
  action.done();
}

const noticeTitleRef = ref(t("uicomponent.noticeBlock.title"));
const contentEl = ref();

onMounted(() => {
  if (props.content === undefined || props.content === null) {
    return;
  }

  if (
    props.content.content === undefined ||
    props.content.content === null ||
    props.content.content === ""
  ) {
    return;
  }

  if (props.content.title && props.content.title != "") {
    noticeTitleRef.value = props.content.title;
  } else {
    noticeTitleRef.value = "";
  }
  contentEl.value.innerHTML = props.content.content;
  hasContent.value = true;

  // 等待元素出現在 DOM
  setTimeout(checkHeight, 100);
});

// 檢查 content 高度大於 3 行，才顯示按鈕
const noticeBlockContentHeight = ref();
function checkHeight() {
  // 已經顯示“查看更多”按鈕
  if (isBtnShow.value) return;
  // 內容高度
  const height = contentEl.value.clientHeight;
  // 取得文字 line-height
  const lineHeight = Math.ceil(
    parseFloat(
      window.getComputedStyle(contentEl.value).getPropertyValue("line-height")
    )
  );
  // 內容高度 height <= 3 行文字的 line-height 直接顯示
  if (height <= lineHeight * 3) {
    isOpen.value = true;
    isBtnShow.value = false;
  } else {
    isOpen.value = false;
    isBtnShow.value = true;
    noticeBlockContentHeight.value = lineHeight * 3;
  }
}
</script>

<style scoped lang="scss">
@import "notice-block.scss";
</style>
