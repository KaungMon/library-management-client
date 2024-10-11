<template>
  <div>
    <div class="mt-2">
      <FloatLabel>
        <InputText class="bg-white w-11" id="username" v-model="value" />
        <label for="username">Username</label>
      </FloatLabel>
    </div>
    <div class="mt-5">
      <FloatLabel>
        <InputText class="bg-white w-11" id="password" v-model="value" />
        <label for="password">Password</label>
      </FloatLabel>
    </div>
    <div class="mt-5 flex justify-content-between">
      <Button class="bg-orange-500 border-none px-4" label="SIGN IN " />
      <div class="flex items-center">
        <Checkbox
          class=""
          v-model="pizza"
          inputId="ingredient1"
          name="pizza"
          value="Cheese"
        />
        <label for="ingredient1" class="ml-2"> Remember Me </label>
      </div>
    </div>
    <div class="mt-5">
      <p>
        You don't have account ?
        <span
          ><NuxtLink class="text-orange-500" to="/register"
            >Sign up here</NuxtLink
          ></span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "registraction",
});
</script>
