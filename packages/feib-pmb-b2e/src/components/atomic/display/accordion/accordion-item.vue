<template>
  <div class="accordion-item">
    <div :class="headerClass" :style="headerStyle" @click="onHeaderClick">
      <slot name="header" :isActive="isActive()">
        <div class="p-4 flex justify-between" style="background-color: #c9d0da">
          {{ title }}

          <XIcon :name="isActive() ? 'chevron-up' : 'chevron-down'"></XIcon>
        </div>
      </slot>
    </div>
    <Transition>
      <div class="accordion-content" v-show="isActive()">
        <div :class="contentClass" :style="contentStyle">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
  <!-- class="accordion-item-content" -->
  <!-- class="accordion-item-header" -->
</template>
<script lang="ts">
export default {
  name: 'XAccordionItem',
};
</script>

<script setup lang="ts">
import XIcon from '@/components/atomic/basic/icon/icon.vue';
import { inject, ref } from 'vue';
import { ActiveKeyName, OnChangeName } from './type';
// =================================
// 父元件(XAccordion)傳入的值 , props
// =================================
const isMultiple = inject('isMultiple');
const activeKey = inject(ActiveKeyName, ref(isMultiple ? [] : ''));
const onChange = inject(OnChangeName, () => {
  // console.log('change');
});
const props = withDefaults(
  defineProps<{
    itemKey: string;
    title?: string;
    headerStyle?: string;
    headerClass?: string;
    contentStyle?: string;
    contentClass?: string;
  }>(),
  {}
);
// =================================
// function
// =================================
const isActive = () => {
  // 多選
  if (isMultiple && typeof activeKey.value !== 'string') {
    return activeKey.value ? activeKey.value.includes(props.itemKey) : false;
  }

  // 單選
  if (!isMultiple && typeof activeKey.value == 'string') {
    return activeKey.value ? activeKey.value == props.itemKey : false;
  }

  return false;
};

function onHeaderClick() {
  // 多選
  if (isMultiple && typeof activeKey.value !== 'string') {
    let newArr: string[] = [];
    if (activeKey.value) {
      // 已選，陣列刪除該項
      if (isActive()) {
        newArr = activeKey.value.filter(
          (item: string) => item !== props.itemKey
        );
      } else {
        // 未選，陣列加入該項
        newArr = [...activeKey.value, props.itemKey];
      }
    }
    onChange(newArr);
  }

  // 單選
  if (!isMultiple && typeof activeKey.value == 'string') {
    onChange(isActive() ? '' : props.itemKey);
  }
}
</script>

<style scoped lang="scss">
@import 'accordion.scss';
</style>
