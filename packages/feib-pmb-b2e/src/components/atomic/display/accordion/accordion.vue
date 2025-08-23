<template>
  <div class="accordion-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, readonly, watch, useSlots } from 'vue';
// =================================
// type , props ,emits
// =================================
import { ActiveKeyType, ActiveKeyName, OnChangeName } from './type';

const props = withDefaults(
  defineProps<{
    activeKey: ActiveKeyType;
    multiple?: boolean;
  }>(),
  {
    multiple: false,
  }
);
const emit = defineEmits<{
  (event: 'change', value: ActiveKeyType): void;
}>();

// =================================
// 抓到所有accordion item有設定的itemKey
// =================================
const allItemActiveKey: string[] = [];
const slots = useSlots();
const children = slots.default ? slots.default() : null;

children?.forEach((child: { [key: string]: any }) => {
  // console.log("slot內無迴圈", child.props.itemKey);
  if (child.type && child.type.name && child.type.name == 'XAccordionItem') {
    allItemActiveKey.push(child.props?.itemKey);
  }

  // console.log("slot內有迴圈", loopChild.props.itemKey);
  if (child.children && Array.isArray(child.children)) {
    child.children.forEach((loopChild) => {
      if (
        loopChild.type &&
        loopChild.type.name &&
        loopChild.type.name == 'XAccordionItem'
      ) {
        allItemActiveKey.push(loopChild.props?.itemKey);
      }
    });
  }
});
// =================================
// 傳給子元件
// =================================
// 給預設值，防止沒傳入時出錯
const defaultKey = (): ActiveKeyType => {
  if (!props.activeKey) {
    return props.multiple ? ([] as string[]) : '';
  }
  if (Array.isArray(props.activeKey)) {
    return props.activeKey.filter((item: string) => {
      return allItemActiveKey.includes(item);
    });
  }
  return props.activeKey;
};

// 傳給子元件itemActiveKey
const itemActiveKey = ref(defaultKey());

// 若傳入的值有更新，itemActiveKey也需一併更新
watch(
  () => props.activeKey,
  (newVal) => {
    itemActiveKey.value = newVal;
  }
);

// 傳給子元件修改 itemActiveKey 的方法
const onChange = (val: ActiveKeyType): void => {
  itemActiveKey.value = val;
  emit('change', val);
};

provide('isMultiple', props.multiple);
provide(ActiveKeyName, readonly(itemActiveKey)); //readonly，防止子元件修改
provide(OnChangeName, onChange);
</script>

<style scoped lang="scss">
@import 'accordion.scss';
</style>
