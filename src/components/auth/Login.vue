<template>
  <Navbar />
  <section id="log">
    <div class="flex flex-col justify-center items-center bg-white h-[100vh] mt-40">
      <div class="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
        <div class="my-auto mb-auto mt-8 flex flex-col w-[350px] max-w-[450px] mx-auto lg:mt-[130px] lg:max-w-[450px]">
          <p class="text-[72px] font-bold text-zinc-950 dark:text-white text-center text-bold">Sign In</p>
          <p class="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">Enter your email and password to sign in!</p>
          <form @submit.prevent="login" class="mb-4">
            <div class="grid gap-2">
              <div class="grid gap-1">
                <label class="text-zinc-950 dark:text-white" for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                  v-model="email"
                  placeholder="name@example.com"
                  required
                />
                <label class="text-zinc-950 mt-2 dark:text-white" for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                  v-model="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                class="whitespace-nowrap bg-blue-700 mt-2 flex h-[unset]  items-center justify-center rounded-lg px-4 py-4 text-bold font-medium text-white w-40 ml-20"
              >
                Sign in
              </button>
            </div>
          </form>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p><a href="/dashboard/signin/signup" class="font-medium text-zinc-950 dark:text-white text-sm">Don't have an account?<router-link to="/register" class="text-blue-800">&nbsp;Sign up</router-link> </a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import Navbar from '../Navbar.vue';

export default {
  name: 'LoginApp',
  components: {
    Navbar
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: this.email,
      password: this.password
    });

    const { token, role, id: userId } = response.data; // Ensure 'id' is the correct key for the user ID
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Store token, expiration time, role, and user ID
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiration', expirationTime);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId); // Save the user ID
    console.log('Token stored in localStorage:', localStorage.getItem('authToken'));

    // Redirect based on role
    if (role === 'admin') {
      this.$router.push('/dashboard');
    } else {
      this.$router.push('/dashboard');
    }
  } catch (error) {
    console.error('Login error:', error);
    this.errorMessage = 'Invalid email or password';
  }
},


    // Helper to check if token is expired
    isTokenExpired() {
      const expirationTime = localStorage.getItem('tokenExpiration');
      const currentTime = new Date().getTime();

      if (!expirationTime || currentTime > expirationTime) {
        // Token expired, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        return true;
      }
      return false;
    }
  },
  mounted() {
    // Check token expiration on component mount
    if (this.isTokenExpired()) {
      console.log('Token has expired, please log in again');
      this.$router.push('/login'); // Redirect to login if the token has expired
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
.whitespace-nowrap{
  background-color: rgb(35, 63, 173);
}
</style>
