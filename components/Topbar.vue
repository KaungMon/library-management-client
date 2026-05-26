<template>
  <div
    class="topbar py-3 px-5 flex justify-content-end align-items-center"
    :class="topbar"
  >
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
