import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const huesApp = createApp(App)

huesApp.use(pinia)
huesApp.mount('#app')
