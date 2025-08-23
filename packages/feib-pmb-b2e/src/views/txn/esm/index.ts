import Esmqu001Routing from "./esmqu001/routing";

export default [
  {
    path: "/esm",
    component: () => import("./esm.vue"),
    children: [
      {
        path: "esmqu001",
        name: "員工資料查詢",
        children: Esmqu001Routing,
      },
    ],
  },
];
