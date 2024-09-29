<template>
  <div>
    <p class="ml-10 text-white text-2xl">View Timesheets</p>
    <div class="flex">
      <p class="ml-10 text-gray-700 text-sm bg-white px-4 py-2 inline-block border-2 border-gray-300 rounded-lg w-2/5">
        {{ formattedDate }} <i class="relative top-0 text-sm leading-normal text-orange-500 ni ni-calendar-grid-58"></i>
      </p>

      <div class="inline-block relative ml-4 w-full">
        <button @click="toggleDropdown"
          class="text-gray-700 text-sm bg-white px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none">
          +01
        </button>

        <div v-if="showDropdown" class="absolute left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <p class="px-4 py-2 text-gray-800 text-sm w-full">Member's time zone</p>
          <p class="px-4 py-2 text-black text-sm w-full ">+01: Africa/Casablanca</p>
        </div>
      </div>
    </div>

    <p class="px-4 py-2 text-sm w-2/3 ml-6 text-white">
      <svg class="feather feather-alert-circle" fill="yellow" height="24" stroke="black" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      Time is adapt with only country
    </p>

    <div :class="['activity-tracker']">
      <div class="flex p-2 ml-2 ">
        <div class="border rounded-lg p-2 w-56 h-16 mt-6 " v-if="!isActive">
          <svg width="35px" fill="blue" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM372.5 276.5l-144 88C224.7 366.8 220.3 368 216 368c-13.69 0-24-11.2-24-24V168C192 155.3 202.2 144 216 144c4.344 0 8.678 1.176 12.51 3.516l144 88C379.6 239.9 384 247.6 384 256C384 264.4 379.6 272.1 372.5 276.5z"/>
          </svg>
          &nbsp; <button @click="startActivity">Start Activity</button>
        </div>

        <div v-else>
          <button @click="stopActivity" class="mb-2 border rounded-lg p-2">
            <svg width="35px" fill="blue" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM352 328c0 13.2-10.8 24-24 24h-144C170.8 352 160 341.2 160 328v-144C160 170.8 170.8 160 184 160h144C341.2 160 352 170.8 352 184V328z"/>
            </svg>
            &nbsp; Stop Activity
          </button>
        </div>
      </div>

      <div class="containerr overflow-hidden mt-4 mx-auto mb-40">
        <div class="flex items-start justify-center gap-4 count-down-main">
          <div class="timer w-16">
            <div>
              <h3 class="countdown-element days font-manrope font-semibold text-2xl text-indigo-600 text-center">
                {{ days }}
              </h3>
            </div>
            <p class="text-sm font-normal text-gray-900 mt-1 text-center w-full">days</p>
          </div>
          <h3 class="font-manrope font-semibold text-2xl text-gray-900">:</h3>
          <div class="timer w-16">
            <div>
              <h3 class="countdown-element hours font-manrope font-semibold text-2xl text-indigo-600 text-center">
                {{ hours }}
              </h3>
            </div>
            <p class="text-sm font-normal text-gray-900 mt-1 text-center w-full">hours</p>
          </div>
          <h3 class="font-manrope font-semibold text-2xl text-gray-900">:</h3>
          <div class="timer w-16">
            <div>
              <h3 class="countdown-element minutes font-manrope font-semibold text-2xl text-indigo-600 text-center">
                {{ minutes }}
              </h3>
            </div>
            <p class="text-sm font-normal text-gray-900 mt-1 text-center w-full">minutes</p>
          </div>
          <h3 class="font-manrope font-semibold text-2xl text-gray-900">:</h3>
          <div class="timer w-16">
            <div>
              <h3 class="countdown-element seconds font-manrope font-semibold text-2xl text-indigo-600 text-center">
                {{ seconds }}
              </h3>
            </div>
            <p class="text-sm font-normal text-gray-900 mt-1 text-center w-full">seconds</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import axios from 'axios';

export default {
  data() {
    return {
      isActive: false,
      currentActivity: {},
      elapsedTime: 0,
      intervalId: null,
      formattedDate: this.getFormattedDate(),
      showDropdown: false,
    };
  },
  computed: {
    days() {
      return Math.floor(this.elapsedTime / 86400);
    },
    hours() {
      return Math.floor((this.elapsedTime % 86400) / 3600);
    },
    minutes() {
      return Math.floor((this.elapsedTime % 3600) / 60);
    },
    seconds() {
      return this.elapsedTime % 60;
    },
  },
  methods: {
    async startActivity() {
  try {
    // Check if the user is a member
    const isMember = await this.checkIfUserIsMember();

    let memberId = null;
    if (isMember) {
      // Get the member ID (this could be from local storage, a state management store, etc.)
      memberId = localStorage.getItem('memberId'); // Ensure this is set when the user logs in as a member
    }

    // Send the start activity request
    const response = await axios.post('/activities/start', {
      member_id: memberId, // Include member_id if exists
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    this.currentActivity = response.data;
    this.isActive = true;
    this.elapsedTime = 0;
    this.startElapsedTime();
  } catch (error) {
    console.error('Error starting activity:', error);
  }
},

// Helper method to check if the user is a member
async checkIfUserIsMember() {
  try {
    // Replace with your logic to determine if the user is a member
    const response = await axios.get('/members/check', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data.isMember; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error checking member status:', error);
    return false; // Default to not a member in case of error
  }
},

    async stopActivity() {
      try {
        await axios.put(`/activities/stop/${this.currentActivity.id}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.isActive = false;
        this.currentActivity = {};
        clearInterval(this.intervalId);
      } catch (error) {
        console.error('Error stopping activity:', error);
      }
    },
    startElapsedTime() {
      this.intervalId = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    },
    async fetchActivities() {
      try {
        const response = await axios.get('/activities', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.activities = response.data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    },
    getFormattedDate() {
      const today = new Date();
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return `${today.toLocaleDateString('en-US', options)}`;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
  mounted() {
    this.fetchActivities();
  },
};
</script>

<style scoped>
.activity-tracker {
  border-radius: 8px;
  padding: 1rem;
  margin-top: 80px; 
margin-left: 10%;
}
.countdown-main {
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  
}
.containerr{
 margin-top:-7%;
}

.timer {
  text-align: center;
}
</style>