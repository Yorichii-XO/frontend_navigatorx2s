<template>
  <Navbar/>
 <section id="log">
  <div  class="flex flex-col justify-center items-center bg-white h-[100vh] mt-40">
    <div class="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
     
      <div class="my-auto mb-auto mt-8 flex flex-col w-[350px] max-w-[450px] mx-auto lg:mt-[130px] lg:max-w-[450px]">
        <p class="text-[72px] font-bold text-zinc-950 dark:text-white text-center text-bold">Sign UP</p>
        <p class="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400 text-bold text-center">Create An Account!</p>
      <form @submit.prevent="register" class="mb-4">
        <div class="grid gap-2">
          <div class="grid gap-1">        
          <label class="text-zinc-950 dark:text-white" for="name">Full Name</label>
          <input 
            type="text" 
            class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400" 
            v-model="name" 
            placeholder="Enter your full name"
            required>
      
        
          <label class="text-zinc-950 mt-2 dark:text-white" for="email">Email</label>
          <input 
            type="email" 
            class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400" 
            v-model="email" 
            placeholder="Enter your email"
            required>
     
        
          <label class="text-zinc-950 mt-2 dark:text-white" for="password">Password</label>
          <input 
            type="password" 
            class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400" 
            v-model="password" 
            placeholder="Enter your password"
            required>
        
        
          <label class="text-zinc-950 mt-2 dark:text-white" for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400" 
            v-model="confirmPassword" 
            placeholder="Confirm your password"
            required>
     


          </div>
        <button 
        class="whitespace-nowrap bg-blue-700 text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium text-white"
        type="submit">Register Now</button>
        </div>
      </form>
        <!-- Display error message if exists -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    
    </div>
    </div>
  </div>
  </section>
</template>

<script>
import axios from 'axios';
import Navbar from '../Navbar.vue';
export default {
  name: 'RegisterApp',
  components: {
    Navbar
  },
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
          this.$router.push('/dashboard');
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
section input{
  width: 150%;
  font-family: Arial, Helvetica, sans-serif;
}
form{
  margin-right: 40px;
}
.whitespace-nowrap{
  background-color: rgb(28, 33, 53);
}
</style>
