<template>
  <div>
    <h1>Tracking</h1>
    <button v-if="!isTracking" @click="startTracking">Start Tracking</button>
    <button v-if="isTracking" @click="stopTracking">Stop Tracking</button>

    <p v-if="timeSpent">Time Spent: {{ formatTime(timeSpent) }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isTracking: false,
      startTime: null,
      timeSpent: 0,
      intervalId: null,
      errorMessage: '',
      activityId: null
    };
  },
  methods: {
    formatTime(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    },

    async startTracking() {
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({ action: 'getAuthData' }, async (response) => {
            if (response && response.authToken && response.activityId) {
              const token = response.authToken;

              const res = await axios.post(
                'http://localhost:8000/api/activities/start',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );

              if (res.data && res.data.id) {
                this.activityId = res.data.id;

                // Store the activity ID in chrome.storage
                chrome.storage.local.set({ activityId: this.activityId });

                this.isTracking = true;
                this.startTime = new Date();
                this.intervalId = setInterval(() => {
                  this.timeSpent = new Date() - this.startTime;
                }, 1000);
              } else {
                throw new Error('Failed to retrieve activity ID.');
              }
            } else {
              this.errorMessage = 'Could not retrieve auth data.';
            }
          });
        } else {
          this.errorMessage = 'Chrome runtime is not available. Please run in a Chrome extension.';
        }
      } catch (error) {
        console.error('Error starting tracking:', error);
        this.errorMessage = 'Could not start tracking. Check network or try again later.';
      }
    },

    async stopTracking() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          this.errorMessage = 'No token found, please log in.';
          return;
        }

        // Stop tracking logic here
        await axios.put(
          `http://localhost:8000/api/activities/stop/${this.activityId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        clearInterval(this.intervalId);
        this.isTracking = false;
        this.startTime = null;
        this.timeSpent = 0;
        this.activityId = null;
      } catch (error) {
        console.error('Error stopping tracking:', error);
        this.errorMessage = 'Could not stop tracking. Check network or try again later.';
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
  font-family: 'Muli', sans-serif; /* Adjust the font-family name as needed */
}

/* Example of using the font in the component */
h1 {
  font-family: 'Muli', sans-serif;
}
</style>
