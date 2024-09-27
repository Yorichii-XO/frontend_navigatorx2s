import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from "vue-toastification"; // Correct import
import axios from 'axios';
import "vue-toastification/dist/index.css"; // Ensure you import the CSS
import './assets/tailwind.css'; // Import Tailwind CSS

const app = createApp(App);

// Configure Axios globally
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$axios.defaults.baseURL = 'http://localhost:8000/api'; // Set your base URL

app.use(router);
app.use(Toast); // Use the Toast plugin

app.mount('#app');
