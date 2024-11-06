<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Library</h1>

      <LibraryCreate />
    </div>
    <div class="card">
      <DataTable
        :pt="{
          root: { class: 'bg-white-alpha-70 border-round' },
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
              :src="`http://127.0.0.1:8000/storage/image/${data.image}`"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const config = useRuntimeConfig();
const books = ref();
const editingRows = ref([]);

onMounted(() => {
  axios
    .get(`${config.public.apiBaseUrl}/books/lists`)
    .then((response) => {
      response.data.books.forEach((book) => {
        book.categories = book.categories.join(", ");
      });
      books.value = response.data.books;
      console.log(response.data.books);
    })
    .catch((error) => {
      console.log(error);
    });
});

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
