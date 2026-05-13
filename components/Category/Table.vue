<template>
  <div>
    <div class="header flex justify-between items-center">
      <h1 class="font-italic">Manage Categories</h1>

      <div class="flex justify-center items-center gap-4">
        <SearchBar @keySent="handleSearchKey" />
        <CategoryCreate />
      </div>
    </div>
    <div class="card pt-4">
      <DataTable
        v-model:editingRows="editingRows"
        :value="categories"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
      >
        <Column
          field="id"
          header="Id"
        >
        </Column>
        <Column
          field="category_name"
          class="capitalize"
          header="Category Name"
        >
          <template #editor="{ data, field }">
            <InputText
              v-model="data[field]"
              fluid
            />
          </template>
        </Column>
        <Column
          field="books_count"
          header="Books"
        ></Column>
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
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
      </DataTable>
    </div>
  </div>
</template>

<!-- NOTE - pagination lal lote chin tae tal -->
<!-- NOTE - table ui ka a sa a sone bal lote yin kaung ma lar -->

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const config = useRuntimeConfig();
const categories = ref();
const editingRows = ref([]);
const key = ref("");

const fetchCategories = () => {
  axios
    .get(`${config.public.apiBaseUrl}/category/lists`, {
      params: {
        key: key.value,
      },
    })
    .then((response) => {
      categories.value = response.data.categories;
      console.log(categories.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleSearchKey = (search_key) => {
  key.value = search_key;
  fetchCategories();
};

onMounted(() => {
  fetchCategories();
});

const onRowEditSave = (event) => {
  let { newData, index } = event;

  categories.value[index] = newData;

  axios
    .post(`${config.public.apiBaseUrl}/category/update`, {
      categoryId: newData.id,
      categoryName: newData.category_name,
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
    .get(`${config.public.apiBaseUrl}/category/delete/${id}`)
    .then((response) => {
      response.data.message ? location.reload() : console.log("Error");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
</script>

<style lang="scss" scoped></style>
