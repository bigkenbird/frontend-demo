import SQL001Routing from "./sql001/routing";
import SQL002Routing from "./sql002/routing";
import SQL003Routing from "./sql003/routing";
import SQL004Routing from "./sql004/routing";

export default [
  {
    path: "/sql",
    component: () => import("./sql.vue"),
    children: [
      {
        path: "sql001",
        name: "SQL語法執行",
        children: SQL001Routing,
      },
      {
        path: "sql002",
        name: "SQL純字串執行",
        children: SQL002Routing,
      },
      {
        path: "sql003",
        name: "SQL表單顯示",
        children: SQL003Routing,
      },
      {
        path: "sql004",
        name: "SQL審核",
        children: SQL004Routing,
      },
    ],
  },
];
