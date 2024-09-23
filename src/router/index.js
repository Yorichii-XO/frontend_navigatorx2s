import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Leftaside from '../components/Dashboard/Left-sidebar.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import Tracking from '../components/tracks/tracking.vue';
import Home from '../components/Home.vue';
import Users from '../components/Dashboard/users/UsersList.vue';
import EditUser from '../components/Dashboard/users/EditUser.vue';

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
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
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '', // Default route for the dashboard
        name: 'DashboardHome',
        component: () => import('../components/Dashboard/Main.vue'), // Optional: add a home component for the dashboard
      },
      {
        path: '/users', // Nested route for users
        name: 'Users',
        component: Users,
      }, {
        path: '/edit-user/:id', // Route to edit user
        name: 'EditUser',
        component: EditUser,
      },
    ],
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: Tracking
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
