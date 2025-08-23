<!-- VueDatePicker 套件的一些屬性說明
  <VueDatePicker

    position="left" // 'left' | 'center' | 'right' 設定小日曆開啟的位置
    :enable-time-picker="false" // boolean 是否顯示時間選擇器
    auto-apply // boolean 點擊日期後，就選擇該日期並關閉小日曆，不用再按確認鍵
  >
 -->
<template>
  <VueDatePicker
    enable-seconds
    v-bind="$props"
    :month-change-on-scroll="false"
    week-start="0"
    :day-names="[
      t('uicomponent.datepicker.sun'),
      t('uicomponent.datepicker.mon'),
      t('uicomponent.datepicker.tue'),
      t('uicomponent.datepicker.wed'),
      t('uicomponent.datepicker.thu'),
      t('uicomponent.datepicker.fri'),
      t('uicomponent.datepicker.sat'),
    ]"
  >
    <template #clock-icon>
      <div class="flex items-center gap-1 text-link pointer">
        <XIcon name="clock" /> 切換選擇時間
      </div>
    </template>
    <template #calendar-icon
      ><div class="flex items-center gap-1 text-link pointer">
        <XIcon name="calendar" /> 切換選擇日期
      </div>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useI18n } from "vue-i18n";
import messages from "./date-picker.messages";

// i18n
const { t } = useI18n({
  messages,
});

withDefaults(
  defineProps<{
    selectText?: string;
    cancelText?: string;
    format?: string;
  }>(),
  {
    selectText: "選擇",
    cancelText: "取消",
    format: "yyyy/MM/dd HH:mm:ss"
  }
);
</script>

<style scoped lang="scss">
@import "../form.scss";
@import "date-picker.scss";
</style>
