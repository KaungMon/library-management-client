<template>
  <Form
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="signup"
    class="flex flex-col gap-4 w-full"
  >
    <div class="col-span-12">
      <h1 class="capitalize pb-4 text-5xl text-white">hi there !</h1>
      <p class="capitalize text-xl text-orange-400">
        fill the form below to sign up your account.
      </p>
    </div>

    <!-- SECTION - Username -->
    <FormField v-slot="$form" name="username" class="mt-5">
      <FloatLabel variant="in">
        <InputText id="username" autocomplete="off" fluid />
        <label for="username">Username</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - Email -->
    <FormField v-slot="$form" name="email" class="mt-5">
      <FloatLabel variant="in">
        <InputText id="email" autocomplete="off" fluid />
        <label for="email">Email</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - Password -->
    <FormField v-slot="$form" name="password" class="mt-5">
      <FloatLabel variant="in">
        <Password inputId="password" variant="filled" fluid toggleMask />
        <label for="password">Password</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - Comfirm Password -->
    <FormField v-slot="$form" name="confirmPassword" class="mt-5">
      <FloatLabel variant="in">
        <Password inputId="confirmPassword" variant="filled" fluid toggleMask />
        <label for="confirmPassword">Confirm Password</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <div class="mt-5 flex justify-between">
      <Button label="BACK" @click="back" />
      <Button type="submit" label="SIGN UP" />
    </div>
    <div class="mt-5 flex items-center">
      <p class="text-white text-lg">
        You already have an account?
        <nuxt-link class="text-orange-500 text-lg" to="/auth/register"
          >Login here</nuxt-link
        >
      </p>
    </div>
  </Form>
</template>

<script setup>
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import { ref } from "vue";
import * as v from "valibot";

const registeredData = useState("registeredData");
const router = useRouter();

const initialValues = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const resolver = valibotResolver(
  v.pipe(
    v.object({
    username: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, "You need to fill username."),
    ),
    email: v.pipe(v.string(), v.trim(), v.email(), v.endsWith("@gmail.com")),
    password: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(8, "Your password have to be longer 8 letter."),
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.trim()
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two password do not match.",
    ),
    ["confirmPassword"],
  ),
  )
);

const signup = () => {
  console.log(registeredData.value);
};

onMounted(() => {
  console.log(registeredData.value);
});

const back = () => {
  router.back();
};
</script>
