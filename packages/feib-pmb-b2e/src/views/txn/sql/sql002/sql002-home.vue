<template>
  <div
    class="card large mt-4 mb-10 px-6 py-8"
    style="margin: auto; width: 90%; max-width: 1280px; text-align: center"
  >
    <h2>SQL輸入語法執行</h2>
    <p>請在下方輸入框中輸入您的SQL語法，然後點擊執行按鈕。</p>
    <p>注意：請確保您的SQL語法正確無誤，以免影響資料庫操作。</p>
    <textarea
      v-model="sqlQuery"
      rows="10"
      style="width: 100%; padding: 10px; margin-top: 20px"
      placeholder="在此輸入您的SQL語法..."
    ></textarea>
    <button
      style="
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
      "
      @click="executeSQL"
    >
      執行SQL語法
    </button>
    <div
      style="
        margin-top: 20px;
        padding: 10px;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 5px;
      "
    >
      <h3>執行結果</h3>
      <textarea
        style="width: 100%; height: 200px; padding: 10px"
        readonly
        v-model="result"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppPage } from "@twix/feib-lib-vue";
import { useAppService } from "@twix/ix-lib-vue";

const result = ref("");
const sqlQuery = ref("");

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
  console.log("執行SQL語法:", sqlQuery.value);
  if (!sqlQuery.value.trim()) {
    alert("請輸入 SQL 語法！");
    return;
  }

  result.value = "執行中，請稍候...";

  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/sql/execute",
    { sql: sqlQuery.value }
  );

  result.value = statusAndData[1]
    ? statusAndData[1].result
    : "執行失敗，請檢查 SQL 語法或伺服器狀態。";
}
</script>

<style scoped lang="scss">
@import "../sql.scss";
</style>
