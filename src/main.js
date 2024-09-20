import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

// Configure Axios globally
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$axios.defaults.baseURL = 'http://localhost:8000/api'; // Set your base URL

app.use(router).mount('#app');
