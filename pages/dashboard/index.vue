<template>
  <div>Dashboard Page <Button class="btn" label="Success" /></div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
</script>

<style lang="scss">
.btn {
  .p-button {
    background-color: red;
  }
}
</style>
