import { createApp } from 'vue'
import App from './ElectronApp.vue'
import './assets/style/main.scss'
import 'virtual:windi.css'
import router from './router'
import store from './store'

if (process.env.ELECTRON!='true') {
    import('./registerServiceWorker');
}

createApp(App).use(store).use(router).mount('#app')
