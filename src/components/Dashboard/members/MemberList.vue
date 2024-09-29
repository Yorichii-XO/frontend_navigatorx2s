<template>
    <div class="p-4 bg-white w-5/6 rounded-lg pt-2 ml-6">
      <div class="alert mx-4 bg-white" role="alert">
        <span class="text-black">
          <strong>Add, Edit, Delete, you can use all functionality!</strong>
        </span>
      </div>
    </div>
    <div class="w-full px-6 py-6 mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="flex-none w-full max-w-full px-3">
          <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex items-center justify-between p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
    <!-- Left-aligned heading -->
    <h6 class="dark:text-white">Members Table</h6>

    <!-- Right-aligned button with plus icon -->
    <button @click="showInviteModal = true" 
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 flex items-center space-x-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <!-- Plus icon (using FontAwesome or any other icon set) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        <span>Invite Member</span>
    </button>
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
                    <tr v-for="member in paginatedMembers" :key="member.id">
                      <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ member.id }}</p>
                      </td>
                     
                      <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
    <div class="flex px-2 py-1 items-center">
        <div class="relative">
            <div 
                :style="{ backgroundColor: getAvatarColor(member.name) }" 
                class="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-10 w-10 rounded-full">
                {{ member.name ? member.name.slice(0, 2).toUpperCase() : '??' }}
            </div>
            <!-- Indicator for member's active status -->
            <div 
                class="absolute top-6 right-3 h-4 w-4 rounded-full border-2 border-white" 
                :class="member.is_active === 'active' ? 'bg-green-500' : 'bg-gray-500'">
            </div>
        </div>
    </div>
</td>



                      <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ member.name }}</p>
                      </td>
                      <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ member.email }}</p>
                      </td>
                      <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                        <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ getRoleName(member.role_id) }}</p>
                      </td>
                      <td class="p-2 align-middle border-b border-gray-300 whitespace-nowrap">
  <p class="mb-0 text-xs font-semibold leading-tight" 
     :class="{
       'bg-green-500 text-white w-16 h-4 rounded-lg text-center': member.is_active === 'active', 
       'bg-red-500 text-white w-16 h-4 rounded-lg text-center': member.is_active === 'inactive'
     }">
    {{ member.is_active === 'active' ? 'Active' : 'Inactive' }}
  </p>
</td>


                    
<td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                      <button @click="$router.push({ name: 'EditMember', params: { id: member.id } })" class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button @click="confirmDeleteMember(member.id)" class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-red-400 ml-2">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Pagination -->
              <ul class="flex space-x-3 justify-center mt-8">
                <li class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded text-black" @click="prevPage" :class="{'cursor-not-allowed opacity-50 text-white': currentPage === 1}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                    <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                  </svg>
                </li>
                <li v-for="page in totalPages" :key="page" @click="currentPage = page" class="flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold w-9 h-8 rounded" :class="{'bg-blue-700 text-white': currentPage === page, 'text-[#333]': currentPage !== page}">
                  {{ page }}
                </li>
                <li class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded" @click="nextPage" :class="{'cursor-not-allowed opacity-50': currentPage === totalPages}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                    <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        <!-- Invite Member Modal -->
        <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white rounded-lg p-6 w-80">
                <h3 class="text-lg font-semibold mb-4">Invite a Member</h3>
                <input v-model="inviteEmail" type="email" placeholder="Enter email" class="border rounded p-2 w-full mb-4" />
                <button @click="inviteMember" class="bg-blue-500 text-white rounded px-4 py-2">Send Invitation</button>
                <button @click="showInviteModal = false" class="bg-red-500 text-white rounded px-4 py-2">Cancel</button>
            </div>
        </div>
        
    </div>
  </template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      members: [],
      error: null,
      currentPage: 1,
      itemsPerPage: 10,
      activity: null,
      showInviteModal: false,
      inviteEmail: '',
    };
  },
  async mounted() {
    await this.fetchMembers();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.members.length / this.itemsPerPage);
    },
    paginatedMembers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.members.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchMembers() {
      const token = localStorage.getItem('authToken');

      try {
        const response = await axios.get('http://localhost:8000/api/members', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.members = response.data;
      } catch (err) {
        if (err.response) {
          this.error = `Error fetching members: ${err.response.data.error}`;
        } else if (err.request) {
          this.error = 'No response from the server. Please try again later.';
        } else {
          this.error = `Error: ${err.message}`;
        }
        console.error(err);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    getRoleName(roleId) {
      const roles = { 1: 'Member', 2: 'User' };
      return roles[roleId] || 'Unknown';
    },
    getAvatarColor(name) {
      const colors = ['#FF5733', '#33FF57', '#3357FF']; 
      const index = name.charCodeAt(0) % colors.length; 
      return colors[index];
    },
    async inviteMember() {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(`http://localhost:8000/api/invite`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.inviteEmail,
          }),
        });

        if (response.ok) {
          Swal.fire({
            title: 'Invitation Sent!',
            text: `Invitation sent successfully to ${this.inviteEmail}!`,
            icon: 'success',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'Ok',
          });

          this.showInviteModal = false;
          this.inviteEmail = '';
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Failed to send invitation.',
            icon: 'error',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'Ok',
          });
        }
      } catch (error) {
        console.error("Error sending invitation:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send invitation due to an error.',
          icon: 'error',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'Ok',
        });
      }
    },
    confirmDeleteMember(memberId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:8000/api/members/${memberId}`)
            .then(response => {
              // Remove the deleted member from the list
              this.members = this.members.filter(member => member.id !== memberId);
              Swal.fire('Deleted!', 'Your member has been deleted.', 'success');
            })
            .catch(error => {
              console.error("There was an error deleting the member!", error);
              Swal.fire('Error!', 'Failed to delete member.', 'error');
            });
        }
      });
    },
  },
};
</script>

  
 
  <style scoped>
.bg-black {
    background-color: rgba(171, 171, 171, 0.5);
}
</style>