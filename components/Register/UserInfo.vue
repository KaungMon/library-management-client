<template>
  <div class="grid w-full ml-1 mt-1">
    <div class="col-12">
      <h1 class="capitalize">hello, friend !</h1>
      <p class="capitalize text-orange-400">
        fill the form below to register your account.
      </p>
    </div>

    <div class="col-12">
      <!-- SECTION - first name -->
      <div class="mt-2">
        <FloatLabel>
          <InputText
            :pt="{
              root: { class: 'bg-white text-900 w-11' },
            }"
            id="first_name"
            v-model="userInfo.first_name"
          />
          <label for="first_name">First Name</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <!-- SECTION - surname -->
      <div class="mt-5">
        <FloatLabel>
          <InputText
            :pt="{
              root: { class: 'bg-white text-900 w-11' },
            }"
            id="surname"
            v-model="userInfo.surname"
          />
          <label for="surname">Surname</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <!-- SECTION - username -->
      <div class="mt-5">
        <FloatLabel>
          <InputText
            :pt="{
              root: { class: 'bg-white text-900 w-11' },
            }"
            id="username"
            v-model="userInfo.username"
          />
          <label for="username">Username</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <div class="mt-5 flex justify-content-end">
        <Button
          class="bg-orange-500 border-none px-4"
          @click="next"
          label="NEXT"
        />
      </div>
      <div class="mt-5">
        <p>
          Already have an account?
          <nuxt-link class="text-orange-500" to="/auth/login"
            >Sign in here</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits();
const userInfo = ref({
  first_name: "",
  surname: "",
  username: "",
});

const next = () => {
  emit("nextStep", "userInfo", userInfo.value);
};
</script>

<style lang="stylus" scoped></style>
