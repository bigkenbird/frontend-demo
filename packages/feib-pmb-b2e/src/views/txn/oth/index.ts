import Othni001Routing from "./othni001/routing";

export default [
  {
    path: "/oth",
    component: () => import("./oth.vue"),
    children: [
      {
        path: "othni001",
        name: "功能未實作",
        children: Othni001Routing,
      },
    ],
  },
];
