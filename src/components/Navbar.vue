<template>
  <nav class="bg-white p-4 mt-6 pt-6 w-5/6 rounded-full mx-auto flex justify-center" style="background-color: #020213;">
    <div class="container flex justify-between items-center">
      <div class="text-dark text-xl font-bold" style="color:white; font-family: Comic Sans MS, Comic Sans, cursive;">Navigatorx2s</div>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/" class="text-dark hover:text-gray-300" style="color:white;font-family: Comic Sans MS, Comic Sans, cursive;">Home</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login" class="text-balck hover:text-gray-300" style="color:white;font-family: Comic Sans MS, Comic Sans, cursive;">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register" class="text-white hover:text-gray-300" style="color:white;font-family: Comic Sans MS, Comic Sans, cursive;">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/dashboard" class="text-white hover:text-gray-300" style="color:white;">Dashboard</router-link>
          </li>
          <li v-if="isLoggedIn">
            <a href="#" @click="logout" class="text-white hover:text-gray-300" style="color:white;">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false, // Initial state
    };
  },
  mounted() {
    // Check if the token exists in localStorage to set login status
    this.isLoggedIn = !!localStorage.getItem('token');
  },
  methods: {
    logout() {
      // Clear the token and redirect to the login page
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
