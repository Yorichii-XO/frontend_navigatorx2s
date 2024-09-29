<template>
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border space-y-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
  
      <div v-if="user">
        <!-- User Avatar, Name, and Email in a single row -->
        <div class="flex items-center space-x-4">
          <!-- Avatar with first letter of user's name -->
          <div class="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <!-- User details (name and email) -->
          <div class="flex flex-col">
            <p class="text-xl font-semibold text-gray-700">{{ user.name }}</p>
            <p class="text-sm text-gray-500">{{ user.email }}</p>
          </div>
        </div>
  
        <!-- Created At -->
        <div class="mt-4 text-sm text-gray-600">
          <strong>Joined on:</strong> {{ new Date(user.created_at).toLocaleDateString() }}
        </div>
  
        <!-- Edit Profile Section -->
        <div class="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Edit Profile</h3>
          <form @submit.prevent="updateUserProfile">
            <!-- Name Input -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="editUser.name" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
  
            <!-- Email Input -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="editUser.email" type="email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
  
            <!-- Submit Button -->
            <div class="flex justify-end">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-else class="text-center">
        <p class="text-gray-500">Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2"; // Import SweetAlert2
  
  export default {
    data() {
      return {
        user: null, // Original user data
        editUser: { // Editable user data (for editing form)
          name: "",
          email: "",
        },
      };
    },
    mounted() {
      this.fetchUserProfile();
    },
    methods: {
      fetchUserProfile() {
        const authToken = localStorage.getItem("authToken");
        axios
          .get("/user", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              this.user = response.data.data;
              this.editUser.name = this.user.name;
              this.editUser.email = this.user.email;
            }
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      },
      updateUserProfile() {
        const authToken = localStorage.getItem("authToken");
        axios
          .put("/user", this.editUser, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              // Update the user data with the new edited data
              this.user = { ...this.editUser };
              // Display success message with SweetAlert2
              Swal.fire({
                title: "Success!",
                text: "Profile updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      },
    },
  };
  </script>
  
  <style>
  /* Custom styles can be added here if necessary */
  </style>
  