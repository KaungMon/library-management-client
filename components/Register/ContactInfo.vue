<template>
  <div class="grid w-full ml-1 mt-1">
    <div class="col-12">
      <h1 class="capitalize">Almost There !</h1>
      <p class="capitalize text-orange-400">
        fill the form below to register your account.
      </p>
    </div>

    <div class="col-12">
      <!-- SECTION - phone -->
      <div class="mt-2">
        <FloatLabel>
          <InputText
            :pt="{
              root: { class: 'bg-white text-900 w-11' },
            }"
            id="phone"
            v-model="contactInfo.phone"
          />
          <label for="phone">Phone No.</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <!-- SECTION - address -->
      <div class="mt-5">
        <FloatLabel>
          <Textarea
            :pt="{
              root: { class: 'bg-white text-900 w-11' },
            }"
            v-model="contactInfo.address"
            rows="5"
            cols="30"
          />
          <label for="address">Address</label>
        </FloatLabel>
      </div>
      <!-- !SECTION -->
      <!-- SECTION - gender -->
      <div class="mt-5 flex flex-column justify-content-center">
        <label for="username">Gender</label>
        <div class="flex justify-content-start align-items-center gap-3 mt-3">
          <div
            v-for="gender in genders"
            :key="gender.key"
            class="flex justify-content-center align-items-center gap-2"
          >
            <RadioButton
              :pt="{
                box: { class: 'bg-white' },
                icon: { class: 'bg-blue-500' },
              }"
              v-model="contactInfo.selectedGender"
              :inputId="gender.key"
              name="dynamic"
              :value="gender.key"
            />
            <label :for="gender.key">{{ gender.name }}</label>
          </div>
        </div>
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
const contactInfo = ref({
  phone: "",
  address: "",
  selectedGender: "M",
});

const genders = ref([
  { name: "Male", key: "M" },
  { name: "Female", key: "F" },
]);
const next = () => {
  emit("nextStep", "contactInfo", contactInfo.value);
};

const back = () => {
  emit("back", "userInfo");
};
</script>

<style lang="scss" scoped></style>
