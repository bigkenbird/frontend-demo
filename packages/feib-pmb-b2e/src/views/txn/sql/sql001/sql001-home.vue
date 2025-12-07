<template>
  <div
    class="card large mt-4 mb-10 px-6 py-8"
    style="margin: auto; width: 90%; max-width: 1280px; text-align: center"
  >
    <h2>SQL語法執行介面</h2>
    <router-link to="/sql/sql002/execute">
      <button class="sq001-button">前往 SQL 執行頁面</button>
    </router-link>
    <router-link to="/sql/sql003/execute">
      <button class="sq001-button">前往 SQL DataTable執行頁面</button>
    </router-link>
    <router-link to="/sql/sql004/execute">
      <button class="sq001-button">審核SQL</button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useAppPage } from "@twix/feib-lib-vue";

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
</script>

<style scoped lang="scss">
@import "../sql.scss";
</style>
