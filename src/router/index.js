import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Leftaside from '../components/Dashboard/Left-sidebar.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import Tracking from '../components/tracks/tracking.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/leftaside',
    name: 'Leftaside',
    component: Leftaside
  },
  {
    path: '/dashborad',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: Tracking
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;