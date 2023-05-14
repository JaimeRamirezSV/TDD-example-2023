import { createApp } from 'vue';
import './style.css';
import "vue-toastification/dist/index.css";
import App from './App.vue';
import router from './plugins/router';
import pinia from './plugins/pinia';
import Toast from "vue-toastification";

const options = {
    // You can set your default options here
};

createApp( App )
    .use( router )
    .use( pinia )
    .use( Toast, options )
    .mount('#app');
