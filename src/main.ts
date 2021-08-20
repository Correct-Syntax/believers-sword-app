import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/main.scss'
import 'virtual:windi.css'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
