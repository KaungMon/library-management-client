<template>
  <div class="container">
    <div class="navbar">
      <nuxt-link to="/dashboard">Dashboard</nuxt-link>
      <nuxt-link to="/categories">Categories</nuxt-link>
      <nuxt-link to="/library">Library</nuxt-link>
      <nuxt-link to="/notifications">Notifications</nuxt-link>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.container {
  width: 250px;
  height: calc(100vh - 50px);
  background: lightgray;
  .navbar {
    display: flex;
    flex-direction: column;
  }
}
</style>
