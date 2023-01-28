import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router"

const routes: RouteRecordRaw[] = [
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
        path: "product",
        name: "product",
        component: () => import("@/views/Product.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
]
  

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
