<template>
  <Navbar/>
  <section id="home">
  <div class="bg-gray-100 min-h-screen">
    <section class="bg-cover bg-center bg-no-repeat text-white" style="background-image: url('https://img.freepik.com/premium-photo/person-using-laptop-with-graph-screen_605423-7064.jpg'); height: 75vh; background-size: cover; background-position: center; background-attachment: fixed;">
      <!-- <section class="bg-cover bg-center inset-0 w-full h-full object-cover  text-white" style="background-image: url('https://readymadeui.com/cardImg.webp'); height: 75vh; background-size: cover; background-position: center; background-attachment: fixed;"> -->

      <div class="max-w-7xl mx-auto py-40 px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold text-white">Welcome to Our Website Navigatorx 2s</h1>
        <p class="mt-4 text-lg">We provide the best solutions for your remote work.</p>
        <a href="#" class="mt-6 inline-block bg-white text-blue-100 px-6 py-3 font-semibold rounded-md shadow-lg hover:bg-blue-800">Get Started</a>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-12 bg-gray-100">
  <div class="max-w-screen-lg mx-auto px-6 sm:px-8 lg:px-12">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900">Our Features</h2>
      <p class="mt-2 text-lg text-gray-600">Explore the key features that make our platform stand out.</p>
    </div>

    <div class="slider">
      <div class="slider-wrapper">
        <!-- Feature 1: Activity Monitoring -->
        <div class="slider-item bg-white shadow-lg rounded-lg p-6 text-center">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">Activity Monitoring</h3>
          <p class="mt-2 text-gray-600">Track active and idle time on the computer. Monitor the applications and documents used. Capture screenshots at regular intervals!</p>
        </div>

        <!-- Feature 2: URL Tracking -->
        <div class="slider-item bg-white shadow-lg rounded-lg p-6 text-center">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10M7 17h10M4 7h.01M4 12h.01M4 17h.01" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">URL Tracking</h3>
          <p class="mt-2 text-gray-600">Record URLs of web pages visited. Categorize websites for better insights. Provide detailed reports on browsing history.</p>
        </div>

        <!-- Feature 3: Time Tracking -->
        <div class="slider-item bg-white shadow-lg rounded-lg p-6 text-center">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">Time Tracking</h3>
          <p class="mt-2 text-gray-600">Calculate time spent on different activities and websites. Generate timesheets for work hours, breaks, and idle periods.</p>
        </div>

        <!-- Feature 4: Reporting & Analytics -->
        <div class="slider-item bg-white shadow-lg rounded-lg p-6 text-center">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18M3 9h18M3 15h18" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">Reporting & Analytics</h3>
          <p class="mt-2 text-gray-600">Offer real-time and historical reports on activity, time usage, and productivity. Provide visualizations for easy interpretation.</p>
        </div>

        <!-- Feature 5: Notifications & Alerts -->
        <div class="slider-item bg-white shadow-lg rounded-lg p-6 text-center">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405 1.405A2 2 0 0118 21H6a2 2 0 01-1.595-3.595L9 17h6zM15 4a5 5 0 00-10 0c0 2.5 1 4 2 5m8 0c1-1 2-2.5 2-5a5 5 0 00-10 0" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900">Notifications & Alerts</h3>
          <p class="mt-2 text-gray-600">Send alerts for excessive idle time or non-work-related activity. Notify administrators of any unusual activity.</p>
        </div>
      </div>
      <div class="slider-controls">
        <button class="prev" @click="moveSlide(-1)">&#10094;</button>
        <button class="next" @click="moveSlide(1)">&#10095;</button>
      </div>
    </div>
  </div>
</section>

<div class="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
      <div class="max-w-xl lg:max-w-lg">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
        <p class="mt-4 text-lg leading-8 text-gray-300">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
        <div class="mt-6 flex max-w-md gap-x-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email">
          <button type="submit" class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Subscribe</button>
        </div>
      </div>
      <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
        <div class="flex flex-col items-start">
          <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
          <dt class="mt-4 font-semibold text-white">Weekly articles</dt>
          <dd class="mt-2 leading-7 text-gray-400">Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.</dd>
        </div>
        <div class="flex flex-col items-start">
          <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
            </svg>
          </div>
          <dt class="mt-4 font-semibold text-white">No spam</dt>
          <dd class="mt-2 leading-7 text-gray-400">Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.</dd>
        </div>
      </dl>
    </div>
  </div>
  <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
    <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
</div>

  </div>
</section>
</template>

<script>
import Navbar from './Navbar.vue'; 

export default {
  name: 'HelloWorld',
  components: {
    Navbar
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    moveSlide(direction) {
      const slides = this.$el.querySelectorAll('.slider-item');
      const totalSlides = slides.length;

      this.currentIndex += direction;
      if (this.currentIndex < 0) {
        this.currentIndex = totalSlides - 1;
      } else if (this.currentIndex >= totalSlides) {
        this.currentIndex = 0;
      }

      const sliderWrapper = this.$el.querySelector('.slider-wrapper');
      sliderWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    },
  },
};
</script>

<style scoped>
a{
  color: black;
}
.slider {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.slider-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  padding-left: 15px;
}

.slider-item {
  margin: 10px;
  min-width: 30%;
  box-sizing: border-box;
}

.slider-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.prev, .next {
  background-color: white;
  color: rgba(9, 10, 44, 0.7);
  border: none;
  cursor: pointer;
  padding: 5px;

  border-radius: 50%;
  font-size: 40px;
  transition: background-color 0.3s;
}
.prev{
  margin-right: 700px;
}
.next{
  margin-left: 200px;
}
.prev:hover, .next:hover {
  background-color: rgba(255, 255, 255, 1);
  color: white;
}
</style>
