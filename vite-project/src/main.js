import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(createPinia())
