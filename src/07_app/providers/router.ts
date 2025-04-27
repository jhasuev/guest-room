import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "@pages";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const DEFAULT_TITLE = document.title;
router.beforeEach((to) => {
  document.title = (to.meta.title as string) + " • " + DEFAULT_TITLE;
});
