import RouterView from "./index.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Главная" },
    component: () => import("./home"),
  },
  { path: "/:pathMatch(.*)*", component: () => import("./error404") },
];

export { RouterView };
