<template>
  <div>Home</div>
</template>

<script setup>
// import { useRouter } from "router";

const router = useRouter();

onMounted(() => {
  router.push("/dashboard");
});
</script>

<style></style>
