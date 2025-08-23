<template>
  <div :class="[{ 'common-list-group': type == 'common' }, ' list-group']">
    <div class="list-title-block" v-if="listTitle || listContent">
      <div class="text-heading-07">{{ listTitle }}</div>
      <div class="text-heading-07">{{ listContent }}</div>
    </div>
    <div
      class="list-item-block"
      v-if="list"
      v-for="(li, index) in list"
      :key="index"
    >
      <div class="item-title-block">
        <div class="text-body-02 text-neutral-500">{{ li.title }}</div>
      </div>
      <div class="item-content-block">
        <div class="text-body-02">{{ li.content }}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface item {
  title: string;
  content: string;
}

withDefaults(
  defineProps<{
    type?: string;
    listTitle?: string;
    listContent?: string;
    list?: item[];
  }>(),
  {
    type: 'common',
  }
);
</script>

<style scoped lang="scss">
@import 'common-list-group.scss';
</style>
