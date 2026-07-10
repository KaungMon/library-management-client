<template>
  <Toolbar class="p-dark">
    <template #start>
      <!-- SECTION - logo -->
      <div class="flex flex-row items-center gap-3">
        <div class="">
          <img @click="toggleSidebar()" class="size-10" src="/public/icons/Logo (1).svg" alt="Logo" />
        </div>
        <h3 v-if="!isCollapsed" class="inline-block">
          <span>Admin Dashboard</span>
        </h3>
      </div>
      <!-- !SECTION -->
    </template>

    <template #end>
      <div class="flex flex-row items-center gap-3">
        <!-- SECTION - dark mode -->
        <ToggleSwitch @click="toggleDarkMode()" />
        <!-- !SECTION -->
        <!-- SECTION - user indicator -->
        <div class="profile flex flex-row items-center gap-3 bg-(--p-primary-color) rounded-full">
          <nuxt-link class="profile_name" to="/auth/profile">
            <img class="size-[3.0em] object-cover object-center rounded-full"
              :src="user?.image ? user?.image : `/img/default_avatar.avif`" alt="" />
          </nuxt-link>
        </div>
        <!-- !SECTION -->
      </div>
    </template>
  </Toolbar>
</template>

<script setup>
const isCollapsed = ref(false);
const isDark = ref(false);
const emit = defineEmits(["isDark"]);
const { user } = useAuth();

const toggleDarkMode = function () {
  document.documentElement.classList.toggle("p-dark");
  isDark.value = !isDark.value;
  emit("isDark", isDark.value);
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  console.log(isCollapsed.value);
};

</script>

<style lang="scss" scoped></style>
