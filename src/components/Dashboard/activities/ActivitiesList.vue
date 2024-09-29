<template>
    <div class="p-4 bg-white w-5/6 rounded-lg pt-2 ml-6">
        <div class="alert mx-4 bg-white" role="alert">
            <span class="text-black">
                <strong>Edit, Delete you can use all functionality!</strong>
            </span>
        </div>
    </div>

    <div class="w-full px-6 py-6 mx-auto">
        <!-- Dropdown for selecting day -->
        <div class="mb-4 max-w-sm mx-auto">
            <label for="day-select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Day:
            </label>
            <select v-model="selectedDay" @change="filterActivitiesByDay" id="day-select"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">All Days</option>
                <option v-for="day in availableDays" :key="day" :value="day">{{ day }}</option>
            </select>
        </div>

        <!-- Activities Table -->
        <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-full max-w-full px-3">
                <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-xl rounded-2xl">
                    <div class="p-6 pb-0 mb-0">
                        <h6 class="font-semibold text-lg">Activities Table</h6>
                    </div>
                    <div class="flex-auto px-0 pt-0 pb-2">
                        <div class="p-0 overflow-x-auto">
                            <table class="items-center w-full mb-0 text-slate-500">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            ID</th>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            User Name</th>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            Avatar</th>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            Browser</th>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            Time</th>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            Duration</th>
                                        <th
                                            class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="activity in paginatedUsers" :key="activity.id">
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.id }}</p>
                                        </td>
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">
        {{ activity.member_name || activity.user?.name || 'Unknown' }}
    </p>



                                        </td>
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <div class="relative inline-flex items-center">
                                                <div :style="{ backgroundColor: getAvatarColor(activity.member_name ) }"
                                                    class="w-10 h-10 flex items-center justify-center text-white rounded-full">
                                                    {{ activity.member_name.substring(0, 2).toUpperCase() || '?' }}
                                                </div>

                                              

                                            </div>
                                        </td>
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.browser }}
                                            </p>
                                        </td>
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{
                                                formatTime(activity.created_at) }} | {{ formatTime(activity.updated_at)
                                                }}</p>
                                        </td>
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.duration }}
                                            </p>
                                        </td>
                                        <td
                                            class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <router-link :to="`/detailsActivity/${activity.id}`"
                                                class="text-blue-500 hover:text-blue-700">
                                                <i class="fas fa-eye"></i> <!-- View Details Icon -->
                                            </router-link>

                                            <button @click="confirmDeleteActivity(activity.id)"
                                                class="text-red-500 hover:text-red-700 ml-2">
                                                <i class="fas fa-trash-alt"></i> <!-- Delete Icon -->
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <ul class="flex space-x-3 justify-center mt-8">
                            <li class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded text-black"
                                @click="prevPage"
                                :class="{ 'cursor-not-allowed opacity-50 text-white': currentPage === 1 }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500"
                                    viewBox="0 0 55.753 55.753">
                                    <path
                                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                        data-original="#000000" />
                                </svg>
                            </li>
                            <li v-for="page in totalPages" :key="page" @click="currentPage = page"
                                class="flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold w-9 h-8 rounded"
                                :class="{
                                    'bg-blue-700 text-white': currentPage === page,
                                    'text-[#333]': currentPage !== page
                                }">
                                {{ page }}
                            </li>
                            <li class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded"
                                @click="nextPage"
                                :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500 rotate-180"
                                    viewBox="0 0 55.753 55.753">
                                    <path
                                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                        data-original="#000000" />
                                </svg>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import { watch } from 'vue';

export default {
    name: "ActivityList",
    data() {
        return {
            activities: [], // All activities
            filteredActivities: [], // Filtered activities based on selected day
            paginatedActivities: [], // Activities for the current page
            selectedDay: '', // The selected day from the dropdown
            availableDays: [], // List of available days for the dropdown
            currentPage: 1,
            itemsPerPage: 4 // Adjust this as needed
        };
    },
    mounted() {
        this.fetchActivities();
    },
    watch: {
        filteredActivities() {
            this.updatePaginatedActivities();
        },
        currentPage() {
            this.updatePaginatedActivities();
        },
    },
    computed: {
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.activities.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.activities.length / this.itemsPerPage);
        }
    },
    methods: {
        // Fetch activities from the API
        fetchActivities() {
            const authToken = localStorage.getItem('authToken');
            fetch('http://localhost:8000/api/activities', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.activities = data;
                    this.filteredActivities = data;
                    this.extractAvailableDays();
                    this.updatePaginatedActivities();
                })
                .catch(error => console.error('Error fetching activities:', error));
        },
        extractAvailableDays() {
            // Extract available days from activities
            this.availableDays = [...new Set(this.activities.map(activity => new Date(activity.start_time).toLocaleDateString()))];
        },
        filterActivitiesByDay() {
            if (this.selectedDay) {
                this.filteredActivities = this.activities.filter(activity => new Date(activity.start_time).toLocaleDateString() === this.selectedDay);
            } else {
                this.filteredActivities = this.activities;
            }
            this.currentPage = 1; // Reset to the first page when filtering
        },
        updatePaginatedActivities() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.paginatedActivities = this.filteredActivities.slice(start, end);
            this.totalPages = Math.ceil(this.filteredActivities.length / this.itemsPerPage);
        },
        formatTime(time) {
            // Format time as needed
            return new Date(time).toLocaleTimeString(); // Example formatting
        },
        getAvatarColor(name) {
            const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return `hsl(${hash % 360}, 70%, 50%)`; // Dynamic color based on name
        },
        editActivity(activityId) {
            // Redirect to edit page or open a modal for editing
            console.log('Edit activity with ID:', activityId);
            // Implement your edit logic here
        },
        confirmDeleteActivity(activityId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won’t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteActivity(activityId);
                }
            });
        },
        deleteActivity(activityId) {
            const authToken = localStorage.getItem('authToken');
            fetch(`http://localhost:8000/api/activities/${activityId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        this.activities = this.activities.filter(activity => activity.id !== activityId);
                        this.filteredActivities = this.filteredActivities.filter(activity => activity.id !== activityId);
                        console.log('Activity deleted:', activityId);
                        // Show success message with SweetAlert
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Activity has been deleted.',
                            icon: 'success',
                            confirmButtonColor: '#28a745', // Green color for the OK button
                            confirmButtonText: 'OK'
                        });
                    } else {
                        console.error('Error deleting activity:', response.status);
                    }
                })
                .catch(error => console.error('Error deleting activity:', error));
        }
        ,
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
        watch: {
        filteredActivities(newVal) {
            if (Array.isArray(newVal)) {
                this.updatePaginatedActivities();
            } else {
                console.error('filteredActivities is not an array:', newVal);
            }
        },
        currentPage() {
            this.updatePaginatedActivities();
        },
    },
    mounted() {
        this.fetchActivities();
    }}
};
</script>

<style scoped>
/* Your existing styles can go here */
</style>