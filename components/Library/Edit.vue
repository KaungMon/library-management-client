<template>
  <div>
    <Card
      :pt="{
        root: { class: 'bg-white-alpha-50 rounded' },
        header: {
          class:
            'mt-3 ml-3 text-xl text-900 cursor-pointer mb-4  hover:underline',
        },
        content: { class: 'mb-4' },
      }"
    >
      <!-- SECTION - back button -->
      <template #header>
        <span @click="back"> <i class="pi pi-chevron-left"></i> Back </span>
      </template>
      <!-- !SECTION -->
      <template #content>
        <!-- SECTION - form -->
        <Form @submit="onFormSubmit" class="grid">
          <div
            class="col-4 flex flex-column justify-content-center align-items-center"
          >
            <img
              v-if="book.image != null"
              :src="`${config.public.baseUrl}/storage/image/${book.image}`"
              class="w-8 border-2"
              alt=""
            />
            <img
              v-else
              src="/public/img/images.png"
              class="w-8 border-2"
              alt=""
            />
            <FileUpload
              :pt="{
                root: { class: 'mt-3' },
                pcChooseButton: {
                  root: { class: 'bg-orange-500' },
                },
              }"
              ref="image"
              mode="basic"
              name="image"
              accept="image/*"
              :maxFileSize="10000000"
            />
          </div>
          <div
            class="col-8 flex flex-column justify-content-between align-items-start"
          >
            <div class="grid">
              <!-- SECTION - Title -->
              <div class="col-6 flex flex-column">
                <label for="title">Title</label>
                <InputText
                  :pt="{
                    root: {
                      class: 'bg-white text-900',
                    },
                  }"
                  id="title"
                  placeholder="Enter A Title"
                  v-model="book.title"
                  variant="filled"
                />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - Publisher -->
              <div class="col-6 flex flex-column">
                <label for="publisher">Publisher</label>
                <InputText
                  :pt="{
                    root: {
                      class: 'bg-white text-900',
                    },
                  }"
                  id="publisher"
                  placeholder="Enter A Publisher Name"
                  v-model="book.publisher"
                  variant="filled"
                />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - Published Year -->
              <div class="col-6 flex flex-column">
                <label for="published_year">Published Year</label>
                <DatePicker
                  :pt="{
                    panel: { class: 'bg-white' },
                    header: { class: 'bg-white text-900' },
                    year: { class: 'text-900' },
                    pcInputText: {
                      root: { class: 'bg-white text-900' },
                    },
                  }"
                  v-model="book.published_year"
                  placeholder="Select Published Year"
                  view="year"
                  id="published_year"
                  dateFormat="yy"
                />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - Author -->
              <div class="col-6 flex flex-column">
                <label for="author_name">Author Name</label>
                <Select
                  :pt="{
                    root: { class: 'bg-white' },
                    label: {
                      class: 'bg-white capitalize text-500 px-1',
                    },
                    overlay: { class: 'bg-white' },
                    option: {
                      class:
                        'text-900 hover:bg-blue-700 hover:text-200 active:bg-blue-900',
                    },
                  }"
                  id="author_name"
                  v-model="book.author"
                  :options="authors"
                  optionLabel="author_name"
                  placeholder="Select author"
                />
              </div>
              <!-- !SECTION -->
              <!-- SECTION - Genres -->
              <div class="col-6 flex flex-column">
                <label for="genres">Genres Name</label>
                <MultiSelect
                  :pt="{
                    root: { class: 'bg-white' },
                    label: { class: 'bg-white capitalize text-800 px-1' },
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
                  v-model="book.categories"
                  :options="genres"
                  optionLabel="name"
                  filter
                  placeholder="Select Genres"
                  :maxSelectedLabels="3"
                />
              </div>
              <!-- !SECTION -->
            </div>
            <div
              class="flex justify-content-end align-content-end align-self-end"
            >
              <Button @click="add" severity="contract" label="UPDATE"></Button>
            </div>
          </div>
        </Form>
        <!-- !SECTION -->
      </template>
    </Card>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { getAuthorLists } from "~/composable/getAuthorLists";
import { getCategoryLists } from "~/composable/getCategoryLists";

const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const { fetchAuthors } = getAuthorLists();
const { fetchCategories } = getCategoryLists();
const id = route.params.id;
const book = ref({});
const authors = ref([]);
const genres = ref([]);
const image = ref(null);
const errors = ref();

const back = () => {
  router.push(`/library`);
};

const add = () => {
  const year = new Date(book.value.published_year).getFullYear();

  const formData = new FormData();
  formData.append("id", book.value.id);
  formData.append("title", book.value.title);
  formData.append("publisher", book.value.publisher);
  formData.append("published_year", year);
  formData.append("author_id", book.value.author.id);
  formData.append(
    "has_genres",
    book.value.categories.length <= 0 ? false : true
  );

  if (image.value) {
    formData.append("image", image.value.files[0]);
  }

  axios
    .post(`${config.public.apiBaseUrl}/books/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data.message == "success") {
        axios
          .post(`${config.public.apiBaseUrl}/book_categories/update`, {
            categories: book.value.categories,
            book_id: book.value.id,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.data);
          });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status == 422) {
        const messages = error.response.data.errors;
        errors.value = messages;
        console.log(errors.value);
      }
    });
};

onMounted(() => {
  axios
    .get(`${config.public.apiBaseUrl}/books/detail/${id}`)
    .then((response) => {
      book.value = response.data.book;
      book.value.author = {
        author_name: book.value.author.author_name,
        id: book.value.author.id,
      };
      const categories = book.value.categories.map((category) => {
        return {
          name: category.category_name,
          value: category.id,
        };
      });
      book.value.categories = categories;

      console.log(book.value);
    })
    .catch((error) => {
      console.log(error.message);
    });
  fetchAuthors(authors.value);
  fetchCategories(genres.value);
});
</script>

<style lang="scss" scoped></style>
