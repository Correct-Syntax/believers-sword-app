import { createApp } from 'vue'
import App from './ElectronApp.vue'
import './assets/style/main.scss'
import 'virtual:windi.css'

if (process.env.ELECTRON!='true') {
    import('./registerServiceWorker');
}

createApp(App).mount('#app')
