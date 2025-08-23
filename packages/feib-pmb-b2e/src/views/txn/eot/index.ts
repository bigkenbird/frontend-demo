import Eotas001Routing from "./eotas001/routing";

export default [
  {
    path: "/eot",
    component: () => import("./eot.vue"),
    children: [
      {
        path: "eotas001",
        name: "登入",
        children: Eotas001Routing,
      },
    ],
  },
];
