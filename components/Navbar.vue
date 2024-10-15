<template>
  <div class="container">
    <div
      class="flex flex-column justify-content-between navbar px-5 py-2 h-full"
    >
      <div>
        <!-- SECTION - logo -->
        <div class="flex align-items-center">
          <div class="inline-block mr-2">
            <img class="w-4rem" src="/public/icons/Logo.svg" alt="Logo" />
          </div>
          <h3 class="inline-block">
            <span>Admin</span>
            <span class="block">Dashboard</span>
          </h3>
        </div>
        <!-- !SECTION -->
        <hr class="w-12" />
        <!-- SECTION - menu -->
        <div class="my-5 py-5 flex flex-column">
          <nuxt-link class="text-white no-underline my-3" to="/dashboard">
            <i class="pi pi-home" style="color: white"></i> Dashboard
          </nuxt-link>
          <nuxt-link class="text-white no-underline my-3" to="/categories">
            <i class="pi pi-list" style="color: white"></i> Categories
          </nuxt-link>
          <nuxt-link class="text-white no-underline my-3" to="/library">
            <i class="pi pi-book" style="color: white"></i> Library
          </nuxt-link>
          <nuxt-link class="text-white no-underline my-3" to="/notifications">
            <i class="pi pi-bell" style="color: white"></i> Notifications
          </nuxt-link>
        </div>
        <!-- !SECTION -->
      </div>
      <!-- SECTION - logout and help -->
      <div class="flex flex-column">
        <nuxt-link class="text-white no-underline my-3" to="/library">
          <i class="pi pi-info-circle" style="color: white"></i> Help and Info
        </nuxt-link>
        <nuxt-link class="text-white no-underline my-3" to="/notifications">
          <i class="pi pi-sign-out" style="color: white"></i> Logout
        </nuxt-link>
      </div>
      <!-- !SECTION -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  background: rgba(193, 193, 193, 0.386);
  border-radius: 20px;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  .navbar {
    display: flex;
    flex-direction: column;
  }
}
</style>
