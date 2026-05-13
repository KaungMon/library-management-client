<template>
  <Form
    @submit="next"
    :initialValues="initialValues"
    :resolver="resolver"
    class="flex flex-col gap-4 w-full"
  >
    <div class="col-span-12">
      <h1 class="capitalize pb-4 text-5xl text-white">hi there !</h1>
      <p class="capitalize text-xl text-orange-400">
        fill the form below to sign up your account.
      </p>
    </div>

    <!-- SECTION - First Name -->
    <FormField v-slot="$form" name="firstName" class="mt-5">
      <FloatLabel variant="in">
        <InputText id="firstName" autocomplete="off" fluid />
        <label for="firstName">First Name</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - Surname -->
    <FormField v-slot="$form" name="surname" class="mt-5">
      <FloatLabel variant="in">
        <InputText id="surname" autocomplete="off" fluid />
        <label for="surname">Surname</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->
    <div class="mt-5 flex justify-end">
      <Button type="submit" label="NEXT" />
    </div>
    <div class="mt-5 flex items-center">
      <p class="text-white text-lg">
        You already have an account?
        <nuxt-link class="text-orange-500 text-lg" to="/auth/login"
          >Login here</nuxt-link
        >
      </p>
    </div>
  </Form>
</template>

<script setup>
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { ref } from "vue";
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import * as v from "valibot";

const router = useRouter();

const registeredData = useState("registeredData", () => ({
  firstName: "",
  surname: "",
}));

const initialValues = ref({
  firstName : registeredData.value.firstName,
  surname : registeredData.value.surname
})

const resolver = valibotResolver(
  v.object({
    firstName: v.pipe(
      v.string(),
      v.trim("Your first name is required."),
      v.minLength(1, "Your first name is required."),
    ),
    surname: v.pipe(
      v.string(),
      v.trim("Your surname is required."),
      v.minLength(1, "Your surname is required."),
    ),
  }),
);

const next = (e) => {
  if (e.valid) {
    registeredData.value.firstName = e.values.firstName;
    registeredData.value.surname = e.values.surname;
    router.push("/auth/register/contactinfo");
  }
};
</script>
