<template>
  <div>
    <div class="header flex justify-between items-center">
      <h1 class="font-italic">Manage Authors</h1>
      <div class="flex justify-center items-center gap-4">
        <SearchBar @keySent="handleSearchKey" />

        <AuthorCreate />
      </div>
    </div>
    <div class="card pt-4">
      <!-- SECTION - Table -->
      <DataTable
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
          field="id"
          header="Id"
        >
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Author Name -->
        <Column
          field="author_name"
          class="capitalize"
          header="Author Name"
        >
          <template #editor="{ data, field }">
            <InputText
              v-model="data[field]"
              fluid
            />
          </template>
        </Column>
        <!-- !SECTION -->
        <!-- SECTION - Book Count -->
        <Column
          field="books_count"
          header="Books"
        ></Column>
        <!-- !SECTION -->
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        >
        </Column>
        <!-- SECTION - delete button -->
        <Column
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
