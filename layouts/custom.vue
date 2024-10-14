<template>
  <div class="container">
    <div class="navbar"></div>
    <div class="page">
      <Navbar />
      <NuxtPage />
    </div>
    <div class="footer">
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  z-index: 9999;
  .page {
    display: flex;
  }
}
</style>
