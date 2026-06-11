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
        <Checkbox v-model="remember_me" inputId="remember_me" binary />
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
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { ref } from "vue";
import { Message } from "primevue";
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import * as v from "valibot";

const {fetchUser, loginApi, user} = useAuth();
const remember_me = ref(false);
const loginError = ref("");
const initialValues = ref({
  email: "",
  password: "",
});

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

const login = async (e) => {
  const email = e.values.email;
  const password = e.values.password;
  console.log({
    email: email,
    password: password,
    remember_me: remember_me.value,
  });
  const message = await loginApi(email, password, remember_me.value);
  await navigateTo("/dashboard");

  loginError.value = message;
};
</script>
