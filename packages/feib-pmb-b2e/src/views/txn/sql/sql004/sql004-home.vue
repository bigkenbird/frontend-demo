<template
  v-for="header in headers"
  :key="header.value"
  #[`item-`+header.value]="item"
>
  <template v-if="header.value !== 'operation'">
    <template v-if="item.editable">
      <div class="comparison-field">
        <div class="original-value">
          <span class="value-label">原始值: </span>
          <span
            :class="{ 'diff-highlight-old': hasDifference(item, header.value) }"
          >
            {{ item[header.value] }}
          </span>
        </div>

        <div class="new-value">
          <span class="value-label">新值: </span>
          <input
            :value="globalItemMap.get(item.CODE)?.[header.value]"
            @input="
              updateMapValue(
                item.CODE,
                header.value,
                ($event.target as HTMLInputElement).value
              )
            "
            class="editable-input"
            :class="{ 'diff-input-new': hasDifference(item, header.value) }"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <template v-if="hasDifference(item, header.value)">
        <div class="comparison-field comparison-display">
          <div class="original-value">
            <span class="value-label">原始值: </span>
            <span class="diff-highlight-old"> {{ item[header.value] }} </span>
          </div>
          <div class="new-value">
            <span class="value-label">當前值: </span>
            <span class="diff-highlight-new">
              {{ item.modifiedValue[header.value] }}
            </span>
          </div>
        </div>
      </template>
      <template v-else>
        {{ item[header.value] }}
      </template>
    </template>
  </template>

  <template v-if="header.value === 'operation'">
    <div class="operation-wrapper">
      <template v-if="item.editable">
        <button @click="saveItem(item)">保存</button>
        <button @click="cancelEdit(item)">取消</button>
      </template>
      <template v-else>
        <button @click="modifyItem(item)">修改</button>
        <button @click="deleteItem(item)">刪除</button>
      </template>
    </div>
  </template>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

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

const executeSQL = async () => {
  console.log("查詢Table:", table.value);
};
</script>
