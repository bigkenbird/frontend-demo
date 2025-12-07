<template>
  <h2>審核名單</h2>
  <button class="button" @click="searchEditRecord">查詢審核</button>
  <input
      class="sql004-input"
      v-model="table"
      rows="10"
      placeholder="在此輸入您的Table名稱"
    ></input>
  <table>
      <thead>
        <tr>
          <th>欄位名稱</th>
          <th>原始資料</th>
          <th>變更資料</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="row in comparisonRows" :key="row.columnName">
          <td>{{ row.columnName }}</td>
          <td>{{ row.originValue }}</td>
          <td :class="{ 'highlight-diff': row.showDiff }">
            {{ row.modifiedValue }}
          </td>
      </tr>
      </tbody>
    </table>
</template>

<style scoped lang="scss">
@import "sql004.scss";
</style>

<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import "vue3-easy-data-table/dist/style.css";
import { useAppService } from "@twix/ix-lib-vue";


const table = ref("");

const comparisonRows = ref<ComparisonRow[]>([]); // 用於存儲比較結果的陣列

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
  console.log(table.value);
  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/sql/table/review/get",
    { table: table.value }
  );
  
  if("success"!==statusAndData[1].result){
    alert("系統發生錯誤");
    return;
  }

  let reviewRsList = statusAndData[1].reviewRsList;

  if(reviewRsList.size===0){
    alert("查無資料");
    return;
  }

  for(let reviewRs of reviewRsList){
    let modifiedData = reviewRs.reviewEntity.modifiedData;
    let originEntity = reviewRs.originEntity;

    console.log("modifiedData=",modifiedData);
    console.log("originEntity=",originEntity);
    

    JSON.parse(modifiedData, (key, modifiedValue) => {
      if(originEntity.hasOwnProperty(key)){
        let originValue = originEntity[key];
        if(originValue!==modifiedValue){
          addComparisonRow(key, originValue, modifiedValue,true)
        }
        else{
          addComparisonRow(key, originValue, modifiedValue,false)
        }
        
      }
    });

    
  }

};

const addComparisonRow = (
  columnName: string, 
  originValue: string, 
  modifiedValue: string,
  showDiff: boolean
) => {
  const newRow: ComparisonRow = {
    columnName: columnName,
    originValue: originValue,
    modifiedValue: modifiedValue,
    showDiff:showDiff
  };

  comparisonRows.value.push(newRow);
  
};
</script>
