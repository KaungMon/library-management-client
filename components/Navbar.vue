<template>
   <!--  <ScrollPanel class="h-full invisible" :class="[{ collapsed: isCollapsed }]">
    <div class="navbar py-5 px-7 h-full rounded-lg bg-(--p-content-background)">
      // SECTION - flex column between two ul
      <div class="h-full flex flex-col justify-between">
        // SECTION - menu
        <ul>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link exact to="/dashboard">
              <i class="pi pi-home mr-2 pb-1"></i>Dashboard
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link to="/categories">
              <i class="pi pi-list pb-1 mr-2"></i>Categories
            </nuxt-link>
          </li>
          <li class="flex justify-start items-align px-4 py-3">
            <nuxt-link to="/author">
              <i class="pi pi-prime pb-1 mr-2"></i>Authors
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link to="/library">
              <i class="pi pi-book pb-1 mr-2"></i>Library
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link to="/borrowing_log">
              <i class="pi pi-bookmark pb-1 mr-2"></i>Log Book
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link to="/notifications">
              <i class="pi pi-bell pb-1 mr-2"></i>Notifications
            </nuxt-link>
          </li>
        </ul>
        !SECTION
        // SECTION - logout and help
        <ul>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link to="/#">
              <i class="pi pi-info-circle pb-1 mr-2"></i>Help and Info
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link to="/#">
              <i class="pi pi-sign-out pb-1 mr-2"></i>Logout
            </nuxt-link>
          </li>
        </ul>
        !SECTION
      </div>
      !SECTION
    </div>
  </ScrollPanel> -->
  <ScrollPanel class="h-full" :class="[{ collapsed: isCollapsed }]">
    <div class="navbar py-5 px-7 h-full rounded-lg bg-(--p-content-background)">
      <!-- SECTION - flex column between two ul -->
      <div class="h-full flex flex-col justify-between">
        <!-- SECTION - menu -->
        <ul>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link exact v-if="!isCollapsed" to="/dashboard">
              <i class="pi pi-home mr-2 pb-1"></i>Dashboard
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link v-if="!isCollapsed" to="/categories">
              <i class="pi pi-list pb-1 mr-2"></i>Categories
            </nuxt-link>
          </li>
          <li class="flex justify-start items-align px-4 py-3">
            <nuxt-link v-if="!isCollapsed" to="/author">
              <i class="pi pi-prime pb-1 mr-2"></i>Authors
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link v-if="!isCollapsed" to="/library">
              <i class="pi pi-book pb-1 mr-2"></i>Library
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link v-if="!isCollapsed" to="/borrowing_log">
              <i class="pi pi-bookmark pb-1 mr-2"></i>Log Book
            </nuxt-link>
          </li>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link v-if="!isCollapsed" to="/notifications">
              <i class="pi pi-bell pb-1 mr-2"></i>Notifications
            </nuxt-link>
          </li>
        </ul>
        <!-- !SECTION -->
        <!-- SECTION - logout and help -->
        <ul>
          <li class="flex justify-start items-center px-4 py-3">
            <nuxt-link v-if="!isCollapsed" to="/#">
              <i class="pi pi-info-circle pb-1 mr-2"></i>Help and Info
            </nuxt-link>
          </li>
          <li class="px-1">
            <ConfirmDialog></ConfirmDialog>
            <Button @click="logout" variant="text" severity="danger" v-if="!isCollapsed">
              <i class="pi pi-sign-out mr-2"></i>Logout
            </Button>
          </li>
        </ul>
        <!-- !SECTION -->
      </div>
      <!-- !SECTION -->
    </div>
  </ScrollPanel>
</template>

<script setup>
import { includes, message } from "valibot";
import { inject } from "vue";
import { useConfirm } from "primevue";
import { outlined } from "@primeuix/themes/aura/message";
import axios from "axios";

// const isCollapsed = inject("isCollapsed");
const toggleSidebar = inject("toggleSidebar");
const activeLinkStatus = ref(false);
const confirm = useConfirm();
const config = useRuntimeConfig();

const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

const logout = () => {
  confirm.require({
    message : "Are you sure you want to log out?",
    header : "Confirmation",
    icon : "pi pi-exclamation-triangle",
    rejectProps : {
      label : "Cancle",
      severity : "secondary",
      outlined : true
    },
    acceptProps : {
      label : "Logout",
      severity : "danger"
    },
    accept : () => {
      logoutApi();
    }
  })
}

const logoutApi = async () => {
  try {
    await api.post(`${config.public.apiBaseUrl}/user/logout`);
    
    const user = useCookie("user");
    user.value = null;
    
    await navigateTo('/auth/login');
    
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

/* function handleResize() {
  if (window.innerWidth < 1300) {
    isCollapsed.value = true;
  } else {
    isCollapsed.value = false;
  }
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
}); */
</script>

<style scoped>
.router-link-active {
  color: var(--p-primary-color);
  scale: 1.05;
  transition: 0.4s;
}
</style>
