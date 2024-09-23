<template>
      <div class="absolute w-full bg-gray-800 dark:hidden min-h-75"></div>
      <Leftsidebar />
      <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">

 
     
      <Header/>
  
      <router-view />
    </main>
  
  </template>
  
  <script>
  import Leftsidebar from './Left-sidebar.vue'; 
  import Header from './Header.vue'; 

  export default {
    name: 'dashboard',
    components: {
        Leftsidebar,
        Header
    },
   
   
  };
  </script>
  
  <style>
  /* Your global styles */
  </style>
  