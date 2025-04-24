import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/05_pages";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
