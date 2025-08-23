<template>
  <div class="mt-6 mb-4">
    <XBreadcrumb :list="[{ label: '系統管理' }, { label: '員工資料查詢' }]" />
    <h1 class="text-heading-01 mt-5">員工資料查詢</h1>
  </div>
  <div class="card mt-4 mb-16">
    <XLoading :isOpen="loadingShowRef" />
    <div class="pt-4">
      <div class="border-b border-solid border-divider grid grid-cols-2">
        <div class="flex items-center">
          <div class="p-6 w-44">員工編號</div>
          <div class="w-296px">
            <XInput v-model="form.values.code" placeholder="請輸入員工編號">
            </XInput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="p-6 w-44">員工姓名</div>
          <div class="w-296px">
            <XInput v-model="form.values.name" placeholder="請輸入員工姓名">
            </XInput>
          </div>
        </div>
      </div>
      <div class="border-b border-solid border-divider grid grid-cols-1">
        <div class="flex items-center">
          <div class="p-6 w-44">
            <span class="text-highlight mr-1">*</span>到職日
          </div>
          <div class="w-296px">
            <XFormGroup v-model:errorMsg="form.errors.startTimeErr">
              <XDatePicker
                v-model="form.values.dateRangeBean.queryStartDate"
                placeholder="YYYY/MM/DD"
              />
            </XFormGroup>
          </div>
          <div class="text-gray mr-1 ml-1">–</div>
          <div class="w-296px">
            <XFormGroup v-model:errorMsg="form.errors.endTimeErr">
              <XDatePicker
                v-model="form.values.dateRangeBean.queryEndDate"
                placeholder="YYYY/MM/DD"
              />
            </XFormGroup>
          </div>
          <div class="text-red ml-4">(Demo無實作)</div>
        </div>
      </div>
      <div class="pt-3 pb-4 flex justify-center gap-4">
        <XButton @click="submitForm()">查詢</XButton>
        <XButton type="secondary" @click="resetForm()">重設</XButton>
      </div>
      <table class="table-main">
        <thead>
          <tr>
            <th class="w-15">筆次</th>
            <th>員工編號</th>
            <th>員工姓名</th>
            <th>職稱</th>
            <th>部門</th>
            <th>到職日</th>
          </tr>
        </thead>
        <tbody v-if="onloadCompleted && 0 < modelRef.dataGridValue.rows.length">
          <template v-for="(row, i) of modelRef.dataGridValue.rows" :key="i">
            <template v-for="(cell, j) of row.cellList" :key="j">
              <tr>
                <td class="pl-4 py-4">
                  <div v-text="cell.number" />
                </td>
                <td class="pl-4 py-4">
                  <div v-text="cell.code" />
                </td>
                <td class="pl-4 py-4">
                  <div v-text="cell.name" />
                </td>
                <td class="pl-4 py-4">
                  <div v-text="cell.title" />
                </td>
                <td class="pl-4 py-4">
                  <div v-text="cell.department" />
                </td>
                <td class="pl-4 py-4">
                  <div v-text="cell.arrivalDate" />
                </td>
              </tr>
            </template>
          </template>
        </tbody>
        <tbody
          v-if="onloadCompleted && 0 == modelRef.dataGridValue.rows.length"
        >
          <tr>
            <td colspan="6">
              <div class="h-75 flex items-center justify-center">
                <emptyData msg="查無資料" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="onloadCompleted"
        class="px-4 py-2 flex justify-between items-center"
      >
        <div class="text-body-02 text-secondary">
          共計 {{ modelRef.dataGridValue.totalCacheCount }} 筆資料
        </div>
        <XPagenation
          :current="currentPage"
          :limit="modelRef.dataGridValue.conversationKxy.pageSize"
          :total="modelRef.dataGridValue.totalCacheCount"
          @update:current="changePage"
          @update:limit="changePageSize"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppForm, useAppPage } from "@twix/feib-lib-vue";
import { formatDate } from "@twix/ix-lib-base";
import { useAppService } from "@twix/ix-lib-vue";
import { ref } from "vue";
import {
  loadingShowRef,
  showLoading,
  hideLoading,
} from "@components/atomic/modal/loading/loading-action";
import { showMessage } from "@components/atomic/other/message/message-action";
import emptyData from "@components/combination/empty-data/empty-data.vue";

/** 是否完成啟動 */
const onloadCompleted = ref(false);
const modelRef = ref(null);
const currentPage = ref(1);

async function doSearchHomeAction(formData: any): Promise<any> {
  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/employees",
    formData
  );

  let status = statusAndData[0];
  let data = statusAndData[1];

  if (status != undefined && "" != status.meta.status.errorCode) {
    showMessage(
      status.meta.status.errorCode + "-" + status.meta.status.errorDesc
    );
  } else {
    return data;
  }
}

async function doSearchHomeNextPage(dataGrid: any): Promise<any> {
  if (modelRef.value && modelRef.value.dataGridValue) {
    form.setValue("page", currentPage.value);

    form.setValue(
      "pageSize",
      modelRef.value.dataGridValue.conversationKxy.pageSize
    );
  }

  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/employees",
    form.values
  );

  let status = statusAndData[0];
  let data = statusAndData[1];

  if (status != undefined && "" != status.meta.status.errorCode) {
    showMessage(
      status.meta.status.errorCode + "-" + status.meta.status.errorDesc
    );
  } else {
    return data;
  }
}

function getSystemDate(): string {
  let systemDate = "";
  let dateObj = new Date();
  systemDate =
    dateObj.getFullYear() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getDate();
  return systemDate;
}

function dateStart(): string {
  return getSystemDate() + " 00:00:00";
}

function dateEnd(): string {
  return getSystemDate() + " 23:59:59";
}
const page = useAppPage(
  {
    desc: "home",
    showHeader() {
      return true;
    },
    showNav() {
      return true;
    },
  },
  {}
);
// 使用 表單
const form = useAppForm(
  {
    code: "",
    name: "",
    dateRangeBean: {
      queryStartDate: "",
      queryEndDate: "",
    },
    page: 1,
    pageSize: 10,
  },
  {},
  () => {}
);

async function submitForm() {
  let valid = true;
  form.setError("startTimeErr", "");
  form.setError("endTimeErr", "");

  if (
    null == form.values.dateRangeBean.queryStartDate ||
    "" == form.values.dateRangeBean.queryStartDate
  ) {
    form.setError("startTimeErr", "請輸入開始時間");
    valid = false;
  } else {
    // 轉換日期格式
    form.values.dateRangeBean.queryStartDate = formatDate(
      new Date(form.values.dateRangeBean.queryStartDate),
      "yyyy/MM/dd HH:mm:ss"
    );
  }

  if (
    null == form.values.dateRangeBean.queryEndDate ||
    "" == form.values.dateRangeBean.queryEndDate
  ) {
    form.setError("endTimeErr", "請輸入結束時間");
    valid = false;
  } else {
    // 轉換日期格式
    form.values.dateRangeBean.queryEndDate = formatDate(
      new Date(form.values.dateRangeBean.queryEndDate),
      "yyyy/MM/dd HH:mm:ss"
    );
  }

  if (
    valid &&
    form.values.dateRangeBean.queryEndDate <
      form.values.dateRangeBean.queryStartDate
  ) {
    form.setError("startTimeErr", "開始時間不可大於結束時間");
    form.setError("endTimeErr", "結束時間不可小於開始時間");
    valid = false;
  }

  if (valid) {
    doSearch();
  }
}

function resetForm() {
  form.setValue("code", "");
  form.setValue("name", "");
  form.setError("startTimeErr", "");
  form.setError("endTimeErr", "");
  form.setValue("dateRangeBean", {
    queryStartDate: dateStart(),
    queryEndDate: dateEnd(),
  });
}

//////////////////////////////////////////////
// 初始化
//////////////////////////////////////////////
async function init() {
  form.setValue("dateRangeBean", {
    queryStartDate: dateStart(),
    queryEndDate: dateEnd(),
  });
  doSearch();
}

async function doSearch() {
  currentPage.value = 1;
  onloadCompleted.value = false;
  showLoading();

  form.setValue("page", 1);

  if (modelRef.value && modelRef.value.dataGridValue) {
    form.setValue(
      "pageSize",
      modelRef.value.dataGridValue.conversationKxy.pageSize
    );
  }

  const rsData = await doSearchHomeAction(form.values);
  if (rsData) {
    modelRef.value = rsData;
  }

  onloadCompleted.value = true;
  hideLoading();
}

async function searchHomeNextPage() {
  showLoading();

  const rsData = await doSearchHomeNextPage(modelRef.value.dataGridValue);
  if (rsData) {
    modelRef.value = rsData;
  }

  hideLoading();
}

/** Paging 換頁 */
function changePage(pageNumber: number) {
  currentPage.value = pageNumber;
  modelRef.value.dataGridValue.conversationKxy.fetchIndex =
    modelRef.value.dataGridValue.conversationKxy.pageSize * (pageNumber - 1);
  searchHomeNextPage();
}

/** Paging 換Pagesize */
function changePageSize(pageSize: number) {
  currentPage.value = 1;
  modelRef.value.dataGridValue.conversationKxy.fetchIndex = 0;
  modelRef.value.dataGridValue.conversationKxy.pageSize = pageSize;
  searchHomeNextPage();
}

setTimeout(() => {
  init();
}, 10);
</script>

<style scoped lang="scss">
@import "../esm.scss";
</style>
