export default [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "category",
        name: "category",
        component: () => import("@/views/Category.vue"),
      },
      {
        path: "community",
        name: "community",
        component: () => import("@/views/Community.vue"),
      },
      {
        path: "data-table",
        name: "DataTable",
        component: () => import("@/views/DataTable.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
];
