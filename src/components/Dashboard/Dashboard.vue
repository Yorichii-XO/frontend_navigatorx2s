<template>
      <div class="all absolute w-full bg-gray-900 dark:hidden min-h-75"></div>
      <Leftsidebar />
      <main class="relative max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl ">

 
     
      <Header/>
  
      <router-view />
      <Footer/>
    </main>
  
  </template>
  
  <script>
  import Leftsidebar from './Left-sidebar.vue'; 
  import Header from './Header.vue'; 
  import Footer from './Footer.vue'; 

  export default {
    name: 'dashboard',
    components: {
        Leftsidebar,
        Header,
        Footer
    },
   
   
  }
  </script>
  
<style>
.all{
  /* background-color:#00416A; */
}
</style>
  