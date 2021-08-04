import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/main.scss'
import 'virtual:windi.css'

if (process.env.ELECTRON!='true') {
    import('./registerServiceWorker');
}

createApp(App).mount('#app')
