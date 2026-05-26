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
    <!-- NOTE - Component nal thone yin background color ka black phyit nay tar yal width yaw bg-color yaw pyoung ma ya loz -->

    <!-- SECTION - Address -->
    <FormField v-slot="$form" name="address" class="mt-5">
      <FloatLabel variant="in">
        <Textarea id="address" size="large" fluid />
        <label for="address">Address</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - Phone -->
    <FormField v-slot="$form" name="phone" class="mt-5">
      <FloatLabel variant="in">
        <InputMask id="phone" mask="99-999999999"  fluid />
        <label for="phone">Phone Number</label>
      </FloatLabel>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- SECTION - Gender -->
    <FormField v-slot="$form" name="gender" class="mt-5">
      <div v-for="gender in genders" :key="gender.key" class="mb-3">
        <RadioButton :inputId="gender.key" name="gender" :value="gender.key" />
        <label class="text-white pl-2" :for="gender.key">{{
          gender.name
        }}</label>
      </div>
      <Message v-if="$form?.invalid" severity="error" size="small">{{
        $form.error.message
      }}</Message>
    </FormField>
    <!-- !SECTION -->

    <!-- !NOTE -->
    <div class="mt-5 flex justify-between">
      <Button label="BACK" @click="back" />
      <Button label="NEXT" type="submit" />
    </div>
  </Form>
</template>

<script setup>
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { InputMask } from "primevue";
import { ref } from "vue";
import { valibotResolver } from "@primevue/forms/resolvers/valibot";
import * as v from "valibot";

const registeredData = useState("registeredData", () => ({
  address: "",
  phone: null,
  gender: "",
}));

const registrationStep = useState('reg_step')

const initialValues = registeredData;

const resolver = valibotResolver(
  v.object({
    address: v.pipe(
      v.string(),
      v.trim("Address field is require."),
      v.minLength(1, "Address field is require."),
    ),
    phone: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(11, "Phone number is require."),
    ),
    gender: v.pipe(v.string()),
  }),
);

const genders = ref([
  { name: "Male", key: "M" },
  { name: "Female", key: "F" },
  { name: "Other", key: "O" },
]);

const next = async (e) => {
  try {
    registeredData.value.address = e.values.address;
    registeredData.value.phone = e.values.phone;
    registeredData.value.gender = e.values.gender;
    registrationStep.value = '3';
    navigateTo("/auth/register/registration");
  }catch (error) {
    console.error("Wrong", error)
  }
};

const back = () => {
  navigateTo("/auth/register");
};
</script>
