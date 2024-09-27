<template>
  <footer class="fixed bottom-0 left-0 w-full bg-gray-200 text-center h-14 pt-2">
    <div class="w-full px-6 mx-auto">
      <div class="flex flex-wrap items-center justify-center -mx-3">
        <div class="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
          <div class="text-sm leading-normal text-slate-500">
            © {{ currentYear }}, made with <i class="fa fa-heart"></i> by
            <a href="" class="font-semibold text-slate-700 dark:text-white" target="_blank">Developper Marwa Benharda</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterApp',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style>
/* Custom styles for the footer */
footer {
  height: 60px; /* Increase the height as per your preference */
}
</style>
