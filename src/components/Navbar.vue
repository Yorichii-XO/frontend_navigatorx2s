<template>
  <header
     :class="navbarBgColor"
    class="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg transition-all duration-300 mt-10"
  >
    <div class="px-4">
      <div class="flex items-center justify-between">
        <div class="flex shrink-0">
          <a aria-current="page" class="flex items-center" href="/">
            <img
              class="h-10 w-auto bg-transparent"
              src="https://seeklogo.com/images/N/navigation-logo-06693A29A3-seeklogo.com.png"
              alt="Website Logo"
            />
            <p class="sr-only">Navigatorx2s</p>
          </a>
        </div>
        <div class=" md:flex md:items-center md:justify-center md:gap-5">
          <router-link
            to="/"
            class="inline-block rounded-lg px-2 py-1 text-sm font-bold text-balack transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
           
            >
            Home
          </router-link>
          <a
            class="inline-block rounded-lg px-2 py-1 text-sm font-bold text-black cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
            @click.prevent="$router.push('#how-it-works')"
          >
            How it works
          </a>
          <a
            class="inline-block rounded-lg px-2 py-1 text-sm font-bold text-black cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
            @click.prevent="scrollTo('features', 'bg-gray-900')"
          >
            Features
          </a>
        </div>
        <div class="flex items-center justify-end gap-3">
        
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:text-gray-900"
          @click.prevent="scrollTo('log', 'bg-gray-900')"
            >
            <a
              class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150"
              href="/login"
            >
              Sing In
            </a>
          </router-link>
          <router-link
            v-if="!isLoggedIn"
            to="/register"
            class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:text-gray-900"
          @click.prevent="scrollTo('log', 'bg-gray-900')"
            >
            <a
              class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150"
              href="/login"
            >
              Sing Up
            </a>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false, // Initial state
      navbarBgColor: "bg-white", // Default navbar background color
    };
  },
  mounted() {
    // Check if the token exists in localStorage to set login status
    this.isLoggedIn = !!localStorage.getItem("token");
  },
  methods: {
    scrollTo(sectionId, bgColor) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        this.changeNavbarColor(bgColor); // Change navbar color
      }
    },
    changeNavbarColor(color) {
      this.navbarBgColor = color; // Set the background color to the custom color
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
  },
};
</script>
