<template>
  <div :class="['container', { collapsed: isCollapsed }]">
    <div class="page h-full">
      <div class="sidebar" @sidebar-toggled="handleSidebarToggle">
        <Navbar />
      </div>
      <div class="main-panel">
        <Topbar />
        <div class="wapper mt-3">
          <NuxtPage />
        </div>
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

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
provide("isCollapsed", isCollapsed);
provide("toggleSidebar", toggleSidebar);
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 3em);
  z-index: 1;
  .page {
    display: grid;
    padding: 1em;
    grid-template-columns: 15% 84%;
    transition: 0.5s;
    column-gap: 1%;
    .sidebar {
      z-index: 2;
    }

    .wapper {
      height: calc(100% - 13%);
      backdrop-filter: blur(5.5px);
      padding: 2em 3.5em;
      -webkit-backdrop-filter: blur(5.5px);
      background: rgba(193, 193, 193, 0.386);
      border-radius: 20px;
      backdrop-filter: blur(5.5px);
      -webkit-backdrop-filter: blur(5.5px);
    }
  }
}
.container.collapsed {
  .page {
    grid-template-columns: 5.2% 93.5%;
  }
}
</style>
