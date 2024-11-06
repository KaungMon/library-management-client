<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Authors</h1>

      <AuthorCreate />
    </div>
    <div class="card">
      <DataTable
        :pt="{
          root: { class: 'bg-white-alpha-70 border-round' },
          bodyRow: { class: 'bg-transparent text-900' },
          headerCell: { class: 'bg-white' },
        }"
        v-model:editingRows="editingRows"
        :value="authors"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
      >
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="id"
          header="Id"
        >
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="author_name"
          class="capitalize"
          header="Author Name"
        >
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="books_count"
          header="Books"
        ></Column>
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
const authors = ref();
const editingRows = ref([]);

onMounted(() => {
  axios
    .get(`${config.public.apiBaseUrl}/author/lists`)
    .then((response) => {
      authors.value = response.data.authors;
    })
    .catch((error) => {
      console.log(error);
    });
});

const onRowEditSave = (event) => {
  let { newData, index } = event;

  authors.value[index] = newData;

  axios
    .post(`${config.public.apiBaseUrl}/author/update`, {
      authorId: newData.id,
      authorName: newData.author_name,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style lang="scss" scoped></style>
