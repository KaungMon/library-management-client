<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Library{{ receivedData }}</h1>

      <div class="flex justify-content-center align-items-centers gap-4">
        <SearchBar @keySent="handleSearchKey" />
        <LibraryCreate />
      </div>
    </div>
    <div class="card">
      <!-- SECTION - Table -->
      <DataTable
        :pt="{
          root: { class: 'bg-white-alpha-70 border-round-top-lg px-3 pt-2' },
          bodyRow: { class: 'bg-transparent text-900' },
          headerCell: { class: 'bg-white' },
        }"
        v-model:editingRows="editingRows"
        :value="books"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
      >
        <!-- SECTION - Image -->
        <Column
          header="Image"
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
        >
          <template #body="{ data }">
            <img
              v-if="data.image != null"
              :src="`${config.public.baseUrl}/storage/image/${data.image}`"
              class="w-24 rounded"
              width="64"
            />
            <img
              v-else
              src="/public/img/images.png"
              class="w-24 rounded"
              width="64"
            />
          </template>
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Title -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="title"
          class="capitalize"
          header="Title"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Publisher -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="publisher"
          header="Publisher"
          class="capitalize"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Published Year -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="published_year"
          class="capitalize"
          header="Published Year"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Author Name -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="author.author_name"
          class="capitalize"
          header="Author"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Categories -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="categories"
          class="capitalize"
          header="Categories"
        >
        </Column>
        <!-- !SECTION -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent' },
          }"
          style="width: 10%; min-width: 8rem"
        >
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              severity="info"
              variant="outlined"
              @click="editRow(data)"
              rounded
            ></Button>
            <Button
              class="ml-2"
              icon="pi pi-trash"
              severity="danger"
              variant="outlined"
              @click="selectRow(data)"
              rounded
            ></Button>
          </template>
        </Column>
      </DataTable>
      <!-- !SECTION -->
      <!-- SECTION - Paginator -->
      <Paginator
        :pt="{
          root: { class: 'bg-white-alpha-70 border-round-bottom-lg' },
          content: { class: 'bg-white-alpha-40' },
          first: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
          prev: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
          next: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
          last: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
          page: { class: 'text-900 hover:bg-blue-800 hover:text-0' },
          pcRowPerPageDropdown: {
            root: { class: 'bg-transparent' },
            label: { class: 'text-900' },
            overlay: { class: 'bg-white-alpha-50' },
            option: {
              class:
                'text-900 hover:bg-blue-800 hover:text-0 select:bg-blue-500',
            },
          },
        }"
        :rows="rowsPerPage"
        @page="onPageChange"
        :totalRecords="totalRecords"
        :rowsPerPageOptions="[4, 8, 16]"
        @update:rows="onRowsPerPageChange"
      >
      </Paginator>
      <!-- !SECTION -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { getCategoryLists } from "~/composable/getCategoryLists";
import { getAuthorLists } from "~/composable/getAuthorLists";
const config = useRuntimeConfig();
const books = ref();
const currentPage = ref(1);
const rowsPerPage = ref(4);
const totalRecords = ref();
const editingRows = ref([]);
const receivedData = ref("");
const authors = ref([]);
const key = ref("");
const router = useRouter();
const { fetchCategories } = getCategoryLists();
const { fetchAuthors } = getAuthorLists();

onMounted(() => {
  fetchBooks();
  fetchAuthors(authors.value);
});

const fetchBooks = (page = 1, rows = rowsPerPage.value) => {
  axios
    .get(`${config.public.apiBaseUrl}/books/lists?page=${page}&rows=${rows}`, {
      params: {
        key: key.value,
      },
    })
    .then((response) => {
      let data = response.data.books.data;
      data.forEach((book) => {
        book.author_name = book.author["author_name"];
        book.categories = book.categories.join(", ");
      });
      books.value = data;
      console.log(data);

      totalRecords.value = response.data.books.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleSearchKey = (search_key) => {
  key.value = search_key;
  fetchBooks();
};

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
  fetchBooks(currentPage.value, rowsPerPage.value);
};

const onRowsPerPageChange = (event) => {
  rowsPerPage.value = event;
  fetchBooks(1, rowsPerPage.value);
};

const selectRow = (data) => {
  const id = data.id;
  axios
    .get(`${config.public.apiBaseUrl}/books/delete/${id}`)
    .then((response) => {
      response.data.message ? location.reload() : console.log("Error");
    })
    .catch((error) => {
      console.log(error);
    });
};

const editRow = (data) => {
  router.push(`library/edit/${data.id}`);
};
</script>

<style lang="scss" scoped></style>
