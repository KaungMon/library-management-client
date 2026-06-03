<template>
  <Form
    :initialValues="initialValues"
    @submit="login"
    class="flex flex-col gap-4 w-full"
  >
    <div class="col-span-12">
      <h1 class="capitalize pb-4 text-5xl text-white">welcome back !</h1>
      <p class="capitalize text-xl text-orange-400">
        fill the form below to login your account.
      </p>
    </div>
    <!-- NOTE - Component nal thone yin background color ka black phyit nay tar yal width yaw bg-color yaw pyoung ma ya loz -->
    <FormField v-slot="$form" name="email" class="mt-5">
      <FloatLabel variant="in">
        <InputText id="email" autocomplete="off" fluid />
        <label for="email">Email Address</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>

    <FormField v-slot="$form" name="password" class="mt-5">
      <FloatLabel variant="in">
        <Password inputId="password" variant="filled" fluid />
        <label for="password">Password</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>

    <!-- !NOTE -->
    <div class="mt-5 flex justify-between">
      <Button label="Login" type="submit" />
      <FormField class="flex items-center">
        <Checkbox
          v-model="remember_me"
          inputId="remember_me"
          name="remember_me"
          value="True"
        />
        <label for="remember_me" class="ml-2 text-white"> Remember Me </label>
      </FormField>
    </div>
    <div class="mt-5 flex items-center">
      <p class="text-white text-lg">
        You don't have an account?
        <nuxt-link class="text-orange-500 text-lg" to="/auth/register"
          >Sign up here</nuxt-link
        >
      </p>
    </div>
  </Form>
</template>

<script setup>
import axios from "axios";
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { ref } from "vue";
import { Message } from "primevue";

const config = useRuntimeConfig();
const initialValues = ref({
  email: "",
  password: "",
});
const api = axios.create({
  withCredentials: true,
  withXSRFToken : true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

const login = async (e) => {
  try {
    await api.get(`${config.public.baseUrl}/sanctum/csrf-cookie`);
    

    const response = await api.post(`${config.public.apiBaseUrl}/user/login`, {
      email: e.values.email,
      password: e.values.password,
    });
    navigateTo('/dashboard');
    
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
