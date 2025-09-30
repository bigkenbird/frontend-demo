<template>
  <div class="card large mt-4 mb-10 px-6 py-8">
    <h2>Table名稱輸入</h2>
    <p>請在下方輸入框中輸入您的SQL語法，然後點擊執行按鈕。</p>
    <p>注意：請確保您的SQL語法正確無誤，以免影響資料庫操作。</p>
    <textarea
      class="sql003-textarea"
      v-model="table"
      rows="10"
      placeholder="在此輸入您的Table名稱"
    ></textarea>
    <button @click="executeSQL">查詢Table</button>
    <div class="sql003-result">
      <h3>執行結果</h3>
      <div class="my-table-container">
        <h2>學生名單</h2>
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
            <template v-if="header.value !== 'operation'">
              <template v-if="item.editable">
                <input v-model="item[header.value]" class="editable-input" />
              </template>
              <template v-else>
                {{ item[header.value] }}
              </template>
            </template>
            <template v-if="header.value === 'operation'">
              <div class="operation-wrapper">
                <template v-if="item.editable">
                  <button @click="saveItem(item)">保存</button>
                  <button @click="cancelEdit()">取消</button>
                </template>
                <template v-else>
                  <button @click="modifyItem(item)">修改</button>
                  <button @click="deleteItem(item)">刪除</button>
                </template>
              </div>
            </template>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppPage } from "@twix/feib-lib-vue";
import { useAppService } from "@twix/ix-lib-vue";
// @ts-ignore
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { it } from "date-fns/locale";

const table = ref("");

// 定義表格資料
let items = ref([]);

let headers = ref([]);

const page = useAppPage(
  {
    desc: "sql001",
    title: () => "SQL語法執行介面",
    showHeader() {
      return true;
    },
    showNav() {
      return true;
    },
    showFooter() {
      return true;
    },
  },
  {}
);

async function executeSQL() {
  if (!table.value.trim()) {
    alert("請輸入 Table名稱！");
    return;
  }

  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/sql/table/search",
    { tableName: table.value }
  );

  headers.value = statusAndData[1].columns.map((column) => {
    return {
      text: column,
      value: column,
      sortable: true,
    };
  });

  headers.value.push({
    text: "操作",
    value: "operation",
    sortable: false,
  });
  items.value.push(...statusAndData[1].values);
}

const modifyItem = (item) => {
  console.log("修改項目:", item);
  console.log("item code:", item.CODE);
  const index = items.value.findIndex((i) => i.CODE === item.CODE);
  console.log("index:", index);

  if (index !== -1) {
    const updatedItem = { ...item, editable: true };
    console.log("updatedItem:", updatedItem);
    items.value[index] = updatedItem;
    console.log("items.value (更新後):", items.value);
  }
};

const deleteItem = (item) => {
  console.log("刪除項目:", item);
};

const saveItem = (item) => {
  console.log("儲存項目:", item);
};

const cancelEdit = () => {
  console.log("取消編輯");
};
</script>

<style scoped lang="scss">
@import "../sql.scss";
@import "./sql003.scss";
</style>
