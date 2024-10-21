<template>
  <div
    class="topbar py-3 px-5 flex justify-content-between align-items-center"
    :class="['topbar', { expanded: isCollapsed }]"
  >
    <!-- SECTION - search bar -->
    <div
      class="search-bar mx-3 h-3rem bg-white flex justify-content-between align-items-center"
    >
      <input
        class="border-none w-full search-input"
        placeholder="Search..."
        type="text"
      />
      <button class=""><i class="pi pi-search"></i></button>
    </div>
    <!-- !SECTION -->
    <!-- SECTION - user indicator -->
    <div
      class="user-indi mx-3 h-3rem bg-white text-black flex justify-content-between align-items-center"
    >
      <h5 class="profile-name text-900 mx-3">Kaung Mon</h5>
      <img
        class="profile-img"
        src="/public/img/simon-lee-dark-bule.jpg"
        alt=""
      />
    </div>
    <!-- !SECTION -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.topbar {
  height: calc(100% - 89%);
  transition: height 0.5s ease;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  background: rgba(193, 193, 193, 0.386);
  border-radius: 20px;
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  .search-bar {
    padding: 0 1rem;
    width: 30%;
    border-radius: 50px;
    .search-input {
      outline: none;
      height: 2rem;
      padding: 0 1rem;
      font-size: 16px;
      transition: 0.5s;
    }
    .search-input::placeholder {
      color: gray;
      font-size: 16px;
    }
    .search-input:focus + button {
      text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.419);
      transform: scale(1.2);
    }
    button {
      height: 2rem;
      margin: 0 0.5em;
      border: none;
      background-color: inherit;
      transition: 0.5s;
    }
  }
  .search-bar:hover {
    button {
      text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.419);
      transform: scale(1.2);
    }
  }
  .user-indi {
    padding: 0 0.5rem;
    border-radius: 50px;
    cursor: pointer;
    .profile-name {
      cursor: pointer;
    }
    .profile-img {
      width: 2.5em;
      height: 2.5em;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
