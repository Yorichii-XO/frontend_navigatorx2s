<template>
  <div class="wrapper" style="background-image: url('images/bg-registration-form-2.jpg');">
    <div class="inner">
      <form @submit.prevent="login">
        <h3>Login Form</h3>
        
        <div class="form-wrapper">
          <label for="email">Email</label>
          <input 
            type="text" 
            class="form-control" 
            v-model="email" 
            placeholder="Enter your email"
            required
          >
        </div>
        
        <div class="form-wrapper">
          <label for="password">Password</label>
          <input 
            type="password" 
            class="form-control" 
            v-model="password" 
            placeholder="Enter your password"
            required
          >
        </div>
        
        <div class="checkbox">
          <label>
            <input type="checkbox" required> I accept the Terms of Use & Privacy Policy.
            <span class="checkmark"></span>
          </label>
        </div>
        
        <button type="submit">Login</button>
        
        <!-- Display error message if exists -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginApp',
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
        // Make the API call to login
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Extract the token and role from the response
        const { token, role } = response.data; // Ensure this matches your API response

        // Store token and role in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', role);

        // Handle successful login
        console.log('Login successful', role);

        // Redirect based on user role
        if (role === 'admin') {
          this.$router.push('/tracking'); // Redirect admin to tracking page
        } else {
          this.$router.push('/tracking'); // Redirect non-admin users
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password';
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
