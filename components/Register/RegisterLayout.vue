<template>
  <div class="h-screen relative">
    <div class="grid h-full">
      <div class="col-6">
        <div class="p-3">
          <div class="grid">
            <div class="col-12 p-0 mb-8">
              <div class="flex align-items-center">
                <div class="inline-block mr-2">
                  <img src="/public/icons/Logo.svg" alt="Logo" />
                </div>
                <h2 class="inline-block">
                  <span>The Bug</span>
                  <span class="block">Slayer</span>
                </h2>
              </div>
            </div>
            <RegisterUserInfo
              v-if="currentStep === 'userInfo'"
              @nextStep="handleStep"
            />
            <RegisterContactInfo
              v-if="currentStep === 'contactInfo'"
              @nextStep="handleStep"
              @back="backStep"
            />
            <RegisterPasswordInfo
              v-if="currentStep === 'passwordInfo'"
              @submit="submitForm"
              @back="backStep"
            />
          </div>
        </div>
      </div>

      <div class="col-6 p-3 flex justify-content-center">
        <img
          class="border-round"
          style="width: 100%; object-fit: cover"
          src="/public/img/library.png"
          alt="Library"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const config = useRuntimeConfig();
const currentStep = ref("userInfo");
const registeredData = ref({
  userInfo: {},
  contactInfo: {},
  passwordInfo: {},
});
const handleStep = (step, data) => {
  registeredData.value[step] = data;

  if (step === "userInfo") {
    currentStep.value = "contactInfo";
  } else if (step == "contactInfo") {
    currentStep.value = "passwordInfo";
  }
};

const backStep = (step) => {
  if (step === "userInfo") {
    currentStep.value = "userInfo";
  } else if (step === "contactInfo") {
    currentStep.value = "contactInfo";
  }
};

const submitForm = (step, data) => {
  if (step === "passwordInfo") {
    registeredData.value[step] = data;
    axios
      .post(`${config.public.apiBaseUrl}/user/create`, registeredData.value)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }
};
</script>

<style></style>
