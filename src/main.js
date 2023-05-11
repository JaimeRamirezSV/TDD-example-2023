import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import pinia from './plugins/pinia'

createApp(App).use( router ).use( pinia ).mount('#app')
