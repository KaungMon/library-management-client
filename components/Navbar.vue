<template>
  <div class="container" :class="[{ collapsed: isCollapsed }]">
    <div class="navbar py-2 h-full">
      <div>
        <!-- SECTION - logo -->
        <div @click="toggleSidebar" class="logo flex align-items-center">
          <div class="inline-block mr-2">
            <img class="w-4rem" src="/public/icons/Logo.svg" alt="Logo" />
          </div>
          <h3 v-if="!isCollapsed" class="inline-block">
            <span>Admin</span>
            <span class="block">Dashboard</span>
          </h3>
        </div>
        <!-- !SECTION -->
        <hr class="divider" />
        <!-- SECTION - menu -->
        <div>
          <ul class="p-0 my-5">
            <li>
              <i class="pi pi-home" style="color: white"></i>
              <nuxt-link
                v-if="!isCollapsed"
                class="text-white no-underline nav-link"
                to="/dashboard"
              >
                Dashboard
              </nuxt-link>
            </li>
            <li>
              <i class="pi pi-list" style="color: white"></i>
              <nuxt-link
                v-if="!isCollapsed"
                class="text-white no-underline nav-link"
                to="/categories"
              >
                Categories
              </nuxt-link>
            </li>
            <li>
              <i class="pi pi-book" style="color: white"></i>
              <nuxt-link
                v-if="!isCollapsed"
                class="text-white no-underline nav-link"
                to="/library"
              >
                Library
              </nuxt-link>
            </li>
            <li>
              <i class="pi pi-bell" style="color: white"></i>
              <nuxt-link
                v-if="!isCollapsed"
                class="text-white no-underline nav-link"
                to="/notifications"
              >
                Notifications
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- !SECTION -->
      </div>
      <!-- SECTION - logout and help -->
      <div class="flex flex-column">
        <ul class="p-0">
          <li>
            <i class="pi pi-info-circle" style="color: white"></i>
            <nuxt-link
              v-if="!isCollapsed"
              class="text-white no-underline nav-link"
              to="/library"
            >
              Help and Info
            </nuxt-link>
          </li>
          <li>
            <i class="pi pi-sign-out" style="color: white"></i>
            <nuxt-link
              v-if="!isCollapsed"
              class="text-white no-underline nav-link"
              to="/notifications"
            >
              Logout
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- !SECTION -->
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const isCollapsed = inject("isCollapsed");
const toggleSidebar = inject("toggleSidebar");
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 1rem;
  height: 100%;
  transition: width 0.5s ease;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  background: rgba(193, 193, 193, 0.386);
  border-radius: 20px;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logo {
      transition: 1s;
      cursor: pointer;
      h3 {
        opacity: 100%;
        transition: 0.3s ease-in-out;
      }
    }
    ul li {
      width: 100%;
      list-style: none;
      margin: 2em 0;
      padding: 0;
      display: flex;
      align-items: center;
      padding-left: 1.5em;
      .pi {
        display: flex;
        margin-right: 1em;
        align-items: center;
        font-size: 1.3em;
      }
      .nav-link {
        opacity: 100%;
        transition: 0.3s ease-in-out;
      }
    }
  }
}
.container.collapsed {
  padding: 0;
  .navbar {
    padding: 0;
    justify-content: space-between;
    align-items: center;
    .divider {
      width: 80%;
    }
  }
}
</style>
