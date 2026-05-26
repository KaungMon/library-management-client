<template>
  <div>
    <AuthRegisterContactInfo/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: ["registration"]
});
</script>

<style lang="scss" scoped>

</style>