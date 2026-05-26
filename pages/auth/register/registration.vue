<template>
  <div>
    <AuthRegisterRegistration/>
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