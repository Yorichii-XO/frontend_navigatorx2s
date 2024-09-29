<template>
  <div class="p-4 bg-white w-5/6 rounded-lg pt-2 ml-6">
    <div class="alert mx-4 bg-white" role="alert">
      <span class="text-black">
        <strong>Add, Edit, Delete you can use all functional!</strong>
      </span>
    </div>
  </div>
  <div class="p-4 bg-white w-5/6 rounded-lg pt-2 ml-6">
    <div class="alert mx-4 bg-white" role="alert">
      <span class="text-black">
        <strong>Add, Edit, Delete you can use all functional!</strong>
      </span>
    </div>
  </div>
  <div class="w-full px-6 py-6 mx-auto">
    <div class="flex flex-wrap -mx-3">
      <div class="flex-none w-full max-w-full px-3">
        <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 class="dark:text-white">Users Table</h6>
            <button @click="addUser" class="text-white float-right right-0 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add User</button>
          </div>
          <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
              <table class="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                <thead class="align-bottom">
                  <tr>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Id</th>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Avatar</th>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Full Name</th>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Email</th>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Role</th>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                    <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in paginatedUsers" :key="user.id">
                    <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ user.id }}</p>
                    </td>
                    <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <div class="flex px-2 py-1">
                        <div>
                          <div :style="{ backgroundColor: getAvatarColor(user.name) }" class="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-10 w-10 rounded-full">
                            {{ user.name.slice(0, 2).toUpperCase() }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ user.name }}</p>
                    </td>
                    <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ user.email }}</p>
                    </td>
                    <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ getRoleName(user.role_id) }}</p>
                    </td>
                    <td class="p-2 align-middle border-b border-gray-300 whitespace-nowrap">
                      <p class="mb-0 text-xs font-semibold leading-tight" :class="{'bg-green-500 text-white w-16 h-4 rounded-lg text-center ': user.is_active === 'active', 'bg-gray-500 text-white w-16 h-4 rounded-lg text-center  ': user.is_active === 'inactive'}">
                        {{ user.is_active }}
                      </p>
                    </td>
                    <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <button @click="$router.push({ name: 'EditUser', params: { id: user.id } })" class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button @click="deleteUser(user.id)" class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-red-400 ml-2">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination -->
           
            <ul class="flex space-x-3 justify-center mt-8">
  <li
    class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded text-black"
    @click="prevPage"
    :class="{'cursor-not-allowed opacity-50 text-white': currentPage === 1}"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
      <path
        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
        data-original="#000000"
      />
    </svg>
  </li>
  <li
    v-for="page in totalPages"
    :key="page"
    @click="currentPage = page"
    class="flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold w-9 h-8 rounded"
    :class="{
      'bg-blue-700 text-white': currentPage === page,
      'text-[#333]': currentPage !== page
    }"
  >
    {{ page }}
  </li>
  <li
    class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded"
    @click="nextPage"
    :class="{'cursor-not-allowed opacity-50': currentPage === totalPages}"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
      <path
        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
        data-original="#000000"
      />
    </svg>
  </li>
</ul>

            <!-- Pagination End -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      roles: [],
      currentPage: 1,
      itemsPerPage: 4 // Adjust this as needed
    };
  },
  mounted() {
    this.fetchUsers();
   
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.users.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    }
  },
  methods: {
    async fetchUsers() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('http://localhost:8000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('User data:', response.data); // Add this line for debugging

    // Check if the response contains an array of users
    if (Array.isArray(response.data)) {
      this.users = response.data;
    } else {
      console.error('No users returned.');
      this.users = []; // Clear the users array if no users are returned
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle unauthorized error (super-admin access only)
      console.error('Access denied. You are not authorized to view the users.');
    } else {
      // Handle other errors
      console.error('Error fetching users:', error);
    }
  }
}
,
    getRoleName(roleId) {
      const role = this.roles.find(role => role.id === roleId);
      return role ? role.name : 'Unknown Role';
    },
    async deleteUser(userId) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    editUser(userId) {
      alert(`Edit user functionality for user ID: ${userId} not implemented yet.`);
    },
    getAvatarColor(name) {
      const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const color = `hsl(${hash % 360}, 50%, 50%)`;
      return color;
    },
    addUser() {
      this.$router.push({ name: 'AddUser' });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>



<style scoped>
.right-0 {
  margin-left: 80%;
}
</style>