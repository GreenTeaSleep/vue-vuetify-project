import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

import route from "./routes";

const routes: RouteRecordRaw[] = route;

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
