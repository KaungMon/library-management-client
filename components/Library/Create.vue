<template>
  <div>
    <Button
      label="Add Book"
      @click="visible = true"
      raised
    />
    <Dialog
      v-model:visible="visible"
      modal
      header="Create Book"
      @after-hide="[(errors = {}), (submitted = false)], clear()"
      :style="{ width: '50rem' }"
    >
      <div class="my-4 grid grid-cols-2">
        <label for="title" class="font-semibold self-center">Title</label>
        <div class="p-0">
          <InputText
            id="title"
            v-model="title"
            placeholder="Enter A Book Title"
            autocomplete="off"
          />
          <Message
            severity="error"
            v-if="errors.title && !title"
            variant="simple"
            >{{ errors.title }}</Message
          >
        </div>
      </div>

      <div class="mb-4 grid grid-cols-2">
        <label for="image" class="font-semibold self-center">Image</label>
        <FileUpload
          mode="basic"
          ref="fileupload"
          name="image"
          accept="image/*"
          :maxFileSize="10000000"
        />
      </div>
      <div class="mb-4 grid grid-cols-2">
        <label for="publisher" class="font-semibold  self-center"
          >Publisher</label
        >
        <div class=" flex flex-column p-0">
          <InputText
            id="publisher"
            v-model="publisher"
            placeholder="Enter a Publisher Name"
            autocomplete="off"
          />
          <Message
            severity="error"
            v-if="errors.publisher && !publisher"
            variant="simple"
            >{{ errors.publisher }}</Message
          >
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2">
        <label for="published_year" class=" font-semibold self-center"
          >Published Year</label
        >
        <div class=" flex flex-column p-0">
          <DatePicker
            class="flex-auto  p-0"
            v-model="published_year"
            :invalid="!published_year && submitted"
            placeholder="Select Published Year"
            view="year"
            dateFormat="yy"
          />
          <Message
            severity="error"
            v-if="errors.published_year && !published_year"
            variant="simple"
            >{{ errors.published_year }}</Message
          >
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2">
        <label for="author_name" class=" font-semibold self-center">Author</label>
        <div class=" flex flex-column p-0">
          <Select
            v-model="selectedAuthor"
            :options="authors"
            :invalid="!selectedAuthor && submitted"
            optionLabel="author_name"
            placeholder="Select author"
            class="flex-auto "
          />
          <Message severity="error" v-if="errors.author" variant="simple">{{
            errors.author
          }}</Message>
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2">
        <label for="author_name" class=" font-semibold self-center">Genres</label>
        <div class=" flex flex-column p-0">
          <MultiSelect
            v-model="selectedGenres"
            :options="genres"
            :invalid="!selectedGenres && submitted"
            optionLabel="name"
            filter
            placeholder="Select Genres"
            :maxSelectedLabels="3"
            class="flex-auto  bg-white text-900"
          />
          <Message severity="error" v-if="errors.genres" variant="simple">{{
            errors.genres
          }}</Message>
        </div>
      </div>

      <div class="flex justify-end gap-2 mb-5">
        <Button
          type="button"
          label="Cancel"
          severity="danger"
          @click="
            [(visible = false), (errors = {}), (submitted = false)], clear()
          "
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
import { getAuthorLists } from "~/composable/getAuthorLists";
import { getCategoryLists } from "~/composable/getCategoryLists";

const { fetchCategories } = getCategoryLists();
const { fetchAuthors } = getAuthorLists();
const config = useRuntimeConfig();
const visible = ref(false);
const submitted = ref(true);
const title = ref("");
const fileupload = ref(null);
const publisher = ref("");
const published_year = ref("");
const selectedGenres = ref([]);
const selectedAuthor = ref({ name: "", value: "" });
const authors = ref([]);
const genres = ref([]);
const errors = ref({});

const validationCheck = () => {
  errors.value = {};

  const fields = [
    { name: "title", 
      value: title.value, 
      message: "Title field is required." },
    {
      name: "publisher",
      value: publisher.value,
      message: "Publisher field is required.",
    },
    {
      name: "published_year",
      value: published_year.value,
      message: "Published Year field is required and should be a valid number.",
      check: (value) => !value || isNaN(value) || value <= 0,
    },
    {
      name: "author",
      value: selectedAuthor.value,
      message: "Author field is required.",
      check: (value) => !value.author_name || !value.id,
    },
    {
      name: "genres",
      value: selectedGenres.value,
      message: "Genres field is required.",
      check: (value) => value.length === 0,
    },
  ];

  fields.forEach((field) => {
    if (field.check ? field.check(field.value) : !field.value) {
      errors.value[field.name] = field.message;
    }
  });

  submitted.value = true;
  visible.value = true;
};

const clear = () => {
  title.value = "";
  publisher.value = "";
  published_year.value = "";
  selectedAuthor.value = { name: "", value: "" };
  selectedGenres.value = [];
};

const create = () => {
  validationCheck();
  const year = new Date(published_year.value).getFullYear();

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("publisher", publisher.value);
  formData.append("published_year", year);
  formData.append("author_id", selectedAuthor.value.id);
  formData.append(
    "has_genres",
    selectedGenres.value.length <= 0 ? false : true
  );

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
          location.reload();
        })
        .catch((error) => {
          console.log(error.data);
        });
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status == 422) {
        const messages = error.response.data.errors;
        errors.value = {
          title: messages.title[0],
          publisher: messages.publisher[0],
          published_year: messages.published_year[0],
          author: messages.author_id[0],
          genres: messages.has_genres[0],
        };
        console.log(errors.value);
      }
    });
};

onMounted(() => {
  fetchCategories(genres.value);
  fetchAuthors(authors.value);
});
</script>

<style lang="scss" scoped>
.p-inputtext {
  width: 100%;
}


</style>
