import { defineStore } from "pinia";
import { useAppService, useStorageService } from "@twix/ix-lib-vue";

export class LoginUser {
  name: string;
  division: string;
  sessionIxd: string;
  sessionEndTime: number;
}

export const b2eUserStore = defineStore("B2eLoginUserStore", {
  state: () => ({
    loginUser: null as LoginUser,
  }),
  getters: {
    getLoginUser: (state) => (state.loginUser ? state.loginUser : null),
  },
  actions: {
    updateLoginUser(loginUser: LoginUser) {
      this.loginUser = loginUser;
    },
    removeLoginUser() {
      this.loginUser = null;
    },
  },
});

export async function checkLoginStatus(): Promise<boolean> {
  // let isLogin = false;
  // let loginUser = b2eUserStore().getLoginUser;

  // if (null != loginUser) {
  //   const rsData = await doCheckLogin(loginUser.sessionIxd);
  //   if (rsData) {
  //     isLogin = rsData.isLogin;
  //   }

  //   if (!isLogin) {
  //     b2eUserStore().removeLoginUser();
  //   }
  // }

  // return isLogin;
  return true;
}

async function doCheckLogin(sessionIxd: string): Promise<any> {
  let statusAndData = await useAppService().sendAndReceivePromiseAsync(
    "/b2e/eotas001/checklogin",
    { loginSixd: sessionIxd }
  );

  let status = statusAndData[0];
  let data = statusAndData[1];

  return data;
}

export function retrieveSecondsRemaining(): number {
  const storageService = useStorageService();
  // 上次請求時間
  const lastRecievedTime = window.localStorage.getItem("lastRecievedTime");
  // sessioin 保留時間(毫秒)
  const loginTimeoutDuration = storageService.getValue("loginTimeoutDuration");

  return (
    (Number(lastRecievedTime) + Number(loginTimeoutDuration) - Date.now()) /
    1000
  );
}
