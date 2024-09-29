<template>
    <div class="container mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Edit User</h2>
  
      <div class="bg-white shadow-md rounded p-6">
        <label class="block mb-2">Full Name:</label>
        <input
          type="text"
          v-model="editedUser.name"
          class="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />
  
        <label class="block mb-2">Email:</label>
        <input
          type="email"
          v-model="editedUser.email"
          class="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />
  
        <label class="block mb-2">Role:</label>
        <p class="border border-gray-300 rounded px-3 py-2 w-full mb-4">{{ currentRoleName }}</p>
  
        <div class="flex justify-end">
          <button @click="updateUser" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
          <router-link to="/users" class="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedUser: {
          id: null,
          name: '',
          email: '',
          role_id: null,
        },
        roles: [],
      };
    },
    computed: {
      currentRoleName() {
        const role = this.roles.find(role => role.id === this.editedUser.role_id);
        return role ? role.name : 'No role assigned'; // Fallback text if no role is found
      },
    },
    mounted() {
      this.fetchRoles();
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        const userId = this.$route.params.id;
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`http://localhost:8000/api/members/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editedUser = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      async fetchRoles() {
        try {
          const response = await axios.get('http://localhost:8000/api/roles');
          this.roles = response.data;
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      },
      async updateUser() {
        try {
          const token = localStorage.getItem('authToken');
          await axios.put(`http://localhost:8000/api/members/${this.editedUser.id}`, this.editedUser, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.$router.push('/members');
        } catch (error) {
          console.error('Error updating user:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  