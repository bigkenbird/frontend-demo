<template>
  <h2>審核名單</h2>
  <button class="button" @click="searchEditRecord">查詢審核</button>
  <input
      class="sql004-input"
      v-model="table"
      rows="10"
      placeholder="在此輸入您的Table名稱"
    ></input>
  <EasyDataTable
    :headers="headers"
    :items="items"
    table-class-name="customize-table"
  >
    <template
      v-for="header in headers"
      :key="header.value"
      #[`item-`+header.value]="item"
    >
      <template v-if="header.value !== 'operation'"> </template>
      <template v-else>
        {{ item[header.value] }}
      </template>
    </template>
  </EasyDataTable>
</template>

<style scoped lang="scss">
@import "sql004.scss";
</style>

<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { useAppService } from "@twix/ix-lib-vue";


const table = ref("");
let headers = ref<any>([]); // 修正為 any 避免類型錯誤
const items = ref<any[]>([]); // 修正為 any[]

const globalItemMap = reactive(new Map());

/**
 * 檢查某個欄位的值是否有被修改
 * @param originalItem 原始的 item (來自 items.value)
 * @param key 欄位名稱
 * @returns boolean
 */
const hasDifference = (originalItem: any, key: string): boolean => {
  const currentItem = globalItemMap.get(originalItem.CODE);
  if (!currentItem) return false;

  // 比較原始值 (item[key]) 與 Map 中的新值 (currentItem[key])
  return originalItem[key] !== currentItem[key];
};

const searchEditRecord = async () => {
  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/sql/table/review/get",
    { table: table.value }
  );
  console.log(statusAndData);
};
</script>
