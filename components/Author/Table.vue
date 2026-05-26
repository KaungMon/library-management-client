<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Authors</h1>
      <div class="flex justify-content-center align-items-center gap-4">
        <SearchBar @keySent="handleSearchKey" />

        <AuthorCreate />
      </div>
    </div>
    <div class="card">
      <!-- SECTION - Table -->
      <DataTable
        :pt="{
          root: { class: 'bg-white-alpha-70 border-round px-3 pt-2' },
          bodyRow: { class: 'bg-transparent text-900' },
          headerCell: { class: 'bg-white' },
          pcPaginator: {
            root: { class: 'bg-transparent' },
            content: { class: 'bg-white-alpha-40 border-round' },
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
          },
        }"
        v-model:editingRows="editingRows"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20]"
        :value="authors"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
      >
        <!-- SECTION - ID -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="id"
          header="Id"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Author Name -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="author_name"
          class="capitalize"
          header="Author Name"
        >
          <template #editor="{ data, field }">
            <InputText
              :pt="{ root: { class: 'bg-white-alpha-40 text-900' } }"
              v-model="data[field]"
              fluid
            />
          </template>
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Book Count -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="books_count"
          header="Books"
        ></Column>
        <!-- !SECTION -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        >
        </Column>
        <!-- SECTION - delete button -->
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent' },
          }"
          style="width: 10%; min-width: 8rem"
        >
          <template #body="{ data }">
            <Button
              icon="pi pi-trash"
              severity="danger"
              variant="outlined"
              @click="selectRow(data)"
              rounded
            ></Button>
          </template>
        </Column>
        <!-- !SECTION -->
      </DataTable>
      <!-- !SECTION -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const config = useRuntimeConfig();
const authors = ref();
const editingRows = ref([]);
const key = ref("");

const handleSearchKey = (search_key) => {
  key.value = search_key;
  fetchAuthorData();
};

const fetchAuthorData = () => {
  axios
    .get(`${config.public.apiBaseUrl}/author/lists`, {
      params: {
        key: key.value,
      },
    })
    .then((response) => {
      authors.value = response.data.authors;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  fetchAuthorData();
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

const selectRow = (data) => {
  const id = data.id;
  axios
    .get(`${config.public.apiBaseUrl}/author/delete/${id}`)
    .then((response) => {
      response.data ? location.reload() : console.log("Error");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style lang="scss" scoped></style>
