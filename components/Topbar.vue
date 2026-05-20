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
        <div class="flex flex-row items-center gap-3 bg-(--p-primary-color) px-3 py-2 rounded-full">
          <h2>Kaung Mon</h2>
          <img
            class="size-[2.5em] object-cover object-center rounded-full"
            src="/public/img/simon-lee-dark-bule.jpg"
            alt=""
          />
        </div>
        <!-- !SECTION -->
      </div>
    </template>
  </Toolbar>
</template>

<script setup>
const isCollapsed = ref(false);
const isDark = ref(false);
const emit = defineEmits (['isDark']);
const toggleDarkMode = function () {
  document.documentElement.classList.toggle("p-dark");
  isDark.value = !isDark.value;
  emit('isDark' , isDark.value);
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  console.log(isCollapsed.value);
}

</script>
