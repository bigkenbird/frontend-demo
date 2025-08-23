<template>
  <header class="wrapper" v-show="isShow">
    <div class="wrapper-size flex items-center justify-between">
      <div class="flex items-center">
        <img src="/logo.png" alt="feib-logo" class="img" />
        <div class="divider ml-4 mr-4"></div>
        <div class="title">VUE Frontend</div>
      </div>
      <div class="flex" v-if="showUser">
        <div class="flex items-center mr-4">
          <div class="user-name">{{ loginUser.name }}</div>
          <div class="divider ml-2 mr-2"></div>
          <div class="user-division">{{ loginUser.division }}</div>
        </div>
        <div class="flex gap-4 items-center">
          <button @click="reset" type="button" class="button gap-2">
            <span
              >{{ countdownRef }} 後{{
                t("uicomponent.header.autologout")
              }}</span
            >
            <XIcon name="restore" size="16px" />
          </button>
          <button type="button" class="button gap-2" @click="openLogoutDialog">
            <span>{{ t("uicomponent.header.logout") }}</span>
            <XIcon name="logout" size="16px" />
          </button>
          <XDialog
            title="登出確認"
            :isOpen="logoutDialogOpen"
            btnCancel="取消"
            btnConfirm="確定"
            @close="onCancelLogoutDialog"
            @cancel="onCancelLogoutDialog"
            @confirm="onConfirmLogoutDialog"
            small
          >
            <template #body>
              <div class="p-4">請確認是否要登出個人網銀管理系統？</div>
            </template>
          </XDialog>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppService } from "@twix/ix-lib-vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { IAction } from "@twix/ix-lib-base";
import messages from "./header.messages";
import {
  LoginUser,
  b2eUserStore,
  retrieveSecondsRemaining,
  checkLoginStatus,
} from "@components/login/login-action";

const showUser = ref(false);
const logoutDialogOpen = ref(false);

let loginUser: LoginUser = null;

// i18n
const { t } = useI18n({
  messages,
});

// =================================
// props and emits
// =================================

interface Props {
  isShow?: boolean;
  isLogin?: boolean;
  title?: string; // 標題
  user: string;
  division: string;
}

const router = useRouter();

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  isLogin: false,
});

// =================================
// variable
// =================================

let isShow = ref(props.isShow);

//Counter
const countdownRef = ref("");

// =================================
// visible
// =================================

//////////////////////////////////////////////
// 事件
//////////////////////////////////////////////
function toggleVisible() {
  isShow.value = !isShow.value;
}

function isVisible(): boolean {
  return isShow.value;
}

function setVisible(isVisible: boolean) {
  isShow.value = isVisible;
}

/** 倒數計時重設 */
function reset() {
  checkLoginStatus(); // 藉由checkLoginStatus來讓Redis的Session逾期時間更新
}

/** 倒數計時 */
function updateCountdown() {
  if (showUser.value) {
    loginUser = b2eUserStore().getLoginUser;
    if (null == loginUser) {
      logout();
    } else {
      let secondsRemaining = retrieveSecondsRemaining();
      const minutes = Math.floor(secondsRemaining / 60);
      if (secondsRemaining <= 0) {
        logout();
      } else {
        const seconds = secondsRemaining % 60;
        let secondString: string = "" + seconds;
        const countdownText = `${minutes}:${seconds < 10 ? "0" : ""}${secondString.split(".")[0]}`;
        countdownRef.value = countdownText;
      }
    }
  }
}

/** 登出 */
async function logout() {
  // 前端資料清除
  clearInterval(timerInterval);
  showUser.value = false;
  b2eUserStore().removeLoginUser();

  // 進行後端的登出作業，不在乎執行結果
  await doLogout();

  // 導頁至登出頁
  router.push("/eot/eotas002/home");
}

async function doLogout(): Promise<any> {
  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "/b2e/eotas002/logout",
    {}
  );

  let status = statusAndData[0];
  let data = statusAndData[1];

  return data;
}

const openLogoutDialog = () => {
  logoutDialogOpen.value = true;
};
const onConfirmLogoutDialog = (action: IAction) => {
  logoutDialogOpen.value = false;

  logout();
};
const onCancelLogoutDialog = (action: IAction) => {
  logoutDialogOpen.value = false;
  action.done();
};

//////////////////////////////////////////////
// 初始化
//////////////////////////////////////////////
defineExpose({
  toggleVisible,
  isVisible,
  setVisible,
});

function init() {
  // 視窗關閉時登出
  window.addEventListener("beforeunload", function (e) {
    // 登出
    logout();

    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = "";
  });

  // 取得登入使用者
  getLoginUser(1);
}

function getLoginUser(counter: number) {
  if (!showUser.value && counter < 120) {
    counter++;
    loginUser = b2eUserStore().getLoginUser;
    if (null != loginUser) {
      showUser.value = true;
    } else {
      window.setTimeout(function () {
        getLoginUser(counter);
      }, 500);
    }
  }
}

setTimeout(() => {
  init();
}, 1000);
const timerInterval = setInterval(updateCountdown, 1000);
</script>

<style scoped lang="scss">
@import "header.scss";
</style>
