<template>
  <div class="container h-screen">
    <div class="page p-3 h-full grid nested-grid">
      <div class="col-2">
        <Navbar />
      </div>
      <div class="col-10">
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

<script setup></script>

<style lang="scss" scoped>
.container {
  z-index: 9999;
  .page {
    display: flex;
  }
}
.wapper {
  height: calc(100% - 13%);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  background: rgba(193, 193, 193, 0.386);
  border-radius: 20px;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
}
</style>
