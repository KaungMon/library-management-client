<template>
  <Form :initialValues="initialValues" @submit="onFormSubmit">
    <div>
      <FormField class="mt-5">
        <div v-for="gender in genders" :key="gender.key" class="mb-3">
          <RadioButton
            :inputId="gender.key"
            name="gender"
            :value="gender.key"
          />
          <label class="text-white pl-2" :for="gender.key">{{
            gender.name
          }}</label>
        </div>
      </FormField>  
    </div>
    <Button type="submit" label="Submit" />
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { RadioButton } from "primevue";

const registeredData = useState("registeredData");

const genders = ref([
  { name: "Male", key: "M" },
  { name: "Female", key: "F" },
  { name: "Other", key: "O" },
]);

const initialValues = ref({
  gender: "O",
});

const onFormSubmit = (e) => {
  console.log(e.values);
};

onMounted(() => {
  console.log(registeredData.value)
})
</script>
