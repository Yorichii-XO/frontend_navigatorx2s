<template>
     <div class="p-4 bg-white w-5/6 rounded-lg pt-2 ml-6">
    <div class="alert mx-4 bg-white" role="alert">
      <span class="text-black">
        <strong>View your Activities!</strong>
      </span>
    </div>
  </div>
    <div class="flex-auto px-4 pt-4 pb-2">
      <h1 class="text-2xl font-semibold mb-4 text-center justify-center items-center text-white">Details of Your Activities</h1>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="activities.length === 0" class="text-center justify-center items-center text-white">No activities found.</div>
      
      <div class="p-0 overflow-x-auto bg-white rounded-lg items-center justify-center mt-20">
        <table class="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
          <thead class="align-bottom">
            <tr>
              <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">ID</th>
              <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Browser</th>
              <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Start Time</th>
              <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">End Time</th>
              <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Duration</th>
              <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.id">
              <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ activity.id }}</p>
              </td>
              <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ activity.browser }}</p>
              </td>
              <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ formatDate(activity.start_time) }}</p>
              </td>
              <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ activity.end_time ? formatDate(activity.end_time) : 'Ongoing' }}</p>
              </td>
              <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ activity.duration || 'N/A' }}</p>
              </td>
              <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">{{ formatDate(activity.created_at) }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        activities: [],
        loading: true,
      };
    },
    methods: {
      async fetchActivities() {
        try {
          const token = localStorage.getItem('authToken');
  
          const response = await axios.get('/activities', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.activities = response.data;
        } catch (error) {
          console.error('Error fetching activities:', error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      },
    },
    mounted() {
      this.fetchActivities();
    },
  };
  </script>
  
  <style scoped>
  /* You can add additional styles if necessary */
  </style>
  