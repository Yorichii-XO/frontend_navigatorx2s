import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Leftaside from '../components/Dashboard/Left-sidebar.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import Tracking from '../components/tracks/tracking.vue';
import Home from '../components/Home.vue';
import Users from '../components/Dashboard/users/UsersList.vue';
import EditUser from '../components/Dashboard/users/EditUser.vue';
import Activities from '../components/Dashboard/activities/ActivitiesList.vue';
import DetailsActivity from '../components/Dashboard/activities/DetailsActivity.vue';
import Members from '../components/Dashboard/members/MemberList.vue';
import EditMember from '../components/Dashboard/members/EditMember.vue';
import UserActivities from '../components/Dashboard/activities/UserActivities.vue';
import Profile from '../components/Dashboard/Profile.vue';

const routes = [
  {
    path: '/',
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
    meta: { requiresAuth: true }, // Protect this route
    children: [
      {
        path: '', // Default route for the dashboard
        name: 'DashboardHome',
        component: () => import('../components/Dashboard/Main.vue'),
      },
      {
        path: '/dashboard', // Nested route for users
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/members', // Nested route for members
        name: 'Members',
        component: Members,
      },
      {
        path: '/edit-user/:id', // Route to edit user
        name: 'EditUser',
        component: EditUser,
        props: true, // Pass route params as props
      },
      {
        path: '/tracking',
        name: 'Tracking',
        component: Tracking
      },
      {
        path: '/activities',
        name: 'Activities',
        component: Activities
      },
      {
        path: '/activities-user',
        name: 'UserActivities',
        component: UserActivities
      },{
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/detailsActivity/:id', // Nested route for activity details
        name: 'DetailsActivity',
        component: DetailsActivity,
        props: (route) => ({ activityId: Number(route.params.id) }),
      },
      {
        path: '/members/edit/:id',
        name: 'EditMember',
        component: EditMember,
        props: true, // Pass route params as props
      },
    ],
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if token exists

  // If the route requires authentication and the user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' }); // Redirect to the login page
  } else {
    next(); // Allow access to the route
  }
});

export default router;
