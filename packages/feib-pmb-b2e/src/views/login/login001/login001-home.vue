<template>
  <div class="login-container">
    <h2>登入</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">帳號</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="請輸入帳號"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="請輸入密碼"
          required
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "登入中..." : "登入" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useAppPage } from "@twix/feib-lib-vue";
import { useAppService } from "@twix/ix-lib-vue";
import { ref } from "vue";
const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const page = useAppPage(
  {
    desc: "login",
    showHeader() {
      return true;
    },
    showFooter() {
      return true;
    },
  },
  {}
);

async function handleSubmit() {
  errorMessage.value = "";
  loading.value = true;

  const rsData = await doLogin(username.value, password.value);

  loading.value = false;
  console.log("rsData:", rsData);
  if (rsData) {
    alert("登入成功！");
    localStorage.setItem("tabList", JSON.stringify(rsData.menuList));
    router.push("/esm/esmqu001/home");
  } else {
    errorMessage.value = "帳號或密碼錯誤";
  }
}

async function doLogin(account: string, password: string): Promise<any> {
  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "http://localhost:8080/login",
    { account: account, password: password }
  );
  let loginSuccess = statusAndData[1].isLogin;
  let menuList = statusAndData[1].menuList;
  console.log("loginSuccess:", loginSuccess);
  console.log("menuList:", menuList);

  if (loginSuccess) {
    return statusAndData[1];
  } else {
    alert("登入失敗");
    return;
  }
}
</script>

<style scoped lang="scss">
@import "../login.scss";
</style>
