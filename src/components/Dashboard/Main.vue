<template>
  <!-- cards -->
  <div class="w-full px-6 py-6 mx-auto">
    <!-- row 1 -->
    <div class="flex flex-wrap -mx-3">
      <!-- card1 -->
      <div class="card1 max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Today's Members</p>
                  <h5 class="mb-2 font-bold dark:text-white  ">{{ memberCount }}</h5>
                  <p class="mb-0 dark:text-white dark:opacity-60">
                    <span class="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                    since yesterday
                  </p>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 w-90">
                    This metric reflects the growth in my member base compared to the previous day.
                  </p>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                  <i class="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card2 -->
      <div class="card1 w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Today's Users</p>
                  <h5 class="mb-2 font-bold dark:text-white">{{ userCount }}</h5>
                  <p class="mb-0 dark:text-white dark:opacity-60">
                    <span class="text-sm font-bold leading-normal text-emerald-500">+3%</span>
                    since last week
                  </p>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 w-90">
                    This count shows the Our Customers in platforme 2s Navigatorx.
                  </p>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-red-600 to-orange-600">
                  <i class="fas fa-users text-lg relative top-3.5 text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cards row 2 -->
    <div class="flex flex-wrap mt-6 -mx-3">
      <div class="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
        <div class="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid  bg-clip-border">
       
          <div class="flex-auto p-4">
            <div>
              <img class="object-cover h-80 w-full" src="https://media.licdn.com/dms/image/sync/v2/D5627AQFVF9Sv8P1lYQ/articleshare-shrink_800/articleshare-shrink_800/0/1711474317811?e=2147483647&v=beta&t=GhHA9zEDxy91jZuiJ6b0XFJLGHyVeBqAdqvc13ky1Jw" alt="carousel image" loading="lazy" />

              <canvas id="chart-line" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div slider class="relative w-full h-full overflow-hidden rounded-2xl">
         
          <!-- Slide 3 -->
          <div slide class="absolute w-full h-full transition-all duration-500">
            <img class="object-cover h-full" src="https://thumbs.dreamstime.com/b/exploding-clock-golden-swirls-dramatic-golden-clock-exploding-particles-illustrating-concept-fleeting-time-318780801.jpg" alt="carousel image" />
            <div class="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
              <div class="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
                <i class="top-0.75 text-xxs relative text-slate-700 ni ni-trophy"></i>
              </div>
              <h5 class="mb-1 text-white">Share with us your design tips!</h5>
              <p class="dark:opacity-80">Don’t be afraid to be wrong because you can’t learn anything from a compliment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cards row 3 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Main',
  data() {
    return {
      userCount: 0,
      memberCount: 0,
      authToken: localStorage.getItem('authToken'), // Get the auth token from local storage
    };
  },
  methods: {
    async fetchData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Include the auth token in the headers
          },
        };
        
        const usersResponse = await axios.get('/users', config); // Adjust the API endpoint as necessary
        const membersResponse = await axios.get('/members', config); // Adjust the API endpoint as necessary
        
        this.userCount = usersResponse.data.length; // Assuming the response contains an array of users
        this.memberCount = membersResponse.data.length; // Assuming the response contains an array of members
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.card1 {
  width: 49%;
}
</style>
