<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Library</h1>

      <LibraryCreate />
    </div>
    <div class="card">
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
        <Column
          header="Image"
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
        >
          <template #body="{ data }">
            <img
              :src="`${config.public.baseUrl}/storage/image/${data.image}`"
              class="w-24 rounded"
              width="64"
            />
          </template>
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="title"
          class="capitalize"
          header="Title"
        >
          <template #editor="{ data, field }">
            <InputText
              :pt="{ root: { class: 'bg-white-alpha-40 text-900' } }"
              v-model="data[field]"
              fluid
            />
          </template>
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="publisher"
          header="Publisher"
          class="capitalize"
        >
          <template #editor="{ data, field }">
            <InputText
              :pt="{ root: { class: 'bg-white-alpha-40 text-900' } }"
              v-model="data[field]"
              fluid
            />
          </template>
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="published_year"
          class="capitalize"
          header="Published Year"
        >
          <template #editor="{ data, field }">
            <InputText
              :pt="{ root: { class: 'bg-white-alpha-40 text-900' } }"
              v-model="data[field]"
              fluid
            />
          </template>
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="author_name"
          class="capitalize"
          header="Author"
        >
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="categories"
          class="capitalize"
          header="Categories"
        >
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const config = useRuntimeConfig();
const books = ref();
const currentPage = ref(1);
const rowsPerPage = ref(4);
const totalRecords = ref();
const editingRows = ref([]);

onMounted(() => {
  fetchBooks();
});

const fetchBooks = (page = 1, rows = rowsPerPage.value) => {
  axios
    .get(`${config.public.apiBaseUrl}/books/lists?page=${page}&rows=${rows}`)
    .then((response) => {
      let data = response.data.books.data;
      data.forEach((book) => {
        book.categories = book.categories.join(", ");
      });
      books.value = data;
      totalRecords.value = response.data.books.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
  fetchBooks(currentPage.value, rowsPerPage.value);
};

const onRowsPerPageChange = (event) => {
  rowsPerPage.value = event;
  fetchBooks(1, rowsPerPage.value);
};

const onRowEditSave = (event) => {
  let { newData, index } = event;

  books.value[index] = newData;

  axios
    .post(`${config.public.apiBaseUrl}/books/update`, {
      id: newData.id,
      title: newData.title,
      publisher: newData.publisher,
      published_year: newData.published_year,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};
</script>

<style lang="scss" scoped></style>
