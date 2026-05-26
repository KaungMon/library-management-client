<template>
  <div class="grid w-full ml-1 mt-1">
    <div class="col-12">
      <h1 class="capitalize">Finally, Right?</h1>
      <p class="capitalize text-orange-400">
        fill the form below to register your account.
      </p>
    </div>

    <div class="col-12">
      <!-- SECTION - email -->
      <div class="mt-2">
        <FloatLabel>
          <InputText
            :pt="{
              root: { class: 'bg-white text-900 w-11' },
            }"
            id="email"
            v-model="passwordInfo.email"
          />
          <label for="email">Email Address</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <!-- SECTION - password -->
      <div class="mt-5">
        <FloatLabel>
          <Password
            :pt="{
              root: { class: 'w-11' },
              pcInputText: {
                root: { class: 'bg-white text-900 w-12' },
              },
            }"
            id="password"
            v-model="passwordInfo.password"
            :feedback="false"
          />
          <label for="password">Password</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <!-- SECTION - confirm_password -->
      <div class="mt-5">
        <FloatLabel>
          <Password
            :pt="{
              root: { class: 'w-11' },
              pcInputText: {
                root: { class: 'bg-white text-900 w-12' },
              },
            }"
            id="confirm_password"
            v-model="passwordInfo.confirm_password"
            :feedback="false"
          />
          <label for="confirm_password">Confirm Password</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <div class="mt-5 flex justify-content-between">
        <Button
          :pt="{
            root: { class: 'bg-red-500 border-none px-4 hover:bg-red-300' },
          }"
          @click="back"
          label="BACK"
        />
        <Button
          :pt="{
            root: {
              class: 'bg-orange-500 border-none px-4 hover:bg-orange-300',
            },
          }"
          @click="submit"
          label="Sign Up"
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
const passwordInfo = ref({
  email: "",
  password: "",
  confirm_password: "",
});

const submit = () => {
  emit("submit", "passwordInfo", passwordInfo.value);
};
const back = () => {
  emit("back", "contactInfo");
};
</script>

<style lang="scss" scoped></style>
