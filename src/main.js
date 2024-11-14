import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez le routeur
import './assets/main.css';

createApp(App)
    .use(router) // Ajoutez le routeur à l'application
    .mount('#app');