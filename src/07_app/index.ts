import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@pages/index.vue";

import { router } from "./providers";

import "@shared/assets/styles/reset.scss";
import "@shared/assets/styles/main.scss";

export const app = createApp(App).use(createPinia()).use(router);
