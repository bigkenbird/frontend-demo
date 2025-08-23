<template>
  <div class="flex items-center gap-2 text-body-02">
    <div @click="() => {if(list[0].clickFn) list[0].clickFn()}">{{ list[0].label }}</div>
    <div
      v-for="(item, index) in listProcess"
      class="flex items-center gap-2"
      :key="index"
    >
      <XIcon name="chevron-right" size="16px" />
      <div
        v-if="item.url"
        :class="[
          { 'text-body-02E': index == listProcess.length - 1 },
          'pointer',
        ]"
        @click="$router.push(item.url)"
      >
        {{ item.label }}
      </div>
      <div
        v-else
        :class="[{ 'text-body-02E': index == listProcess.length - 1 }]"
        @click="() => clickFn(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

interface listItem {
  label: string;
  url?: string;
  clickFn?: Function;
}

const router = useRouter();

const props = withDefaults(
  defineProps<{
    list: listItem[];
  }>(),
  {}
);

const listProcess = computed(() => props.list.slice(1));

const clickFn = (item: listItem) => {
  if (item.url) {
    router.push(item.url);
    return;
  }
  if (item.clickFn) item.clickFn();
};
</script>

<style scoped lang="scss"></style>
