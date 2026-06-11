<template>
  <div class="h-vh" :class="[{ 'bg-zinc-200': !isDark }]">
    <div class="relative">
      <div class="w-full fixed top-0 left-0 z-3">
        <Topbar @isDark="darkMode" />
      </div>
      <div
        class="min-w-[22rem] overflow-auto z-2 fixed col-span-2 pl-8 py-8 h-[calc(100vh-5rem)]"
      >
        <Navbar />
      </div>
      <div
        class="ml-0 md:ml-[22rem] overflow-auto z-1 mt-[5rem] p-8 h-[calc(100vh-5rem)]"
      >
        <slot />
      </div>
    </div>
    <div class="footer">
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
const isCollapsed = ref(false);
const isDark = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
provide("isCollapsed", isCollapsed);
provide("toggleSidebar", toggleSidebar);

const darkMode = (value) => {
  isDark.value = value;
  console.log(isDark.value);
};
</script>
