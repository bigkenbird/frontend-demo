import Login001Routing from "./login001/routing";

export default [
  {
    path: "/login",
    component: () => import("./login.vue"),
    children: [
      {
        path: "user",
        name: "使用者登入",
        children: Login001Routing,
      },
    ],
  },
];
