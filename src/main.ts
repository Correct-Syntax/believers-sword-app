import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style/main.scss";
import "./index.css";

if (process.env.ELECTRON == "false") {
    import("./registerServiceWorker");
}

createApp(App).use(store).use(router).mount("#app");
