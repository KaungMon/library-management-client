<template>
  <div>
    <Button
      label="Add Book"
      pt:root="bg-orange-400 border-orange-400 hover:bg-orange-600 border-orange-600 active:bg-orange-800 border-orange-800  "
      @click="visible = true"
      raised
    />

    <Dialog
      v-model:visible="visible"
      modal
      class="bg-white-alpha-30 border-round-3xl"
      header="Create Book"
      :style="{ width: '50rem' }"
    >
      <div class="grid my-4">
        <label for="title" class="font-semibold col-3">Title</label>
        <InputText
          id="title"
          v-model="title"
          class="flex-auto bg-white text-900 col"
          autocomplete="off"
        />
      </div>
      <div class="grid mb-4">
        <label for="image" class="font-semibold col-3 w-24">Image</label>
        <FileUpload
          class="col"
          mode="basic"
          ref="fileupload"
          name="image"
          accept="image/*"
          :maxFileSize="10000000"
        />
      </div>
      <div class="grid mb-4">
        <label for="publisher" class="font-semibold col-3 w-24"
          >Publisher</label
        >
        <InputText
          id="publisher"
          v-model="publisher"
          class="flex-auto bg-white col text-900"
          autocomplete="off"
        />
      </div>
      <div class="grid mb-4">
        <label for="published_year" class="col-3 font-semibold w-24"
          >Published Year</label
        >
        <DatePicker
          class="flex-auto col p-0"
          :pt="{
            panel: { class: 'bg-white' },
            header: { class: 'bg-white text-900' },
            year: { class: 'text-900' },
            pcInputText: {
              root: { class: 'bg-white text-900' },
            },
          }"
          v-model="published_year"
          view="year"
          dateFormat="yy"
        />
      </div>
      <div class="grid mb-4">
        <label for="author_name" class="col-3 font-semibold w-24">Author</label>
        <Select
          :pt="{
            root: { class: 'bg-white' },
            label: { class: 'bg-white capitalize text-500' },
            overlay: { class: 'bg-white' },
            option: {
              class:
                'text-900 hover:bg-blue-700 hover:text-200 active:bg-blue-900',
            },
          }"
          v-model="selectedAuthor"
          :options="authors"
          optionLabel="name"
          placeholder="Select Author"
          class="flex-auto col"
        />
      </div>
      <div class="grid mb-4">
        <label for="author_name" class="col-3 font-semibold w-24">Genres</label>
        <MultiSelect
          :pt="{
            root: { class: 'bg-white' },
            label: { class: 'bg-white capitalize text-500' },
            overlay: { class: 'bg-white' },
            option: {
              class:
                'text-900 hover:bg-blue-700 hover:text-200 active:bg-blue-900',
            },
            pcHeaderCheckbox: {
              box: { class: 'bg-white border-blue-500' },
            },
            pcFilter: {
              root: { class: 'bg-white' },
            },
            pcOptionCheckbox: {
              box: { class: 'bg-white' },
            },
          }"
          v-model="selectedGenres"
          :options="genres"
          optionLabel="name"
          filter
          placeholder="Select Genres"
          :maxSelectedLabels="3"
          class="flex-auto col bg-white text-900"
        />
      </div>

      <div class="flex justify-content-end gap-2 mb-5">
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
import axios from "axios";
import Select from "primevue/select";

import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const visible = ref(false);
const title = ref();
const fileupload = ref(null);
const publisher = ref();
const published_year = ref();
const selectedGenres = ref([]);
const selectedAuthor = ref();
const authors = ref([]);
const genres = ref([]);
const errors = ref();

const create = () => {
  errors.value = {};
  const year = new Date(published_year.value).getFullYear();

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("publisher", publisher.value);
  formData.append("published_year", year);
  formData.append("author_id", selectedAuthor.value.value);

  if (fileupload.value) {
    formData.append("image", fileupload.value.files[0]);
  }

  axios
    .post(`${config.public.apiBaseUrl}/books/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      axios
        .post(`${config.public.apiBaseUrl}/book_categories/create`, {
          categories: selectedGenres.value,
          book_id: response.data.id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    })
    .catch((error) => {
      if (error.response && error.response.status == 422) {
        errors.value = error.response.data.errors;
      }
      console.log(errors.value);
    });
};

onMounted(() => {
  axios
    .get(`${config.public.apiBaseUrl}/category/lists`)
    .then((response) => {
      response.data.categories.forEach((category) => {
        genres.value.push({
          name: category.category_name,
          value: category.id,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get(`${config.public.apiBaseUrl}/author/lists`)
    .then((response) => {
      response.data.authors.forEach((author) => {
        authors.value.push({
          name: author.author_name,
          value: author.id,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style lang="scss" scoped></style>
