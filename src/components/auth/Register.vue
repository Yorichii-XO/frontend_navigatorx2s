<template>
  <div class="wrapper" style="background-image: url('images/bg-registration-form-2.jpg');">
    <div class="inner">
      <form @submit.prevent="register">
        <h3>Registration Form</h3>
        
        <div class="form-wrapper">
          <label for="name">Full Name</label>
          <input 
            type="text" 
            class="form-control" 
            v-model="name" 
            placeholder="Enter your full name"
            required>
        </div>
        
        <div class="form-wrapper">
          <label for="email">Email</label>
          <input 
            type="email" 
            class="form-control" 
            v-model="email" 
            placeholder="Enter your email"
            required>
        </div>
        
        <div class="form-wrapper">
          <label for="password">Password</label>
          <input 
            type="password" 
            class="form-control" 
            v-model="password" 
            placeholder="Enter your password"
            required>
        </div>
        
        <div class="form-wrapper">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            class="form-control" 
            v-model="confirmPassword" 
            placeholder="Confirm your password"
            required>
        </div>

        <div class="checkbox">
          <label>
            <input type="checkbox" required> I accept the Terms of Use & Privacy Policy.
            <span class="checkmark"></span>
          </label>
        </div>
        
        <button type="submit">Register Now</button>

        <!-- Display error message if exists -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterApp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      // Validate password confirmation
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        // Send registration request
        const response = await axios.post('http://localhost:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword // Ensure passwords match
        });

        const { token, role } = response.data;

        // Store token and role in local storage
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', role);

        console.log('Registration successful', role);

        // Redirect based on role
        if (role === 'admin') {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        this.errorMessage = error.response ? error.response.data.message || 'Registration failed. Please try again.' : 'Registration failed. Please try again.';
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
