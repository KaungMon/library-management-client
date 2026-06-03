<template>
  <div class="card flex flex-col items-center gap-4">
    <Button @click="userInfo" v-ripple class="ripple-box">Default</Button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
</script>

<style scoped>
.ripple-box {
    display: flex;
    user-select: none;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    font-weight: bold;
    background: var(--p-content-background);
    border: 1px solid var(--p-content-border-color);
    border-radius: var(--p-content-border-radius);
}
</style>
