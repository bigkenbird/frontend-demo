import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import loginRoouters from "@/views/login/index";
import eotRouters from "@/views/txn/eot/index";
import esmRouters from "@/views/txn/esm/index";
import othRouters from "@/views/txn/oth/index";
import sqlRiuters from "@/views/txn/sql/index";
import { checkLoginStatus } from "@components/login/login-action";

const routes: any = [
  {
    path: "/",
    component: () => import("../views/txn/eot/eotas001/eotas001-home.vue"),
  },
  ...loginRoouters,
  ...eotRouters,
  ...esmRouters,
  ...othRouters,
  ...sqlRiuters,
];

const router = createRouter({
  history:
    import.meta.env.MODE == "development"
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始終scroll top
    return { top: 0, behavior: "smooth" };
  },
});

// 換頁面時檢查有無登入
router.beforeEach((to, from, next) => {
  // 根目錄還沒拿到login user不檢查
  if (to.fullPath === "/" || to.fullPath.toLowerCase() === "/not-login") {
    next();
    return;
  }

  checkLoginStatus()
    .then((isLoggedIn) => {
      if (isLoggedIn) {
        next();
      } else {
        next({ path: "/not-login" });
      }
    })
    .catch((error) => {
      console.error("Error checking login status:", error);
    });
});

export { router as default, routes };
