<template>
  <Form
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="login"
    class="flex flex-col gap-4 w-full"
  >
    <div class="col-span-12">
      <h1 class="capitalize pb-4 text-5xl text-white">welcome back !</h1>
      <p class="capitalize text-xl text-orange-400">
        fill the form below to login your account.
      </p>
    </div>

    <Message severity="error" size="small" v-if="loginError">{{
      loginError
    }}</Message>

    <!-- SECTION - email field -->
    <FormField v-slot="$form" name="email" class="mt-5">
      <FloatLabel variant="in">
        <InputText
          id="email"
          :invalid="$form?.invalid || !!loginError"
          autocomplete="off"
          fluid
        />
        <label for="email">Email Address</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - password field -->
    <FormField v-slot="$form" name="password" class="mt-5">
      <FloatLabel variant="in">
        <Password
          inputId="password"
          :invalid="$form?.invalid || !!loginError"
          variant="filled"
          fluid
          toggleMask
        />
        <label for="password">Password</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - button field -->
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
    <!-- !SECTION -->

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
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import * as v from "valibot";

const config = useRuntimeConfig();
const initialValues = ref({
  email: "",
  password: "",
});
const loginError = ref("");

const resolver = valibotResolver(
  v.object({
    email: v.pipe(
      v.string(),
      v.trim(),
      v.email("You can't leave empty!!!"),
      v.endsWith("@gmail.com"),
    ),
    password: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(8, "Your password have to be longer 8 letter."),
    ),
  }),
);

const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

const login = async (e) => {
  loginError.value = "";

  try {
    await api.get(`${config.public.baseUrl}/sanctum/csrf-cookie`);

    const response = await api.post(`${config.public.apiBaseUrl}/user/login`, {
      email: e.values.email,
      password: e.values.password,
    });

    const user = useCookie("user", { maxAge: 60 * 60 * 24 * 7 });
    user.value = response.data.user;

    await navigateTo("/dashboard");
  } catch (error) {
    loginError.value = error.response.data.message || "Something went wrong!!!";
  }
};
</script>
