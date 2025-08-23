<!-- tab-view 目前設定： -->
<!-- 需要配合 <XTabPanel></XTabPanel> 使用 -->
<!-- 使用 v-for 的 index 當 key-->
<!-- 基本功能，其他依照設計再增減 -->

<template>
  <div class="tabview">
    <div class="flex justify-between">
      <div class="tabview-tabs">
        <a
          v-for="(tab, index) of tabs"
          :key="index"
          :class="tabClass(tab, index)"
          @click="onTabClick($event, tab, index)"
        >
          <div v-if="tab.props && tab.props.title">{{ tab.props.title }}</div>
          <div v-if="tab.props && tab.props.bubble > -1" class="bubble">
            {{ tab.props.bubble }}
          </div>
          <component
            v-if="
              typeof tab.children === 'object' &&
              tab.children !== null &&
              'title' in tab.children
            "
            :is="tab.children.title"
          ></component>
        </a>
      </div>
      <slot name="fnButton"></slot>
    </div>
    <div class="tabview-panels">
      <template v-for="(tab, i) of tabs" :key="i">
        <div class="tabview-panel" v-show="isTabActive(i)">
          <component :is="tab"></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VNode, computed, ref, useSlots, watch } from 'vue';

interface Props {
  activeIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  activeIndex: 0,
});

const emit = defineEmits<{
  (event: 'update:activeIndex', value: number): void;
  (event: 'change', value: number): void;
}>();

const slots = useSlots();

const tabs = computed<VNode[]>(() => {
  if (slots.default) {
    return slots.default().reduce((tabs: VNode[], child: VNode) => {
      if (isXTabPanel(child)) {
        tabs.push(child);
      }

      return tabs;
    }, []);
  }
  return [];
});

const currentActiveIndex = ref(props.activeIndex);

watch(
  () => props.activeIndex,
  (newVal) => {
    currentActiveIndex.value = newVal;
  }
);

function tabClass(tab: any, index: number) {
  return [
    'tabview-tab',
    {
      'is-active': isTabActive(index),
      'is-disabled': getTabProp(tab, 'disabled'),
    },
  ];
}

function isXTabPanel(child: any) {
  return child.type.name === 'XTabPanel';
}

function isTabActive(index: number) {
  return currentActiveIndex.value === index;
}

const getTabProp = (tab: any, prop: string) => {
  return tab.props && tab.props[prop] ? tab.props[prop] : undefined;
};

function onTabClick(event: Event, tab: any, index: number) {
  if (!getTabProp(tab, 'disabled') && !isTabActive(index)) {
    currentActiveIndex.value = index;
    emit('update:activeIndex', index);
    emit('change', index);
  }
}
</script>

<style scoped lang="scss">
@import 'tab-view.scss';
</style>
