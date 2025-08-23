<template>
  <nav class="wrapper" v-if="onloadCompleted && isShow">
    <ul class="wrapper-size">
      <li
        :class="[
          'inline-flex',
          'items-center',
          'px-6',
          'relative',
          'nav-list-item',
        ]"
        v-for="(tab, index) in tabList"
        v-bind:key="index"
        v-bind-click="
          (action: IAction) => {
            click(action, tab.url);
          }
        "
      >
        <span>
          {{ tab.label }}
        </span>
        <ul v-if="tab.sub" class="sub-list-block py-2 card">
          <li
            v-for="(subitem, index) in tab.sub"
            :class="[
              'sub-list-item',
              'text-body-01',
              'text-primary',
              'px-4',
              'py-2',
              { disabled: subitem.disabled },
            ]"
            v-bind:key="index"
            @click="$router.push(subitem.url)"
          >
            {{ subitem.label }}
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <div
    v-if="!onloadCompleted"
    class="card large mt-4 mb-10 px-6 py-8"
    style="margin: auto; width: 90%; max-width: 1280px"
  >
    檢查登入狀態中...<br /><br />
    <div class="login-loader"></div>
  </div>
  <XMessage
    v-if="messageShow"
    class="mt-2 mb-2"
    style="margin: auto; width: 90%; max-width: 1280px"
    @hide="closeMessage"
  >
    {{ message }}
  </XMessage>
  <div
    v-if="'LAST_LOGIN_NOT_LOGOUT' == resultTitle"
    class="card large mt-4 mb-10 px-6 py-8"
    style="margin: auto; width: 90%; max-width: 1280px"
  >
    <XButton type="secondary" v-bind-click="logoutLastLogin">
      登出前次登入 </XButton
    ><span>　</span>
    <XButton type="secondary" v-bind-click="cancelThisLogin">
      取消本次登入
    </XButton>
  </div>
</template>

<script setup lang="ts">
import { IAction } from "@twix/ix-lib-base";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  message,
  messageShow,
  closeMessage,
} from "@components/atomic/other/message/message-action";

interface Props {
  isShow?: boolean;
}

const router = useRouter();
const tabList = ref(null);
const onloadCompleted = ref(false);
const props = withDefaults(defineProps<Props>(), {
  isShow: false,
});

let isShow = ref(props.isShow);
let resultTitle = "";
let logoutLastLoginRef = ref(false);

function click(action: IAction, url: string): void {
  if (url) {
    router.push(url);
  }
  action.done();
}

function setVisible(isVisible: boolean) {
  isShow.value = isVisible;
}

defineExpose({
  init,
  setVisible,
});

//////////////////////////////////////////////
// 初始化
//////////////////////////////////////////////
async function init() {
  // reset page
  closeMessage();
  resultTitle = "";
  onloadCompleted.value = true;

  let tabListdata = localStorage.getItem("tabList");

  if (!tabListdata) {
    router.push("/login/user/home");
    return;
  }

  try {
    console.log("onloadCompleted:", onloadCompleted);
    console.log("isShow:", isShow);
    tabList.value = JSON.parse(tabListdata);
  } catch (e) {
    console.error("無法解析 menuList", e);
    router.push("/login/user/home");
  }
}

function goToLoginPage() {
  window.location.href = "http://localhost:3000/pmbb2e/login/user/home";
}

async function logoutLastLogin(action: IAction) {
  logoutLastLoginRef.value = true;
  init();
  action.done();
}

function cancelThisLogin(action: IAction): void {
  goToLoginPage();
  action.done();
}
setTimeout(() => {
  init();
}, 10);
</script>

<style scoped lang="scss">
@import "nav.scss";
</style>
