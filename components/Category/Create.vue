<template>
  <div>
    <Button
      label="Add Category"
      @click="visible = true"
      raised
    />

    <Dialog
      v-model:visible="visible"
      modal
      header="Create Category"
      :style="{ width: '35rem' }"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="categoryName" class="font-semibold w-24"
          >Category Name</label
        >
        <InputText
          id="categoryName"
          v-model="categoryName"
          autocomplete="off"
          @keyup.enter="[(visible = false), create()]"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="danger"
          @click="visible = false"
        ></Button>
        <Button
          type="button"
          label="Create"
          severity="warn"
          @click="[(visible = false), create()]"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const config = useRuntimeConfig();
const visible = ref(false);

const categoryName = ref("");
const create = () => {
  axios
    .post(`${config.public.apiBaseUrl}/category/create`, {
      categoryName: categoryName.value,
    })
    .then((response) => {
      console.log(response.data);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  categoryName.value = "";
};
</script>

<style lang="scss" scoped>
.p-inputtext {
  width: 100%;
}
</style>
