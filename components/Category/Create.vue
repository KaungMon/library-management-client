<template>
  <div>
    <Button
      label="Add Category"
      pt:root="bg-orange-400 border-orange-400 hover:bg-orange-600 border-orange-600 active:bg-orange-800 border-orange-800  "
      @click="visible = true"
      raised
    />

    <Dialog
      v-model:visible="visible"
      modal
      class="bg-white-alpha-30 border-round-3xl"
      header="Create Category"
      :style="{ width: '35rem' }"
    >
      <div class="flex align-items-center gap-4 mb-4">
        <label for="categoryName" class="font-semibold w-24"
          >Category Name</label
        >
        <InputText
          id="categoryName"
          v-model="categoryName"
          class="flex-auto bg-white text-900"
          autocomplete="off"
          @keyup.enter="[(visible = false), create()]"
        />
      </div>
      <div class="flex justify-content-end gap-2">
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

const visible = ref(false);

const categoryName = ref("");
const create = () => {
  axios
    .post("http://127.0.0.1:8000/api/category/create", {
      categoryName: categoryName.value,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  categoryName.value = "";
};
</script>

<style lang="scss" scoped></style>
