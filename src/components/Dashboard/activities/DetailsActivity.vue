<template>
    <div class="p-2 bg-white w-5/6 rounded-lg pt-2 ml-20 h-60">
        <!-- Activities Table -->
        <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-full max-w-full px-3">
                <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-xl rounded-2xl">
                    <div class="p-6 pb-0 mb-0 flex items-center justify-between w-full">
    <!-- Left-aligned heading -->
    <h6 class="font-semibold text-lg">Activity Details for {{ activity ? activity.name : "N/A" }}</h6>

    <!-- Right-aligned button inside a router-link -->
    <router-link to="/activities">
        <button 
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Back to Activities &nbsp;<i class="fas fa-arrow-left"></i>
        </button>
    </router-link>
</div>


                    <div class="flex-auto px-0 pt-0 pb-2">
                        <div class="p-0 overflow-x-auto">
                            <table class="items-center w-full mb-0 text-slate-500">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">ID</th>
                                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">User Avatar</th>
                                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">User Name</th>
                                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">Browser</th>
                                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">Duration</th>
                                        <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse text-xxs text-slate-400 opacity-70">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="activity">
                                        <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.id }}</p>
                                        </td>
                                        <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <div class="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                                {{ getAvatar(activity.user ? activity.user.name : 'Unknown User') }}
                                            </div>
                                        </td>
                                        <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.user ? activity.user.name : 'Unknown User' }}</p>
                                        </td>
                                        <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.browser }}</p>
                                        </td>
                                        <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ activity.duration }}</p>
                                        </td>
                                        <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p class="mb-0 text-xs font-semibold leading-tight">{{ formatTime(activity.created_at) }} | {{ formatTime(activity.updated_at) }}</p>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="7" class="text-center text-red-500">No activity data available.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

       
        
        <StatistiqueActivity />
    </div>
</template>

<script>
import StatistiqueActivity from './StatistiqueActivity.vue';
export default {
    name: 'DetailsActivity',
    components: {
        StatistiqueActivity
    },
    props: {
        activityId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            activity: null,
         
          
        };
    },
    mounted() {
        this.fetchActivityDetails();
    },
    methods: {
        fetchActivityDetails() {
            const authToken = localStorage.getItem("authToken");
            fetch(`http://localhost:8000/api/activities/${this.activityId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.activity = data;
                })
                .catch((error) => console.error("Error fetching activity details:", error));
        },
       
        formatTime(time) {
            return new Date(time).toLocaleTimeString();
        },
        getAvatar(name) {
            if (!name) return '';
            const initials = name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
            return initials;
        },
    },
};
</script>

<style scoped>
table {
    border-spacing: 0;
    width: 100%;
    height: 20%;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
}

th {
    font-weight: 600;
    background-color: #f8f8f8;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}


.fixed {
    position: fixed;
}


</style>
