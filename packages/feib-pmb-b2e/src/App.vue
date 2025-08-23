<template>
  <XHeader ref="header" />
  <XNav ref="nav" />
  <main ref="pageBodyEl" :class="mainClassList">
    <router-view />
  </main>
  <XFooter ref="footer" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppEventBusService, IAppPage, useAppShell } from "@twix/feib-lib-vue";
import defineAppGlobalDirective from "@/vue/define/define-app-global-directive";
import defineAppGlobalComponent from "@/vue/define/define-app-global-component";
import defineRuntimeSettings from "@/vue/define/define-app-runtime-settings";
import { useEventBusService } from "@twix/ix-lib-vue";

// 根元素
const pageBodyEl = ref<HTMLElement | null>(null);

const header = ref();
const headerTitle = ref("");
const nav = ref(null);
const mainClassList = ref("");
const footer = ref();

/**
 * 註冊 header class 異動監聽事件
 * (時機點:各交易可透過 useEventBusService emit 事件)
 */
function addHeaderEventListener() {
  let eventBus: AppEventBusService = useEventBusService();
  eventBus.onHeaderDisplayAction(() => {});
}

/** 處理 header 顯示 (時機點:交易換頁時) */
function handleHeaderDisplay(page: IAppPage) {
  headerTitle.value = page.title();
  header.value.setVisible(page.showHeader());
}

function handleNavDisplay(page: IAppPage) {
  nav.value.setVisible(page.showNav());
}

function handleMainClassList(page: IAppPage) {
  mainClassList.value = page.showNav()
    ? "page-body wrapper wrapper-size"
    : "page-body wrapper";
}

function handleFooterDisplay(page: IAppPage) {
  footer.value.setVisible(page.showFooter());
}

// 初始化App Shell
useAppShell(
  {
    initUrlRoot(): string {
      return "";
    },
    initPageRootElement: pageBodyEl,
    pageScrollingElement: pageBodyEl,
    defineRuntimeSettings: defineRuntimeSettings,
    defineGlobalDirective: ($app: any) => defineAppGlobalDirective($app),
    defineGlobalComponent: ($app: any) => {
      defineAppGlobalComponent($app);
    },
  },
  {
    pageDidChange(page): void {
      // 處理 header, footer 顯示
      handleFooterDisplay(page);
      handleNavDisplay(page);
      handleMainClassList(page);
      handleHeaderDisplay(page);

      if (page.showNav()) {
        nav.value?.init();
      }
    },
    viewInit(): void {
      addHeaderEventListener();
    },
    resize(): void {},
  }
);

function init() {
  throw new Error("Function not implemented.");
}
</script>

<style scoped lang="scss"></style>
