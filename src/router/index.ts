import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router"

import { useAuthStore } from '@/store'

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
        path: "ReportCommunity",
        name: "ReportCommunity",
        component: () => import("@/views/ReportCommunity.vue"),
      },
      {
        path: "ReportProduct",
        name: "ReportProduct",
        component: () => import("@/views/ReportProduct.vue"),
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

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/login'
  }
})



export default router