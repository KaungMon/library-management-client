<template>
  <div>
    <div class="header flex justify-content-between align-items-center">
      <h1 class="font-italic">Manage Categories</h1>

      <CategoryCreate />
    </div>
    <div class="card">
      <DataTable
        :pt="{
          root: { class: 'bg-white-alpha-70 border-round' },
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
        :value="categories"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
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
        </Column>
        <Column
          :pt="{
            headerCell: { class: 'bg-transparent text-900' },
          }"
          field="category_name"
          class="capitalize"
          header="Category Name"
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

<!-- NOTE - pagination lal lote chin tae tal -->
<!-- NOTE - table ui ka a sa a sone bal lote yin kaung ma lar -->

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const config = useRuntimeConfig();
const categories = ref();
const editingRows = ref([]);

onMounted(() => {
  axios
    .get(`${config.public.apiBaseUrl}/category/lists`)
    .then((response) => {
      categories.value = response.data.categories;
      console.log(categories.value);
    })
    .catch((error) => {
      console.log(error);
    });
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
</script>

<style lang="scss" scoped></style>
