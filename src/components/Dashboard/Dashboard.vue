<template>
    <div id="app">
      <Leftsidebar />
      <router-view />
     
    </div>
  </template>
  
  <script>
  import Leftsidebar from './Left-sidebar.vue'; 
  export default {
    name: 'dashboard',
    components: {
        Leftsidebar
    },
   
   
  };
  </script>
  
  <style>
  /* Your global styles */
  </style>
  