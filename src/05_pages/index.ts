import RouterView from "./index.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Home" },
    component: () => import("./home"),
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "About" },
    component: () => import("./about"),
  },
  { path: "/:pathMatch(.*)*", component: () => import("./error404") },
];

export { RouterView };
