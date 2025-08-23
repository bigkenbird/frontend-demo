import { createApp } from "vue";
import App from "./App.vue";
import "@/style/base_all.scss";
import router from "@/router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App).use(router as any);

app.use(pinia);
app.mount("#app");
